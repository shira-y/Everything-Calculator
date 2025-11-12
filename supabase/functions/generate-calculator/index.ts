import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Fetch OpenAI API key from environment variables
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    // Allow model to be configured via environment variable, default to gpt-4o
    const MODEL_NAME = Deno.env.get('MODEL_NAME') || 'gpt-4o';

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME, // Use configurable model name
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that generates calculator definitions based on user prompts.
            The output should be a JSON object matching the CalculatorDefinition type:
            {
              "id": string,
              "name": string,
              "description": string,
              "inputs": [{ "id": string, "label": string, "type": "number" | "text", "value": number | string }],
              "formula": string, // A mathematical expression using input IDs as variables (e.g., 'principal * (rate / 100) * time')
              "outputLabel": string,
              "outputValue": number | string
            }
            
            - Ensure all input IDs are unique and used in the formula.
            - Provide sensible default 'value' for inputs.
            - The 'formula' should be a valid math expression that can be evaluated by mathjs.
            - If the prompt is complex, simplify the calculator to its core functionality.
            - Always return a valid JSON object.
            - Example for 'Net worth calculator':
            {
              "id": "net-worth",
              "name": "Net Worth Calculator",
              "description": "Calculates your net worth based on assets and liabilities.",
              "inputs": [
                { "id": "assets", "label": "Total Assets", "type": "number", "value": 0 },
                { "id": "liabilities", "label": "Total Liabilities", "type": "number", "value": 0 }
              ],
              "formula": "assets - liabilities",
              "outputLabel": "Net Worth",
              "outputValue": 0
            }
            - Example for 'BMI Calculator':
            {
              "id": "bmi-calculator",
              "name": "BMI Calculator",
              "description": "Calculates Body Mass Index (BMI) based on weight and height.",
              "inputs": [
                { "id": "weight", "label": "Weight (kg)", "type": "number", "value": 70 },
                { "id": "height", "label": "Height (m)", "type": "number", "value": 1.75 }
              ],
              "formula": "weight / (height * height)",
              "outputLabel": "BMI",
              "outputValue": 0
            }
            `,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    const openaiData = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error('OpenAI API error:', openaiData);
      return new Response(JSON.stringify({ error: openaiData.error?.message || 'Failed to get response from OpenAI' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: openaiResponse.status,
      });
    }

    const calculatorDefinition = JSON.parse(openaiData.choices[0].message.content);

    return new Response(JSON.stringify(calculatorDefinition), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Edge Function error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
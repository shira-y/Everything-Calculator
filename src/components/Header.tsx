"use client";

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Everything Calculator
        </Link>
        {/* Add navigation links here if needed */}
      </div>
    </header>
  );
};

export default Header;
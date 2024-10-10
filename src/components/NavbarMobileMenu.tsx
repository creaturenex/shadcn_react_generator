'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function NavbarMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu}>
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/generator" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              UI Generator
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <Button variant="outline" className="w-full">Sign In</Button>
          </div>
        </div>
      )}
    </div>
  );
};




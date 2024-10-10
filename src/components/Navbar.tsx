"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
// import NavbarMobileMenu from './NavbarMobileMenu';
import { Switch } from './ui/switch';
import { useState } from 'react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span><Image src="/logo_light.png" width={50}
                height={50}
                alt="logo" /></span>
            </Link>
          </div>
    <h1 className='text-2xl font-bold'>AI Shadcn React Component Generator</h1>
          <div className='flex flex-row align-middle items-center'>
            <Button variant="outline">Sign In</Button>
            <Switch
            className='ml-2'
              checked={darkMode}
              onCheckedChange={() => { setDarkMode(!darkMode) }} />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

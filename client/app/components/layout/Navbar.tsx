'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState('NGO');

  const linkStyle = (path: string) =>
    pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          ReliefSync Lite
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className={linkStyle('/')}>
            Dashboard
          </Link>
          <Link href="/submit" className={linkStyle('/submit')}>
            Submit Update
          </Link>
          <Link href="/about" className={linkStyle('/about')}>
            About
          </Link>

          {/* Role Selector */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="NGO">NGO</option>
            <option value="Government">Government</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

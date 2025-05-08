import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkStyles =
    'relative px-4 py-2 text-gray-700 hover:text-blue-500 transition duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-500 after:transition-all after:duration-300';

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-blue-500 font-bold text-lg">Contact Manager</div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700 focus:outline-none">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          <li><Link to="/" className={linkStyles}>Add Contact</Link></li>
          <li><Link to="/manage-contact" className={linkStyles}>Manage Contact</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 px-4">
          <ul className="space-y-2">
            <li><Link to="/" onClick={toggleMenu} className={linkStyles}>Add Contact</Link></li>
            <li><Link to="/manage-contact" onClick={toggleMenu} className={linkStyles}>Manage Contact</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

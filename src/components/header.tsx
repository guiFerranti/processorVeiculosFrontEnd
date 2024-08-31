import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-primary p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Veículos</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <ul className="hidden md:flex space-x-6 !text-white">
          <li>
            <Link to="/veiculos/register" className="hover:underline header-link">Cadastro</Link>
          </li>
          <li>
            <Link to="/veiculos/busca-individual" className="hover:underline header-link">Busca Individual</Link>
          </li>
          <li>
            <Link to="/veiculos/busca-completa" className="hover:underline header-link">Busca Completa</Link>
          </li>
          <li>
            <Link to="/veiculos/atualizar" className="hover:underline header-link">Atualizar</Link>
          </li>
        </ul>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden absolute top-16 left-0 w-full bg-primary overflow-hidden z-20"
        >
          <ul className="flex flex-col space-y-4 p-4 !text-white">
            <li>
              <Link to="/veiculos/register" className="hover:underline header-link" onClick={toggleMenu}>Cadastro</Link>
            </li>
            <li>
              <Link to="/veiculos/busca-individual" className="hover:underline header-link" onClick={toggleMenu}>Busca Individual</Link>
            </li>
            <li>
              <Link to="/veiculos/busca-completa" className="hover:underline header-link" onClick={toggleMenu}>Busca Completa</Link>
            </li>
            <li>
              <Link to="/veiculos/atualizar" className="hover:underline header-link" onClick={toggleMenu}>Atualizar</Link>
            </li>
          </ul>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;

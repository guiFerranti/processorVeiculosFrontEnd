import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-primary p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Veículos</div>
        <ul className="flex space-x-6 !text-white">
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
          <li>
            <Link to="/veiculos/deletar" className="hover:underline header-link">Deletar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};


export default Header;

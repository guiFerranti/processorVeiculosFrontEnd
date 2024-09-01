import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Bem-vindo ao Gerenciamento de Veículos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <button
                    onClick={() => handleNavigation('/veiculos/register')}
                    className="bg-primary hover:bg-white text-white hover:text-primary border border-primary py-4 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
                >
                    Registrar Veículo
                </button>
                <button
                    onClick={() => handleNavigation('/veiculos/atualizar')}
                    className="bg-primary hover:bg-white text-white hover:text-primary border border-primary py-4 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
                >
                    Atualizar Veículo
                </button>
                <button
                    onClick={() => handleNavigation('/veiculos/busca-individual')}
                    className="bg-primary hover:bg-white text-white hover:text-primary border border-primary py-4 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
                >
                    Buscar Veículo Individual
                </button>
                <button
                    onClick={() => handleNavigation('/veiculos/busca-completa')}
                    className="bg-primary hover:bg-white text-white hover:text-primary border border-primary py-4 px-6 rounded-lg text-lg font-semibold transition duration-300 ease-in-out"
                >
                    Buscar Todos os Veículos
                </button>
            </div>
        </div>
    );
};

export default Home;

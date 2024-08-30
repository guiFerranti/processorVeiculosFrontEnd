import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getVeiculoById, deleteVeiculo } from '../services/api/veiculosServices';
import { useNavigate } from 'react-router-dom';

interface ResponseGetVeiculoJson {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ano?: number;
    marca: string;
    modelo: string;
}

const BuscaIndividual: React.FC = () => {
    const [veiculoId, setVeiculoId] = useState<string>('');
    const [veiculo, setVeiculo] = useState<ResponseGetVeiculoJson | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (veiculoId.trim() !== '') {
            setLoading(true);
            try {
                const response = await getVeiculoById(veiculoId);
                setVeiculo(response);
                toast.success('Veículo encontrado!');
            } catch (error) {
                setVeiculo(null);
                toast.error('Veículo não encontrado.');
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Por favor, insira um ID válido.');
        }
    };

    const handleEdit = () => {
        navigate('/veiculos/atualizar', { state: { veiculoId: veiculo?.id } });
    };

    const handleDelete = async () => {
        if (veiculo && window.confirm('Você tem certeza que deseja excluir este veículo?')) {
            try {
                await deleteVeiculo(veiculo.id);
                setVeiculo(null);
                setVeiculoId('');
                toast.success('Veículo excluído com sucesso!');
            } catch (error) {
                toast.error('Erro ao excluir o veículo.');
            }
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Busca Individual</h1>
            <ToastContainer />
            <div className="relative pb-7 w-full">
                <label className="block text-left text-lg font-medium text-gray-700">ID do Veículo</label>
                <input 
                    type="text"
                    placeholder="Digite o ID"
                    value={veiculoId}
                    onChange={(e) => setVeiculoId(e.target.value)}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                />
                <button
                    onClick={handleSearch}
                    className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                    disabled={loading}
                >
                    {loading ? 'Procurando...' : 'Procurar'}
                </button>
            </div>
            {veiculo && (
                <div className="mt-6 p-6 border border-gray-300 rounded-lg shadow-lg bg-white max-w-2xl mx-auto overflow-hidden">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Detalhes do Veículo</h2>
                    <div className="space-y-4 text-left text-lg text-gray-700 break-words">
                        <p><strong>ID:</strong> {veiculo.id}</p>
                        <p><strong>Marca:</strong> {veiculo.marca}</p>
                        <p><strong>Modelo:</strong> {veiculo.modelo}</p>
                        {veiculo.ano && <p><strong>Ano:</strong> {veiculo.ano}</p>}
                        <p><strong>Criado em:</strong> {new Date(veiculo.createdAt).toLocaleString()}</p>
                        <p><strong>Atualizado em:</strong> {new Date(veiculo.updatedAt).toLocaleString()}</p>
                    </div>
                    <div className="flex justify-end mt-6 space-x-4">
                        <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6">
                                <path
                                    d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6">
                                <path
                                d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuscaIndividual;

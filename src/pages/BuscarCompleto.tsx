import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllVeiculos, deleteVeiculo } from '../services/api/veiculosServices';
import { useNavigate } from 'react-router-dom';

interface ResponseGetVeiculoJson {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ano?: number;
    marca: string;
    modelo: string;
    imageUrl?: string;
}

const ListaVeiculos: React.FC = () => {
    const [veiculos, setVeiculos] = useState<ResponseGetVeiculoJson[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const pageSize = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVeiculos = async () => {
            try {
                const response = await getAllVeiculos(page, pageSize);
                setVeiculos(response.veiculos);
                const totalPages = Math.ceil(response.totalCount / pageSize);
                setTotalPages(totalPages || 1);
                // toast.success('Veículos carregados com sucesso!');
            } catch (error) {
                toast.error('Erro ao carregar veículos.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchVeiculos();
    
        return () => {
            toast.dismiss();
        };
    
    }, [page]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Você tem certeza que deseja excluir este veículo?')) {
            try {
                await deleteVeiculo(id);
                setVeiculos(veiculos.filter(veiculo => veiculo.id !== id));
                toast.success('Veículo excluído com sucesso!');
            } catch (error) {
                toast.error('Erro ao excluir o veículo.');
            }
        }
    };

    const handleEdit = (id: string) => {
        navigate('/veiculos/atualizar', { state: { veiculoId: id } });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (loading) {
        return <p>Carregando veículos...</p>;
    }

    if (veiculos.length === 0) {
        return <p>Nenhum veículo encontrado.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Lista de Veículos</h1>
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {veiculos.map(veiculo => (
                    <div key={veiculo.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                        {veiculo.imageUrl ? (
                            <img src={veiculo.imageUrl} alt={veiculo.modelo} className="w-full h-48 object-cover" />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">Imagem não disponível</div>
                        )}
                        <div className="p-4">
                            <h2 className="text-xl text-gray-900 font-bold mb-2">{veiculo.marca} {veiculo.modelo}</h2>
                            <p className="text-gray-700 mb-2 font-semibold">Ano: {veiculo.ano || 'N/A'}</p>
                            <p className="text-gray-500 text-sm mb-2">Criado em: {new Date(veiculo.createdAt).toLocaleString()}</p>
                            <p className="text-gray-500 text-sm">Atualizado em: {new Date(veiculo.updatedAt).toLocaleString()}</p>
                            <p className="text-gray-400 text-xs mt-2">ID: {veiculo.id}</p> 
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleEdit(veiculo.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(veiculo.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                    Anterior
                </button>
                <span className="flex items-center">{`Página ${page} de ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default ListaVeiculos;

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getVeiculoById, updateVeiculo } from '../services/api/veiculosServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const UpdateVeiculo: React.FC = () => {
    const location = useLocation();
    const [veiculoId, setVeiculoId] = useState<string | null>(location.state?.veiculoId || null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (veiculoId) {
            handleSearch();
        }
    }, [veiculoId]);

    const anoAtual = new Date().getFullYear();
    const anoLimite = anoAtual - 20;

    const formik = useFormik({
        initialValues: {
            ano: undefined as number | undefined,
            marca: '',
            modelo: '',
        },
        validationSchema: Yup.object({
            ano: Yup.number()
                .required('Ano é obrigatório')
                .min(anoLimite + 1, `Ano deve ser entre ${anoLimite + 1} e ${anoAtual}`)
                .max(anoAtual, `Ano deve ser entre ${anoLimite + 1} e ${anoAtual}`),
            marca: Yup.string()
                .required('Marca é obrigatória'),
            modelo: Yup.string()
                .required('Modelo é obrigatório'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            if (veiculoId !== null) {
                try {
                    await updateVeiculo(veiculoId, values);
                    setStatus({ success: true });
                    toast.success('Veículo atualizado com sucesso!');
                } catch (error) {
                    setStatus({ success: false, error: 'Erro ao atualizar veículo. Por favor, tente novamente.' });
                    toast.error('Erro ao atualizar veículo. Por favor, tente novamente.');
                } finally {
                    setSubmitting(false);
                }
            }
        },
    });

    const handleSearch = async () => {
        if (veiculoId) {
            setLoading(true);
            try {
                const veiculo = await getVeiculoById(veiculoId);
                formik.setValues({
                    ano: veiculo.ano !== undefined ? veiculo.ano : undefined,
                    marca: veiculo.marca,
                    modelo: veiculo.modelo,
                });
                setIsEditing(true);
                toast.success('Veículo encontrado!');
            } catch (error) {
                toast.error('Veículo não encontrado.');
                setIsEditing(false);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Por favor, insira um ID válido.');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Atualizar Veículo</h1>
            <ToastContainer />
            <div className="relative pb-7">
                <label className="block text-left text-lg font-medium text-gray-700">ID do Veículo</label>
                <input
                    type="text"
                    placeholder="Digite o ID"
                    value={veiculoId || ''}
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
            {isEditing && (
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div className="relative pb-7">
                        <label className="block text-left text-lg font-medium text-gray-700">Ano</label>
                        <input
                            placeholder="Digite o ano"
                            type="number"
                            {...formik.getFieldProps('ano')}
                            className={`mt-1 block w-full p-3 border ${formik.touched.ano && formik.errors.ano ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg`}
                        />
                        {formik.touched.ano && formik.errors.ano && (
                            <div className="absolute text-red-500 text-sm mt-1">
                                {formik.errors.ano}
                            </div>
                        )}
                    </div>
                    <div className="relative pb-7">
                        <label className="block text-left text-lg font-medium text-gray-700">Marca</label>
                        <input
                            placeholder="Digite a marca"
                            type="text"
                            {...formik.getFieldProps('marca')}
                            className={`mt-1 block w-full p-3 border ${formik.touched.marca && formik.errors.marca ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg`}
                        />
                        {formik.touched.marca && formik.errors.marca && (
                            <div className="absolute text-red-500 text-sm mt-1">
                                {formik.errors.marca}
                            </div>
                        )}
                    </div>
                    <div className="relative pb-7">
                        <label className="block text-left text-lg font-medium text-gray-700">Modelo</label>
                        <input
                            placeholder="Digite o modelo"
                            type="text"
                            {...formik.getFieldProps('modelo')}
                            className={`mt-1 block w-full p-3 border ${formik.touched.modelo && formik.errors.modelo ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg`}
                        />
                        {formik.touched.modelo && formik.errors.modelo && (
                            <div className="absolute text-red-500 text-sm mt-1">
                                {formik.errors.modelo}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                        disabled={formik.isSubmitting}
                    >
                        Atualizar
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateVeiculo;

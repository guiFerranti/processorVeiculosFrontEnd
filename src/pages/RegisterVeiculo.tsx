import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerVeiculo } from '../services/api/veiculosServices'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterVeiculo: React.FC = () => {
    const anoAtual = new Date().getFullYear();
    const anoLimite = anoAtual - 20;

    const formik = useFormik({
    initialValues: {
        ano: 0,
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
        try {
        await registerVeiculo(values);
        setStatus({ success: true });
        toast.success('Veículo registrado com sucesso!');
        } catch (error) {
        setStatus({ success: false, error: 'Erro ao registrar veículo. Por favor, tente novamente.' });
        toast.error('Erro ao registrar veículo. Por favor, tente novamente.');
        } finally {
        setSubmitting(false);
        }
    },
    });

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Registrar Veículo</h1>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="relative pb-7 ">
                <label className="block text-left text-lg font-medium text-gray-700">Ano</label>
                <input placeholder='Digite o ano'
                type="number"
                {...formik.getFieldProps('ano')}
                className={`mt-1 block w-full p-3 border ${formik.touched.ano && formik.errors.ano ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg`}
                />
                {formik.touched.ano && formik.errors.ano ? (
                <div className="absolute text-red-500 text-sm mt-1">
                    {formik.errors.ano}
                </div>
                ) : null}
            </div>
            <div className="relative pb-7">
                <label className="block text-left font-medium text-gray-700">Marca</label>
                <input placeholder='Digite a marca'
                type="text"
                {...formik.getFieldProps('marca')}
                className={`mt-1 block w-full p-3 border ${formik.touched.marca && formik.errors.marca ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg`}
                />
                {formik.touched.marca && formik.errors.marca ? (
                <div className="absolute text-red-500 text-sm mt-1">
                    {formik.errors.marca}
                </div>
                ) : null}
            </div>
            <div className="relative pb-7">
                <label className="block text-left font-medium text-gray-700">Modelo</label>
                <input placeholder='Digite o modelo'
                type="text"
                {...formik.getFieldProps('modelo')}
                className={`mt-1 block w-full p-3 border ${formik.touched.modelo && formik.errors.modelo ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg`}
                />
                {formik.touched.modelo && formik.errors.modelo ? (
                <div className="absolute text-red-500 text-sm mt-1">
                    {formik.errors.modelo}
                </div>
                ) : null}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
                disabled={formik.isSubmitting}>
                Registrar
            </button>
            </form>
        </div>
    );
};

export default RegisterVeiculo;

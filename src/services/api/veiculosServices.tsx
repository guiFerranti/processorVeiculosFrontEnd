import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

interface RequestRegisteredVeiculoJson {
    ano?: number;
    marca: string;
    modelo: string;
    imageUrl?: string;
}

interface ResponseRegisteredVeiculoJson {

}

interface RequestUpdateVeiculoJson {
    ano?: number;
    marca: string;
    modelo: string;
    imageUrl: string;
}

interface ResponseGetVeiculoJson {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ano?: number;
    marca: string;
    modelo: string;
    imageUrl: string;
}


export const registerVeiculo = async (request: RequestRegisteredVeiculoJson) => {
  const response = await axios.post<ResponseRegisteredVeiculoJson>(`${API_URL}`, request);
  return response.data;
};

export const getVeiculoById = async (id: string) => {
    const response = await axios.get<ResponseGetVeiculoJson>(`${API_URL}/${id}`);
    return response.data;
  };
  
  
export const updateVeiculo = async (id: string, request: RequestUpdateVeiculoJson) => {
    await axios.put(`${API_URL}/${id}`, request);
};


export const deleteVeiculo = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const getAllVeiculos = async (page: number = 1, pageSize: number = 20) => {
    const response = await axios.get(`${API_URL}`, {
        params: { page, pageSize }
    });
    return response.data;
};


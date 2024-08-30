import axios from 'axios';

const API_URL = 'https://localhost:7154/api/veiculos'; 

interface RequestRegisteredVeiculoJson {
    ano: number;
    marca: string;
    modelo: string;
}

interface ResponseRegisteredVeiculoJson {

}

interface RequestUpdateVeiculoJson {
    ano: number;
    marca: string;
    modelo: string;
}

interface ResponseGetVeiculoJson {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    ano: number;
    marca: string;
    modelo: string;
}


export const registerVeiculo = async (request: RequestRegisteredVeiculoJson) => {
  const response = await axios.post<ResponseRegisteredVeiculoJson>(`${API_URL}`, request);
  return response.data;
};

export const getVeiculoById = async (id: number) => {
    const response = await axios.get<ResponseGetVeiculoJson>(`${API_URL}/${id}`);
    return response.data;
  };
  
  
  export const updateVeiculo = async (id: number, request: RequestUpdateVeiculoJson) => {
    await axios.put(`${API_URL}/${id}`, request);
  };
  
  
  export const deleteVeiculo = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
  };
  

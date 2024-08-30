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

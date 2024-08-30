import { Route, Routes } from 'react-router-dom';
import './App.css'
import RegisterVeiculo from './pages/RegisterVeiculo';
import { ToastContainer } from 'react-toastify';
import Header from './components/header';
import UpdateVeiculo from './pages/UpdateVeiculo';
import BuscaIndividual from './pages/BuscarIndividual';

function App() {

    return (
        <>
            <ToastContainer />
            <Header />
            <div className='pt-16'>
                <Routes>
                    <Route path="/veiculos/register" element={<RegisterVeiculo />} />
                    <Route path="/veiculos/atualizar" element={<UpdateVeiculo />} />
                    <Route path="/veiculos/busca-individual" element={<BuscaIndividual />} />
                </Routes>
            </div>
        </>
      );
}

export default App

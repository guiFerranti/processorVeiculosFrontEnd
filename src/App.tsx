import { Route, Routes } from 'react-router-dom';
import './App.css'
import RegisterVeiculo from './pages/RegisterVeiculo';
import { ToastContainer } from 'react-toastify';
import Header from './components/header';
import UpdateVeiculo from './pages/UpdateVeiculo';

function App() {

    return (
        <>
            <ToastContainer />
            <Header />
            <div className='pt-16'>
                <Routes>
                    <Route path="/veiculos/register" element={<RegisterVeiculo />} />
                    <Route path="/veiculos/atualizar" element={<UpdateVeiculo />} />
                </Routes>
            </div>
        </>
      );
}

export default App

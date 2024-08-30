import { Route, Routes } from 'react-router-dom';
import './App.css'
import RegisterVeiculo from './pages/RegisterVeiculo';
import { ToastContainer } from 'react-toastify';
import Header from './components/header';

function App() {

    return (
        <>
            <ToastContainer />
            <Header />
            <div className='pt-16'>
                <Routes>
                    <Route path="/veiculos/register" element={<RegisterVeiculo />} />
                </Routes>
            </div>
        </>
      );
}

export default App

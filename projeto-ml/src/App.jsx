import './App.css'
import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Registro from './pages/Registro';
import Login from './pages/Login';
import RegistroDiario from './pages/RegistroDiario';

export default (props) => (
    <div className="App">
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/home'} element={<Home/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registro'} element={<Registro/>}/>
                    <Route path={'/registro-diario'} element={<RegistroDiario/>}/>
                </Routes>
            </BrowserRouter>
        </>
    </div>
)

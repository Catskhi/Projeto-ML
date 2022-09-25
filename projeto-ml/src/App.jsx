import './App.css'
import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Registro from './pages/Registro';

export default (props) => (
    <div className="App">
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/home'} element={<Home/>}/>
                    <Route path={'/registro'} element={<Registro/>}/>
                </Routes>
            </BrowserRouter>
        </>
    </div>
)

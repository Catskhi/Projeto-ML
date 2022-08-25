import React, { useEffect, UseState } from "react";
import { useState } from "react";

export default (props) => {
    const [data, setData] = useState([])
    const [carregou, setCarregou] = useState(false)
    useEffect(() => {
        fetch('http://127.0.0.1:5000/teste')
            .then(res => res.json())
            .then(res => setData(res))
            .catch(error => console.log(error))
    }, [])
    
}
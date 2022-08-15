import React, { useState } from 'react'

export default (props) => {
    const [nome, setNome ]= useState('Pedro')
    return (
        <>
            {/* O nome é alterado no input, depois mandado pro estado, depois a página é atualizada! 
                Por isso esse h3 é atualizado junto com o input
                é como se:
                input -> maquina -> ui
            */}
            <h3>{nome}</h3>
            <input type='text' value={nome} onChange={evento => setNome(evento.target.value)}></input>
        </>
    )
}
    
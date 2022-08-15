import React, { Component } from "react";
import Botoes from "./Botoes";
import Display from "./Display";
import PassoForm from "./PassoForm";

export default class Contador extends React.Component {


    state = {
        passo: this.props.passo || 1,
        valor: this.props.valor || 0
    }
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         passo: props.passo,
    //         valor: 0
    //     }    
    // }

    incrementar = () => {
        this.setState({
            valor: this.state.valor += this.state.passo
        })
    }

    decrementar = () => {
        this.setState({
            valor: this.state.valor -= this.state.passo
        })
    }

    mudarPasso = (novoPasso) => {
        this.setState({
            passo: novoPasso
        })
    }

    render() {
        return (
            <div>
                <h2>Contador</h2>

                <PassoForm passo={this.state.passo} onPassoChange={this.mudarPasso}></PassoForm>
                
                <Display valor={this.state.valor}></Display>

                <Botoes onIncrementar={this.incrementar} onDecrementar={this.decrementar}/>
            </div>
        )
    }
}
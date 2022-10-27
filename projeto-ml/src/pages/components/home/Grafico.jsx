import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";


export default function Grafico(props) {
    const testData = [{name: 'Horas Dormidas', horas: 30, qualidade: 5}, 
    {name: 'Horas Dormidas', horas: 50, qualidade: 45},
    {name: 'Horas Dormidas', horas: 80, qualidade: 76}]

    return (
        <div style={{width: '80%', height: 300}}>
            <ResponsiveContainer>
                <LineChart data={testData}>
                    <Line type={'monotone'} dataKey={'horas'} stroke="#8884d8"/>
                    <Line type={'monotone'} dataKey={'qualidade'} stroke="#FFFF"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
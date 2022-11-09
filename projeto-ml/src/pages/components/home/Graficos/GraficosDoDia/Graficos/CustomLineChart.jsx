import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './Graficos.css'

export default function CustomLineChart ( props ) {
      return (
        <div className="grafico">
         <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={props.data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={props.dataKey} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
        </div>
      )
}
import React from "react";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from "recharts";

export const DataView = (props) => {
    console.log(props.data)
    return (
        <LineChart
            width={900}
            height={200}
            data={props.data}
            >
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin-10', 'dataMax+10']}/>
                <Tooltip />
                <Legend payload={[{value: 'weight/kg', type:"line", id:'ID01'}]}/>
                <CartesianGrid stroke="#0a2b2d" />
                <Line type="monotone" dataKey="weight" stroke="#297877" yAxisId={0} strokeWidth="2.5" />
            </LineChart>
    );
}

export default DataView;
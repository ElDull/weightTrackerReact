import React, {useEffect, useState} from 'react';
import AddForm from './AddForm';
import DataView from './DataView';
import './App.css'
//import { getWeightDataJson } from './util';

//const weight_data = getWeightDataJson();

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/weights");
      const newData = await response.json();
      newData.sort((a,b) => {
        return new Date(a.date) - new Date(b.date);
      })
      setData(newData);
    }
    fetchData();
  },[])

  const updateData = async (dataPoint) => {
    const newData = [...data, dataPoint];
    newData.sort((a,b) => {
      return new Date(a.date) - new Date(b.date);
    });
    console.log(newData)
    setData(newData);
    await fetch("http://localhost:5000/addWeight", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(dataPoint)
    })
  }
  return (
    <div className='App'>
      <h1>Weight<span className="highlight">Tracker</span></h1>
      <div className='App-content'>
        <AddForm updateData={updateData} data={data} className="form"/>
      </div>
      <DataView data={data} className="data"/>
    </div>
  )
}

export default App;

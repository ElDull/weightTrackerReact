import React, {useEffect, useState} from 'react';
import AddForm from './AddForm';
import DataView from './DataView';
import './App.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/weights");
      const newData = await response.json();
      newData.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      })
      setData(newData);
    }
    fetchData();
  }, [data])

  const updateData = async (dataPoint) => {
        const newData = [...data, dataPoint];
        newData.sort((a, b) => {
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
      };
  
  const submit = () => {
    const maxId = Math.max(...data.map(({id}) => id));
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete the last entry?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setData((data) => {
              data.filter(el => el.id !== maxId)
            })
            await fetch("http://localhost:5000/removeWeight")
          }
        },
        {
          label: 'No',
          onClick: () => console.log("Clicked no")
        }
      ]
    });
  };
  return (
    <div className='App'>
      <h1>Weight<span className="highlight">Tracker</span></h1>
      <div className='App-content'>
        <AddForm updateData={updateData} data={data} confirm={submit} className="form"/>
        <button onClick={submit} className="deleteButton">Remove Last Entry</button>
      </div>
      <DataView data={data} className="data"/>
    </div>
  )
}

export default App;

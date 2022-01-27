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
  }, [])

  
  const updateData = (dataPoint=null) => {
        let newData;
        if (dataPoint){
          newData = [...data, dataPoint];
        } else {
          newData = data;
        }
        newData.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        setData(newData);
      }
  const addNewDataDB = async(dataPoint) => {
        updateData(dataPoint);
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
            setData((data) => { return data.filter(({id}) => id !== maxId)})
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
    <div className='relative'>
      <h1 className='shadow-md'>Weight<span className="highlight text-b">Tracker</span></h1>
      <div className='container mx-auto'>
        <span>
          <AddForm updateData={addNewDataDB} data={data} confirm={submit} className="form"/>
          <button onClick={submit} className="py-2 px-4  bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 focus:ring-offset-rose-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Remove Last Entry</button>
        </span>
        <DataView data={data} className="data"/>
      </div>
    </div>
  )
}

export default App;

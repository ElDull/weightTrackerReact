import React, {useState} from "react";

export const AddForm = (props) => {

    const [date, setDate] = useState("")
    const [number, setNumber] = useState("");
    
    // Handles change in the date input
    const handleDateChange = ({ target }) => {
        const [year, month, day] = target.value.split("-");
        const newDate = `${month}/${day}/${year}`
        console.log(newDate);
        setDate(newDate);
    }
    
    // Handles change in the weight input.
    // Makes sure only numbers are able to be input.
    const handleWeightChange = ({ target }) => {
        const weight = target.value;
        if (Number(weight) || weight === "") {setNumber(weight)}
    }

    // Submit form and update data state (App component) 
    const addDataPoint = (e) => {
        e.preventDefault();
        if (number < 100 && number > 30){
            props.updateData({
                id: Math.max(...props.data.map(({id}) => id))+1,
                date: date,
                weight: parseFloat(number)
            })
        } else {return;}
    }
    
    return (
            <form onSubmit={addDataPoint} className="mx-auto my-auto container">
                <input type="text" onChange={handleWeightChange} value={number} className=" mx-2 my-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Weight: kg"/>
                <input type="date" onChange={handleDateChange} className="mx-2 my-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"/>
                <button type="submit" className="py-2 px-5 mx-2 my-2 bg-slate-600 hover:bg-slate-700 focus:ring-slate-500 focus:ring-offset-slate-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Add New Entry</button>
            </form>
    );
}

export default AddForm;
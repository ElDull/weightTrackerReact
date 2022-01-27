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
            <form onSubmit={addDataPoint}>
                <input type="text" onChange={handleWeightChange} value={number}/>
                <input type="date" onChange={handleDateChange}/>
                <button type="submit">Add New Entry</button>
            </form>
    );
}

export default AddForm;
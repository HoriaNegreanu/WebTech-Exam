import { useState } from "react";

 function FilterMeetingForm(props) {

    const { onFilter, setFiltered, setSorted } = props 
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');

    const filter = (event) => {
        onFilter(
            description,
            year
        )
    }

    const clearFilter = (event) => {
        setSorted(false);
        setFiltered(false);
    }

    const sortDescriptions = (event) => {
        setFiltered(false);
        setSorted(true);
    }

    return (
        <div>
            <div>
                <div>
                    <h3>Filter Meetings by description and year</h3>
                    <label >Description contains:</label>
                    <div><input type='text' className="wide-input" placeholder='Description' value={description} onChange={(evt) => setDescription(evt.target.value)} /></div>
                </div>
                <div>
                    <label >Choose meetings released after the year:</label>

                    <div><input type='number' placeholder='year' value={year} onChange={(evt) => setYear(evt.target.value)} /></div>
                </div>
                <div>
                    <input type='button' className="btn btn-primary" value='Filter' onClick={filter}/>
                    <input type='button' className="btn btn-primary" value='Sort alphabetically' onClick={sortDescriptions} />
                    <input type='button' className="btn btn-danger" value='Clear filter' onClick={clearFilter} />
                </div>
            </div>
        </div>
    )

 }

 export default FilterMeetingForm;
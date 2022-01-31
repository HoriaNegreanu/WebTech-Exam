import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddMeetingForm(props) {
    const { onAdd } = props 
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [meetingDate, setMeetingDate] = useState(new Date());

    const add = (event) => {
        onAdd({
            description, 
            link,
            meetingDate
        })
        setDescription('')
        setLink("")
        setMeetingDate(new Date())
    }

    return (
        <div>
            <div>
                <textarea className="wide-input" placeholder="Description" value={description} rows="4" cols="50" onChange={(evt) => setDescription(evt.target.value)}></textarea>
                <input type='text' className="wide-input" placeholder='Meeting link' value={link} onChange={(evt) => setLink(evt.target.value)} />
                <div>
                    <label>Meeting Date:</label>

                    <DatePicker selected={meetingDate} onChange={date => setMeetingDate(date)} />
                </div>
                <div>
                    <input type='button' className="btn btn-success" value='Add' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddMeetingForm;

import { useState } from "react";

function AddParticipantForm(props) {
    const { onAdd, meetingId } = props 
    const [name, setName] = useState('');

    const add = (event) => {
        onAdd(
            name, 
            meetingId
        )
        setName('');
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='Name' className='wide-input' value={name} onChange={(evt) => setName(evt.target.value)} />
                <div>
                    <input type='button' className="btn btn-success" value='Add participant' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddParticipantForm;

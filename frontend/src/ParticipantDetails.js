import { useState } from 'react';

function ParticipantDetails(props) {

    const { item, onSave, onDeleteParticipant } = props;
    const [name, setName] = useState(item.name);
    const [isEditing, setIsEditing] = useState(false);

    const deleteParticipant = () => {
        onDeleteParticipant(item.id, item.meetingId)
    }

    const editParticipant = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const saveParticipant = () => {
        onSave( item.id, {
            name
        })
        setIsEditing(false);
    }

    return (
        <div className='list-item'>
            {
                isEditing ? 
                (
                    <>
                        Editing participant
                        <input type='text' className='wide-input' placeholder='Name' value={name} onChange={(evt) => setName(evt.target.value)} />
                        <div>
                            <input type='button' className='btn btn-success' value='Save' onClick={saveParticipant}/>
                            <input type='button' className='btn btn-secondary' value='Cancel' onClick={cancel}/>
                        </div>
                    </>
                ):
                (
                    <>
                        <div>
                            Participant name is <b>{item.name}</b>
                        </div>
                        <div>
                            <input className='btn btn-primary' type='button' value='edit' onClick={editParticipant} />
                            <input className='btn btn-danger' type='button' value='delete' onClick={deleteParticipant} />

                        </div>
                    </>
                )
            }
        </div>
    );
}

export default ParticipantDetails;
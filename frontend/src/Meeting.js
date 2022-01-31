import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Meeting(props) {

    const { item, onSave, onDelete, setSelectedMeeting } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(item.description);
    const [link, setLink] = useState(item.link);
    const [meetingDate, setMeetingDate] = useState(new Date(item.meetingDate));

    const seeParticipant = (event) => {
        setSelectedMeeting(item);
    }

    const formatMeetingDate = (d) => {
        return d.substring(0, 10);
    }

    const deleteMeeting = (event) => {
        onDelete(item.id);
    }

    const edit = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const saveMeeting = () => {
        onSave( item.id, {
            description,
            link, 
            meetingDate
        })
        setIsEditing(false);
    }
    return (
        <div className='list-item'>
            {
                isEditing ? (
                    <>
                        Edit meeting
                        <div>
                            <input type='text' placeholder='Description' value={description} onChange={(evt) => setDescription(evt.target.value)} />
                            <input type='text' placeholder='Meeting link' value={link} onChange={(evt) => setLink(evt.target.value)} />
                            <div>
                                <label>Meeting Date:</label>

                                <DatePicker selected={meetingDate} onChange={date => setMeetingDate(date)} />
                            </div>
                        </div>
                        <input type='button' className='btn btn-success' value='save' onClick={saveMeeting} />
                        <input type='button' className='btn btn-secondary' value='cancel' onClick={cancel} />
                    </>
                ) :
                    (
                        <>
                            <div>
                                Description: {item.description}
                            </div>
                            <div>
                                
                                Link: <a href={item.link} target="_blank">{item.link}</a>
                            </div>
                            <div>
                                Date: {formatMeetingDate(item.meetingDate)}
                            </div>
                            <div>
                                
                                <input type='button' className='btn btn-primary' value='Edit' onClick={edit} />
                                <input type='button' className='btn btn-info' value='See participants' onClick={seeParticipant} />
                                <input type='button' className='btn btn-danger' value='Delete' onClick={deleteMeeting} />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Meeting
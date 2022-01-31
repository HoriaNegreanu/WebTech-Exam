import { useEffect, useState } from "react";
import store from "./MeetingStore";
import AddMeetingForm from "./AddMeetingForm"
import Meeting from "./Meeting";
import FilterMeetingForm from "./FilterMeetingForm";
import ParticipantDetails from "./ParticipantDetails";
import AddParticipantForm from "./AddParticipantForm";

function MeetingList() {

    const [meetings, setMeetings] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [areFiltered, setFiltered] = useState(false);
    const [areSorted, setSorted] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    useEffect(() => {
        if(selectedMeeting){
            store.getParticipants(selectedMeeting.id);
            store.emitter.addListener('GET_PARTICIPANT_SUCCESS', () => {
                setParticipants(store.participantData);
            })
        }
        if (areFiltered) {
            store.emitter.addListener('GET_MEETINGS_FILTER_SUCCESS', () => {
                setMeetings(store.data);
            })
        }
        else if (areSorted) {
            store.getSortedMeetings();
            store.emitter.addListener('GET_MEETINGS_SORTED_SUCCESS', () => {
                setMeetings(store.data);
            })
        }
        else {
            store.getMeetings();
            store.emitter.addListener('GET_MEETINGS_SUCCESS', () => {
                setMeetings(store.data);
            })
        }

    }, [areFiltered, areSorted, selectedMeeting])

    const addMeeting = (meeting) => {
        store.addMeeting(meeting);
    }

    const addParticipant = (name, meetingId) => {
        store.addParticipant(name, meetingId);
    }

    const saveMeeting = (id, meeting) => {
        store.saveMeeting(id, meeting);
    }

    const deleteMeeting = (id) => {
        store.deleteMeeting(id);
    }

    const filterMeeting = (description, year) => {
        store.filterMeeting(description, year)
        setFiltered(true);
    }

    const onDeleteParticipant = (id, meetingId) => {
        store.deleteParticipant(id, meetingId);
    }

    const saveParticipant = (id, participant) => {
        store.saveParticipant(id, participant,selectedMeeting.id);
    }

    return (
        <div className="flex-container">
            <div>
                <h3>Add a meeting</h3>
                <AddMeetingForm onAdd={addMeeting} />
                <FilterMeetingForm onFilter={filterMeeting} setFiltered={setFiltered} setSorted={setSorted} />
            </div>
            <div>
                <h2>Meeting participants:</h2>
                {selectedMeeting ?
                    participants.map((e) => <ParticipantDetails key={e.id} item={e} onSave={saveParticipant} onDeleteParticipant={onDeleteParticipant}/>) : <div></div>
                }
                {selectedMeeting ? 
                <div><AddParticipantForm onAdd={addParticipant} meetingId={selectedMeeting.id} /></div> : <div></div>
                }
            </div>
            <div>
                <h3>List of meetings</h3>
                {
                    meetings.map((e) => <Meeting key={e.id} item={e} onSave={saveMeeting} onDelete={deleteMeeting} setSelectedMeeting={setSelectedMeeting} />)
                }
            </div>
            
        </div>
    );
}


export default MeetingList;
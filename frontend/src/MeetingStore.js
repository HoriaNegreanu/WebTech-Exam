import { EventEmitter } from 'fbemitter';

const SERVER = 'http://localhost:5000';
//Heroku
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

class MeetingStore {
    constructor () {
        this.data = []
        this.participantData = []
        this.emitter = new EventEmitter()
    }

    async getMeetings() {
        try{
            const response = await fetch(`${SERVER}/meetings`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_MEETINGS_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_MEETINGS_ERROR')
        }
    }

    async getSortedMeetings() {
        try{
            const response = await fetch(`${SERVER}/meetingsSorted`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_MEETINGS_SORTED_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_MEETINGS_SORTED_ERROR')
        }
    }

    async addMeeting(meeting) {
        try{
            const response = await fetch(`${SERVER}/meetings`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(meeting)
            })
            if(!response.ok){
                throw response
            }
            this.getMeetings()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_MEETING_ERROR')
        }
    }
    
    async saveMeeting(id,meeting) {
        try{
            const response = await fetch(`${SERVER}/meetings/${id}`,{
                method:'PUT',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(meeting)
            })
            if(!response.ok){
                throw response
            }
            this.getMeetings()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_MEETING_ERROR')
        }
    }

    async deleteMeeting(id) {
        try{
            const response = await fetch(`${SERVER}/meetings/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getMeetings()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_MEETING_ERROR')
        }
    }

    async filterMeeting(description, year) {
        try{
            const response = await fetch(`${SERVER}/meetingsFilter/${description}/${year}`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_MEETINGS_FILTER_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_MEETINGS_FILTER_ERROR')
        }
    }

    async getParticipants(meetingId) {
        try{
            const response = await fetch(`${SERVER}/meetings/${meetingId}/participants`)
            if(!response.ok){
                throw response
            }
            this.participantData=await response.json()
            this.emitter.emit('GET_PARTICIPANT_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_PARTICIPANT_ERROR')
        }
    }

    async deleteParticipant(id, meetingId) {
        try{
            const response = await fetch(`${SERVER}/meetings/${meetingId}/participants/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getParticipants(meetingId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_PARTICIPANT_ERROR')
        }
    }

    async addParticipant(name, meetingId) {
        try{
            var participant = { name, meetingId }
            const response = await fetch(`${SERVER}/meetings/${meetingId}/participants`,{
                method:'POST',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(participant)
            })
            if(!response.ok){
                throw response
            }
            this.getParticipants(meetingId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_PARTICIPANT_ERROR')
        }
    }

    async saveParticipant(id,participant,meetingId) {
        try{
            const response = await fetch(`${SERVER}/meetings/${meetingId}/participants/${id}`,{
                method:'PUT',headers: {'Content-Type' : 'application/json'}, body: JSON.stringify(participant)
            })
            if(!response.ok){
                throw response
            }
            this.getParticipants(meetingId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_PARTICIPANT_ERROR')
        }
    }
}


const store = new MeetingStore();

export default store;
import axios from 'axios'


const API_URL = 'http://localhost:8080'

class UserDataService {



    getUser(id) {
        console.log('executed service')
        return axios.get(`/api/users/getUser/${id}`);
    }

    getVolunteer(id) {
        console.log('executed Volunteer service')
        return axios.get(`/api/users/getVolunteer/${id}`);
    }

    getSenior(id) {
        console.log('executed Senior service')
        return axios.get(`/api/users/getSenior/${id}`);
    }

    getVolunteerReservation(id) {
        console.log('executed VolunteerReservation service')
        return axios.get(`/api/users/getVolunteerReservation/${id}`);
    }

    getUserDetailsData(id) {
        console.log('Executed GetUserDetailsData Service: ')
        return axios.get(`/api/users/getUserDetails/${id}`);
    }

    getUserSettingsData(id) {
        console.log('Executed Edit User Data Service: ')
        return axios.get(`/api/users/getUserSettings/${id}`);
    }

    getAllVolunteers() {
        console.log('Executed Get all volunteers service: ')
        return axios.get(`/api/users/getVolunteers`);
    }

    getAllSeniors() {
        console.log('Executed Get all seniors service: ')
        return axios.get(`/api/users/getSeniors`);
    }

    getFilterVolunteers() {
        console.log('Executed Get filter volunteers service: ')
        return axios.get(`/api/users/getFilterVolunteers`);
    }


    getActivationInfo(activationCode) {
        console.log('Executed Get activation info service: ')
        return axios.get(`/api/users/activation/${activationCode}`);
    }

    getResetPasswordInfo(resetPasswordCode) {
        console.log('Executed get reset password info service: ')
        return axios.get(`/api/users/resetPassword/${resetPasswordCode}`);
    }

    getSeniorReservationList(id) {
        console.log('executed SeniorReservationList service')
        return axios.get(`/api/users/seniorReservationList/${id}`);
    }

    getVolunteerReservationDate(id) {
        console.log('executed reservationDate service')
        return axios.get(`/api/users/getVolunteerReservationDate/${id}`);
    }



}

export default new UserDataService()
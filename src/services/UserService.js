import axios from  'axios'

const BASE_URL = "http://localhost:8080/api/users"

class UserService{

    addUser(user){
        return axios.post(BASE_URL, user);
    }

    removeUser(id){
        return axios.delete(BASE_URL + "/remove/" + id);
    }

    send(id, point){
        return axios.post(BASE_URL + "/send/point/" + id, point);
    }

    removePoints(){
        return axios.post(BASE_URL + "/remove/points");
    }

}

export default new UserService();
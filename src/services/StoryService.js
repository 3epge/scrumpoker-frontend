import axios from  'axios'

const BASE_URL = "http://localhost:8080/api/stories"

class StoryService{

    getStories(){
        return axios.get(BASE_URL)
    }

    setActive(id){
        return axios.post(BASE_URL + "/activate/" + id, {})
    }

    deActivate(id){
        return axios.post(BASE_URL + "/deactivate/" + id, {})
    }
}

export default new StoryService();
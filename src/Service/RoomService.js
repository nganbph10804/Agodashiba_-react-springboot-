import axios from 'axios'


const ROOM_API_BASE_URL= "http://localhost:8080/api/v1/room";
const ROOMTYPE_API_BASE_URL= "http://localhost:8080/api/v1/roomtype";

class RoomService{

    getRoomByHotel(id){
        return axios.get(ROOM_API_BASE_URL+'/domain/'+id);
    }
    getAllRoomType(){
        return axios.get(ROOMTYPE_API_BASE_URL);
    }
    updateRoom(id,room){
        return axios.put(ROOM_API_BASE_URL+'/'+id,room);
    }
    deleteRoom(id){
        return axios.delete(ROOM_API_BASE_URL+'/'+id);
    }
    createRoom(room){
        return axios.post(ROOM_API_BASE_URL,room);
    }
    createRoomType(roomtype){
        return axios.post(ROOMTYPE_API_BASE_URL,roomtype);
    }
    updateRoomTotal(id){
        return axios.put("http://localhost:8080/api/v1/update-total"+"/"+id);
    }

}
export default new RoomService()
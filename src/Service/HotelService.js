import axios from 'axios'


const HOTEL_API_BASE_URL= "http://localhost:8080/api/v1/hotels";

class HotelService{


    getAllHotels(){
        return axios.get(HOTEL_API_BASE_URL);
    }

    createHotel(user){
        return axios.post(HOTEL_API_BASE_URL,user);
    }
   getHotelByUser(phone){
        return axios.get(HOTEL_API_BASE_URL+'/'+phone);
   }
  
    getHotelById(id){
        return axios.get(HOTEL_API_BASE_URL+"/"+id);
    }
   updateHotel(hotel,id){
       return axios.put(HOTEL_API_BASE_URL+'/'+id,hotel);
   }
   deleteHotel(id){
        return axios.delete(HOTEL_API_BASE_URL+'/'+id);
   }
}

export default new HotelService()
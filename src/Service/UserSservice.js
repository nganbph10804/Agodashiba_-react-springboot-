import axios from 'axios'


const USER_API_BASE_URL= "http://localhost:8080/api/v1/user";

class UserService{


    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL,user);
    }
   getuserById(id){
        return axios.get(USER_API_BASE_URL+'/'+id);
   }
   getAuthenticator(mail,pass){
    return axios.get(USER_API_BASE_URL+'/get/'+mail+'/'+pass);
}
    getUserForRecover(mail){
            return axios.get(USER_API_BASE_URL+'/getmail/'+mail);
    }
    sendMailForRecovery(mail,pass){
            return axios.post(USER_API_BASE_URL+'/recovery/'+mail+'/'+pass);
    }
    updateImage(phone,data){
        return axios.post(USER_API_BASE_URL+'/upload/'+phone,data)
    }
   updateUser(user,id){
       return axios.put(USER_API_BASE_URL+'/'+id,user);
   }
   deleteUser(id){
        return axios.delete(USER_API_BASE_URL+'/'+id);
   }
   
}

export default new UserService()
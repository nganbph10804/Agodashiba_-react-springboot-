import axios from 'axios'


const BILL_API_BASE_URL= "http://localhost:8080/api/v1/bill";

class BillService{


    getAllBill(){
        return axios.get(BILL_API_BASE_URL);
    }

    createBill(bill){
        return axios.post(BILL_API_BASE_URL,bill);
    }
    confimBill(id){
        return axios.put('http://localhost:8080/api/v1/confirm-bill/'+id);
    }
   
}

export default new BillService()
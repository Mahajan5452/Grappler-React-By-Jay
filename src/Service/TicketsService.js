import axios from "axios";

const BASE_API_URL = 'http://localhost:8080/';  
class TicketService {  
   
    getAllticketsbyuserid(id) {
        return axios.get(BASE_API_URL + 'tickets/byAssignee/'+id)
            .catch(error => {
                console.error('Error getting all tickets by user id:', error);
              
            });
    }
   
    saveTicket(ticket) {
        console.log(ticket);
        return axios.post(BASE_API_URL+"tickets" , ticket)
            .catch(error => {
                
                console.error('Error saving ticket:', error);
                
            });
    }
    fetchUserList(){
        return axios.get(BASE_API_URL+"users").catch(error => {
            console.error('Error fetching user list:', error);
        });
    }
    fetchProjectList(){
        return axios.get(BASE_API_URL+"projects").catch(error => {
            console.error('Error fetching project list:', error);
        });
    }
    updateTicket(id,editedTask){
        console.log(id);
        return axios.put(BASE_API_URL+"tickets/"+id,editedTask).catch(error => {
            console.error('Error updating the ticket:', error);
        });
    }
}

export default new TicketService;

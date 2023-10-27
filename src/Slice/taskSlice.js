import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  users: [],
  projects: []
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

    setList:(state,action)=>{
           
      state.tickets = action.payload;
  },
  addTicket: (state,action)=>{
    state.tickets.push(action.payload);
}, 
  setUserList: (state,action)=>{
    state.users=action.payload;
  },
  setprojectList: (state,action)=>{
    state.projects=action.payload;
  },
  updateTicket: (state, action) => {
    const { id, updatedTask } = action.payload;
    console.log(updatedTask);
    console.log(id);
      
      state.tickets= state.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, ...updatedTask } : ticket);
      
    }
  },
  
 
});
export const { setList,addTicket,setUserList,setprojectList,updateTicket} = taskSlice.actions;  
export default taskSlice.reducer;

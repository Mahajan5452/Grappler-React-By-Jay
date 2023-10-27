import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import UsersTask from './components/UsersTask';
import CreateTicket from './components/CreateTicket';

import { useEffect } from 'react';
import TicketsService from './Service/TicketsService';
import { setUserList, setprojectList } from './Slice/taskSlice';
import { useDispatch } from 'react-redux';
import Task from './components/Task';

function App() {
  
  const dispatch=useDispatch();
  useEffect(() => {
    TicketsService.fetchProjectList().then((response)=>{
      dispatch(setprojectList(response.data));
        
     }).catch((error) => {
       console.log(error);
     })
    TicketsService.fetchUserList().then((response)=>{
      dispatch(setUserList(response.data));
    
     }).catch((error) => {
       console.log(error);
     })
  },[]);
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <div id="page-content-wrapper">
          <Navbar />
        </div>
        
        <Routes>
        <Route  path="/create-ticket" element={<Task></Task>} /> 
          <Route  path="/dashboard"  >Home Page</Route>
          <Route path="/projects" >Projects</Route>
          <Route path="/my-tasks" element={<UsersTask />}>My Tasks</Route>
          <Route  path="/insights" >Insights</Route>
          <Route  path="/reports">Reports</Route>
          <Route  path="/more/" >More</Route>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;

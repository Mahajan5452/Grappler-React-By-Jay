import React, { useState } from 'react';
import './createTicket.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addTicket } from '../Slice/taskSlice';
import TicketsService from '../Service/TicketsService';
const CreateTicket = () => {
  const users = useSelector((state) => state.tasks.users);
  const projects = useSelector((state) => state.tasks.projects);

  const [ticketData, setTicketData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    projectIn: '',
    stage: 'To Do',
    priority: 'HIGH',
    blockedBy: null,
    parent: null,
    usersAssignedTo: [], 
  });

  const [selectedAssignees, setSelectedAssignees] = useState([]);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'projectIn') {
      setTicketData({
        ...ticketData,
        projectIn: {id:value}  
      });
    } else if (name === 'assignees') {
      const selectedUserIds = Array.from(e.target.selectedOptions, option => option.value);
      setTicketData({
        ...ticketData,
        usersAssignedTo: selectedUserIds.map(id => ({ id }))
      });
      setSelectedAssignees(selectedUserIds);
    } else {
      setTicketData({
        ...ticketData,
        [name]: value
      });
    }
  };

  const handleAddTicket =  (e) => {
    e.preventDefault();
    TicketsService.saveTicket(ticketData).then((response)=>{
      //dispatch(setList(response.data.data));
     
     }).catch((error) => {
       console.log(error);
     })
    console.log(selectedAssignees); 
    console.log(ticketData);
  };
return (
    <div className="ticket-form">
      <h2>Add Ticket</h2>
      <form onSubmit={handleAddTicket}>
        <div className="form-group">
          <label htmlFor="taskName">Name:</label>
          <input
            type="text"
            name="name"
            defaultValuevalue={ticketData.name}
            onChange={handleInputChange} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            rows="2"
            value={ticketData.description}
            onChange={handleInputChange} 
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={ticketData.endDate}
              onChange={handleInputChange} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              name="endTime"
              value={ticketData.endTime}
              onChange={handleInputChange} 
              required
            />
          </div>
        </div>
        <div className="form-group">
        <label htmlFor="projectIn">Project:</label>
        <select
          name="projectIn"
          defaultValue={ticketData.projectIn}
          onChange={handleInputChange} 
          required
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
       
         <div className="form-group">
  <label htmlFor="assignees">Assignee:</label>
  <select
    name="assignees"
    value={selectedAssignees} 
    onChange={handleInputChange}
    multiple
  >
    {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName}
            </option>
          ))}
  </select>
</div>
        <div className="form-group">
          <label>Selected Assignees:</label>
          <div className="selected-assignees">
            {selectedAssignees.map((assignee, index) => (
              <div key={assignee} className="selected-assignee">
                <span>{assignee}</span>
                <button
                  type="button"
                  // onClick={() => handleAssigneeRemove(assignee)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="stage">Status:</label>
          <select
            name="stage"
            value={ticketData.stage}
             onChange={handleInputChange}
            required
          >
            <option value="ToDo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Complete">Complete</option>
            <option value="OnHold">On Hold</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            name="priority"
            value={ticketData.priority}
           onChange={handleInputChange}
            required
          >
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        <div className="button-container">
          <button
            type="button"
            align="left"
            id="cancel"
            onClick={() => navigate(`/my-tasks`)}
          >
            Cancel
          </button>
          <button type="submit" align="right" id="create">
            Create
          </button>
        </div>
      </form>
    </div>  

);
};
export default CreateTicket;
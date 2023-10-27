import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Select, Input,Button, DatePicker, TimePicker } from 'antd';
import TicketsService from '../Service/TicketsService';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const Task = () => {
  const users = useSelector((state) => state.tasks.users);
  const projects = useSelector((state) => state.tasks.projects);
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
   const navigate = useNavigate();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }
  const onFinish = (values) => {
    console.log("jiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    console.log('Received values:', values);
    

    // const requestBody = {
    //   name: values.name,
    //   description: values.description,
    //   endDate: values.endDate,
    //   endTime: formattedEndTime, 
    //   projectIn: values.projectIn,
    //   stage: values.stage,
    //   priority: values.priority,
    //   usersAssignedTo: values.usersAssignedTo.,
    // };
    TicketsService.saveTicket(values).then((response)=>{
      //dispatch(setList(response.data.data));
       navigate('/my-tasks')
     }).catch((error) => {
       console.log(error);
     })
  };

  return (
   
    <Form onFinish={onFinish} layout="vertical" style={{ width: '400px', margin: '0 auto',  background: '#f0f0f0', padding: '20px', borderRadius: '10px'}}>
    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name' }]}>
      <Input placeholder="Name" />
    </Form.Item>
  
    <Form.Item label="Description" name="description">
      <Input.TextArea rows={4} placeholder="Description" />
    </Form.Item>
    <Form.Item label="End Date" name="endDate" >
        <DatePicker status="warning" onChange={handleDateChange} />
      </Form.Item>

      <Form.Item label="End Time" name="endTime"  shouldUpdate>
        <TimePicker format="HH:mm" disabled={!selectedDate} />
      </Form.Item>
    <Form.Item label="Select Users" name="usersAssignedTo">
      <Select mode="multiple" placeholder="Assignee" maxTagCount={3} allowClear style={{ width: '100%' }}>
        {users.map(user => (
          <Option key={user.id} value={user.id}>
            {user.firstName}
          </Option>
        ))}
      </Select>
    </Form.Item>
  
    <Form.Item label="Select Projects" name="projectIn" rules={[{ required: true, message: 'Please select a project' }]}>
      <Select placeholder="Project" style={{ width: '100%' }}>
        {projects.map(project => (
          <Option key={project.id} value={project.id}>
            {project.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  
    <Form.Item label="Priority" name="priority">
      <Select placeholder="Priority" style={{ width: '100%' }}>
        <Option value="HIGH">&#128293; High</Option>
        <Option value="MEDIUM">&#128308; Medium</Option>
        <Option value="LOW">&#128309; Low</Option>
      </Select>
    </Form.Item>
  
    <Form.Item label="Stage" name="stage">
      <Select placeholder="Stage" style={{ width: '100%' }}>
        <Option value="to do">To Do</Option>
        <Option value="In Progress">In Progress</Option>
        <Option value="Done">Done</Option>
      </Select>
    </Form.Item>
  
    <Form.Item>
    <Button type="primary" htmlType='submit' block>
      Create
    </Button>
    </Form.Item>
  </Form>
  
  );
}

export default Task;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, Input,Button, DatePicker, TimePicker } from 'antd';
import TicketsService from '../Service/TicketsService';
import moment from 'moment';
import { updateTicket } from '../Slice/taskSlice';
const { Option } = Select;


const TaskView = ({ ticket, closeDrawer }) => {
    
    const id= ticket.id;
   
    const dispatch = useDispatch();
    const users = useSelector((state) => state.tasks.users);
  const projects = useSelector((state) => state.tasks.projects);
    const [form] = Form.useForm();
    const assignedUserIds = ticket.usersAssignedTo.map(user => user.id);
    form.setFieldsValue({
    id: ticket.id,
      name: ticket.name,
      description: ticket.description,
      startDate: moment(ticket.startDate),
      endDate: moment(ticket.endDate),
      endTime: moment(ticket.endTime),
      stage: ticket.stage,
      priority: ticket.priority,
      projectIn: ticket.projectIn.id,
      createdBy: ticket.createdBy,
      usersAssignedTo: assignedUserIds,
    });
  
    const onFinish = (values) => {
     // console.log('onFinish', values);
      TicketsService.updateTicket( id,values)
        .then(() => {
          dispatch(updateTicket({ id: id, updatedTask: values }));
          closeDrawer();
        })
        .catch ((error) => {
          console.error("Error updating Task:", error.message);
        });
    };
  
    return (
      <Form className="task-info" form={form} onFinish={onFinish}>
        <Form.Item name="id" hidden>
        <Input type="hidden" />
      </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="stage">
          <Select>
            <Option value="To Do">To Do</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Done">Done</Option>
            <Option value="On Hold">On Hold</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Start Date" name="startDate" style={{display: 'none'}}>
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
        <Form.Item label="End Date" name="endDate">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="End Time" name="endTime">
        <TimePicker format="HH:mm" />
      </Form.Item>
        <Form.Item label="Project" name="projectIn">
          <Select>
            {projects.map(project => (
              <Option key={project.id} value={project.id}>
                {project.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Created By" name="createdBy">
          <Input />
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
        <Form.Item label="Priority" name="priority">
          <Select>
          <Option value="HIGH">&#128293; High</Option>
        <Option value="MEDIUM">&#128308; Medium</Option>
        <Option value="LOW">&#128309; Low</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    );
  };
  
  export default TaskView;
  
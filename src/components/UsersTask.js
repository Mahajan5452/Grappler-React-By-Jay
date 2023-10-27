import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './tasknavbar.css';
import TicketsService from '../Service/TicketsService';
import { setList } from '../Slice/taskSlice';
import moment from 'moment';
import { Table, Button, Drawer } from 'antd';
import TaskView from './TaskView';

const UsersTask = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tasks.tickets);
  const [filter, setFilter] = useState('All');
  const [show, setShow] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClose = () => setShow(false);
  const handleTableRowClick = (task) => {
    console.log("clickeddddd "+task.id);
    setSelectedTask(task);
    setShow(true);
  };

  const columns = [
    { title: 'Task Name', dataIndex: 'name', key: 'name' },
    { title: 'Ticket ID', dataIndex: 'id', key: 'id' },
    { title: 'Tags', dataIndex: 'tags', key: 'tags' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority' },
    { title: 'Project Name', dataIndex: ['projectIn','name'], key: 'projectName' },
    { title: 'Created By', dataIndex: 'createdBy', key: 'createdBy' },
    { title: 'Status', dataIndex: 'stage', key: 'status' },
    {
      title: 'Created At',
      dataIndex: 'startDate',
      key: 'createdAt',
      render: (startDate) => (startDate ? moment(startDate).format('MMM D, YYYY') : 'N/A'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (endDate) => (endDate ? moment(endDate).format('MMM D, YYYY') : 'N/A'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (endTime) => (endTime ? moment(endTime).format('HH:mm A') : 'N/A'),
    },
  ];

  const filteredTasks = tickets?.filter((task) => {
    if (filter === 'All') {
      return true;
    } else {
      return task.stage === filter;
    }
  });

  useEffect(() => {
    TicketsService.getAllticketsbyuserid("652cd8e2984a6c3a9700e5c9")
      .then((response) => {
        dispatch(setList(response.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    <div className='container'>
      <h1>User Task List</h1>
      <div className='task-navbar'>
        <div className="task-navbar-left">
          <Button onClick={() => setFilter('All')}>All</Button>
          <Button onClick={() => setFilter('to do')}>To Do</Button>
          <Button onClick={() => setFilter('In Progress')}>Progress</Button>
          <Button onClick={() => setFilter('On Hold')}>On Hold</Button>
          <Button onClick={() => setFilter('Done')}>Done</Button>
        </div>
        </div>
        <div style={{ marginLeft: '21%' }}>
        <Table 
          dataSource={filteredTasks}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.id}
          onRow={(record) => ({
            onClick: () => handleTableRowClick(record),
          })}
          />
          </div>
        </div>
      
      
      {selectedTask && (
        <Drawer title="Task Details" width={600} placement="right" onClose={handleClose} visible={show}>
         
          <TaskView ticket={selectedTask} closeDrawer={handleClose} />
        </Drawer>
      )}

    </>
  );
};

export default UsersTask;

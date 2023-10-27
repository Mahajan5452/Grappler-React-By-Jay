// Sidebar Component
import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <h2>Innogent Training</h2>
      </div>
      <div>
        <Link to="/dashboard"  className="button">Dashboard</Link>
        {/* <Link to="/projects" className="button">Projects</Link> */}
        
        <Link to="/my-tasks" className="button">My Tasks</Link>
        <Link to="/insights" className="button">Insights</Link>
        <Link to="/reports" className="button">Reports</Link>
        <Link to="/more" className="button">More</Link>
      </div>
    </div>
  );
}

export default Sidebar;

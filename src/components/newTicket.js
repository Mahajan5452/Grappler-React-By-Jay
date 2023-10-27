import React from 'react'

const newTicket = () => {
  return (
    <div>
          <div>
      <h2>Select Users</h2>
      <Select mode="multiple" style={{ width: '100%' }}>
        {users.map(user => (
          <Option key={user.id} value={user.id}>
            {user.name}
          </Option>
        ))}
      </Select>

      <h2>Select Projects</h2>
      <Select mode="multiple" style={{ width: '100%' }}>
        {projects.map(project => (
          <Option key={project.id} value={project.id}>
            {project.name}
          </Option>
        ))}
      </Select>
    </div>

    </div>
  )
}

export default newTicket

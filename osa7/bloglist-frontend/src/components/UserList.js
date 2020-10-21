import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(response => {
      setUsers(response)
    })
  },[])

  const UserData = () => {
    return users.map(u => {
      const count = u.blogs? u.blogs.length : 0
      const url = `users/${u.id}`
      return (
        <tr key={u.id}>
          <td><Link to={url}>{u.name}</Link></td>
          <td>{count}</td>
        </tr>
      )
    })
  }

  const UserTable = () => (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        <UserData />
      </tbody>
    </table>
  )

  return (
    <div>
      <h2>Users on server:</h2>
      <div id='userList'>
        {users
          ?
          <UserTable />
          :
          <p>No users on server</p>
        }
      </div>
    </div>
  )
}


export default UserList
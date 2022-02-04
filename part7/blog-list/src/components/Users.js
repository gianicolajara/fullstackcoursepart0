import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  clearNotification,
  setNotification,
} from '../reducers/notification.reducers'
import { getAllUsers } from '../services/users'
import Title from './Title'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const initialUsers = null

const TableStyles = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const ThStyles = styled.th`
  text-align: left;
  padding: 8px;
`

const TdStyles = styled.td`
  text-align: center;
  padding: 8px;
`

const TrStyles = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`

const Users = () => {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState(initialUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    const getAllUsersHandle = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch (error) {
        dispatch(clearNotification())
        dispatch(setNotification(error))
      }
    }

    getAllUsersHandle()
    return () => setUsers(initialUsers)
  }, [])

  if (!users) return <p>Cargando...</p>

  return (
    <>
      <Title text="Users" />
      <TableStyles>
        <thead>
          <TrStyles>
            <th></th>
            <th>blogs created</th>
          </TrStyles>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <TrStyles key={user.id}>
                <TdStyles>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TdStyles>
                <TdStyles> {user.blogs.length} </TdStyles>
              </TrStyles>
            ))
          ) : (
            <tr>
              <TdStyles rowSpan={2}>not users found</TdStyles>
            </tr>
          )}
        </tbody>
      </TableStyles>
    </>
  )
}

export default Users

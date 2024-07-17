import React, { useEffect, useState } from 'react'
import { users } from '../services/user'
import { Table, TextInput } from "flowbite-react"
import { Link } from 'react-router-dom'
import { HiOutlineSearch } from "react-icons/hi";
import { Formatdate } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { getallusers } from '../context/userSlice'
const User = () => {

  useEffect(() => {
    getUserData()
  }, [])

  const dispatch = useDispatch()

  const userData = useSelector(state => state.users.users)

  const getUserData = async () => {
    const data = await users.getalluser()
    dispatch(getallusers(data.user))
  }

  // search 
  const [search, setSearch] = useState('')

  const filterUserData = userData.filter((user) => {
    const query = search.toLowerCase()
    return(
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.emailID.toLowerCase().includes(query)
    )
  })

  return (
    <>
      <div className=''>
        <TextInput
          className='mb-2'
          id="password"
          type="search"
          icon={HiOutlineSearch}
          placeholder="search by username, email id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>first name</Table.HeadCell>
            <Table.HeadCell>last name</Table.HeadCell>
            <Table.HeadCell>email</Table.HeadCell>
            <Table.HeadCell>registered at</Table.HeadCell>
            <Table.HeadCell>login history</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              filterUserData.map((user) => (
                <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>{user.firstName} </Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>{user.lastName}</Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>{user.emailID} </Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>{Formatdate(user.registeredAT)}</Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>
                    <Link to={`${user._id}`}>view</Link>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
    </>
  )
}

export default User

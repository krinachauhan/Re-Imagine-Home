import React, { useEffect } from 'react'
import { history } from '../services/history'
import { Table } from "flowbite-react"
import { useDispatch, useSelector } from 'react-redux'
import { addhistory } from '../context/historySlice'
import { Card } from "flowbite-react"
import { Link } from 'react-router-dom'

// this function count total user and total history
const calculateStats = (data) => {
  const uniqueUsers = new Set(data.map(item => item.user_id));
  const totalUsers = uniqueUsers.size;
  const totalImages = data.length;

  return {
    totalUsers,
    totalImages
  };
};

// this function count every user's history 
const countUserHistory = (data) => {
  const historyCount = {}
  data.forEach(item => {
    if (historyCount[item.user_id]) {
      historyCount[item.user_id]++
    }
    else {
      historyCount[item.user_id] = 1
    }
  });

  return historyCount
}

const History = () => {

  useEffect(() => {
    historyData()
  }, [])

  const dispatch = useDispatch()

  const allUserHistory = useSelector((state) => state.history.history)
  const userData = useSelector((state) => state.users.userEmail)

  const historyData = async () => {
    const data = await history.allhistory()
    dispatch(addhistory(data))
  }

  // total user and total history 
  const { totalUsers, totalImages } = calculateStats(allUserHistory);

  // user's history count
  const historyUserCount = countUserHistory(allUserHistory)

  return (
    <>
      <div className='flex'>
        <Card className="mx-1 mb-2 w-2/4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Users
          </h5>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {totalUsers}
          </p>
        </Card>
        <Card className="mx-1 mb-2 w-2/4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Generated image
          </h5>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {totalImages}
          </p>
        </Card>
      </div>


      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>user id</Table.HeadCell>
            <Table.HeadCell>history</Table.HeadCell>
            <Table.HeadCell>generated image</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {
              Object.entries(historyUserCount).map(([user_id, count]) => (
                <Table.Row key={user_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>{userData[user_id]} </Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>{count}</Table.Cell>
                  <Table.Cell  className='text-lg font-normal text-gray-900 dark:text-white'>
                  <Link to={`${user_id}`}>view</Link>
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

export default History

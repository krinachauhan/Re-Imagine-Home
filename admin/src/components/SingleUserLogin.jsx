import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { users } from '../services/user'
import { Alert, Table } from "flowbite-react"
import { Formatdate } from "../components"
const SingleUserLogin = () => {

  const { id } = useParams('id')

  const [loginHistory, setLoginHistory] = useState([])

  useEffect(() => {
    singleUserLoginHistory()
  }, [])

  const singleUserLoginHistory = async () => {
    const data = await users.userLoginHistory({ id })
    setLoginHistory(data.userLoginHistory)
  }

  return (
    <>
      {
        loginHistory.length === 0 ?
          <Alert color="success">
            <span className="font-medium">Info alert!</span> User has not logged in for the first time.
          </Alert> :
          <div className="overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>login history</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {
                  loginHistory.map((time) => (
                    <Table.Row key={time} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="text-lg font-normal text-gray-900 dark:text-white">
                        {Formatdate(time)}
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </div>
      }

    </>
  )
}

export default SingleUserLogin

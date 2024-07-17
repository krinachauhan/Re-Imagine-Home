import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formatdate from './Formatdate'
import { Table } from 'flowbite-react'
import { history } from '../services/history'

const SingleUserHistory = () => {

    const { user_id } = useParams('user_id')

    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        singleUserHistoryData()
    }, [])

    const singleUserHistoryData = async () => {
        const data = await history.userhistory({ id: user_id })
        setHistoryData(data.history)
    }

    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>input image</Table.HeadCell>
                    <Table.HeadCell>Generated image</Table.HeadCell>
                    <Table.HeadCell>Generated image</Table.HeadCell>
                    <Table.HeadCell>Generated image</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        historyData.map((item) => (
                            <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>
                                    <img src={item.input} alt='room' />
                                </Table.Cell>
                                <Table.Cell>
                                    <img src={`data:image/jpeg;base64,${item.output_img1}`} alt='room' />
                                </Table.Cell>
                                <Table.Cell>
                                    <img src={`data:image/jpeg;base64,${item.output_img2}`} alt='room' />
                                </Table.Cell>
                                <Table.Cell>
                                    <img src={`data:image/jpeg;base64,${item.output_img3}`} alt='room' />
                                </Table.Cell>
                                <Table.Cell className="text-xl font-normal text-gray-900 dark:text-white">
                                    {Formatdate(item.createdAt)}
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

export default SingleUserHistory

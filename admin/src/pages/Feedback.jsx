import React, { useEffect, useState } from 'react';
import { useractivity } from '../services/activity';
import { Card, Table } from "flowbite-react";
import { Formatdate } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { addfeedback } from '../context/feedbackSlice';

const Feedback = () => {
  const dispatch = useDispatch();
  const feedbackData = useSelector((state) => state.feedback.feedback);
  const userData = useSelector((state) => state.users.userEmail)

  const [average, setAverage] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    feedback();
  }, []); // Empty dependency array means this useEffect runs once after initial render

  useEffect(() => {
    if (feedbackData.length > 0) {
      const total = feedbackData.reduce((acc, item) => acc + item.rating, 0);
      setAverage(total / feedbackData.length);
      setLength(feedbackData.length);
    } else {
      setAverage(0);
      setLength(0);
    }
  }, [feedbackData]);

  const feedback = async () => {
    const data = await useractivity.feedback();
    dispatch(addfeedback(data));
  };

  return (
    <>
      <div className='flex'>
        <Card className="mx-1 mb-2 w-2/4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Users
          </h5>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {length}
          </p>
        </Card>
        <Card className="mx-1 mb-2 w-2/4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Average rating
          </h5>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {average}
          </p>
        </Card>
      </div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Email id</Table.HeadCell>
            <Table.HeadCell>Rating</Table.HeadCell>
            <Table.HeadCell>Feedback</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {feedbackData.map((feedback) => {
              return (
                <Table.Row key={feedback._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    <img src={feedback.img} height='180px' width='250px' alt='room' />
                  </Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>
                    {userData[feedback.user_id]}
                  </Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>
                    {feedback.rating}
                  </Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>
                    {feedback.feedback}
                  </Table.Cell>
                  <Table.Cell className='text-lg font-normal text-gray-900 dark:text-white'>
                    {Formatdate(feedback.createdAt)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default Feedback;

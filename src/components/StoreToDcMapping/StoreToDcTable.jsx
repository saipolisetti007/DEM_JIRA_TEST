import React, { useState, useEffect } from 'react';
import { getHealth, getMessage } from '../../api/api';

const StoreToDcTable = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const statusData = await getHealth();
      setData(statusData);

      const MessageData = await getMessage();
      setMessage(MessageData);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <p>Health Check Status : {data.status}</p>
      <p>Message Status : {message.message}</p>
    </div>
  );
};

export default StoreToDcTable;

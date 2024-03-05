import React, { useState, useEffect } from 'react';
import { getHealth } from '../../api/api';

const StoreToDcTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const statusData = await getHealth();
      setData(statusData);
    };
    fetchData();
  });

  return (
    <div className="container mx-auto">
      {data.map((sdata, index) => (
        <p key={index}>{sdata.name}</p>
      ))}
    </div>
  );
};

export default StoreToDcTable;

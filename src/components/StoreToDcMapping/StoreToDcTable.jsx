import React, { useState, useEffect } from "react";
import { getHealth } from "../../api/api";
import { useErrorBoundary } from "react-error-boundary";

const StoreToDcTable = () => {
  const { showBoundary } = useErrorBoundary();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusData = await getHealth();
        console.log(statusData);
        setData(statusData);
      } catch (error) {
        showBoundary(error);
      }
    };
    fetchData();
  });

  return (
    <div className="container mx-auto">
      {data.map((sdata, index) => (
        <p key={index}>{sdata.status}</p>
      ))}
    </div>
  );
};

export default StoreToDcTable;

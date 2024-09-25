import React, { useEffect, useState } from 'react';
import LogoImage from '../../assets/dashboard/bg_graph.svg';
import CPF_GRAPH from '../../assets/dashboard/CPF_Graph.svg';
import { Button, Typography } from '@mui/material';
import { cpfPendingCount } from '../../api/cpfForecastApi';
import PromoCard from './PromoCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// CPFForecast Card component
const CPFForecast = () => {
  const [missingCount, setMissingCount] = useState(null);
  const [warningCount, setWarningCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const { customerId } = useSelector((state) => state.userProfileData);

  // Function to fetch CPF status count from the API
  const fetchCpfPendingCount = async () => {
    try {
      setLoading(true);
      const response = await cpfPendingCount();
      setMissingCount(response.missing_count);
      setWarningCount(response.warning_count);
    } catch (error) {
      console.error('Error fetching CPF status count:', error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect hook to fetch CPF status count when customerId changes
  useEffect(() => {
    fetchCpfPendingCount();
  }, [customerId]);

  return (
    <PromoCard backgroundImage={LogoImage} backgroundColor="#003DA5">
      <div className="text-left mx-8">
        <img src={CPF_GRAPH} alt="DEM Logo" width={62} height={62} />
      </div>
      <div className="text-left mx-8">
        <Typography variant="h2">CPF Review</Typography>
        <Typography variant="subtitle1">Check the forecast for your shipment</Typography>
      </div>
      <div className="text-left mx-4">
        <Button
          component={Link}
          to="/cpf-forecast?status=Forecast Missing"
          variant="contained"
          color="error"
          className="my-2"
          size="small"
          sx={{
            paddingX: 2.5
          }}>
          Missing : {loading ? '...' : missingCount}
        </Button>
        <Button
          component={Link}
          to="/cpf-forecast?status=Forecast Warning"
          variant="contained"
          color="warning"
          className="m-1"
          size="small"
          sx={{
            paddingX: 2.5
          }}>
          Alerts : {loading ? '...' : warningCount}
        </Button>
      </div>
    </PromoCard>
  );
};

export default CPFForecast;

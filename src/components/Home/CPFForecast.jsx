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
  const [count, setCount] = useState(null);
  const [missingCount, setMissingCount] = useState(null);
  const [warningCount, setWarningCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const { customerId } = useSelector((state) => state.userProfileData);

  // Function to fetch CPF pending count from the API
  const fetchCpfPendingCount = async () => {
    try {
      setLoading(true);
      const response = await cpfPendingCount();
      setCount(response.pending_approvals_count);
      setMissingCount(response.missing_count);
      setWarningCount(response.warning_count);
    } catch (error) {
      console.error('Error fetching CPF pending count:', error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect hook to fetch CPF pending count when customerId changes
  useEffect(() => {
    fetchCpfPendingCount();
  }, [customerId]);

  return (
    <PromoCard backgroundImage={LogoImage} backgroundColor="#003DA5">
      <div className="text-left mx-4">
        <img src={CPF_GRAPH} alt="DEM Logo" width={62} height={62} />
      </div>
      <div className="text-left mx-4">
        <Typography variant="h2">CPF forecast</Typography>
        <Typography variant="subtitle1">Stay up to date with the shipping forecast</Typography>
      </div>
      <div className="text-center">
        <Button
          component={Link}
          to="/cpf-forecast?status=Pending Approval"
          variant="contained"
          color="info"
          size="small"
          className="my-2"
          sx={{
            paddingX: 1.5
          }}>
          Pending Approval : {loading ? '...' : count}
        </Button>
        <Button
          component={Link}
          to="/cpf-forecast?status=Forecast Warning"
          variant="contained"
          color="warning"
          size="small"
          className="m-1"
          sx={{
            paddingX: 1.5
          }}>
          Forecast Warning : {loading ? '...' : warningCount}
        </Button>
        <Button
          component={Link}
          to="/cpf-forecast?status=Forecast Missing"
          variant="contained"
          color="error"
          size="small"
          className="my-2"
          sx={{
            paddingX: 1.5
          }}>
          Forecast Missing : {loading ? '...' : missingCount}
        </Button>
      </div>
    </PromoCard>
  );
};

export default CPFForecast;

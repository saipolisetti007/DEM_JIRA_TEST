import React, { useEffect, useState } from 'react';
import LogoImage from '../../assets/dashboard/bg_graph.svg';
import CPF_GRAPH from '../../assets/dashboard/CPF_Graph.svg';
import { Typography } from '@mui/material';
import NavigationButton from './NavigationButton';
import { cpfPendingCount } from '../../api/cpfForecastApi';
import PromoCard from './PromoCard';

const CPFForecast = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCpfPendingCount = async () => {
    try {
      const response = await cpfPendingCount();
      setCount(response.pending_approvals_count);
    } catch (error) {
      console.error('Error fetching CPF pending count:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCpfPendingCount();
  }, []);

  return (
    <PromoCard backgroundImage={LogoImage} backgroundColor="#003DA5">
      <div className="text-left mx-8">
        <img src={CPF_GRAPH} alt="DEM Logo" width={62} height={62} />
      </div>
      <div className="text-left mx-8">
        <Typography variant="h5">CPF forecast</Typography>
        <Typography variant="subtitle1">Stay up to date with the shipping forecast</Typography>
      </div>
      <div className="text-right mx-8">
        <NavigationButton
          navUrl="/cpf-forecast"
          color={'#DD7C3B'}
          textColor={'white'}
          loading={loading}>
          {loading ? 'Loading...' : `Pending approval: ${count}`}
        </NavigationButton>
        <NavigationButton navUrl="/cpf-forecast" color={'white'} textColor={'primary'}>
          See more
        </NavigationButton>
      </div>
    </PromoCard>
  );
};

export default CPFForecast;

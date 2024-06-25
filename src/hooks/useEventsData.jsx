import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent } from '../components/PromoGrid/eventsSlice';
import { useEffect } from 'react';

export const useEventsData = () => {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.userProfileData);
  const customerId = userData?.customers[0];

  const { eventsData, eventTypeOptions, eventSubTypeOptions, selectedEvent, isLoading } =
    useSelector((state) => state.eventsData);

  useEffect(() => {
    if (selectedEvent && eventsData[selectedEvent]) {
      dispatch(setSelectedEvent(selectedEvent));
    }
  }, [selectedEvent, eventsData, dispatch]);

  const handleEventChange = (selectedEvent) => {
    if (isLoading) return;
    dispatch(setSelectedEvent(selectedEvent));
  };

  return {
    eventTypeOptions,
    eventSubTypeOptions,
    selectedEvent,
    customerId,
    handleEventChange
  };
};

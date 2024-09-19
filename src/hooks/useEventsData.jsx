import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEvent } from '../components/PromoGrid/eventsSlice';
import { useEffect } from 'react';

// Custom hook to manage events data
export const useEventsData = () => {
  const dispatch = useDispatch();

  // Get user data from the Redux store
  const { userData } = useSelector((state) => state.userProfileData);
  const customerId = userData?.customers[0]; // Extract the first customer ID from the user data

  // Get events data and related options from the Redux store
  const { eventsData, eventTypeOptions, eventSubTypeOptions, selectedEvent, isLoading } =
    useSelector((state) => state.eventsData);
  // Effect to dispatch the selected event when it changes
  useEffect(() => {
    if (selectedEvent && eventsData[selectedEvent]) {
      dispatch(setSelectedEvent(selectedEvent));
    }
  }, [selectedEvent, eventsData, dispatch]);

  // Handler for changing the selected event
  const handleEventChange = (selectedEvent) => {
    if (isLoading) return;
    dispatch(setSelectedEvent(selectedEvent));
  };

  // Return the necessary data and handlers for use in components
  return {
    eventTypeOptions,
    eventSubTypeOptions,
    selectedEvent,
    customerId,
    handleEventChange
  };
};

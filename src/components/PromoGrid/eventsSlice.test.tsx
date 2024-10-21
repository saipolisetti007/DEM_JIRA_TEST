import { configureStore } from '@reduxjs/toolkit';
import eventsReducer, { fetchEvents } from './eventsSlice';
import { getEvents } from '../../api/promoGridApi';

jest.mock('../../api/promoGridApi');

describe('Events Slice', () => {
  const initialState = {
    eventsData: {},
    eventTypeOptions: [],
    isLoading: false,
    error: null
  };
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        eventsData: eventsReducer
      },
      preloadedState: {
        eventsData: initialState
      }
    });
  });

  test('should return initial state', () => {
    expect(store.getState().eventsData).toEqual(initialState);
  });
  it('should handle fetchEvents pending', async () => {
    (getEvents as jest.Mock).mockReturnValue(Promise.resolve({ events: [] }));
    store.dispatch(fetchEvents('custID'));
    expect(store.getState().eventsData.isLoading).toBe(true);
    expect(store.getState().eventsData.error).toBe(null);
  });

  it('should handle fetchEvents rejected', async () => {
    const error = new Error('Rejected');
    (getEvents as jest.Mock).mockReturnValue(Promise.reject(error));
    await store.dispatch(fetchEvents('custID'));
    expect(store.getState().eventsData.isLoading).toBe(false);
    expect(store.getState().eventsData.error).toBe(error.message);
  });
});

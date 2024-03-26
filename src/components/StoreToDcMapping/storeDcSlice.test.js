import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  addStoreData,
  deleteStoreData,
  editStoreData,
  setStoreData
} from './storeDcSlice';

describe('storeDataSlice reducers', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        storeData: reducer
      }
    });
  });
  test('should set store data', () => {
    const testData = [
      { id: 1, name: 'store 1' },
      { id: 2, name: 'store 2' }
    ];
    store.dispatch(setStoreData(testData));
    const state = store.getState().storeData;
    expect(state.storeData).toEqual(testData);
  });
  test('should add store data', () => {
    const testData = [{ id: 3, name: 'store 3' }];
    store.dispatch(addStoreData(testData));
    const state = store.getState().storeData;
    expect(state.storeData).toContainEqual(testData);
  });
  test('should edit store data', () => {
    const initialState = [
      { id: 1, name: 'store 1' },
      { id: 2, name: 'store 2' }
    ];
    store.dispatch(setStoreData(initialState));
    const newData = { id: 1, name: 'Edited store 1' };
    store.dispatch(editStoreData({ id: 1, newData }));

    const state = store.getState().storeData;
    expect(state.storeData).toContainEqual(newData);
    expect(state.storeData).not.toContainEqual({ id: 1, name: 'store 1' });
  });
  test('should handle edit store data with existing ID', () => {
    const initialState = [
      { id: 1, name: 'store 1' },
      { id: 2, name: 'store 2' }
    ];
    store.dispatch(setStoreData(initialState));
    const newData = { id: 2, name: 'Edited store 2' };
    store.dispatch(editStoreData({ id: 2, newData }));

    const state = store.getState().storeData;
    expect(state.storeData).toContainEqual(newData);
    expect(state.storeData).not.toContainEqual({ id: 2, name: 'store 2' });
  });

  test('should delete store data', () => {
    const initialState = [
      { id: 1, name: 'store 1' },
      { id: 2, name: 'store 2' }
    ];
    store.dispatch(setStoreData(initialState));

    const idToDelete = 2;
    store.dispatch(deleteStoreData(idToDelete));
    const state = store.getState().storeData;
    expect(state.storeData).not.toContainEqual({ id: idToDelete, name: 'store 2' });
    expect(state.storeData).toContainEqual({ id: 1, name: 'store 1' });
  });

  test('should handle deleting non existing store data', () => {
    const initialState = [
      { id: 1, name: 'store 1' },
      { id: 2, name: 'store 2' }
    ];
    store.dispatch(setStoreData(initialState));
    const idToDelete = 3;
    store.dispatch(deleteStoreData(idToDelete));
    const state = store.getState().storeData;
    expect(state.storeData.length).toBe(initialState.length);
  });
});

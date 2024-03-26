import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  addPromoData,
  deletePromoData,
  editPromoData,
  setPromoData
} from './promoGridSlice';

describe('promoDataSlice reducers', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        promoData: reducer
      }
    });
  });
  test('should set promo data', () => {
    const testData = [
      { id: 1, name: 'promo 1' },
      { id: 2, name: 'promo 2' }
    ];
    store.dispatch(setPromoData(testData));
    const state = store.getState().promoData;
    expect(state.promoData).toEqual(testData);
  });
  test('should add promo data', () => {
    const testData = [{ id: 3, name: 'promo 3' }];
    store.dispatch(addPromoData(testData));
    const state = store.getState().promoData;
    expect(state.promoData).toContainEqual(testData);
  });
  test('should edit promo data', () => {
    const initialState = [
      { id: 1, name: 'promo 1' },
      { id: 2, name: 'promo 2' }
    ];
    store.dispatch(setPromoData(initialState));
    const newData = { id: 1, name: 'Edited promo 1' };
    store.dispatch(editPromoData({ id: 1, newData }));

    const state = store.getState().promoData;
    expect(state.promoData).toContainEqual(newData);
    expect(state.promoData).not.toContainEqual({ id: 1, name: 'promo 1' });
  });
  test('should handle edit promo data with existing ID', () => {
    const initialState = [
      { id: 1, name: 'promo 1' },
      { id: 2, name: 'promo 2' }
    ];
    store.dispatch(setPromoData(initialState));
    const newData = { id: 2, name: 'Edited promo 2' };
    store.dispatch(editPromoData({ id: 2, newData }));

    const state = store.getState().promoData;
    expect(state.promoData).toContainEqual(newData);
    expect(state.promoData).not.toContainEqual({ id: 2, name: 'promo 2' });
  });

  test('should delete promo data', () => {
    const initialState = [
      { id: 1, name: 'promo 1' },
      { id: 2, name: 'promo 2' }
    ];
    store.dispatch(setPromoData(initialState));

    const idToDelete = 2;
    store.dispatch(deletePromoData(idToDelete));
    const state = store.getState().promoData;
    expect(state.promoData).not.toContainEqual({ id: idToDelete, name: 'promo 2' });
    expect(state.promoData).toContainEqual({ id: 1, name: 'promo 1' });
  });

  test('should handle deleting non existing promo data', () => {
    const initialState = [
      { id: 1, name: 'promo 1' },
      { id: 2, name: 'promo 2' }
    ];
    store.dispatch(setPromoData(initialState));
    const idToDelete = 3;
    store.dispatch(deletePromoData(idToDelete));
    const state = store.getState().promoData;
    expect(state.promoData.length).toBe(initialState.length);
  });
});

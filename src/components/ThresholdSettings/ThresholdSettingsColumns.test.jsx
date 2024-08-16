import { renderHook } from '@testing-library/react';
import ThresholdSettingsColumns from './ThresholdSettingsColumns';

describe('ThresholdSettingsColumns', () => {
  test('returns correct columns', () => {
    const { result } = renderHook(() => ThresholdSettingsColumns());

    const columns = result.current;

    expect(columns).toHaveLength(9);
  });
});

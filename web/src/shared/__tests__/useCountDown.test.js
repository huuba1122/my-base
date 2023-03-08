import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCountDown from '../common/useCountDown';

describe('Test countdown hooks', () => {
  it('should start countdown when initial', () => {
    const oneDayMiliseconds = 24 * 60 * 60 * 1000;
    const oneHourMiliseconds = 60 * 60 * 1000;
    const { result } = renderHook(() => useCountDown(oneDayMiliseconds + 2 * oneHourMiliseconds));
    expect(result.current.isStarted).toBe(true);
  });

  it('should stop countdown when trigger onStop', () => {
    const oneDayMiliseconds = 24 * 60 * 60 * 1000;
    const oneHourMiliseconds = 60 * 60 * 1000;
    const { result } = renderHook(() => useCountDown(oneDayMiliseconds + 2 * oneHourMiliseconds));
    expect(result.current.isStarted).toBe(true);
    act(() => {
      result.current.onStop();
    });
    expect(result.current.isStarted).toBe(false);
    act(() => {
      result.current.onRestart();
    });
    expect(result.current.isStarted).toBe(true);
  });
});

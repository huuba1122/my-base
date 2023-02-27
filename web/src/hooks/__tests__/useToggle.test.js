import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import useToggle from '../common/useToggle';

describe('test useToggle hooks', () => {
  it('check toggle', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });
});

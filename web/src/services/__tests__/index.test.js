import { describe, it, expect } from 'vitest';
import { removeEmpty } from '../api/axios';

describe('remove empty func test', () => {
  it('test', () => {
    expect(removeEmpty({ page: 1, search: '' })).toStrictEqual({ page: 1 });
  });
});

import { assert, describe, it } from 'vitest';

// Only this suite (and others marked with only) are run
describe('suite', () => {
  it('test', () => {
    assert.equal(Math.sqrt(4), 2);
  });
});

describe('another suite', () => {
  it('skipped test', () => {
    // Test skipped, as tests are running in Only mode
    assert.equal(Math.sqrt(4), 2);
  });

  it.skip('test', () => {
    // Only this test (and others marked with only) are run
    assert.equal(Math.sqrt(4), 3);
  });
});

'use strict';

/**
 * Basic Authorization Middleware Test
 * @module basic auth
 */

const basicAuth = require('../src/auth/middleware/basic');

const req = 'username password';
const res = {status: jest.fn().mockImplementation(() => {
  return {send: jest.fn()}
})};
const next = jest.fn();
const consoleSpy = jest.spyOn(console, 'log');

describe('Testing basic auth middleware', () => {
  it('', () => {
    basicAuth(req, res, next);
    expect(consoleSpy).toBe('');
    expect(next).toHaveBeenCalledWith();
  });
  
  // it('', () => {
  //   basicAuth(req, res, next);
  //   expect(consoleSpy).toHaveBeenCalledWith();
  //   expect(next).not.toHaveBeenCalledWith('Invalid login');
  // });
});

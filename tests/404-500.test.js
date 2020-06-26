'use strict';

/**
 * Error handler tests
 * @module 404-500
 */

const error404 = require('../src/auth/middleware/404');
const error500 = require('../src/auth/middleware/500');

const req = { method: 'test', path: 'test' };
const res = {status: jest.fn().mockImplementation(() => {
  return {send: jest.fn()}
})};
const next = jest.fn();
const consoleSpy = jest.spyOn(console, 'log');

describe('Testing Routing Error Handlers', () => {
  it('Should console log a 404 error', () => {
    error404(req, res, next);
    expect(consoleSpy).toHaveBeenCalledWith('__ERROR!__: Cannot ' + req.method + ' ' + req.path);
    expect(next).not.toHaveBeenCalledWith();
  });
  
  it('Should console log a 500 error', () => {
    error500(req, res, next);
    expect(consoleSpy).toHaveBeenCalledWith('__ERROR!__: 500');
    expect(next).not.toHaveBeenCalledWith();
  });
});

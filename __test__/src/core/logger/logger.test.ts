import { log } from '../../../../src/core/logger/logger';

describe('Logger', () => {
  it('Should log the message with success', () => {
    const logSpy = jest.spyOn(console, 'log');
    log('test');

    expect(logSpy).toHaveBeenCalledWith('test', '');
  });

  it('Should hide sensitive information', () => {
    const logSpy = jest.spyOn(console, 'log');
    log('test', { test: 'test' }, { sensitive: ['test'] });

    expect(logSpy).toHaveBeenCalledWith("test", {"test": "****"});
  });
});

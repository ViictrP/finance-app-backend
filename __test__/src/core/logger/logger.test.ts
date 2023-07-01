import { log } from '../../../../src/core/logger/logger';

describe('Logger', () => {
  it('Should log the message with success', () => {
    const logSpy = jest.spyOn(console, 'log');
    log('test');

    const args = logSpy.mock.calls[0][0];
    expect(args).toContain('test');
  });

  it('Should hide sensitive information', () => {
    const logSpy = jest.spyOn(console, 'log');
    log('test', { test: 'test' }, { sensitive: ['test'] });

    const firstArg = logSpy.mock.calls[0][0];
    const secondArg = logSpy.mock.calls[0][1];
    expect(firstArg).toContain('test');
    expect(secondArg.test).toStrictEqual('****');
  });
});

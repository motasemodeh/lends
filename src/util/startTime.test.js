import { formatStartTimeLabel, getStartTimeOptions, withRequestedStartTime } from './startTime';

describe('startTime', () => {
  it('formats 24h values as 12h labels', () => {
    expect(formatStartTimeLabel('00:00')).toEqual('12:00 AM');
    expect(formatStartTimeLabel('09:30')).toEqual('9:30 AM');
    expect(formatStartTimeLabel('12:00')).toEqual('12:00 PM');
    expect(formatStartTimeLabel('14:30')).toEqual('2:30 PM');
  });

  it('creates half-hour options from first to last hour', () => {
    const options = getStartTimeOptions(6, 22);
    expect(options[0]).toEqual({ value: '06:00', label: '6:00 AM' });
    expect(options[1]).toEqual({ value: '06:30', label: '6:30 AM' });
    expect(options[options.length - 1]).toEqual({ value: '22:00', label: '10:00 PM' });
    expect(options).toHaveLength(33);
  });

  it('puts the start time above the customer message', () => {
    expect(withRequestedStartTime('14:00', 'See you there')).toEqual(
      'Requested start time: 2:00 PM\n\nSee you there'
    );
    expect(withRequestedStartTime('14:00', '')).toEqual('Requested start time: 2:00 PM');
    expect(withRequestedStartTime(undefined, 'Hi')).toEqual('Hi');
    expect(withRequestedStartTime(undefined, undefined)).toEqual('');
  });
});

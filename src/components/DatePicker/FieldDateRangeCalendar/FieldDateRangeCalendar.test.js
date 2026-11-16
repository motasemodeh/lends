import React from 'react';
import '@testing-library/jest-dom';
import { Form as FinalForm } from 'react-final-form';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders as render, testingLibrary } from '../../../util/testHelpers';

import FieldDateRangeCalendar from './FieldDateRangeCalendar';

const { act } = testingLibrary;

const pad = n => String(n).padStart(2, '0');
const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

// Pick dates in the middle of next month so they're always visible after one "next" click
const today = new Date();
const base = new Date(today.getFullYear(), today.getMonth() + 1, 10);

const renderCalendar = (minimumNights = 0) => {
  const onChange = jest.fn();
  render(
    <FinalForm
      onSubmit={() => {}}
      render={() => (
        <FieldDateRangeCalendar
          id="bookingDates"
          name="bookingDates"
          label="Select dates"
          minimumNights={minimumNights}
          isOutsideRange={() => false}
          onChange={onChange}
        />
      )}
    />
  );
  return onChange;
};

const clickDay = d => {
  const el = document.querySelector(`[data-date="${isoDate(d)}"]`);
  fireEvent.click(el);
};

const goToNextMonth = () => {
  const next = screen.getAllByRole('button').find(b => /next/i.test(b.getAttribute('aria-label') || ''));
  fireEvent.click(next);
  // let the slide transition settle
  const calendars = document.getElementById('calendars');
  if (calendars) fireEvent.transitionEnd(calendars);
};

describe('FieldDateRangeCalendar', () => {
  it('shows one inline calendar with a label', () => {
    renderCalendar();
    expect(screen.getByText('Select dates')).toBeInTheDocument();
    expect(screen.getAllByRole('application')).toHaveLength(1);
    expect(screen.queryByText('Start date')).not.toBeInTheDocument();
  });

  it('treats a single click as a 1-day booking and a second click as the end date', () => {
    const onChange = renderCalendar(0);
    act(() => goToNextMonth());

    act(() => clickDay(base));
    let last = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(isoDate(last.startDate)).toEqual(isoDate(base));
    expect(isoDate(last.endDate)).toEqual(isoDate(base));
    expect(screen.getByText('1 day')).toBeInTheDocument();

    act(() => clickDay(addDays(base, 2)));
    last = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(isoDate(last.startDate)).toEqual(isoDate(base));
    expect(isoDate(last.endDate)).toEqual(isoDate(addDays(base, 2)));
    expect(screen.getByText('3 days')).toBeInTheDocument();
  });

  it('waits for an end date when the minimum rental is longer than 1 day', () => {
    const onChange = renderCalendar(2);
    act(() => goToNextMonth());

    act(() => clickDay(base));
    const last = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(isoDate(last.startDate)).toEqual(isoDate(base));
    expect(last.endDate).toBeUndefined();
    expect(screen.getByText(/minimum 3 days/)).toBeInTheDocument();
  });
});

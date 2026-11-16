/**
 * An always-visible, single-calendar date range picker for Final Forms.
 *
 * Built for daily bookings: instead of separate "Start date" / "End date" inputs,
 * the customer clicks dates directly on one calendar.
 * - One click selects a single day (a valid 1-day booking when there's no longer minimum).
 * - Clicking a later date extends the booking to that day.
 * - Clicking the same date again also confirms a 1-day booking.
 * - Clicking again after a range is chosen starts a new selection.
 *
 * The field value has the same shape as FieldDateRangePicker ({ startDate, endDate },
 * endDate inclusive in the local time zone), so the form's format/parse functions work as-is.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Field } from 'react-final-form';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import { useConfiguration } from '../../../context/configurationContext';
import { getStartOf, isInRange } from '../../../util/dates';
import { ValidationError } from '../../../components';

import DatePicker from '../DatePickers/DatePicker';
import { getISODateString, getStartOfDay } from '../DatePickers/DatePicker.helpers';

import css from './FieldDateRangeCalendar.module.css';

const DAY_MS = 864e5;
const summaryDateFormat = { weekday: 'short', month: 'short', day: 'numeric' };

const isDate = d => d instanceof Date && !isNaN(d);
const stamp = arr => (Array.isArray(arr) ? arr.map(d => (isDate(d) ? d.getTime() : '')).join(',') : '');
const dayCount = (start, end) => Math.round((getStartOfDay(end) - getStartOfDay(start)) / DAY_MS) + 1;

const FieldDateRangeCalendarComponent = props => {
  const intl = useIntl();
  const {
    className,
    rootClassName,
    id,
    label,
    showLabelAsDisabled,
    input,
    meta,
    onChange: parentOnChange,
    isDayBlocked = () => false,
    isOutsideRange = () => false,
    isBlockedBetween = () => false,
    minimumNights = 0,
    disabled,
    disabledHint,
    onMonthChange,
    showPreviousMonthStepper,
    showNextMonthStepper,
    firstDayOfWeek,
    useMobileMargins,
  } = props;

  const { startDate, endDate } = input.value || {};
  const formRange = [startDate, endDate].filter(isDate);

  // What the calendar shows. After a single click this holds one date (so the next click can
  // extend the range) even though the form already has a complete 1-day booking.
  const [pickerValue, setPickerValue] = useState(formRange);
  const lastEmitted = useRef(stamp(formRange));

  // Sync from the form when the value changes from outside (e.g. cleared on option change).
  useEffect(() => {
    if (stamp(formRange) !== lastEmitted.current) {
      lastEmitted.current = stamp(formRange);
      setPickerValue(formRange);
    }
  }, [stamp(formRange)]);

  const emit = (start, end) => {
    const next = { startDate: start, endDate: end };
    lastEmitted.current = stamp([start, end]);
    if (parentOnChange) {
      parentOnChange(next);
    }
    input.onChange(next);
  };

  const handleChange = value => {
    if (!Array.isArray(value) || value.length === 0) {
      setPickerValue([]);
      emit(undefined, undefined);
      return;
    }
    const dates = value.map(d => getStartOfDay(d));
    setPickerValue(dates);

    if (dates.length === 1) {
      // A single click is a full 1-day booking unless a longer minimum is required.
      emit(dates[0], minimumNights === 0 ? dates[0] : undefined);
    } else {
      emit(dates[0], dates[1]);
    }
  };

  const [selStart, selEnd] = pickerValue;
  const selectedDays =
    isDate(selStart) && isDate(selEnd)
      ? dayCount(selStart, selEnd)
      : isDate(selStart) && minimumNights === 0
      ? 1
      : 0;
  const minDays = minimumNights + 1;

  const summary = isDate(selStart) ? (
    <p className={css.summary} aria-live="polite">
      <span className={css.summaryDates}>
        {intl.formatDate(selStart, summaryDateFormat)}
        {isDate(selEnd) && selEnd.getTime() !== selStart.getTime()
          ? ` – ${intl.formatDate(selEnd, summaryDateFormat)}`
          : ''}
      </span>
      {selectedDays > 0 ? (
        <span className={css.summaryCount}>
          {selectedDays === 1 ? '1 day' : `${selectedDays} days`}
        </span>
      ) : null}
    </p>
  ) : null;

  const hint = disabled
    ? disabledHint
    : !isDate(selStart)
    ? minDays > 1
      ? `Tap your start date, then your end date (minimum ${minDays} days).`
      : 'Tap a date to book one day, or tap a start and end date for longer.'
    : !isDate(selEnd) && minDays > 1
    ? `Now tap your end date (minimum ${minDays} days).`
    : !isDate(selEnd)
    ? 'Booking one day. Tap a later date to book more days.'
    : null;

  const startDateMaybe = isDate(selStart) ? { startDate: getISODateString(selStart) } : {};
  const classes = classNames(rootClassName || css.root, className, {
    [css.mobileMargins]: useMobileMargins,
  });

  return (
    <div className={classes}>
      {label ? (
        <span
          id={`${id}-label`}
          className={classNames(css.label, { [css.labelDisabled]: showLabelAsDisabled })}
        >
          {label}
        </span>
      ) : null}
      <div
        className={classNames(css.calendarFrame, { [css.calendarDisabled]: disabled })}
        aria-labelledby={label ? `${id}-label` : undefined}
      >
        <DatePicker
          range={true}
          theme="light"
          showMonthStepper={true}
          showPreviousMonthStepper={showPreviousMonthStepper}
          showNextMonthStepper={showNextMonthStepper}
          onMonthChange={onMonthChange}
          hasFocusOnMount={false}
          firstDayOfWeek={firstDayOfWeek}
          minimumNights={minimumNights}
          isDayBlocked={day => isOutsideRange(day) || isDayBlocked(day)}
          isBlockedBetween={isBlockedBetween}
          disabled={disabled}
          value={pickerValue}
          onChange={handleChange}
          rangeStartHasValue={isDate(selStart)}
          rangeEndHasValue={isDate(selEnd)}
          {...startDateMaybe}
        />
      </div>
      {summary}
      {hint ? <p className={css.hint}>{hint}</p> : null}
      <ValidationError fieldMeta={meta} />
    </div>
  );
};

/**
 * Single-calendar date range field for daily bookings.
 *
 * @component
 * @param {Object} props
 * @param {string} props.name - Field name
 * @param {string} props.id - Id used for the label
 * @param {string} [props.label] - Label shown above the calendar
 * @param {number} [props.minimumNights] - Minimum days between start and end (min rental days - 1)
 * @param {Function} [props.isDayBlocked]
 * @param {Function} [props.isOutsideRange]
 * @param {Function} [props.isBlockedBetween]
 * @param {boolean} [props.disabled]
 * @param {string} [props.disabledHint] - Shown under the calendar while it's disabled
 * @returns {JSX.Element}
 */
const FieldDateRangeCalendar = props => {
  const config = useConfiguration();
  const { isOutsideRange, firstDayOfWeek, ...rest } = props;

  // Outside range -><- today ... today+available days -1 -><- outside range
  const defaultIsOutsideRange = day => {
    const endOfRange = config.stripe?.dayCountAvailableForBooking;
    const start = getStartOf(new Date(), 'day');
    const end = getStartOf(start, 'day', null, endOfRange, 'days');
    return !isInRange(day, start, end, 'day');
  };

  return (
    <Field
      component={FieldDateRangeCalendarComponent}
      isOutsideRange={isOutsideRange || defaultIsOutsideRange}
      firstDayOfWeek={firstDayOfWeek || config.localization.firstDayOfWeek}
      {...rest}
    />
  );
};

export default FieldDateRangeCalendar;

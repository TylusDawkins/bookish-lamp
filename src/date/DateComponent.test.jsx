// datecomponent.test.js

import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react'; // Import 'render' here

import { DateComponent } from './DateComponent'; // Make sure to adjust the import path

describe('DateComponent', () => {
    
  it('renders the correct amount of days', () => {
    // Tests february to make sure there are less than 30 days, thus getting the right amount of days per month
    const { queryByText  } = render(<DateComponent day={5} currMonth={1} isFirst={true} />);
    expect(queryByText('30')).not.toBeInTheDocument();
  });

  it('applies the "selected" class when selectedDate matches day', () => {
    const { container } = render(
      <DateComponent day={10} currMonth={0} isFirst={true} selectedDate={10} />
    );
    const dateComponent = container.querySelector('.date.selected');
    expect(dateComponent).toBeInTheDocument();
  });

  it('applies the "today" class when day is today', () => {
    const today = new Date();
    const { container } = render(
      <DateComponent day={today.getDate()} currMonth={today.getMonth()} isFirst={true} today={today} />
    );
    const dateComponent = container.querySelector('.date.today');
    expect(dateComponent).toBeInTheDocument();
  });

  it('applies the "past" class when day is in the past', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const { container } = render(
      <DateComponent day={yesterday.getDate()} currMonth={yesterday.getMonth()} isFirst={true} today={today} />
    );
    const dateComponent = container.querySelector('.date.past');
    expect(dateComponent).toBeInTheDocument();
  });

  it('calls setSelectedDate when clicked', () => {
    const setSelectedDate = jest.fn();
    const { getByTestId } = render(
      <DateComponent day={15} currMonth={0} isFirst={true} setSelectedDate={setSelectedDate} />
    );
    const dateComponent = getByTestId('date-component');
    fireEvent.click(dateComponent);
    expect(setSelectedDate).toHaveBeenCalledWith(15);
  });
});
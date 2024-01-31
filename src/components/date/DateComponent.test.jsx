// DateComponent.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DateComponent } from './DateComponent'; // Make sure to adjust the import path

describe('DateComponent', () => {

  let today = new Date();

  it('renders the correct amount of days', () => {
    // Tests february to make sure there are less than 30 days, thus getting the right amount of days per month
    render(<DateComponent day={5} currMonth={1} isFirst={false} today={new Date()} />);
    expect(screen.queryByText('30')).not.toBeInTheDocument();
  });

  it('applies the "selected" class when selectedDate matches day', () => {
    // Tests if the selected class is applied when the selectedDate matches the day
    const { container } = render(
      <DateComponent day={10} month={0} isFirst={false} selectedDate={10} today={new Date()} />
    );
    const dateComponent = container.querySelector('.date.selected');
    expect(dateComponent).toBeInTheDocument();
  });

  it('applies the "today" class when day is today', () => {
    // Tests if the today class is applied when the day is today
    const {container} = render(
      <DateComponent day={today.getDate()} month={today.getMonth()} year={today.getFullYear()} isFirst={today.getDate() === 1 ? true:false} today={today} />
    );
    const dateComponent = container.querySelector('.date.today');
    expect(dateComponent).toBeInTheDocument();
  });

  it('applies the "past" class when day is in the past', () => {
    // Tests if the past class is applied when the day is in the past
    const { container } = render(
      <DateComponent day={25} month={today.getMonth()} year={today.getFullYear() -1} isFirst={false} today={today} />
    );
    const dateComponent = container.querySelector('.date.past');
    expect(dateComponent).toBeInTheDocument();
  });

  it('calls setSelectedDay when clicked', () => {
    // Create a mock function for setSelectedDay
    const setSelectedDate = jest.fn();

    // Render the DateComponent with necessary props
    render(
      <DateComponent
        day={15}
        month={0}
        year={2024}
        isFirst={true}
        setSelectedDate={setSelectedDate}
        today={new Date(2024, 0, 15)} // Set today's date to match the DateComponent's date
      />
    );

    // Find the DateComponent element
    const dateComponent = screen.getByText('15');

    // Simulate a click on the DateComponent
    fireEvent.click(dateComponent);

    // Verify that setSelectedDay was called with the expected argument
    expect(setSelectedDate).toHaveBeenCalledWith(15);
  });

});
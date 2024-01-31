// calendar.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar Component', () => {
  const monthsMap = {
    0: 'Jan',
    1: 'Feb',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
}

  it('renders correctly', () => {
    render(<Calendar />);
    // Check if the component renders without errors
    expect(screen.getByText('SUN')).toBeInTheDocument();
    expect(screen.getByText('MON')).toBeInTheDocument();
    expect(screen.getByText('TUES')).toBeInTheDocument();
    expect(screen.getByText('WED')).toBeInTheDocument();
    expect(screen.getByText('THUR')).toBeInTheDocument();
    expect(screen.getByText('FRI')).toBeInTheDocument();
    expect(screen.getByText('SAT')).toBeInTheDocument();
  });

  it('goes forward a month when clicking on right arrow', () => {
    const monthsMap = {
      0: 'Jan',
      1: 'Feb',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'Aug',
      8: 'Sep',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec',
  }

  const date = new Date();

  const month = date.getMonth()

  const monthStr = monthsMap[month]

    render(<Calendar />);
    
    // Get the initial month
    const initialMonthText = screen.getByText(/Jan|Feb|March|April|May|June|July|Aug|Sep|Oct|Nov|Dec/).textContent;

    expect(initialMonthText).toBe(monthStr);

    // Click on the right arrow to change the month
    const rightArrow = screen.getByText('>');
    fireEvent.click(rightArrow);

    // Get the updated month
    const updatedMonthText = screen.getByText(/Jan|Feb|March|April|May|June|July|Aug|Sep|Oct|Nov|Dec/).textContent;

    //Checks end of year edge case
    if (initialMonthText === 'Dec'){
      expect(updatedMonthText).toBe('Jan');
    } else {
      expect(updatedMonthText).toBe(monthsMap[month + 1]);
    }

    expect(initialMonthText).not.toBe(updatedMonthText);

  })

  it('goes back a month when clicking on right arrow', () => {

  const date = new Date();

  const month = date.getMonth()
  //gets the name of the month
  const monthStr = monthsMap[month]


    render(<Calendar />);
    
    // Get the initial month
    const initialMonthText = screen.getByText(/Jan|Feb|March|April|May|June|July|Aug|Sep|Oct|Nov|Dec/).textContent;

    expect(initialMonthText).toBe(monthStr);

    // Click on the right arrow to change the month
    const leftArrow = screen.getByText('<');
    fireEvent.click(leftArrow);

    // Get the updated month
    const updatedMonthText = screen.getByText(/Jan|Feb|March|April|May|June|July|Aug|Sep|Oct|Nov|Dec/).textContent;


    //Checks beginning of year edge case
    if (initialMonthText === 'Jan'){
      expect(updatedMonthText).toBe('Dec');
    } else {
      expect(updatedMonthText).toBe(monthsMap[month]);
    }
    
    expect(initialMonthText).not.toBe(updatedMonthText);

  })

  it('starts on the correct "first day of the month"', () => {

    jest.useFakeTimers('modern'); //Allow the use of fake timers
    jest.setSystemTime(new Date(2024, 1, 1)); // Set the system time to February 1, 2024 (0-based month index)

    // Render the Calendar component with the test date
    render(<Calendar/>);

    // Find the first day of the month in the calendar display
    const firstDayOfMonth = screen.getByText('1');

    // Verify that the first day of the month is correctly aligned with the first day of the week
    // In this case, February 1, 2024, is a Thursday, so it should appear in the 5th column (Thursday column)
    expect(firstDayOfMonth).toHaveStyle('grid-column-start: 5'); // Adjust this based on your grid layout
  });

  
});
// calendar.test.js

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Calendar } from './Calendar'; // Make sure to adjust the import path

describe('Calendar Component', () => {
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

  it('changes month when clicking on arrows', () => {
    render(<Calendar />);
    
    // Get the initial month
    const initialMonthText = screen.getByText(/Jan|Feb|March|April|May|June|July|Aug|Sep|Oct|Nov|Dec/).textContent;

    // Click on the right arrow to change the month
    const rightArrow = screen.getByText('>');
    fireEvent.click(rightArrow);

    // Get the updated month
    const updatedMonthText = screen.getByText(/Jan|Feb|March|April|May|June|July|Aug|Sep|Oct|Nov|Dec/).textContent;

    // Expect the months to be different

    expect(initialMonthText).not.toBe(updatedMonthText);
  });
});
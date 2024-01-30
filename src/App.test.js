// App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Calendar component', () => {
  render(<App />);
  
  // Check if the Calendar component is rendered within the App
  const calendarElement = screen.getByTestId('calendar');
  expect(calendarElement).toBeInTheDocument();
});
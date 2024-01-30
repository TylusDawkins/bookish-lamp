// App.js

import './App.css';
import { Calendar } from './calendar/Calendar';

function App() {
  return (
    <div className="app">
      <Calendar data-testid="calendar-component" />
    </div>
  );
}

export default App;

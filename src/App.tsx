import React from 'react';
import PomodoroCrono from './components/pomodoroCrono';

function App() {
  return (
    <div className="container">
      <PomodoroCrono
        TempoPadrao={1500}
        descansoTempoC={300}
        descansoTempoL={900}
        ciclos={4}
      />
    </div>
  );
}

export default App;

import React from 'react';
import Numpad from './components/Numpad';
import { useEffect } from 'react';
import NumpadService from './services/NumpadService';

function App() {
  useEffect(() => {
    NumpadService.connect();
    return () => {
      NumpadService.disconnect();
    };
  }, []);

  function handleNumClick(num: string): void {
    NumpadService.sendKeyPress(num);
    console.log(`Key ${num} sent to NumpadService`);
  }

  return (
    <div className="App flex justify-center items-center h-screen bg-gray-50">
      <Numpad onNumClick={
        handleNumClick
        } />
    </div>
  );
}

export default App;

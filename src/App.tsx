import React from 'react';
import Numpad from './components/Numpad';
import NumpadService from './services/NumpadService';
import { useState, useEffect } from 'react';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    NumpadService.connect();
    NumpadService.onConnectionChange((isConnected) => {
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
    });

    return () => {
      NumpadService.disconnect();
    };
  }, []);

  function handleNumClick(num: string): void {
    NumpadService.sendKeyPress(num);
    console.log(`Key ${num} sent to NumpadService`);
  }

  return (
    <div className="App flex flex-col justify-center items-center h-screen bg-gray-50">
      <ConnectionStatus status={connectionStatus} errorMessage={errorMessage} />
      <div className="mt-4">
        <Numpad onNumClick={
          handleNumClick
        } />
      </div>
    </div>
  );
}

export default App;

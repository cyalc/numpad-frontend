import React, { useState } from 'react';
import NumpadButton from './NumpadButton';

interface KeyType {
  primary: string;
  secondary?: string;
  span?: 'row' | 'col';
}

const Numpad: React.FC = () => {
  const [display, setDisplay] = useState('');

  const handleClick = (value: string) => {
    // Implement the logic for each button press
    console.log(value + " pressed");
  };

  const keys: KeyType[][] = [
    [{ primary: 'Num Lock' }, { primary: '/' }, { primary: '*' }, { primary: '-' }],
    [{ primary: '7', secondary: 'Home' }, { primary: '8', secondary: '↑' }, { primary: '9', secondary: 'PgUp' }, { primary: '+', span: 'row' }],
    [{ primary: '4', secondary: '←' }, { primary: '5' }, { primary: '6', secondary: '→' }],
    [{ primary: '1', secondary: 'End' }, { primary: '2', secondary: '↓' }, { primary: '3', secondary: 'PgDn' }, { primary: 'Enter', span: 'row' }],
    [{ primary: '0', secondary: 'Ins', span: 'col' }, { primary: '.', secondary: 'Del' }],
  ];

  return (
    <div className="max-w-xs mx-auto mt-10 bg-gray-800 p-3 rounded-lg shadow-lg">
      <div className="grid grid-cols-4 gap-2">
        {keys.map((row, rowIndex) => (
          row.map((key, colIndex) => (
            <NumpadButton
              key={`${rowIndex}-${colIndex}`}
              primary={key.primary}
              secondary={key.secondary}
              onClick={handleClick}
              span={key.span}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export default Numpad;
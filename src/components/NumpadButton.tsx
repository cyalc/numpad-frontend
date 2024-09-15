import React from 'react';

interface NumpadButtonProps {
  primary: string;
  secondary?: string;
  onClick: (value: string) => void;
  span?: 'col' | 'row' | 'none';
}

const NumpadButton: React.FC<NumpadButtonProps> = ({ primary, secondary, onClick, span = 'none' }) => {
  const spanClass = 
    span === 'col' ? 'col-span-2' : 
    span === 'row' ? 'row-span-2' : '';

  return (
    <button
      className={`
        bg-gray-700 hover:bg-gray-600 active:bg-gray-800
        text-white font-medium py-2 px-1 rounded
        transition-colors duration-150 ease-in-out
        flex flex-col items-center justify-center
        ${spanClass}
      `}
      onClick={() => onClick(primary)}
    >
      <span className="text-sm">{primary}</span>
      {secondary && <span className="text-xs text-gray-400">{secondary}</span>}
    </button>
  );
};

export default NumpadButton;
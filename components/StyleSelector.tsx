
import React from 'react';
import { DiplomaStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: DiplomaStyle;
  onStyleChange: (style: DiplomaStyle) => void;
}

const StyleButton: React.FC<{style: DiplomaStyle, selectedStyle: DiplomaStyle, onClick: () => void, children: React.ReactNode}> = ({ style, selectedStyle, onClick, children }) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
        selectedStyle === style
            ? 'bg-indigo-600 text-white shadow-md scale-105'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
    >
        <span className="font-semibold">{children}</span>
    </button>
)

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="space-y-3">
      {(Object.values(DiplomaStyle) as Array<DiplomaStyle>).map((style) => (
        <StyleButton 
            key={style}
            style={style}
            selectedStyle={selectedStyle}
            onClick={() => onStyleChange(style)}
        >
          {style}
        </StyleButton>
      ))}
    </div>
  );
};

export default StyleSelector;

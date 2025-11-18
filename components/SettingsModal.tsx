
import React from 'react';
import { DiplomaSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DiplomaSettings;
  onSettingsChange: (newSettings: DiplomaSettings) => void;
}

const SliderControl: React.FC<{
  label: string;
  value: number;
  onChange: (val: number) => void;
}> = ({ label, value, onChange }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <span className="text-sm text-gray-500">{value.toFixed(1)}x</span>
    </div>
    <input
      type="range"
      min="0.5"
      max="2.5"
      step="0.1"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  if (!isOpen) return null;

  const updateSetting = (key: keyof DiplomaSettings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
              <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.389c-.42.18-.832.416-1.228.699l-2.056-.714c-.875-.305-1.86.092-2.3.876l-1.076 1.885c-.44.786-.2 1.775.558 2.282l1.82.992a9.08 9.08 0 0 0 0 3.181l-1.82.992c-.757.507-.997 1.496-.558 2.282l1.076 1.885c.44.784 1.425 1.18 2.3.876l2.056-.714c.396.283.808.519 1.228.699l.178 1.572c.151.904.933 1.567 1.85 1.567h2.154c.917 0 1.699-.663 1.85-1.567l.178-1.572c.42-.18.832-.416 1.228-.699l2.056.714c.875.305 1.86-.092 2.3-.876l1.076-1.885c.44-.786.2-1.775-.558-2.282l-1.82-.992a9.09 9.09 0 0 0 0-3.181l1.82-.992c.757-.507.997-1.496.558-2.282l-1.076-1.885c-.44-.784-1.425-1.18-2.3-.876l-2.056.714c-.396-.283-.808-.519-1.228-.699l-.178-1.572A1.914 1.914 0 0 0 13.232 2.25h-2.154Zm-4.7 6.333a.75.75 0 0 0-.917.263l-1.076 1.885a.75.75 0 0 0 .223.913l1.82.992c.12.68.314 1.335.57 1.954l-2.056.714a.75.75 0 0 0-.466.878l.538.932c.177.306.57.472.917.263l2.056-.714a.75.75 0 0 0 .223-.913l-1.82-.992a7.58 7.58 0 0 1-.57-1.954l2.056-.714a.75.75 0 0 0 .466-.878l-.538-.932a.75.75 0 0 0-.466-.35l-2.056.714Zm6.986 8.133a.75.75 0 0 1-.466.878l-.538.932a.75.75 0 0 1-.917.263l-2.056-.714a.75.75 0 0 1-.466.878l1.82.992a.75.75 0 0 1 .223.913l-1.076 1.885a.75.75 0 0 1-.917.263l-2.056-.714a7.59 7.59 0 0 0 .57 1.954l1.82.992a.75.75 0 0 1 .223.913l1.076 1.885a.75.75 0 0 1 .917.263l2.056-.714a.75.75 0 0 1 .466-.878l-1.82-.992a7.59 7.59 0 0 0 .57-1.954l2.056.714a.75.75 0 0 1 .466-.35l.538-.932a.75.75 0 0 1-.466-.878l-1.82-.992Z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm0 1.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z" clipRule="evenodd" />
            </svg>
            Configuración de Texto
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-2 max-h-[70vh] overflow-y-auto">
          <SliderControl 
            label="Nombre del Alumno" 
            value={settings.studentNameScale} 
            onChange={(val) => updateSetting('studentNameScale', val)} 
          />
          <SliderControl 
            label="Grado del Curso" 
            value={settings.courseGradeScale} 
            onChange={(val) => updateSetting('courseGradeScale', val)} 
          />
          <SliderControl 
            label="Nombre del Curso" 
            value={settings.courseNameScale} 
            onChange={(val) => updateSetting('courseNameScale', val)} 
          />
          <SliderControl 
            label="Fecha" 
            value={settings.dateScale} 
            onChange={(val) => updateSetting('dateScale', val)} 
          />
          <SliderControl 
            label="Director" 
            value={settings.directorNameScale} 
            onChange={(val) => updateSetting('directorNameScale', val)} 
          />
          <SliderControl 
            label="Secretario" 
            value={settings.secretaryNameScale} 
            onChange={(val) => updateSetting('secretaryNameScale', val)} 
          />
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button 
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition shadow-sm"
            >
                Listo
            </button>
        </div>
      </div>
    </div>
  );
};

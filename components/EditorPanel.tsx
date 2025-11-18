
import React from 'react';
import { DiplomaData } from '../types';

interface EditorPanelProps {
  data: DiplomaData;
  setData: (data: Partial<DiplomaData>) => void;
}

const InputField: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  </div>
);


const EditorPanel: React.FC<EditorPanelProps> = ({ data, setData }) => {
  return (
    <div className="space-y-4">
      <InputField 
        label="Nombre del Alumno" 
        value={data.studentName}
        onChange={(e) => setData({ studentName: e.target.value })}
      />
      <InputField 
        label="Grado del Curso" 
        value={data.courseGrade}
        onChange={(e) => setData({ courseGrade: e.target.value })}
      />
      <InputField 
        label="Nombre del Curso" 
        value={data.courseName}
        onChange={(e) => setData({ courseName: e.target.value })}
      />
      <InputField 
        label="Fecha (e.g., Tuxtla Gutiérrez, Chiapas, a 15 de Diciembre del 2025)" 
        value={data.date}
        onChange={(e) => setData({ date: e.target.value })}
      />
      <InputField 
        label="Nombre del Director" 
        value={data.directorName}
        onChange={(e) => setData({ directorName: e.target.value })}
      />
      <InputField 
        label="Nombre del Secretario" 
        value={data.secretaryName}
        onChange={(e) => setData({ secretaryName: e.target.value })}
      />
    </div>
  );
};

export default EditorPanel;

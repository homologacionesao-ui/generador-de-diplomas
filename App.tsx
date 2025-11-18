
import React, { useState, useRef, useCallback } from 'react';
import { DiplomaData, DiplomaStyle, DiplomaSettings, DEFAULT_SETTINGS } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import DiplomaPreview from './components/DiplomaPreview';
import EditorPanel from './components/EditorPanel';
import StyleSelector from './components/StyleSelector';
import { SettingsModal } from './components/SettingsModal';

declare const html2canvas: any;
declare const jspdf: any;

const App: React.FC = () => {
  const [studentName, setStudentName] = useState('Nombre del Alumno');
  const [date, setDate] = useState(new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }));
  
  const [courseGrade, setCourseGrade] = useLocalStorage('diploma_courseGrade', 'GRADO DEL CURSO');
  const [courseName, setCourseName] = useLocalStorage('diploma_courseName', 'NOMBRE DEL CURSO');
  const [directorName, setDirectorName] = useLocalStorage('diploma_directorName', 'Dr. J. Armando Guzmán Zuarth');
  const [secretaryName, setSecretaryName] = useLocalStorage('diploma_secretaryName', 'Rev. Manuel Sánchez Velásquez');
  
  const [selectedStyle, setSelectedStyle] = useState<DiplomaStyle>(DiplomaStyle.Classic);
  const [diplomaSettings, setDiplomaSettings] = useState<DiplomaSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const diplomaRef = useRef<HTMLDivElement>(null);
  
  const diplomaData: DiplomaData = {
    studentName,
    courseGrade,
    courseName,
    date,
    directorName,
    secretaryName,
  };
  
  const setDiplomaData = (data: Partial<DiplomaData>) => {
    if (data.studentName !== undefined) setStudentName(data.studentName);
    if (data.courseGrade !== undefined) setCourseGrade(data.courseGrade);
    if (data.courseName !== undefined) setCourseName(data.courseName);
    if (data.date !== undefined) setDate(data.date);
    if (data.directorName !== undefined) setDirectorName(data.directorName);
    if (data.secretaryName !== undefined) setSecretaryName(data.secretaryName);
  };

  const handleDownload = useCallback(() => {
    if (!diplomaRef.current) return;
    setIsGenerating(true);
    
    html2canvas(diplomaRef.current, {
        scale: 4, // Higher scale for better print quality
        useCORS: true,
        backgroundColor: null,
        logging: false,
    }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;
      
      // Initialize PDF as Landscape Letter size (11in x 8.5in)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: 'letter'
      });

      // Add image filling the Letter page (11 x 8.5 inches)
      pdf.addImage(imgData, 'PNG', 0, 0, 11, 8.5);
      
      pdf.save(`Diploma-${studentName.replace(/ /g, '_')}.pdf`);
      setIsGenerating(false);
    }).catch((err: any) => {
        console.error("Error generating PDF:", err);
        setIsGenerating(false);
    });
  }, [studentName]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
            <span>Generador de Diplomas</span>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              title="Configuración de texto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.389c-.42.18-.832.416-1.228.699l-2.056-.714c-.875-.305-1.86.092-2.3.876l-1.076 1.885c-.44.786-.2 1.775.558 2.282l1.82.992a9.08 9.08 0 0 0 0 3.181l-1.82.992c-.757.507-.997 1.496-.558 2.282l1.076 1.885c.44.784 1.425 1.18 2.3.876l2.056-.714c.396.283.808.519 1.228.699l.178 1.572c.151.904.933 1.567 1.85 1.567h2.154c.917 0 1.699-.663 1.85-1.567l.178-1.572c.42-.18.832-.416 1.228-.699l2.056.714c.875.305 1.86-.092 2.3-.876l1.076-1.885c.44-.786.2-1.775-.558-2.282l-1.82-.992a9.09 9.09 0 0 0 0-3.181l1.82-.992c.757-.507.997-1.496.558-2.282l-1.076-1.885c-.44-.784-1.425-1.18-2.3-.876l-2.056.714c-.396-.283-.808-.519-1.228-.699l-.178-1.572A1.914 1.914 0 0 0 13.232 2.25h-2.154Zm-4.7 6.333a.75.75 0 0 0-.917.263l-1.076 1.885a.75.75 0 0 0 .223.913l1.82.992c.12.68.314 1.335.57 1.954l-2.056.714a.75.75 0 0 0-.466.878l.538.932c.177.306.57.472.917.263l2.056-.714a.75.75 0 0 0 .223-.913l-1.82-.992a7.58 7.58 0 0 1-.57-1.954l2.056-.714a.75.75 0 0 0 .466-.878l-.538-.932a.75.75 0 0 0-.466-.35l-2.056.714Zm6.986 8.133a.75.75 0 0 1-.466.878l-.538.932a.75.75 0 0 1-.917.263l-2.056-.714a.75.75 0 0 1-.466.878l1.82.992a.75.75 0 0 1 .223.913l-1.076 1.885a.75.75 0 0 1-.917.263l-2.056-.714a7.59 7.59 0 0 0 .57 1.954l1.82.992a.75.75 0 0 1 .223.913l1.076 1.885a.75.75 0 0 1 .917.263l2.056-.714a.75.75 0 0 1 .466-.878l-1.82-.992a7.59 7.59 0 0 0 .57-1.954l2.056.714a.75.75 0 0 1 .466-.35l.538-.932a.75.75 0 0 1-.466-.878l-1.82-.992Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm0 1.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isGenerating ? 'Generando PDF...' : 'Descargar PDF'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Editor de Diploma</h2>
          <EditorPanel data={diplomaData} setData={setDiplomaData} />
          <h2 className="text-xl font-bold mt-8 mb-4 border-b pb-2">Estilos</h2>
          <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
        </div>

        <div className="lg:col-span-2 flex items-center justify-center p-4 bg-white rounded-xl shadow-lg overflow-x-auto">
          <DiplomaPreview 
            ref={diplomaRef} 
            data={diplomaData} 
            style={selectedStyle} 
            settings={diplomaSettings}
          />
        </div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        settings={diplomaSettings}
        onSettingsChange={setDiplomaSettings}
      />
    </div>
  );
};

export default App;

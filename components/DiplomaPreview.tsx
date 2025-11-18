
import React, { forwardRef, useMemo } from 'react';
import { DiplomaData, DiplomaStyle, DiplomaSettings } from '../types';
import { Logo } from './Logo';

interface DiplomaPreviewProps {
  data: DiplomaData;
  style: DiplomaStyle;
  settings: DiplomaSettings;
}

// Helper to calculate base font size number (rem) for the student name based on length and style
const calculateBaseFontSize = (text: string, style: DiplomaStyle): number => {
  const length = text.length;

  // Formal style uses uppercase and wide tracking, requiring smaller fonts to fit
  if (style === DiplomaStyle.Formal) {
      if (length < 15) return 3.0;
      if (length < 25) return 2.5;
      if (length < 35) return 1.8;
      if (length < 45) return 1.4;
      if (length < 55) return 1.1;
      return 0.9;
  }

  // Default sizing for other styles (Increased baseline)
  if (length < 20) return 4.0; // Was 2.5
  if (length < 30) return 3.0; // Was 2.0
  if (length < 40) return 2.5; // Was 1.75
  if (length < 50) return 2.0; // Was 1.5
  if (length < 60) return 1.5; // Was 1.25
  return 1.25;                 // Was 1.0
};

const getBaseSizes = (style: DiplomaStyle) => {
    switch (style) {
        case DiplomaStyle.Classic:
        case DiplomaStyle.Elegant:
            return {
                courseGrade: 1.2,  // Was 0.75
                courseName: 2.25,  // Was 1.25
                date: 0.9,         // Was 0.625
                signName: 1.1,     // Was 0.75
                signTitle: 0.75,   // Was 0.625
            };
        case DiplomaStyle.Modern:
            return {
                courseGrade: 1.2,
                courseName: 1.8,   // Was 1.0
                date: 0.9,
                signName: 1.1,
                signTitle: 0.75,
            };
        case DiplomaStyle.Formal:
             return {
                courseGrade: 1.2,
                courseName: 1.8,   // Was 1.0
                date: 0.9,
                signName: 1.1,
                signTitle: 0.75,
            };
        default:
             return {
                courseGrade: 1.2,
                courseName: 2.0,
                date: 0.9,
                signName: 1.1,
                signTitle: 0.75,
            };
    }
}

const getStyleClasses = (style: DiplomaStyle) => {
    switch(style) {
        case DiplomaStyle.Classic:
            return {
                container: 'border-double border-[6px] border-gray-800 bg-white',
                innerBorder: 'border-[1px] border-gray-600',
                student: 'font-dancing-script text-gray-900',
                course: 'font-cormorant font-bold tracking-wide text-gray-800',
            }
        case DiplomaStyle.Modern:
            return {
                container: 'border-l-[24px] border-r-[24px] border-blue-900 bg-white',
                innerBorder: 'border-none',
                student: 'font-lato font-bold tracking-wider uppercase text-blue-900',
                course: 'font-lato font-bold tracking-wider uppercase text-blue-800',
            }
        case DiplomaStyle.Elegant:
            return {
                container: 'border-[1px] border-gray-300 bg-white p-1',
                innerBorder: 'border-[1px] border-gray-800',
                student: 'font-dancing-script text-gray-900',
                course: 'font-eb-garamond font-bold tracking-[0.2em] text-gray-800',
            }
        case DiplomaStyle.Formal:
            return {
                container: 'border-[1px] border-yellow-500 bg-white shadow-xl',
                innerBorder: 'border-4 border-yellow-400',
                student: 'font-eb-garamond tracking-widest uppercase text-blue-900',
                course: 'font-eb-garamond tracking-[0.2em] uppercase text-red-900',
            }
        default:
            return {
                 container: 'border-4 border-yellow-400',
                 innerBorder: '',
                 student: '',
                 course: ''
            }
    }
}

const DiplomaPreview = forwardRef<HTMLDivElement, DiplomaPreviewProps>(({ data, style, settings }, ref) => {
    
    const styleClasses = getStyleClasses(style);
    const baseSizes = getBaseSizes(style);
    
    // Append two spaces to the name to ensure flourishes in script fonts or tight bounds aren't clipped
    const studentNameWithSpaces = `${data.studentName}  `;

    // Calculate dynamic sizes based on base size (from style or auto-calc) * user setting multiplier
    const studentNameSize = useMemo(() => {
        const base = calculateBaseFontSize(studentNameWithSpaces, style);
        return `${base * settings.studentNameScale}rem`;
    }, [studentNameWithSpaces, style, settings.studentNameScale]);

    const courseGradeSize = `${baseSizes.courseGrade * settings.courseGradeScale}rem`;
    const courseNameSize = `${baseSizes.courseName * settings.courseNameScale}rem`;
    const dateSize = `${baseSizes.date * settings.dateScale}rem`;
    const directorNameSize = `${baseSizes.signName * settings.directorNameScale}rem`;
    const secretaryNameSize = `${baseSizes.signName * settings.secretaryNameScale}rem`;

    return (
        // Aspect ratio 11/8.5 (Letter Landscape)
        <div ref={ref} className={`w-full aspect-[11/8.5] max-w-4xl p-6 overflow-hidden text-center text-gray-800 shadow-2xl ${styleClasses.container}`}>
            <div className={`w-full h-full p-6 flex flex-col items-center justify-between ${styleClasses.innerBorder}`}>
                <div className="w-full">
                    <div className="flex justify-center mb-2">
                        <Logo className="h-16 w-auto text-black fill-current" />
                    </div>
                    <h1 className="font-cormorant text-4xl font-bold tracking-wider text-gray-900 leading-none mb-1">INSTITUTO BAUTISTA MARANATA</h1>
                    <p className="font-serif text-sm font-semibold text-gray-700 tracking-wide">IGLESIA BAUTISTA MARANATA DE TUXTLA A.R.</p>
                    <p className="font-serif text-xs text-gray-500 mt-0.5">4A NTE. OTE. #717, TUXTLA GUTIERREZ, CHIAPAS SGAR 1598/93</p>
                </div>

                <div className="w-full my-2 flex flex-col justify-center flex-grow px-8">
                    <p className="font-serif text-sm tracking-[0.2em] text-gray-600 mb-2">OTORGA ESTE DIPLOMA A:</p>
                    {/* Applied dynamic font size via inline style to ensure single line fit and user control */}
                    <h2 
                        className={`my-1 w-full whitespace-nowrap overflow-visible leading-tight ${styleClasses.student}`}
                        style={{ fontSize: studentNameSize }}
                    >
                        {studentNameWithSpaces}
                    </h2>
                    <p className="font-serif text-xs tracking-wide text-gray-600 mt-2">POR HABER CUMPLIDO SATISFACTORIAMENTE</p>
                    
                    <p 
                        className="font-serif mt-2 font-semibold text-gray-800 leading-tight"
                        style={{ fontSize: courseGradeSize }}
                    >
                        {data.courseGrade}
                    </p>
                    
                    <h3 
                        className={`mt-1 mb-1 leading-none ${styleClasses.course}`}
                        style={{ fontSize: courseNameSize }}
                    >
                        {data.courseName}
                    </h3>
                    
                    <p 
                        className="font-serif text-gray-600 mt-2"
                        style={{ fontSize: dateSize }}
                    >
                        {data.date}
                    </p>
                </div>

                <div className="w-full flex justify-around items-end mt-2 pb-2">
                    <div className="w-1/3 text-center">
                        <p 
                            className="border-t border-gray-400 pt-2 font-serif text-gray-800 leading-none pb-1"
                            style={{ fontSize: directorNameSize }}
                        >
                            {data.directorName}
                        </p>
                        <p className="font-serif font-bold text-xs text-gray-500 uppercase tracking-wider">Director</p>
                    </div>
                    <div className="w-1/3 text-center">
                        <p 
                            className="border-t border-gray-400 pt-2 font-serif text-gray-800 leading-none pb-1"
                            style={{ fontSize: secretaryNameSize }}
                        >
                            {data.secretaryName}
                        </p>
                        <p className="font-serif font-bold text-xs text-gray-500 uppercase tracking-wider">Secretario</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DiplomaPreview;

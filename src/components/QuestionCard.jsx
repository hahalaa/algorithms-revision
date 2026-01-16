import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Helper component to parse text with LaTeX delimiters
// It looks for $...$ for inline math and $$...$$ for block math
const RenderText = ({ text }) => {
  if (!text) return null;

  // Split by $$ for block math first
  const parts = text.split(/(\$\$[^$]+\$\$)/g);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Render Block Math (remove $$)
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        }
        // Inside non-block parts, split by $ for inline math
        return part.split(/(\$[^$]+\$)/g).map((subPart, subIndex) => {
          if (subPart.startsWith('$') && subPart.endsWith('$')) {
            // Render Inline Math (remove $)
            return <InlineMath key={`${index}-${subIndex}`} math={subPart.slice(1, -1)} />;
          }
          return <span key={`${index}-${subIndex}`}>{subPart}</span>;
        });
      })}
    </span>
  );
};

const QuestionCard = ({ questionData }) => {
  const [showSolution, setShowSolution] = useState(false);

  // function to determine badge color based on difficulty
  const getDifficultyColor = (diff) => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 transition hover:shadow-md">
      {/* Header: Topic & Difficulty */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {questionData.topic}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 rounded border ${getDifficultyColor(questionData.difficulty)}`}>
          {questionData.difficulty}
        </span>
      </div>

      {/* Question Body */}
      <div className="mb-6 text-gray-800 text-lg leading-relaxed">
        <RenderText text={questionData.question} />
      </div>

      {/* Solution Section */}
      <div className="border-t border-gray-100 pt-4">
        {!showSolution ? (
          <button
            onClick={() => setShowSolution(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
          >
            Show Solution
          </button>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-700">Solution:</h4>
              <button
                onClick={() => setShowSolution(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Hide
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-md text-gray-700 border border-gray-200">
               {/* Handles new lines in solution text */}
              {questionData.solution.split('\n').map((line, i) => (
                <p key={i} className={`mb-2 ${line.trim() === '' ? 'h-2' : ''}`}>
                  <RenderText text={line} />
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
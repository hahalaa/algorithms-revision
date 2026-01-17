import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import ControlPanel from './components/ControlPanel';
import questionsData from './data/questions.json';

function App() {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const availableTopics = [...new Set(questionsData.map(q => q.topic))];

  const handleGenerate = ({ topics, count, difficulty }) => {
    let filtered = questionsData.filter(q => topics.includes(q.topic));
    if (difficulty !== 'Any') {
      filtered = filtered.filter(q => q.difficulty === difficulty);
    }
    // Simple shuffle
    filtered.sort(() => Math.random() - 0.5);
    setGeneratedQuestions(filtered.slice(0, count));
    setHasGenerated(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-gray-900 font-serif selection:bg-gray-200">
      
      {/* Minimal Header */}
      <header className="border-b border-gray-200 py-8 mb-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-black mb-2">
            Algorithm Revision
          </h1>
          <p className="text-gray-500 italic font-serif text-lg">
            UNSW COMP3121 / COMP3821
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-20">
        
        <ControlPanel 
          onGenerate={handleGenerate} 
          availableTopics={availableTopics} 
        />

        <div className="mt-20 space-y-20">
          {hasGenerated && generatedQuestions.length === 0 ? (
            <div className="text-center py-12 border-t border-b border-gray-100">
              <p className="text-xl text-gray-400 italic">No questions found matching criteria.</p>
            </div>
          ) : (
            generatedQuestions.map((q, index) => (
              <React.Fragment key={q.id}>
                {/* Add a separator line between questions */}
                {index > 0 && <hr className="border-gray-200 my-12" />}
                <QuestionCard questionData={q} index={index + 1} />
              </React.Fragment>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
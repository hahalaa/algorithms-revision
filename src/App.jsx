import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import ControlPanel from './components/ControlPanel';
import questionsData from './data/questions.json';

function App() {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Extract unique topics from the data source dynamically
  const availableTopics = [...new Set(questionsData.map(q => q.topic))];

  const handleGenerate = ({ topics, count, difficulty }) => {
    // 1. Filter by Topic
    let filtered = questionsData.filter(q => topics.includes(q.topic));

    // 2. Filter by Difficulty (if not 'Any')
    if (difficulty !== 'Any') {
      filtered = filtered.filter(q => q.difficulty === difficulty);
    }

    // 3. Randomize (Fisher-Yates Shuffle)
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    // 4. Slice to the requested count
    const selected = filtered.slice(0, count);

    setGeneratedQuestions(selected);
    setHasGenerated(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">
      {/* Navbar / Header */}
      <header className="bg-blue-900 text-white py-6 shadow-lg mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight">COMP3121 Revision</h1>
          <p className="text-blue-200 mt-2 text-sm">Unofficial Algorithm Practice Tool</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4">
        
        {/* Control Panel */}
        <ControlPanel 
          onGenerate={handleGenerate} 
          availableTopics={availableTopics} 
        />

        {/* Results Area */}
        <div className="mt-8">
          {hasGenerated && generatedQuestions.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg border border-gray-200 text-gray-500">
              <p className="text-lg">No questions found matching those criteria.</p>
              <p className="text-sm mt-2">Try selecting "Any" difficulty or different topics.</p>
            </div>
          ) : (
            generatedQuestions.map((q) => (
              <QuestionCard key={q.id} questionData={q} />
            ))
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="text-center text-gray-400 text-xs py-8">
        <p>Built for UNSW COMP3121/3821 Revision. Not officially affiliated with UNSW.</p>
      </footer>
    </div>
  );
}

export default App;
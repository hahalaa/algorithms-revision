import React, { useState } from 'react';

const ControlPanel = ({ onGenerate, availableTopics }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questionCount, setQuestionCount] = useState(3);
  const [difficulty, setDifficulty] = useState('Any');

  const handleTopicChange = (topic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = () => {
    if (selectedTopics.length === 0) return alert("Select at least one topic.");
    onGenerate({ topics: selectedTopics, count: questionCount, difficulty });
  };

  return (
    <div className="border-t border-b border-gray-200 py-8 mb-12">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* Left Col: Topics */}
        <div className="flex-1">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Select Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {availableTopics.map((topic) => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <button
                  key={topic}
                  onClick={() => handleTopicChange(topic)}
                  className={`
                    px-3 py-1.5 text-sm font-sans transition-all duration-200 border
                    ${isSelected 
                      ? 'bg-black text-white border-black' 
                      : 'bg-transparent text-gray-600 border-gray-300 hover:border-black hover:text-black'
                    }
                  `}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Settings */}
        <div className="flex-1 md:max-w-xs space-y-6">
          
          {/* Difficulty Dropdown */}
          <div>
            <label className="block font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-transparent font-serif text-lg py-2 border-b border-gray-300 focus:border-black outline-none appearance-none rounded-none cursor-pointer hover:border-gray-400 transition"
              style={{ backgroundImage: 'none' }} // Removes default arrow for cleaner look
            >
              <option value="Any">Mixed / Any</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Count Input */}
          <div>
            <label className="block font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Question Count
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
              className="w-full bg-transparent font-serif text-lg py-2 border-b border-gray-300 focus:border-black outline-none rounded-none transition"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white font-sans font-medium text-sm tracking-wide uppercase py-4 hover:bg-gray-800 transition active:scale-[0.99]"
          >
            Generate Worksheet
          </button>

        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
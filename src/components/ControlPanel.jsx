import React, { useState } from 'react';

const ControlPanel = ({ onGenerate, availableTopics }) => {
  // Local state for the form
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questionCount, setQuestionCount] = useState(3);
  const [difficulty, setDifficulty] = useState('Any');

  // Handle checkbox toggles
  const handleTopicChange = (topic) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) {
        return prev.filter(t => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  // Handle the "Generate" click
  const handleSubmit = () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic.");
      return;
    }
    // Pass the user choices up to the parent App
    onGenerate({
      topics: selectedTopics,
      count: questionCount,
      difficulty
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">⚙️</span> Configuration
      </h2>

      {/* Topics Selection */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-2">Select Topics:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableTopics.map((topic) => (
            <label key={topic} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-200">
              <input
                type="checkbox"
                value={topic}
                checked={selectedTopics.includes(topic)}
                onChange={() => handleTopicChange(topic)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{topic}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Difficulty Selection */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="Any">Mixed / Any</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Question Count */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Number of Questions:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.01] shadow-md"
      >
        Generate Questions
      </button>
    </div>
  );
};

export default ControlPanel;
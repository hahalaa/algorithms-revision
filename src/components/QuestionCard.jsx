import React, { useEffect, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

const loadQuestion = async (file) => {
  const res = await fetch(file);
  return await res.text();
};

const QuestionCard = ({ questionData, index }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    loadQuestion(questionData.file).then(setContent);
  }, [questionData.file]);

  return (
    <div className="py-2">
      {/* Meta */}
      <div className="flex items-baseline space-x-3 mb-6 font-sans text-xs uppercase tracking-widest text-gray-400">
        <span className="text-black font-bold">Problem {index}</span>
        <span>•</span>
        <span>{questionData.topic}</span>
        <span>•</span>
        <span>{questionData.difficulty}</span>
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none font-serif">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
};

export default QuestionCard;

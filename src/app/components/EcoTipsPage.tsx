"use client";

// components/EcoTipsPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const tips = [
  'Store apples in the refrigerator to keep them fresh for up to 6 weeks',
  'Wrap celery in aluminum foil to keep it crisp',
  'Freeze overripe bananas for smoothies or banana bread',
  'Store mushrooms in a paper bag, not plastic',
  'Put a piece of bread in with brown sugar to prevent hardening'
];

const sections = [
  {
    title: 'Proper Food Storage',
    content: 'Learn the best ways to store fruits, vegetables, dairy, and leftovers to extend freshness.'
  },
  {
    title: 'Meal Planning',
    content: 'Plan meals ahead to buy only what you need and avoid unnecessary waste.'
  },
  {
    title: 'Understanding Expiration Dates',
    content: 'Know the difference between “best by,” “use by,” and “sell by” to avoid discarding food too early.'
  },
  {
    title: 'Creative Leftovers',
    content: 'Use leftovers to create new meals—like stir-fry, soups, or casseroles.'
  },
  {
    title: 'Preservation Methods',
    content: 'Explore freezing, drying, and pickling to preserve surplus food for later use.'
  }
];

export default function EcoTipsPage() {
  const [news, setNews] = useState([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/food-news');
        setNews(response.data.articles);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-green-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-green-800">Eco Tips</h1>
        <p className="text-green-700">Learn how to reduce food waste and save money</p>
      </div>

      <div className="border border-green-300 rounded-lg shadow p-4 bg-white">
        {sections.map((section, index) => (
          <div key={index} className="mb-2 border-b border-green-100">
            <button
              className="w-full text-left py-2 font-medium text-green-800 hover:underline"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {section.title}
            </button>
            {openIndex === index && (
              <div className="p-2 text-gray-700 text-sm bg-green-50 rounded">{section.content}</div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-green-300 rounded-lg shadow p-4 bg-white">
          <h2 className="font-semibold text-lg text-green-800 mb-2">Quick Tips</h2>
          <ul className="list-disc list-inside text-green-700 space-y-1">
            {tips.map((tip, idx) => (
              <li key={idx}>✅ {tip}</li>
            ))}
          </ul>
        </div>

        <div className="border border-green-300 rounded-lg shadow p-4 bg-white">
          <h2 className="font-semibold text-lg text-green-800 mb-2">Did You Know?</h2>
          <p className="bg-green-100 p-3 rounded text-sm text-green-800">
            <strong>About 1/3 of all food produced in the world is wasted.</strong>
            <br />Reducing food waste is one of the most effective ways to lower your carbon footprint and save money.
          </p>
        </div>
      </div>

      <div className="border border-green-300 rounded-lg shadow p-4 bg-white mt-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">Recent Food News</h2>
        {news.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {news.slice(0, 5).map((article, i) => (
              <li key={i}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Loading food news...</p>
        )}
      </div>
    </div>
  );
}
  


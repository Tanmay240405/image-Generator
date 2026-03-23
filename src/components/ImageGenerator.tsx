import React, { useState } from 'react';
import { generateImage } from '../services/api';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for the image.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const wordsCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const charsCount = prompt.length;

  return (
    <div className="main-content">
      <div className="panel left-panel">
        <div className="panel-header">INPUT PROMPT</div>
        <textarea
          placeholder="Type or paste your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="stats">
          <span>{wordsCount} words</span>
          <span>{charsCount} characters</span>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="controls">
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>
      </div>

      <div className="panel right-panel">
        {loading ? (
          <div className="placeholder">Loading...</div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated output" className="generated-image" />
        ) : (
          <div className="placeholder">Output will appear here</div>
        )}
      </div>
    </div>
  );
}

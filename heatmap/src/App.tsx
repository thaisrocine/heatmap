import React, { useState } from 'react';

const App: React.FC = () => {
  const [url, setUrl] = useState('https://www.cea.com.br/');
  const predefinedUrls = [
    'https://www.cea.com.br/',
    'https://www.example.com/',
    'https://www.anotherexample.com/',
  ];

  return (
    <div>
      <h1>Heatmap Example</h1>
      <select
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        {predefinedUrls.map((predefinedUrl) => (
          <option key={predefinedUrl} value={predefinedUrl}>
            {predefinedUrl}
          </option>
        ))}
      </select>
      <iframe
        src={url}
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="Dynamic Content"
      />
    </div>
  );
};

export default App;

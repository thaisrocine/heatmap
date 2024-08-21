import React from 'react';
import HeatmapWithScreenshot from './heatmap-data/HeatmapWithScreenshot';


const App: React.FC = () => {
  return (
    <div>
      <h1>Heatmap Example</h1>
      <HeatmapWithScreenshot
        url="https://www.google.com/"
        csvFilePath="/csv-data/data.csv"
      />
    </div>
  );
};

export default App;

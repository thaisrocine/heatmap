import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';
import HeatmapOverlay from './HeatmapOverlay';

interface HeatmapDataPoint {
  x: number;
  y: number;
  value: number;
}

interface HeatmapWithScreenshotProps {
  url: string;
  csvFilePath: string;
}

const HeatmapWithScreenshot: React.FC<HeatmapWithScreenshotProps> = ({ url, csvFilePath }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [heatmapData, setHeatmapData] = useState<HeatmapDataPoint[]>([]);

  useEffect(() => {
    const captureScreenshot = () => {
      if (iframeRef.current) {
        const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
        if (iframeDocument) {
          html2canvas(iframeDocument.body).then(canvas => {
            setScreenshot(canvas.toDataURL('image/png'));
          });
        }
      }
    };

    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const parsedData: HeatmapDataPoint[] = result.data.map((row: any) => ({
          x: parseInt(row.x, 10),
          y: parseInt(row.y, 10),
          value: parseInt(row.value, 10)
        }));
        setHeatmapData(parsedData);
      }
    });

    if (iframeRef.current) {
      iframeRef.current.onload = captureScreenshot;
    }
  }, [url, csvFilePath]);

  return (
    <div style={{ position: 'relative' }}>
      <iframe ref={iframeRef} src={url} style={{ width: '100%', height: '500px', border: 'none' }} />

      {screenshot && (
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          <img src={screenshot} alt="Screenshot" style={{ width: '100%', height: '100%' }} />
          <HeatmapOverlay data={heatmapData} />
        </div>
      )}
    </div>
  );
};

export default HeatmapWithScreenshot;

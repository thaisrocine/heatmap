import React, { useEffect, useRef } from 'react';
import Heatmap from 'heatmap.js';

interface HeatmapOverlayProps {
  data: Array<{ x: number; y: number; value: number }>;
}

const HeatmapOverlay: React.FC<HeatmapOverlayProps> = ({ data }) => {
  const heatmapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heatmapContainerRef.current) {
      const heatmapInstance = Heatmap.create({
        container: heatmapContainerRef.current,
        maxOpacity: 0.6,
        radius: 50,
        blur: 0.9,
      });

      heatmapInstance.setData({
        max: Math.max(...data.map(d => d.value)),
        data: data.map(d => ({
          ...d,
          x: d.x, // Normalize if necessary
          y: d.y, // Normalize if necessary
        })),
        min: 0
      });
    }
  }, [data]);

  return (
    <div
      ref={heatmapContainerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', 
      }}
    />
  );
};

export default HeatmapOverlay;

import { useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { config } from '../../utils';
import { Ion, Terrain, Viewer } from 'cesium';
import OsmBuildings from './tilesets/OsmBuildings';
import 'cesium/Widgets/widgets.css';

Ion.defaultAccessToken = config.CESIUM_TOKEN;

export function Map() {
  const cesiumRef = useRef<HTMLDivElement | null>(null);
  const [cesium, setCesium] = useState<Viewer | null>(null);

  const initializeCesium = useCallback(() => {

    const cesium = new Viewer('map-container', {
      terrain: Terrain.fromWorldTerrain(),
      animation: false,
      timeline: false,
      msaaSamples: 4,
    });

    const scene = cesium.scene;
    scene.globe.depthTestAgainstTerrain = true;

    setCesium(cesium);

    return cesium;
  }, []);

  useEffect(() => {
    const node = cesiumRef.current;
    if (node == null) {
      return;
    }

    const cesiumMap = initializeCesium();

    return () => {
      cesiumMap.destroy();
    };
  }, [initializeCesium]);


  return (
    <Box id="map-container" ref={cesiumRef} sx={{ width: '100%', height: '100%' }}>
      {cesium && (
        <OsmBuildings viewer={cesium} />
      )}
    </Box>
  );
}

export default Map;

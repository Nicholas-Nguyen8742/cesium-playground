import { Viewer, Math, Cartesian3, createGooglePhotorealistic3DTileset } from 'cesium';
import { useCallback, useEffect } from 'react';

export default function GooglePhotorealistic({ viewer } : { viewer: Viewer }) {
  const loadTileset = useCallback(async () => {
    try {
      const tileset = await createGooglePhotorealistic3DTileset();
      viewer.scene.primitives.add(tileset);
    } catch (error) {
      console.error(JSON.stringify({
        tileset: 'GooglePhotorealistic - createGooglePhotorealistic3DTileset',
        error
      }));
    }

    viewer.scene.camera.flyTo({
      destination: Cartesian3.fromDegrees(-74.019, 40.6912, 750),
      orientation: {
        heading: Math.toRadians(20),
        pitch: Math.toRadians(-20),
      },
      duration: 0,
    });
  }, [viewer]);
  
  useEffect(() => {
    loadTileset();
  }, []);

  return null;
}

import { Viewer, createOsmBuildingsAsync, Math, Cartesian3, Cesium3DTile, Cesium3DTileStyle } from 'cesium';
import { useEffect } from 'react';

export default function OsmBuildings({ viewer } : { viewer: Viewer }) {
  const loadOsmBuildings = async () => {
    const tileset = await createOsmBuildingsAsync({
      style: new Cesium3DTileStyle({
        show: false,
      })
    });

    viewer.scene.primitives.add(tileset);

    viewer.scene.camera.flyTo({
      destination: Cartesian3.fromDegrees(-74.019, 40.6912, 750),
      orientation: {
        heading: Math.toRadians(20),
        pitch: Math.toRadians(-20),
      },
      duration: 0,
    });

    const filteredCoordinates = [
      { lat: 40.70219, lng: -74.01204 },
      { lat: 40.70131, lng: -74.01304 },
    ];

    function shouldHideBuilding(lat: number, lng: number): boolean {
      return filteredCoordinates.some(coord => coord.lat === lat && coord.lng === lng);
    }

    tileset.tileVisible.addEventListener((tile: Cesium3DTile) => {
      const content = tile.content;
      for (let i = 0; i < content.featuresLength; i++) {
        const feature = content.getFeature(i);
        feature.show = false;
        const lat = feature.getProperty('cesium#latitude');
        const lng = feature.getProperty('cesium#longitude');
        if (lat && lng) {
          if (shouldHideBuilding(lat, lng)) {
            feature.show = true;
          }
        }
      }
    });
  };
  
  useEffect(() => {
    loadOsmBuildings();
  }, []);

  return null;
}

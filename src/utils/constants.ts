const {
  VITE_API_URL,
  VITE_CESIUM_TOKEN,
} = import.meta.env;

export const config = {
  API_URL: VITE_API_URL,
  CESIUM_TOKEN: VITE_CESIUM_TOKEN,
};

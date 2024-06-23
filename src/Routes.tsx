import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Map } from './components';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

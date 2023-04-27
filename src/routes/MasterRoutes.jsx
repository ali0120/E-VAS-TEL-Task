import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const EngineersTable = lazy(() => import('../pages/EngineersTable'));
const Analytics = lazy(() => import('../pages/Analytics'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));

const MasterRoutes = () => {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<EngineersTable  />}
        />
        <Route path="analytics/:engineerName" element={<Analytics  />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default MasterRoutes;

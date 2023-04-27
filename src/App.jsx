import React, { Suspense } from 'react';
import { Container } from '@mui/material';
import MasterRoutes from './routes/MasterRoutes';

// styles
import './App.css';

const App = () => {
  return (
    <Container maxWidth="xl">
      <Suspense>
        <MasterRoutes />
      </Suspense>
    </Container>
  );
};

export default App;

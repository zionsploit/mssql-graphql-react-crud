import * as React from 'react';
import { Routes, Route } from 'react-router';
import { Dashboard } from './pages/Dashboard';
import { ViewUser } from './pages/ViewUser';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:userId" element={<ViewUser />} />
      </Routes>
    </div>
  );
}

export default App;

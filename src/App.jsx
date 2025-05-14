// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home.jsx';
import DatasetAnalysis from './screens/DatasetAnalysis.jsx';
import ExperimentResults from './screens/ExperimentResults.jsx';
import CourseDetail from './screens/CourseDetail.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/dataset"  element={<DatasetAnalysis />} />
        <Route path="/results"  element={<ExperimentResults />} />
        <Route path="/detail"   element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

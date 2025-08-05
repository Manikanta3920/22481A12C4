// App component placeholder
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlStatsPage from './components/UrlStatsPage';
import Redirector from './components/Redirector';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/stats" element={<UrlStatsPage />} />
        <Route path="/:shortcode" element={<Redirector />} />
      </Routes>
    </Router>
  );
}

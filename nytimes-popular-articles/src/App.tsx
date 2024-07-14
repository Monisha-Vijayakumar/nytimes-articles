import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article from './components/Article';
import ArticleDetail from './components/ArticleDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Article />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

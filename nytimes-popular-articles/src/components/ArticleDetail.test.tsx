import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ArticleDetail from './ArticleDetail';
import * as api from '../api/articleService';

jest.mock('../api/articleService');

const mockedGetMostPopularArticles = api.getMostPopularArticles as jest.Mock;

describe('ArticleDetail', () => {
  test('renders article details', async () => {
    mockedGetMostPopularArticles.mockResolvedValue([
      {
        id: 1,
        title: 'Example Article 1',
        abstract: 'This is an example abstract for Article 1',
        url: 'http://example.com/article1',
      },
    ]);

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Example Article 1/i)).toBeInTheDocument());
    expect(screen.getByText(/This is an example abstract for Article 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Read more/i)).toBeInTheDocument();
  });

  test('handles loading state', async () => {
    mockedGetMostPopularArticles.mockResolvedValue([
      {
        id: 1,
        title: 'Example Article 1',
        abstract: 'This is an example abstract for Article 1',
        url: 'http://example.com/article1',
      },
    ]);

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading the article details../i)).toBeInTheDocument();
  });
});

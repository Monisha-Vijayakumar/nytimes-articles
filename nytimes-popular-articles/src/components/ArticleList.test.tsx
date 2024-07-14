import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleList from './ArticleList';
import { ArticleModel } from '../api/articleService';

const mockArticles: ArticleModel[] = [
  {
    id: 1,
    title: 'Example Article 1',
    abstract: 'This is an example abstract for Article 1',
    url: 'http://example.com/article1',
  },
  {
    id: 2,
    title: 'Example Article 2',
    abstract: 'This is an example abstract for Article 2',
    url: 'http://example.com/article2',
  },
];

describe('ArticleList', () => {
  test('renders articles', () => {
    render(
      <BrowserRouter>
        <ArticleList articles={mockArticles} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Example Article 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Example Article 2/i)).toBeInTheDocument();
  });

  test('navigates to article detail on click', () => {
    const { container } = render(
      <BrowserRouter>
        <ArticleList articles={mockArticles} />
      </BrowserRouter>
    );

    const articleLink = container.querySelector('li');
    fireEvent.click(articleLink!);

    expect(window.location.pathname).toBe('/article/1');
  });
});

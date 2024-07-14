import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Article from "./Article";
import * as api from "../api/articleService";
import ArticleList from "./ArticleList";
import { BrowserRouter } from "react-router-dom";

jest.mock("../api/articleService");

const mockedGetMostPopularArticles = api.getMostPopularArticles as jest.Mock;

describe("Article", () => {
  test("renders loading state initially", () => {
    render(<Article />);
    expect(screen.getByText(/Loading the Articles../i)).toBeInTheDocument();
  });

  const mockArticles: api.ArticleModel[] = [
    {
      id: 1,
      title: "Example Article 1",
      abstract: "This is an example abstract for Article 1",
      url: "http://example.com/article1",
    },
    {
      id: 2,
      title: "Example Article 2",
      abstract: "This is an example abstract for Article 2",
      url: "http://example.com/article2",
    },
  ];

  test("renders articles after loading", async () => {
    mockedGetMostPopularArticles.mockResolvedValue([
      {
        id: 1,
        title: "Example Article 1",
        abstract: "This is an example abstract for Article 1",
        url: "http://example.com/article1",
      },
      {
        id: 2,
        title: "Example Article 2",
        abstract: "This is an example abstract for Article 2",
        url: "http://example.com/article2",
      },
    ]);

    render(
      <BrowserRouter>
        <ArticleList articles={mockArticles} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Example Article 1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Example Article 2/i)).toBeInTheDocument();
  });

  test("handles error state", async () => {
    mockedGetMostPopularArticles.mockRejectedValue(
      new Error("Failed to fetch articles")
    );

    render(<Article />);

    await waitFor(() =>
      expect(screen.getByText(/Error fetching articles/i)).toBeInTheDocument()
    );
  });
});

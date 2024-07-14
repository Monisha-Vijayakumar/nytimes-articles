import React, { useEffect, useState } from "react";
import { ArticleModel, getMostPopularArticles } from "../api/articleService";
import ArticleList from "./ArticleList";

// Article component - Parent component
const Article = () => {
  // using useState hook to manage the state of this component
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  //useEffect hook to connect with external api.
  useEffect(() => {
    // ES6 arrow function
    // Async/await to handle async operation
    const fetchArticles = async () => {
      try {
        const articles = await getMostPopularArticles();
        setArticles(articles);
      } catch (error) {
        setError("Error fetching articles");
      }
      setIsLoading(false);
    };
    fetchArticles();
  }, []); //to run once - only on initial load

  return (
    <div>
      {/* show loading message when api call is happening */}
      {isLoading && <div>Loading the Articles..</div>}
      {/* to show the error message when api call fails */}
      {error && <div> {error}</div>}
      {/* to show the articles list received from api, if there is no error and not loading */}
      {!isLoading && !error && <ArticleList articles={articles} />}
    </div>
  );
};

export default Article;

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArticleModel } from "../api/articleService";

interface ArticleListProps {
  articles: ArticleModel[];
}

const ArticleList = (props: ArticleListProps) => {
  const { articles } = props;
  const navigate = useNavigate(); // to perform routing

  // ES6 arrow function
  const handleArticleClick = (id: string) => {
    navigate(`/article/${id}`); // routes defined in app.tsx
  };

  return (
    <div>
      <h1>NY Times Popular Articles</h1>
      {/* looping over articles list to display the data */}
      <ul>
        {articles.map((article) => (
          <li
            key={article.id}
            onClick={() => handleArticleClick(article.id.toString())}
          >
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;

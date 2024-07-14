import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleModel, getMostPopularArticles } from "../api/articleService";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>(); // to get params from url route
  const [article, setArticle] = useState<ArticleModel | null>(null);
  // using useState hook to manage the state of this component

  //useEffect hook to connect with external api.
  useEffect(() => {
     //ES6 arrow function
    const fetchArticleDetails = async () => {
      const articles = await getMostPopularArticles();
      // finding the selected article using article id.
      const selectedArticle = articles.find(
        (article) => article.id.toString() === id
      );
      setArticle(selectedArticle || null);
    };
    fetchArticleDetails();
  }, [id]); // runs everytime, when there is a change in id. Its the dependency array.

  return (
    <div>
      {/* null check and displaying the selected article data */}
      {!article && <div>Loading the article details..</div>}
      {article && (
        <>
          <div>
            Genre: {article.section} / {article.subsection}
          </div>
          <h2>{article.title}</h2>
          <div>Published On: {article.published_date}</div>
          <p>{article.abstract}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </>
      )}
    </div>
  );
};

export default ArticleDetail;

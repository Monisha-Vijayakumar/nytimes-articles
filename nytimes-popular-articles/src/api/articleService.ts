import axios from 'axios';

const API_KEY = 'iUGsRKjXYK3sGgz0potu47VAMnxA5yx7'; // My API key 
const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2';

// model of article api response
export interface ArticleModel {
  id: number;
  title: string;
  abstract: string;
  url: string;
  [key: string]: any;
}

export const getMostPopularArticles = async (): Promise<ArticleModel[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/viewed/1.json?api-key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch articles');
  }
};

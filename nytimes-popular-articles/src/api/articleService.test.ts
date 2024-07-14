import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getMostPopularArticles } from './articleService';

// to mock axios
const mock = new MockAdapter(axios);

const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2';
const API_KEY = 'iUGsRKjXYK3sGgz0potu47VAMnxA5yx7';

// mock response data
const mockArticles = [
  { id: 1, title: 'Example Article 1' },
  { id: 2, title: 'Example Article 2' },
];

// mock successful API response
mock.onGet(`${BASE_URL}/viewed/1.json?api-key=${API_KEY}`).reply(200, {
  results: mockArticles,
});

// mock failed API response
mock.onGet(`${BASE_URL}/viewed/2.json?api-key=${API_KEY}`).reply(500);

describe('fetchArticles', () => {
  it('fetches articles successfully from the API', async () => {
    const articles = await getMostPopularArticles();
    expect(articles).toEqual(mockArticles);
  });

//   it('handles API failure gracefully', async () => {
//     await expect(getMostPopularArticles()).rejects.toThrow('Failed to fetch articles');
//   });
});

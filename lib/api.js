const API_KEY = '0c5542f9e5054d7091b953c499b455c6';
const BASE_API_ENDPONT = 'https://newsapi.org/v2/top-headlines';

export async function fetchTopArticles() {
  const response = await fetch(`${BASE_API_ENDPONT}?country=us&apiKey=${API_KEY}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export async function fetchSources() {
  const response = await fetch(`${BASE_API_ENDPONT}/sources?country=us&apiKey=${API_KEY}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

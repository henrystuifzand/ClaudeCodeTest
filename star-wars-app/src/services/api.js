const BASE_URL = 'https://swapi.dev/api';

/**
 * Fetch all Star Wars films from the API
 * @returns {Promise<Array>} Array of film objects
 */
export const fetchFilms = async () => {
  try {
    const response = await fetch(`${BASE_URL}/films`);
    if (!response.ok) {
      throw new Error('Failed to fetch films');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error;
  }
};

/**
 * Fetch a single resource from a URL
 * @param {string} url - The URL to fetch
 * @returns {Promise<Object>} The resource data
 */
export const fetchResource = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch resource from ${url}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching resource:', error);
    throw error;
  }
};

/**
 * Fetch multiple resources from an array of URLs
 * @param {Array<string>} urls - Array of URLs to fetch
 * @returns {Promise<Array>} Array of resource data
 */
export const fetchMultipleResources = async (urls) => {
  try {
    const promises = urls.map(url => fetchResource(url));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching multiple resources:', error);
    throw error;
  }
};

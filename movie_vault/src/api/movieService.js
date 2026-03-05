// src/api/movieService.js

import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});


export const IMG_BASE    = 'https://image.tmdb.org/t/p/w500';
export const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';

// ── Endpoints ──────────────────────────────────────────────────

// Trending — what shows on the home page hero
export const getTrending = async (type = 'all', time = 'week') => {
  const res = await tmdb.get(`/trending/${type}/${time}`);
  return res.data.results;
};

// Search — movies AND tv shows
export const searchContent = async (query, page = 1) => {
  const res = await tmdb.get('/search/multi', {
    params: { query, page, include_adult: false },
  });
  return res.data;  // { results, total_pages, total_results }
};

// Single movie details
export const getMovieDetails = async (id) => {
  const res = await tmdb.get(`/movie/${id}`, {
    params: { append_to_response: 'videos,credits' },
    // append_to_response = get videos + cast in ONE request
  });
  return res.data;
};

// Single TV show details
export const getTVDetails = async (id) => {
  const res = await tmdb.get(`/tv/${id}`, {
    params: { append_to_response: 'videos,credits' },
  });
  return res.data;
};

// Movies by genre
export const getByGenre = async (genreId, type = 'movie') => {
  const res = await tmdb.get(`/discover/${type}`, {
    params: { with_genres: genreId, sort_by: 'popularity.desc' },
  });
  return res.data.results;
};

// Genre list — for the filter bar
export const getGenres = async (type = 'movie') => {
  const res = await tmdb.get(`/genre/${type}/list`);
  return res.data.genres;
};
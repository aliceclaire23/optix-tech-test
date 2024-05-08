import { Movie, MovieCompanies } from '../helpers/types';

export const getMovies = async (): Promise<Movie[]> => {
	try {
		const response = await fetch('http://localhost:3000/movies');
		const movieData: Movie[] = await response.json();
		return movieData;
	} catch (error) {
		throw error;
	}
};

export const getMovieCompanies = async (): Promise<MovieCompanies[]> => {
	try {
		const response = await fetch('http://localhost:3000/movieCompanies');
		if (!response.ok) {
			throw new Error('Failed to fetch movies companies');
		}
		const movieCompanyData: MovieCompanies[] = await response.json();
		return movieCompanyData;
	} catch (error) {
		throw error;
	}
};

export const postReview = async (movieId: string, review: string): Promise<void> => {
	try {
		const response = await fetch('http://localhost:3000/submitReview', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ movieId, review }),
		});
		console.log(response);
		if (!response.ok) {
			throw new Error('Failed to post review');
		}
	} catch (error) {
		throw new Error('Failed to post review');
	}
};

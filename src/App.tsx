import { useState, useEffect } from 'react';

import { Alert, CircularProgress, Container, Fab, Snackbar, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';

import { Movie, MovieCompanies, SnackbarType } from './helpers/types';
import { getMovies, getMovieCompanies } from './api/api';
import { FormContainer, MoviesTable, ReviewForm } from './components';

export const App = () => {
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [movieCompanies, setMovieCompanies] = useState<MovieCompanies[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
	const [snackBarMessage, setSnackbarMessage] = useState<string>('');
	const [snackBarType, setSnackbarType] = useState<SnackbarType>('info');

	const fetchMovies = async () => {
		setLoading(true);
		try {
			const movieData = await getMovies();
			setMovies(movieData);
			removeAlert();
		} catch (error) {
			createAlert('Unable to fetch movies', 'error');
		} finally {
			setLoading(false);
		}
	};

	const fetchMovieCompanies = async () => {
		setLoading(true);
		try {
			const movieCompanyData = await getMovieCompanies();
			setMovieCompanies(movieCompanyData);
			removeAlert();
		} catch (error) {
			createAlert('Unable to fetch movie companies data', 'error');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies();
		fetchMovieCompanies();
	}, []);

	const refreshMovies = () => {
		fetchMovies();
		fetchMovieCompanies();
		setSelectedMovie(null);
	};

	const createAlert = (message: string, type: SnackbarType) => {
		setShowSnackbar(true);
		setSnackbarMessage(message);
		setSnackbarType(type);
	};

	const removeAlert = () => {
		setShowSnackbar(false);
		setSnackbarMessage('');
		setSnackbarType('info');
	};

	return (
		<Container>
			{loading ? (
				<CircularProgress />
			) : (
				<>
					<Typography variant="h2" component="h2" align="center" gutterBottom>
						Welcome to Movie database!
					</Typography>
					{movies.length ? (
						<>
							<Typography variant="h4" component="h4" gutterBottom align="center">
								Total movies displayed: {movies.length}
							</Typography>
							<MoviesTable movies={movies} movieCompanies={movieCompanies} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
						</>
					) : (
						<Typography variant="body1" gutterBottom>
							No movies found
						</Typography>
					)}
					<Fab variant="extended" size="medium" color="primary" onClick={refreshMovies}>
						<Refresh />
						Refresh
					</Fab>
					{selectedMovie && (
						<FormContainer onClose={() => setSelectedMovie(null)}>
							<ReviewForm selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} createAlert={createAlert} />
						</FormContainer>
					)}
					<Snackbar open={showSnackbar} autoHideDuration={6000} onClose={removeAlert}>
						<Alert onClose={removeAlert} severity={snackBarType === 'error' ? 'error' : 'success'} variant="filled">
							{snackBarMessage}
						</Alert>
					</Snackbar>
				</>
			)}
		</Container>
	);
};

import { memo, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper } from '@mui/material';

import { MappedMovie, Movie, MovieCompanies } from '../../helpers/types';
import { getAverage } from '../../helpers/utils';
import './MoviesTable.css';

type Props = {
	movies: Movie[];
	movieCompanies: MovieCompanies[];
	selectedMovie: Movie | null;
	setSelectedMovie: (value: Movie) => void;
};

export const MoviesTable: React.FC<Props> = memo(({ movies, movieCompanies, selectedMovie, setSelectedMovie }) => {
	const [orderAsc, setOrderAsc] = useState<boolean>(true);

	const mappedMovies = movies
		.map((movie) => {
			const company = movieCompanies.find((f: any) => f.id === movie.filmCompanyId);
			return {
				id: movie.id,
				averageReview: Number(getAverage(movie.reviews)),
				title: movie.title,
				companyName: company ? company.name : '',
			};
		})
		.sort((a, b) => (orderAsc ? a.averageReview - b.averageReview : b.averageReview - a.averageReview));

	const handleClick = (id: number) => {
		const result = movies.find((movie) => movie.id === id);
		result && setSelectedMovie(result);
	};

	return (
		<TableContainer component={Paper} sx={{ margin: '1rem 0' }}>
			<Table aria-label="movies table">
				<TableHead>
					<TableRow className="tableHeader">
						<TableCell>Title</TableCell>
						<TableCell>
							<TableSortLabel active direction={orderAsc ? 'asc' : 'desc'} onClick={() => setOrderAsc(!orderAsc)}>
								Reviews
							</TableSortLabel>
						</TableCell>
						<TableCell>Company</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{mappedMovies.map((movie: MappedMovie) => (
						<TableRow key={movie.title} onClick={() => handleClick(movie.id)} hover selected={movie.id === selectedMovie?.id}>
							<TableCell component="th" scope="row">
								{movie.title}
							</TableCell>
							<TableCell>{movie.averageReview}</TableCell>
							<TableCell>{movie.companyName}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
});

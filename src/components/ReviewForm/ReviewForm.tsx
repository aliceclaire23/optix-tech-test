import { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';

import { Movie, SnackbarType } from '../../helpers/types';
import { postReview } from '../../api/api';
import { validateReview } from '../../helpers/utils';

type Props = {
	selectedMovie: Movie | null;
	setSelectedMovie: (value: null) => void;
	createAlert: (message: string, type: SnackbarType) => void;
};

export const ReviewForm: React.FC<Props> = ({ selectedMovie, setSelectedMovie, createAlert }) => {
	const [review, setReview] = useState<string>('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { isValid, message } = validateReview(review);

		if (isValid) {
			try {
				await postReview('movieId', review);
				setReview('');
				setSelectedMovie(null);
				createAlert(`Successfully submitted review for ${selectedMovie?.title}`, 'info');
			} catch (error) {
				createAlert('Unable to submit review', 'error');
			}
		} else {
			createAlert(message, 'error');
		}
	};

	return (
		<Container maxWidth="sm">
			<Typography gutterBottom>
				Please leave a review for <i>{selectedMovie?.title}</i> below
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField id="reviewInput" label="Review" onChange={(e) => setReview(e.target.value)} error={review.length > 100} helperText={`${review.length}/100 Characters`} variant="filled" fullWidth multiline rows={4} />
				<Button type="submit" disabled={review.length < 1 || review.length > 100}>
					Submit
				</Button>
			</form>
		</Container>
	);
};

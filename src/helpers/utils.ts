export const getAverage = (array: number[]) => {
	const average = array.reduce((acc: number, i: number) => acc + i, 0) / array.length;
	return Number(average.toString().substring(0, 3));
};

export const validateReview = (review: string) => {
	if (review.length < 1) return { isValid: false, message: 'Unable to submit, review is empty.' };
	if (review.length > 100) return { isValid: false, message: 'Unable to submit, review must be 100 characters or less.' };
	else return { isValid: true, message: '' };
};

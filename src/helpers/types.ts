export type Movie = {
	id: number;
	reviews: number[];
	title: string;
	filmCompanyId: string;
	cost: number;
	releaseYear: number;
};

export type MappedMovie = {
	id: number;
	averageReview: number;
	title: string;
	companyName: string;
};

export type MovieCompanies = {
	id: string;
	name: string;
};

export type SnackbarType = 'info' | 'error';

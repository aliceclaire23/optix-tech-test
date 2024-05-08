import { useState } from 'react';
import { Box, Fab, Modal, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import { Close } from '@mui/icons-material';

type Props = {
	children: React.ReactNode;
	onClose: () => void;
};

export const FormContainer: React.FC<Props> = ({ children, onClose }) => {
	const theme = useTheme();
	const showModal = useMediaQuery(theme.breakpoints.down('md'));
	const [open, setOpen] = useState<boolean>(showModal);

	const handleClose = () => {
		onClose();
		setOpen(false);
	};
	return (
		<>
			{showModal ? (
				<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
					<Box component={Paper} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
						<Fab variant="extended" size="small" onClick={handleClose} sx={{ margin: '1rem' }}>
							Close <Close fontSize="small" />
						</Fab>
						{children}
					</Box>
				</Modal>
			) : (
				<div>{children}</div>
			)}
		</>
	);
};

import { Snackbar, SnackbarOrigin } from '@mui/material'
import React from 'react'
import { MessageType } from 'types/MessageType.enum';
import './InfoDialog.scss';

interface State extends SnackbarOrigin {
	open: boolean;
}

interface Props {
	type: MessageType;
	message: string;
	open: boolean;
}

const InfoDialog: React.FC<Props> = ({ type, message, open }) => {

	const [state, setState] = React.useState<State>({
		open,
		vertical: 'top',
		horizontal: 'center',
	});
	const { vertical, horizontal } = state;

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	return (
		<div className='info-dialog'>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				onClose={handleClose}
				message={message}
				key={vertical + horizontal}
			/>
		</div>
	)
}

export default InfoDialog


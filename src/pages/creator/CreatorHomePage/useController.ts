import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../store/actions/common';

export function useCreatorHomeController() {
	const dispatch = useDispatch();

	const onSignOut = useCallback(() => {
		dispatch(logoutUser())
	}, [dispatch]);

	return {
		onSignOut,
	};
}



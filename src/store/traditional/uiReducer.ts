export interface UiState {
	theme: 'light' | 'dark';
	isSidebarOpen: boolean;
}

const initialState: UiState = {
	theme: 'light',
	isSidebarOpen: false,
};

export type UiAction =
	| { type: 'UI/TOGGLE_SIDEBAR' }
	| { type: 'UI/SET_THEME'; payload: UiState['theme'] };

export default function uiReducer(state: UiState = initialState, action: UiAction): UiState {
	switch (action.type) {
		case 'UI/TOGGLE_SIDEBAR':
			return { ...state, isSidebarOpen: !state.isSidebarOpen };
		case 'UI/SET_THEME':
			return { ...state, theme: action.payload };
		default:
			return state;
	}
}



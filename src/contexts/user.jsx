import { createContext, useReducer, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// To access the context state
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

// Dictate new state of context
const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				currentUser: payload,
			};
		default:
			throw new Error("Unhandled userReducer:" + type);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const { currentUser } = state;

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			setCurrentUser(user);
			console.log("Session restored: ", user);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

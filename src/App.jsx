import "./App.css";
import { useContext } from "react";
import { UserContext } from "./contexts/user";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/sign-up-form/sign-up-form.component";
import SignInForm from "./components/sign-in-form/sign-in-form.component";
import UserDashboard from "./components/user-dashboard/user-dashboard.component";

function App() {
	const { currentUser } = useContext(UserContext);
	const RootComponent = currentUser ? <UserDashboard /> : <SignUpForm />;
	return (
		<Routes>
			<Route path="/" element={RootComponent} />
			<Route path="/sign-in" element={<SignInForm />} />
		</Routes>
	);
}

export default App;

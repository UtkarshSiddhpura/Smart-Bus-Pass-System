import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/sign-up-form/sign-up-form.component";
import SignInForm from "./components/sign-in-form/sign-in-form.component";

function App() {
	return (
		<Routes>
			<Route path="/" element={<SignUpForm />} />
			<Route path="/sign-in" element={<SignInForm />} />
		</Routes>
	);
}

export default App;

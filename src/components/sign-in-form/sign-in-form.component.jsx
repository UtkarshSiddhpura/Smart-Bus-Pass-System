import { useState } from "react";
import {
	signInUserFromEmailFromAuth,
	signInWithGooglePopup,
	createUserFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { Link } from "react-router-dom";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const signInWithGoogle = async () => {
		const response = await signInWithGooglePopup();
		await createUserFromAuth(response.user);
	};

	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// returns response => userCred
			await signInUserFromEmailFromAuth(email, password);
			resetFormFields();

		} catch (err) {
			switch (err.code) {
				case "auth/wrong-password":
					alert("Incorrect Password for the Email");
					break;
				case "auth/user-not-found":
					alert("no user with email exists")
					break;
				default: 
					console.log(err);
			}
		}
	};

	return (
		<div className="sign-in-container">
			<h2>Sign in using Mobile no.</h2>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Mobile No."
					inputOptions={{
						onChange: handleChange,
						name: "email",
						value: email,
						required: true,
						type: "email",
						autoComplete: "off",
						placeholder: "Enter your Mobile no.",
					}}
				/>
				<FormInput
					label="Password"
					inputOptions={{
						onChange: handleChange,
						name: "password",
						value: password,
						required: true,
						type: "password",
						placeholder: "Enter Password",
					}}
				/>
				<Button
					children= "Sign in"
					buttonType="button-primary"
					type="button"
				/>
				<div>
					<span>Don't have an account ?</span>
					<Link className="sign-link" to="/">
						Sign-Up
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;

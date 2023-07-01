import { useState, useEffect } from "react";
import { signUpUser, verifyUserOtp, renderCaptcha } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Select from "../select-field/select-field.component";
import Button from "../button/button.component";
import { Link } from "react-router-dom";
import "./sign-up-in-form.styles.scss";

const API = "https://api.data.gov.in/resource/44bea382-c525-4740-8a07-04bd20a99b52?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bdistrict_name%5D=";

const defaultFormFields = {
	phone: "+91 ",
	username: "",
	aadharNo: "",
	password: "",
	otp: "",
};
const options = [
	{ id: 232322, name: "svmit", domain: "org.abc" },
	{ id: 38997, name: "polytechnic", domain: "in.svimt" },
];

const SignUpForm = () => {
	useEffect(() => {
		renderCaptcha();
	}, []);

	const [formFields, setFormFields] = useState(defaultFormFields);
	const [expandForm, setExpandForm] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [district, setDistrictName] = useState("");
	const { phone, otp, username, aadharNo, password } = formFields;

	const [ClgOptions, setClgOptions] = useState([]);
	useEffect(() => {
		if (!district || district.length < 4) return;
		let query = district.trim().toLowerCase();
		query = query.charAt(0).toUpperCase() + query.slice(1);
		async function fetchClgOptions() {
			try {
				const response = await fetch(API + query);
				const jsonData = await response.json();
				setClgOptions(jsonData.records);
			} catch (e) {}
		}
		fetchClgOptions();
	}, [district]);

	const resetForm = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleOptionsChange = (event) => {
		const { name, value } = event.target;
		switch (name) {
			case "district":
				setDistrictName(value);
				break;
		}
	};

	const signUpWithPhone = async (e) => {
		e.preventDefault();

		setButtonDisabled(true);
		try {
			await signUpUser(phone);
			setExpandForm(true);
		} catch (e) {
			if (e.code) alert("Error in signing up user: " + e.code);
			console.log(e.message);
		}
		setButtonDisabled(false);
	};

	const verifyOtp = (e) => {
		e.preventDefault();
		verifyUserOtp(otp);
	};

	const goBackToResubmit = () => {
		setExpandForm(false);
	};

	return (
		<div className="sign-up-container">
			<img className="pass-logo" src="./assets/pass.jpg" alt="Logo of bus pass" />
			<h2>Welcome to E Bus-Pass</h2>
			{expandForm ? (
				<>
					<form onSubmit={verifyOtp}>
						<FormInput
							label="Password"
							inputOptions={{
								onChange: handleChange,
								name: "otp",
								value: otp,
								type: "number",
								maxLength: 6,
								minLength: 6,
								required: true,
								autoComplete: "off",
								placeholder: "Enter OTP",
							}}
						/>
						<Button children="Verify Otp" buttonType="button-dark" type="submit" />
						<div>
							<span>Wrong Number ?</span>
							<Link className="sign-link" to="/" onClick={goBackToResubmit}>
								Go Back
							</Link>
						</div>
					</form>
				</>
			) : (
				<form onSubmit={signUpWithPhone}>
					<FormInput
						label="Enter Username"
						inputOptions={{
							onChange: handleChange,
							name: "username",
							value: username,
							type: "text",
							required: true,
						}}
					/>
					<FormInput
						label="Enter City"
						inputOptions={{
							name: "district",
							value: district,
							onChange: handleOptionsChange,
							type: "text",
							required: true,
						}}
					/>
					<Select name="district" selectOptions={ClgOptions} />
					<FormInput
						label="Enter Mobile no."
						inputOptions={{
							onChange: handleChange,
							name: "phone",
							value: phone,
							type: "tel",
							minLength: 12,
							placeholder: "+91...",
							required: true,
						}}
					/>
					<FormInput
						label="Enter Password"
						inputOptions={{
							onChange: handleChange,
							name: "password",
							value: password,
							type: "password",
							minLength: 10,
							required: true,
						}}
					/>
					<Button children="Sign-Up" buttonType="button-dark" type="submit" id="sign-up-button" disabled={buttonDisabled} />
				</form>
			)}
			<div>
				<span>Already have an Account ?</span>
				<Link className="sign-link" to="/sign-in">
					Sign-In
				</Link>
			</div>
			<div id="recaptcha-container"></div>
		</div>
	);
};

export default SignUpForm;

import { initializeApp } from "firebase/app";
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendEmailVerification,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDOaa608aTROn9KRUzlzcBv2WHxeNs3JYg",
	authDomain: "e-bus-pass-2567a.firebaseapp.com",
	projectId: "e-bus-pass-2567a",
	storageBucket: "e-bus-pass-2567a.appspot.com",
	messagingSenderId: "222064828412",
	appId: "1:222064828412:web:5b1bbafd8937c9d862dc79",
	measurementId: "G-C95WMXXFX7",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();

export const verifyUserOtp = async (otp) => {
	try {
		// const {user}
		const result = await window.confirmationResult.confirm(otp);
		console.log(result.user);
		alert("Signing Up Successfully done");
	} catch (e) {
		if (e.code) alert("Error in verifying Otp: " + e.code);
	}
};

export const signUpUser = async (phoneNumber) => {
	let appVerifier = window.recaptchaVerifier;
	window.confirmationResult = await signInWithPhoneNumber(
		auth,
		phoneNumber,
		appVerifier,
	);
};

export const renderCaptcha = () => {
	window.recaptchaVerifier = new RecaptchaVerifier(
		"recaptcha-container",
		{
			size: "invisible"
		},
		auth
	);
};

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, provider);
export const db = getFirestore();
export const createUserFromAuth = async (userAuth, additionalInfo = {}) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		try {
			const { displayName, email } = userAuth;
			const createdAt = new Date();

			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (e) {
			console.log("There is some err with user setDoc err: " + e);
		}
	}

	return userDocRef;
};
export const createUserFromEmailFromAuth = async (email, password) => {};
export const signInUserFromEmailFromAuth = async (email, password) => {};

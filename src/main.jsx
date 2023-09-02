import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HashRouter>
			<UserProvider>
				<App />
			</UserProvider>
		</HashRouter>
	</React.StrictMode>
);

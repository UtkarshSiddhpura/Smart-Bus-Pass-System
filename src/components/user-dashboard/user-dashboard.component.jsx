import { useContext } from "react";
import { UserContext } from "../../contexts/user";

const UserDashboard = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<>
			{<h2>UserDashboard: {currentUser.uid}</h2>}
		</>
	);
};

export default UserDashboard;

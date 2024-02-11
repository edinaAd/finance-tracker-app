import { UserAuth } from "context/AuthContext";
import { Navigate } from "react-router";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({ children }: any) => {
	const { user } = UserAuth();
	if (user ) {
		if (user.loginRedirect) return <Navigate to="/" />
		else return children;
	}
	return <LoadingSpinner />
};

export default ProtectedRoute;
import { UserAuth } from "context/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: any) => {
	const { user } = UserAuth();

	if (!user) {
		return <Navigate to='/' />;
	}
	return children;
};

export default ProtectedRoute;
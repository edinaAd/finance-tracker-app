import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from 'components/Login/Login';
import SignUp from 'components/SignUp/SignUp';
import Dashboard from 'components/Dashboard/Dashboard';
import { AuthContextProvider } from 'context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'
import DashboardChart from 'components/Dashboard/DashboardChart';
import Expenses from 'components/Expenses/Expenses';
import Income from 'components/Income/Income';
import Categories from 'components/Categories/Categories';
import PageNotFound from 'components/PageNotFound/PageNotFound';

function App() {

	return (
		<div className="">
			<AuthContextProvider>
				<Router>
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
						<Route path='/dashboardChart' element={<ProtectedRoute><DashboardChart /></ProtectedRoute>} />
						<Route path='/expenses' element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
						<Route path='/incomes' element={<ProtectedRoute><Income /></ProtectedRoute>} />
						<Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</Router>
			</AuthContextProvider>
		</div>
	);
}

export default App;

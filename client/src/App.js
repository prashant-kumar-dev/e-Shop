import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoutes';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CategoryForm from './pages/Admin/CategoryForm';
import ProductForm from './pages/Admin/ProductForm';
import UserForm from './pages/Admin/UserForm';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/dashboard' element={<PrivateRoute />}>
					<Route path='user' element={<Dashboard />} />
					<Route path='user/orders' element={<Orders />} />
					<Route path='user/profile' element={<Profile />} />
				</Route>
				<Route path='/dashboard' element={<AdminRoute />}>
					<Route path='admin' element={<AdminDashboard />} />
					<Route path='admin/create-category' element={<CategoryForm />} />
					<Route path='admin/create-product' element={<ProductForm />} />
					<Route path='admin/create-user' element={<UserForm />} />
				</Route>
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/policy' element={<Policy />} />
				<Route path='/register' element={<Register />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<Pagenotfound />} />
			</Routes>
		</>
	);
}

export default App;

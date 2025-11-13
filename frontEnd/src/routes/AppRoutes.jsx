import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'; //It's your main listing—likely first user intent. Hence, not recommended for lazy load
import ErrorBoundary from '../components/ErrorBoundary';
import CartPage from '../pages/CartPage'; //Often accessed quickly;lazy loading may slow it down if cart is dynamic
import ThankYouPage from '../pages/ThankYouPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import ErrorPage from '../pages/ErrorPage';
import AdminLayout from '../admin/AdminLayout';
import Products from '../admin/Products';
import Dashboard from '../admin/Dashboard';
import Orders from '../admin/Orders';
import MainLayout from '../layout/MainLayout'
import ProtectedRout from '../pages/ProtectedRout';

const HomePage = lazy(()=>import('../pages/HomePage'));
  // Lazy loading HomePage to improve initial load time
  // This allows the HomePage component to be loaded only when it is needed, reducing the initial bundle size.
  // This is particularly useful for larger applications where the initial load time is critical for user experience.
  const LoginPage = lazy(()=>import('../pages/LoginPage'));
  const SignupPage = lazy(()=>import('../pages/SignupPage'));
  const CheckoutPage = lazy(()=>import('../pages/CheckoutPage'));
  const ProductDetailsPage = lazy(()=>import('../pages/ProductDetailsPage'));
  const UserOrdersPage = lazy(()=>import('../pages/UserOrdersPage'));
  const LogoutPage = lazy(()=>import('../pages/Logout'));
  const UsersPage = lazy(()=>import('../admin/UsersPage'));
  const AdminProfilePage = lazy(()=>import('../admin/ProfilePage'));
  const ProfilePage = lazy(()=>import('../pages/ProfilePage'));
  const ForgotPasswordPage = lazy(()=>import('../pages/ForgotPasswordPage'));
  const ResetPasswordPage = lazy(()=>import('../pages/ResetPassword'))

const AppRoutes = ({mode, setMode}) => {
  return (
    <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout mode={mode} setMode={setMode}/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/product/:id" element={<ErrorBoundary><ProductDetailsPage/></ErrorBoundary>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/logout" element={<LogoutPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/thankyou" element={<ErrorBoundary><ThankYouPage/></ErrorBoundary>}/>
          <Route path="/orders" element={<ErrorBoundary><UserOrdersPage/></ErrorBoundary>}/>
          <Route path="/search" element={<SearchResultsPage/>}/> {/* Reuse ProductsPage for search results */}
          <Route path='/profile' element={<ErrorBoundary><ProfilePage/></ErrorBoundary>}/>
          <Route path="/*" element={<ErrorPage/>}/>
        </Route>
        {/* Admin routes: This uses nested routing so all admin pages share the same layout.*/}
        <Route path="/admin" element={<ProtectedRout allowedRoles={['ADMIN']}>
              <AdminLayout/>
          </ProtectedRout>}
          >
            <Route index element={<Dashboard/>} />
            <Route path='products' element={<Products/>}/>
            <Route path='orders' element={<Orders/>}/>
            <Route path="users" element={<UsersPage/>}/>
            <Route path="profile" element={<AdminProfilePage/>}/>
            <Route path="*" element={<ErrorPage message="Admin Page Not Found"/>}/>
        </Route>
        <Route path="/admin/unauthorized" element={<ErrorPage message="You are not authorized to access this page."/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="/reset-password" element={<ResetPasswordPage/>}/>
    </Routes>
  )
}

export default AppRoutes

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Root from './Routers/Root'
import About from './pages/About'
import Page404 from './pages/Page404'
import Cart from './pages/cart/Cart'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Catalogues from './pages/Catalogues'
import ForgotPassword from './pages/auth/ForgotPassword'
import Catalogues_Details from './pages/Catalogues_Details'
import CheckOut from './pages/CheckOut'
import Contect from './pages/Contect'
import UserProfile from './pages/users/UserProfile'
import PersonalData from './pages/users/userDitails/PersonalData';

import ChangePassrord from './pages/users/userDitails/ChangePassrord';
import DeliveryAddresses from './pages/users/userDitails/DeliveryAddresses';
import Cartmenu from './pages/users/userDitails/Cart';

import Dashbord from './pages/users/Dashbord';

// admin pages
import AdminDashbord from './pages/admin/Dashbord/AdminDashbord';
import Admin from './pages/admin/Admin';
import Costomers from './pages/admin/Dashbord/Costomers';
import Categories from './pages/admin/Dashbord/Categories';
import Orders from './pages/admin/Dashbord/Orders';
import Products from './pages/admin/Dashbord/Products';

import GetProducts from './pages/admin/Dashbord/ProductsHandle/GetProducts';
import CreateProduct from './pages/admin/Dashbord/ProductsHandle/CreateProduct';
import UpdateProduct from './pages/admin/Dashbord/ProductsHandle/UpdateProduct';
import UsersOrders from './pages/users/UsersOrders';

import { Toaster } from 'react-hot-toast';
import UserOrders from './pages/users/userDitails/UserOrders';
import FAQS from './pages/FAQS';
// import PrivacyPolicy from './pages/PrivacyPolicy';



function App() {




  return (
    <>

      <div className=''>
        <Routes>
          <Route path='/' element={<Root />} >
            <Route index element={<Home />} />

            {/* 404 */}

            <Route path='*' element={<Page404 />} />
            <Route path='about-us' element={<About />} />
            <Route path='contect-us' element={<Contect />} />
            <Route path='FAQS' element={<FAQS/>}  />
            {/* <Route path='Privacy-Policy' element={<PrivacyPolicy/>}  /> */}

            {/* cart */}
            <Route path='shoping-cart' element={<Cart />} />
            <Route path='check-out' element={<CheckOut />} />
            {/* catelogues */}
            <Route path='catelogues/:category' element={<Catalogues />} />
            <Route path='catelogues/catelogues-details/:id' element={<Catalogues_Details />} />


            {/* auth */}

            <Route path='auth' element={<SignIn />} />
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
            <Route path='forgot-password' element={<ForgotPassword />} />

            {/* users */}
            <Route path='user' >
              <Route path='user-profile' element={<UserProfile />} >
                <Route path='' element={<PersonalData />} />
                <Route path="delivery-addresses" element={<DeliveryAddresses />} />
                <Route path="cart" element={<Cartmenu />} />
                <Route path="change-password" element={<ChangePassrord />} />
                <Route path="user-order" element={<UserOrders/>} />
              </Route>

              <Route path='dashbord' element={<Dashbord />} />
              <Route path="orders" element={<UsersOrders />} />
              <Route path='catelogues' element={<About />} />
            </Route>

            {/* admin */}
            <Route path='admin'>
              <Route path='dashbord' element={<Admin />} >
                <Route path='' element={<AdminDashbord />} />
                <Route path='users' element={< Costomers />} />
                <Route path='categories' element={<Categories />} />
                <Route path='orders' element={<Orders />} />

                <Route path='products' element={<Products />} >
                  <Route path='' element={<GetProducts />} />
                  <Route path='create' element={<CreateProduct />} />
                  <Route path='update/:slug' element={<UpdateProduct />} />
                </Route>
              </Route>

            </Route>
          </Route>
        </Routes>
      </div>

      <Toaster />

    </>
  )
}

export default App


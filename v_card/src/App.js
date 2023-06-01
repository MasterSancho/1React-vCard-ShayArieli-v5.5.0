import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore';
import Category from './components/Category';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Vcard from './pages/Vcard';
import ForgotPassword from './pages/ForgotPassword';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import Reference from './pages/Reference';

const App = () => {
 return (
  <>
   <Router>
    <Routes>
     <Route path='/explore' element={<Explore />} />
     <Route path='/category/:categoryName' element={<Category />} />
     <Route path='/sign-in' element={<SignIn />} />
     <Route path='/sign-up' element={<SignUp />} />
     <Route path='/profile' element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
     </Route>
     <Route path='/' element={<Vcard />} />
     <Route path='/reference' element={<Reference />} />
     <Route path='/forgot-password' element={<ForgotPassword />} />
     <Route path='/create-listing' element={<CreateListing />} />
     <Route path='/edit-listing/:listingId' element={<EditListing />} />
     <Route path='/category/:categoryName/:listingId' element={<Listing />} />
    </Routes>
    <Navbar />
   </Router>

   <ToastContainer />
  </>
 );
};

export default App;

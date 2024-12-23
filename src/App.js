import './App.css';
import './fonts.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './FormManager/Admin';
import Seller from './FormManager/Seller';
import User from './FormManager/User';

import { CartProvider } from './context/cartContext';
// import Menu from './Menu/Menu';

// import Login from './Login';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/*" element={<User />} />
            <Route path="/seller/*" element={<Seller />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
export default App;

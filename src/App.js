// Pages
import SignInPage     from './pages/SignInPage';
import HomePage       from './pages/HomePage';
import ProfilePage    from './pages/ProfilePage';
import DiningHallPage from './pages/DiningHallPage';
import NewReviewPage from './pages/NewReviewPage';
import MenuPage from './pages/MenuPage';
// Components and Script
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import { createContext, useState } from 'react';
import { HiCurrencyBangladeshi } from 'react-icons/hi';
document.documentElement.setAttribute('color-scheme', 'light');
console.log = console.warn = console.error = () => {};

function App() {
	return (
    
    <Router>
      <AuthContextProvider>
        <div className='App'>
          <Routes>
            <Route exact path="/" element={<SignInPage />} />
            <Route exact path="/home" element={<Protected><HomePage /></Protected>} />
            <Route exact path="/profile" element={<Protected><ProfilePage /></Protected>} />
            <Route exact path="/dininghall" element={<Protected><DiningHallPage /></Protected>} />
            <Route exact path="/newreview" element={<Protected><NewReviewPage /></Protected>} />
            <Route exact path="/menu" element={<Protected><MenuPage /></Protected>} />
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>

  );
}

export default App;



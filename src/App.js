// Pages
import SignInPage     from './pages/SignInPage';
import HomePage       from './pages/HomePage';
import ProfilePage    from './pages/ProfilePage';
import DiningHallPage from './pages/DiningHallPage';
// Components and Script
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';

function App() {

  let test = "123";

	return (
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route exact path="/home" element={<Protected><HomePage /></Protected>} />
          <Route exact path="/profile" element={<Protected><ProfilePage /></Protected>} />
          <Route exact path="/dininghall" element={<Protected><DiningHallPage /></Protected>} />
        </Routes>
      </div>
    </Router>
	);
}

export default App;



// Pages
import SignInPage     from './pages/SignInPage';
import ProfilePage    from './pages/ProfilePage';
import HomePage       from './pages/HomePage';
import DiningHallPage from './pages/DiningHallPage';
// Modules
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		// <Router>
    //   <div className='App'>
    //     <Routes>
    //       <Route exact path="/" element={<SignInPage />} />
    //     </Routes>
    //   </div>
		// </Router>
    <div className='grid-4'>
      <SignInPage />
      <HomePage />
      <ProfilePage />
      <DiningHallPage />
    </div>
	);
}

export default App;

import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignInPage = () => {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
		// try {
		// 	await googleSignIn();
		// } catch (error) {
		// 	console.log(error);
		// }
	};

    // useEffect(() => {
	// 	if (user != null)
	// 		navigate('/home')
	// }, [user]);

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page signin-wrapper'>
                <div className='center-wrapper'>
                    <div className='logo' />
                    <h1>
                        RateMyFood
                    </h1>
                </div>
                <div className='spacer'></div>
                <button className='primary'
                        onClick={ handleGoogleSignIn }>
                    Sign in with Google
                </button>
            </div>   
            <div className='sticky-bottom'>
                <div className='gesture-section no-border'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
const SignInPage = () => {
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
                <button className='primary'>
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
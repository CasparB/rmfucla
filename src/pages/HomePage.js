import Recommendations from '../components/Recommendations';
import DiningHalls from '../components/DiningHalls'
import PostList from '../components/PostList';

const HomePage = () => {
    const username = 'Borborick';
    const posts = [
        {
            location: 'Epicuria',
            body: 'Post 1 blah blah'
        },
        {
            location: 'De Neve',
            body: 'Post 2 blah blah'
        },
        {
            location: 'Bruin Plate',
            body: 'Post 3 blah blah'
        },
        {
            location: 'Rendezvous',
            body: 'Post 4 blah blah'
        }
    ]

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='home-hero'>
                        <h1>Hi {username}!</h1>
                        <button className='actionable icon'>
                            <span>Prof</span>
                        </button>
                    </div>
                </div>
                {/* Display food recommendations */}
                <Recommendations />
                {/* Display dining halls */}
                <DiningHalls />
                <div className='divider'></div>
                {/* Display general posts */}
                <PostList posts={posts} />
            </div>
            <div className='sticky-bottom'>
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
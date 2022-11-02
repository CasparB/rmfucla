import PostList from '../components/PostList';
import UserStats from '../components/UserStats';

const ProfilePage = () => {
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
                    <div className='back-hero'>
                         <button className='actionable icon'>
                            <span>Back</span>
                        </button>
                        <h1>Profile</h1>
                    </div>
                </div>
                {/* Display user statistics */}
                <UserStats />
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

export default ProfilePage;
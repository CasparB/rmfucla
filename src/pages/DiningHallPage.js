import PostList from '../components/PostList';
import HallStats from '../components/HallStats';
import Menu from '../components/Menu';
import PostButton from '../components/PostButton';

const DiningHallPage = () => {
    const dininghall = 'Epicuria';
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
                        <h1>{dininghall}</h1>
                    </div>
                </div>
                {/* Display user statistics */}
                <HallStats />
                {/* Display menu */}
                <Menu />
                <div className='divider'></div>
                {/* Display general posts */}
                <PostList posts={posts} />
            </div>
            <div className='sticky-bottom'>
                <PostButton />
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default DiningHallPage;
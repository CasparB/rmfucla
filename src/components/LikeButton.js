import { UserAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { performLikeAction, getLikes } from '../script/fbAPI';

// Icons
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'

const LikeButton = ({review}) => {
    const { user } = UserAuth();
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    // Change code: action queue
    // -> frontend shows change instantaneously, queue completes in background
    // -> if queue operation fails, revert frontend change

    useEffect(() => {
        attemptGetLikes();
    });

    const attemptGetLikes = async () => {
        const data = await getLikes(review);
        if (data) {
            setLiked(data.includes(user.email));
            setLikes(data.length);
        }
    }

    const handleLikeAction = async () => {
        if (user) {
            await performLikeAction(user.email, review);
            attemptGetLikes();
        }
    }

    return (
        <div className='like-wrapper'>
            <p className='count-text'>{likes}</p>
            <button className='like-button'
                onClick={ handleLikeAction }>
                {!liked && <HiOutlineHeart className='stroke'/>}
                {liked && <HiHeart className='fill'/>}
            </button>
        </div>
    );
}
export default LikeButton;
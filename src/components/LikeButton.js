import { UserAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { performLikeAction, getLikes } from '../script/fbAPI';

// Icons
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'

const LikeButton = ({disabled, review, setLikes}) => {
    const { user } = UserAuth();
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
            // setLikes(data.length);
            setLikes(review, data);
        }
    }

    const handleLikeAction = async () => {
        if (user && !disabled) {
            await performLikeAction(user.email, review);
            attemptGetLikes();
        }
    }

    return (
        <div className='like-wrapper'>
            <p className='count-text'>{review.likes.length}</p>
            <button className='like-button'
                onClick={ handleLikeAction }>
                {!liked && <HiOutlineHeart className='stroke'/>}
                {liked && <HiHeart className='fill'/>}
            </button>
        </div>
    );
}
export default LikeButton;
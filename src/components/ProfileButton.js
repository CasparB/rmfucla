import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

// Icons
import { IoPersonCircleOutline } from 'react-icons/io5';

const ProfileButton = () => {
    const { user } = UserAuth();
    const [url, setURL] = useState(null);

    useEffect(() => {
        // Set user name
        if (user.photoURL)
            setURL(user.photoURL);
    }, [user]);

    return (
        <div>
            <Link to='/profile'>
                <button className='actionable img-wrapper'>
                    { url &&
                        <img src={url}
                            className='profile-img'/>
                    }
                    { !url &&
                        <IoPersonCircleOutline className='profile-icon'/>
                    }
                </button>
            </Link>
        </div>
    )
}

export default ProfileButton;
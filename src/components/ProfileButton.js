import { Link } from 'react-router-dom';

// Icons
import { IoPersonCircleOutline } from 'react-icons/io5'

const ProfileButton = () => {
    return (
        <div>
            <Link to='/profile'>
                <button className='actionable icon-wrapper'>
                    <IoPersonCircleOutline className='profile-icon'/>
                </button>
            </Link>
        </div>
    )
}

export default ProfileButton;
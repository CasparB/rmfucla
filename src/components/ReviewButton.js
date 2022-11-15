import { Link } from 'react-router-dom';

// Icons
import { AiOutlinePlus } from 'react-icons/ai'

const ReviewButton = () => {
    return (
        <div>
            <Link to='/newreview'>
                <button className='new-review'>
                    <AiOutlinePlus className='profile-icon'/>
                </button>
            </Link>
        </div>
    )
}

export default ReviewButton;
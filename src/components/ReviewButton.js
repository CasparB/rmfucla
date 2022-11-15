import { Link } from 'react-router-dom';

// Icons
import { AiOutlinePlus } from 'react-icons/ai'

const ReviewButton = ({ location }) => {
    return (
        <div>
            <Link to='/newreview' state={ location }>
                <button className='new-review'>
                    <AiOutlinePlus className='profile-icon'/>
                </button>
            </Link>
        </div>
    )
}

export default ReviewButton;
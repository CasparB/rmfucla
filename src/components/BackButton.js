import { Link } from 'react-router-dom';

// Icons
import { MdArrowBackIos } from 'react-icons/md'

const BackButton = () => {
    return (
        <div>
            <Link to='/home'>
                <button className='actionable icon-wrapper'>
                    <MdArrowBackIos className='back-icon'/>
                </button>
            </Link>
        </div>
    )
}

export default BackButton;
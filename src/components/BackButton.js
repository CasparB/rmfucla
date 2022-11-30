import { Link } from 'react-router-dom';
import history from '../script/helpers';

// Icons
import { MdArrowBackIos } from 'react-icons/md'

const BackButton = () => {
    let loc = history.length > 1 ? history[history.length-2][0] : '/home';
    const handleButtonClick = () => {
        history.pop();
    }
    return (
        <div>
            <Link to={loc}>
                <button className='actionable icon-wrapper'
                    onClick={ handleButtonClick } >
                    <MdArrowBackIos className='back-icon'/>
                </button>
            </Link>
        </div>
    )
}

export default BackButton;
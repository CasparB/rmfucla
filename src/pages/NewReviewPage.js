import { UserAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';
import StarRating from '../components/StarRating';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const NewReviewPage = () => {
    const { user } = UserAuth();
    const review = {
        author: user.email,
        rating: 0,
        food: 'empty'
    }

    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];

    const handleChange = () => {

    }

    const handleSubmit = event => {
        console.log(event);
    }

    return (
        <div className='frame'>
            <img className='iphone' src={require('../assets/images/iphone14.png')} />
            <div className='page'>
                <div className='sticky-top'>
                    <div className='back-hero'>
                        <BackButton />
                        <h1>New Review</h1>
                    </div>
                </div>

                <form onSubmit={ handleSubmit } className='review-form fullwidth-component'>
                    <div className='form-section'>
                        <h3>Location</h3>
                        <Dropdown options={options} value={defaultOption} placeholder='Select an option' />
                    </div>
                    <div className='form-section'>
                        <h3>Food</h3>
                        <Dropdown options={options} value={defaultOption} placeholder='Select an option' />
                    </div>
                    <div className='form-section'>
                        <h3>Rating</h3>
                        <StarRating />
                    </div>

                    <button className='primary'
                            onClick={ handleSubmit }>
                        Post review
                    </button>
                </form>

            </div>
            <div className='sticky-bottom'>
                <div className='gesture-section'>
                    <div className='gesture-bar' />
                </div>
            </div>
        </div>
    );
}

export default NewReviewPage;
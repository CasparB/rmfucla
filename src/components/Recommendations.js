import { db } from '../script/firebase';
import {getReviews} from '../script/fbAPI'

const Recommendations = () => {
    // Recommendations will use the user context to determine
    // dining hall recommendations for the logged in user. It
    // will display these recommendations in some neat form.

    const options = {
        author: "cbroekhuizen@g.ucla.edu",
        location: "Epicuria",
        from: "01/01/2022 2:21pm"
    };

    const tmp_thing = getReviews(options)
    console.log(tmp_thing)

    return (
        <div className='fullwidth-component'>
            <h2>Today's Recommendations!</h2>

            <div className="scrollable-div">
            The list of recomendations could go here!
            <ul>
            -chicke parm
            </ul>
            <ul>
            -pizza
            </ul>
            <ul>
            -chicken tenders
            </ul>
            <ul>
            -chicke parm
            </ul>
            <ul>
            -pizza
            </ul>
            <ul>
            -chicken tenders
            </ul>
            <ul>
            -chicke parm
            </ul>
            <ul>
            -pizza
            </ul>
            <ul>
            -chicken tenders
            </ul>
            <ul>
            -chicke parm
            </ul>
            <ul>
            -pizza
            </ul>
            <ul>
            -chicken tenders
            </ul>
            </div>
        </div>
    )
}

export default Recommendations;
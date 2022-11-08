const ReviewList = ({reviews}) => {
    // ReviewList takes an array of posts and renders each
    // post in a specific order. The ReviewList component 
    // should have a filter option, where posts can be
    // filtered based on a selectable criteria e.g. rating
    return (
        <div className='fullwidth-component'>
            <div className='space-between'>
                <h2>
                    Posts
                </h2>
                <button className='actionable'>
                    <span>Filter by</span>
                </button>
            </div>
            {/* Cool syntax to iterate over each item in an array */}
            { reviews.map((review, i) => (
                <div key={i}>
                    <div className='review'>
                        <p>{review.location}</p>
                        <p>{review.body}</p>
                    </div>
                </div> 
            ))}
        </div>
    )
}

export default ReviewList;
const PostList = ({posts}) => {
    // PostList takes an array of posts and renders each
    // post in a specific order. The PostList component 
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
            { posts.map((post, i) => (
                <div key={i}>
                    <div class='post'>
                        <p>{post.location}</p>
                        <p>{post.body}</p>
                    </div>
                </div> 
            ))}
        </div>
    )
}

export default PostList;
const ChangeThemeButton = () => {

    return (
        <button className='primary' 
            onClick={() => {
                if(document.documentElement.getAttribute('color-scheme') === 'dark'){
                document.documentElement.setAttribute('color-scheme', 'light');
                }
                else if(document.documentElement.getAttribute('color-scheme') === 'light'){
                document.documentElement.setAttribute('color-scheme', 'dark');
                } 
            }}>
            <span>Change Theme</span>
        </button>
    )
}

export default ChangeThemeButton;
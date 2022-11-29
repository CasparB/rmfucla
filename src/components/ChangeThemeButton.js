const ChangeThemeButton = () => {

    return (
        <button className='secondary' 
            onClick={() => {
                if(document.documentElement.getAttribute('color-scheme') === 'dark'){
                document.documentElement.setAttribute('color-scheme', 'light');
                }
                else if(document.documentElement.getAttribute('color-scheme') === 'light'){
                document.documentElement.setAttribute('color-scheme', 'dark');
                } 
            }}>
         Change Theme
        </button>
    )
}

export default ChangeThemeButton;
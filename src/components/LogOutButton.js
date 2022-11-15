import { UserAuth } from '../context/AuthContext';

const LogOutButton = () => {
    const { logOut } = UserAuth();

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button className='secondary'
            onClick={ handleLogOut }>
            <span>Log out</span>
        </button>
    )
}

export default LogOutButton;
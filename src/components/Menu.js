import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getFoods } from '../script/fbAPI'

const Menu = ({location}) => {
    // UserStats will use the user context to gather
    // dining hall recommendations for the logged in user. It
    // will display these recommendations in some neat form.
    const [menu, setMenu] = useState(null);
    const [breakfast, setBreakfast] = useState(null);
    const [lunch, setLunch] = useState(null);
    const [dinner, setDinner] = useState(null);
    const [extended, setExtended] = useState(null);

    const attemptSetMenu = async () => {
        const menu = await getFoods();
        setMenu(menu);
    };

    useEffect(() => {
        attemptSetMenu();
    }, [])

    useEffect(() => {
        if (!menu)
            return;

        let breakfastData = [];
        let lunchData = [];
        let dinnerData = [];
        let extendedData = [];
        // populate with for loop

        for (var i = 0; i < menu.length; i++) {
            if (menu[i].location !== location)
                continue;
            const foodType = menu[i].type;
            for (var j = 0; j < foodType.length; j++) {
                if (foodType[j] === "Breakfast") {
                    breakfastData.push(menu[i]);
                }
                if (foodType[j] === "Lunch") {
                    lunchData.push(menu[i]);
                }
                if (foodType[j] === "Dinner") {
                    lunchData.push(menu[i]);
                }
                if (foodType[j] === "Extended Dinner") {
                    extendedData.push(menu[i]);
                }
            }
        }
        if (breakfastData.length)
            setBreakfast(breakfastData);
        if (lunchData.length)
            setLunch(lunchData);
        if (dinnerData.length)
            setDinner(dinnerData);
        if (extendedData.length)
            setExtended(extendedData);
    }, [menu]);

    return (
        <div className='fullwidth-component'>
            <h2>Menu</h2>
            { (breakfast) &&
                <Link to='/menu' state={ [breakfast, "Breakfast"] }>
                    <button className='secondary nomargin'>Breakfast</button>
                </Link>
            }
            { (lunch) &&
                <Link to='/menu' state={ [lunch, "Lunch"] }>
                    <button className='secondary topslim'>Lunch</button>
                </Link>
            }   
            { (dinner) &&   
                <Link to='/menu' state={ [dinner, "Dinner"] }>
                    <button className='secondary topslim'>Dinner</button>
                </Link>
            }
            { (extended) &&   
                <Link to='/menu' state={ [extended, "Extended Dinner"] }>
                    <button className='secondary topslim'>Extended Dinner</button>
                </Link>
            }
        </div>
    )
}

export default Menu;
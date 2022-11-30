

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const FoodSearch = ({foods}) => {
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);

    const sanitize = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^A-Z0-9]/ig, '');
    }

    const attemptSetData = () => {
        let temp = [];
        for (var i = 0; i < foods.length; i++) {
            let index = sanitize(foods[i].name);
            index += sanitize(foods[i].location);
            temp.push([index, foods[i]]);
        }
        setData(temp);
    }

    const handleSearchChange = (val) => {
        let searchstr = sanitize(val);
        let temp = [];
        if (searchstr === '') {
            setResults(temp);
            return;
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i][0].includes(searchstr))
                temp.push(data[i][1]);
        }
        setResults(temp);
    }

    useEffect(() => {
        attemptSetData();
    }, [foods]);

    return (
        <div>
            <h2>Food Search</h2>
            <div className='data-placeholder'>
                <div className='search-wrapper'>
                    <FaSearch className='search-icon'/>
                    <input type='search-input' placeholder='E.g. avocado...' 
                        className='searchbar'
                        onChange={ e => handleSearchChange(e.target.value) }/>
                </div>
                { (results.length > 0) && 
                    <div className='results-wrapper'>
                        <h3>Results: {results.length}</h3>
                        {
                        results.map((result, i) => (
                            <div key={i}>
                                <p>{result.name}</p>
                            </div> 
                        ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default FoodSearch;

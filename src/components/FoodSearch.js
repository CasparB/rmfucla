

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const FoodSearch = ({foods}) => {
    const [results, setResults] = useState([]);
    const [results_type, setType] = useState([]);
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
        let all_type = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i][0].includes(searchstr)){
                temp.push(data[i][1]);
                let type = (data[i][1]).type;
                let result_string = ""
                for(let ind = 0; ind < type.length; ind++){
                   result_string = result_string.concat(type[ind]);
                   const next = ind + 1;
                   if( next < type.length){
                    result_string = result_string.concat(" and ");
                   }else{
                    result_string = result_string.concat(".");
                   }
                }
                all_type.push(result_string);
            }
        }
        setResults(temp);
        setType(all_type)
    }

    useEffect(() => {
        attemptSetData();
    }, [foods]);

    return (
        <div className='fullwidth-component'>
            <h2>Food search</h2>
            <div className='data-wrapper search'>
                <div className='search-wrapper'>
                    <FaSearch className='search-icon'/>
                    <input type='search-input' placeholder='Avocado...' 
                        className='searchbar'
                        onChange={ e => handleSearchChange(e.target.value) }/>
                </div>
                { (results.length > 0) && 
                    <div className='results-padding'>
                        <div className='results-wrapper'>
                            <h3>Results: {results.length}</h3>
                            {
                            results.map((result, i) => (
                                <div key={i}>
                                    <p className='food-rec'>{result.name} at </p>
                                    <p className='rec-location'>{result.location} for </p>
                                    <p className='rec-location'>{results_type[i]}</p>
                                </div> 
                            ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default FoodSearch;

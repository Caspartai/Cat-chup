import SelectSearch from 'react-select-search';
import SearchIcon from '../../img/searchIcon.png'
import "../../stylesheet/globalSearch.css"
import fuzzySearch from '../../util/fuzzySearch';


const GlobalSearchBar = (props) => {

    const options = [
        { name: 'Jim', value: 'j' },
        { name: 'Esther', value: 'es' },
        { name: 'Nathan', value: 'na' },

        // {
        //     type: 'group',
        //     name: 'Group name',
        //     items: [
        //         { name: 'Spanish', value: 'es' },
        //     ]
        // },
    ];
    return (

        // <SelectSearch className="catchUpSearch"
        //     //input search data into options//link it
        //     // options={countries}
        //     search
        //     // filterOptions={fuzzySearch}
        //     placeholder="Search CatchUp" />
        <SelectSearch options={options} filterOptions={fuzzySearch} search placeholder="Search CatchUp" />




    )
}

{/* <SelectSearch className="catchUpSearch"
                    //input search data into options//link it
                    // options={countries}
                    search
                    // filterOptions={fuzzySearch}
                    placeholder="Search CatchUp"
                /> */}


export default GlobalSearchBar





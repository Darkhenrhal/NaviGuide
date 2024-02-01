import React from "react";
import "./search.css";

const Search=() =>{



    return(
        <div id="searchdiv">
            <select id="searchByCat">
                <option>Health Awareness</option>
                <option>Environmental Awareness</option>
                <option>Social Issues Awareness</option>
                <option>Safety and Security Awareness</option>
                <option>Educational Awareness</option>
                <option>Cultural Awareness</option>
                <option>Workplace Awareness</option>
                <option>Human Rights Awareness</option>
                <option>Technology and Digital Literacy Awareness</option>
                <option>Political and Civic Awareness</option>
            </select>
            <button id="search">Search</button>
        </div>
    );
}

export default Search;
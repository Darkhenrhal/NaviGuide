import React, { useState } from "react";
import "./search.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from "react-router-dom";


const Search = () => {
    const [searchedAccCatagory, setSearchedAccCatagory] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/user/getCat/${searchedAccCatagory}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setSearchResults(data);
                setError(null);
               
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again.');
            });

            
    };


    return (
        <div id="searchdiv">
            <form onSubmit={(e)=>handleSearch(e)}>
                <select id="searchByCat" value={searchedAccCatagory} onChange={(e) => setSearchedAccCatagory(e.target.value)}>
                    <option value={"Health Awareness"}>Health Awareness</option>
                    <option value={"Environmental Awareness"}>Environmental Awareness</option>
                    <option value={"Social Issues Awareness"}>Social Issues Awareness</option>
                    <option value={"Safety and Security Awareness"}>Safety and Security Awareness</option>
                    <option value={"Educational Awareness"}>Educational Awareness</option>
                    <option value={"Cultural Awareness"}>Cultural Awareness</option>
                    <option value={"Workplace Awareness"}>Workplace Awareness</option>
                    <option value={"Human Rights Awareness"}>Human Rights Awareness</option>
                    <option value={"Technology and Digital Literacy Awareness"}>Technology and Digital Literacy Awareness</option>
                    <option value={"Political and Civic Awareness"}>Political and Civic Awareness</option>
                </select>
                <input type="submit" value="Search by Category" />
            </form>

            <div id="searchResults">
                {error && <p>{error}</p>}
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map(user => (                            
                            <li key={user.userName}>
                                <div class="container mt-5 d-flex justify-content-center">
                                <div class="card p-3">
                                    <div class="imageandtxtcontainer">
                                        <div class="image mr-3">
                                        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded ml-5" width="155" />
                                    </div>
                                    <div class="innerdetails">                                        
                                    <h4 class="mb-0 mt-0">{user.firstName} {user.lastName}</h4>
                                    <span>{user.proffesion}</span>
                                    <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                        <div class="d-flex flex-column">
                                            <span class="articles"></span>
                                            <span class="number1"></span>
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="followers">Followers</span>
                                            <span class="number2">980</span>                                            
                                        </div>
                                        <div class="d-flex flex-column">
                                            <span class="rating">Rating</span>
                                            <span class="number3">{user.userRating}</span>                                           
                                        </div>                                        
                                    </div>
                                    <div class="button mt-2 d-flex flex-row align-items-center">
                                        <button class="btn btn-sm btn-outline-primary w-100"> 
                                        <Link to={`/profileview/${user.userName}`}>View Profile</Link>
                                        </button>
                                        <button class="btn btn-sm btn-primary w-100 ml-2">Contact</button>                                        
                                    </div>
                                    </div>                                       
                                    </div>                                    
                                </div>
                                </div>
                            
                            
                            </li>
                           
                        ))}
                        
                    </ul>
                ) : (
                    <p>No results found</p>
                )}
            </div>

        </div>
    );
};

export default Search;

import React, {useState, useEffect} from 'react';

import { Link } from 'react-router-dom';

function Home(props) {

    const ARRAY_MAX_LENGTH = 12; // Max number of int an array can hold

    return (
        <div>
            <h1>Home</h1>
            <div className = "row">
                <p>Longest Increasing Subsequence:</p>
                <button className = "btn"><Link to="/longest-inc">VIEW</Link></button>
            </div>
        </div>
    );
}

export default Home;
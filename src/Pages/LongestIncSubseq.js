import React, {useState, useEffect} from 'react';

function LongestIncSubseq(props) {
    
    // Max number of int an array can hold
    const ARRAY_MAX_LENGTH = 12; 

    // Array that the user submits
    const [numArr, setNumArr] = useState([]);

    // LIS array
    const [lisArr, setLisArr] = useState(0);

    // Number that the user enters
    const [currNum, setCurrNum] = useState();

    // Filters the input to make sure the user is typing a number and other checks
    function filterInput(userInput) {
        
        // Restrict size incase user enters a large number
        if(userInput.length > 7){
            return;
        }

        // Remove all non-integer and alphabetic chars
        // +userInput converts the string to number or NaN
        // If NOT NaN proceed...
        if(!isNaN(+userInput)){
            setCurrNum(parseInt(userInput));
        }
    }

    // Adds the user input number to the array
    function addNumber() {

        // Restrictions in case people enter too many numbers
        if(numArr.length >= ARRAY_MAX_LENGTH){
            return;
        }

        // If there is no input or invalid input (will show as nothing)
        if(currNum === "" || currNum === undefined){
            return;
        }

        // Add the number
        let tempArr = numArr;
        tempArr.push(currNum);
        setNumArr(tempArr);
        setCurrNum();
        console.log(numArr);
    }

    // LONGEST INC SUBSEQUENCE FORMULA
    
    function findLIS() {
        var LIS = [];

        // Populate the Array
        for(var i = 0; i < numArr.length; i++){
            LIS.push(1);
        }

        // Reverse iteration of the number array
        for(var i = numArr.length-1; i >= 0; i--){
            for(var j = i+1; j < numArr.length; j++){
                if(numArr[i] < numArr[j]){
                    LIS[i] = Math.max(LIS[i], 1+LIS[j]);
                }
            }
        }

        // Find the max number in the array
        setLisArr(Math.max(...LIS));
    }

    return (
        <div>
            <div className = "col-50">
                <h1>Longest Increasing Subsequence</h1>
                <h2>Description</h2>
                <p>Given an integer array nums, return the length of the longest strictly increasing subsequence. 
                    A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. 
                    For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].
                </p>
                <h2>Examples</h2>
                <p>Input: nums = [10,9,2,5,3,7,101,18]
                    Output: 4
                    Explanation: The longest increasing subsequence is [2,3,7,101], 
                    therefore the length is 4.
                </p>
                <h2>Enter a Number</h2>
                <p>Note: the number must be less than 1,000,000 and must be integer. If floating number is entered the function will use parseInt to convert to integer. Maximum of 12 numbers allowed</p>
                <p>Current num is {currNum}</p>
                <div className = "row">
                    <input id = "number-form" onChange = {e => filterInput(e.target.value)}></input>
                    <button className = "btn" onClick={ () => {
                        addNumber();
                        document.getElementById('number-form').value = "";
                    }}>SUBMIT</button>
                    <button className = "btn danger" onClick={ () => setNumArr([])}>RESET</button>
                </div>
                <h2>Your Array</h2>
                <div className = "row">
                    {numArr.map(numberX => {return (
                        <div className = "number-sq">
                            <p>{numberX}</p>
                        </div>
                    )})} 
                </div>
                <button className = "btn" onClick={() => findLIS()}>SOLVE</button>
                <p>Max Increasing Subsequence Length is: {lisArr}</p>
                
            </div>
            
        </div>
    );
}

export default LongestIncSubseq;
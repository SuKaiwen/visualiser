import React, {useState, useEffect} from 'react';

function LongestIncSubseq(props) {
    
    // Max number of int an array can hold
    const ARRAY_MAX_LENGTH = 12; 

    // Array that the user submits
    const [numArr, setNumArr] = useState([]);

    // LIS arr
    const [lisArray, setLisArray] = useState([]);

    // LIS array max number
    const [lisArr, setLisArr] = useState(0);

    // Number that the user enters
    const [currNum, setCurrNum] = useState();

    // Steps
    const [steps, setSteps] = useState([]);

    // Variable to stop users from entering numbers when algorithm has started
    const [started, setStarted] = useState(false);

    const [ended, setEnded] = useState(false);

    useEffect(() => {
        return;
    }, [lisArray])

    // Filters the input to make sure the user is typing a number and other checks
    function filterInput(userInput) {
        
        // Restrict size incase user enters a large number causing overflow
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
        if(started){
            return;
        }

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
        tempArr.push({
            value: currNum,
            color: "white"
        });
        setNumArr(tempArr);

        // Update the LIS array
        let tempLIS = lisArray;
        tempLIS.push(1);
        setLisArray(tempLIS);

        // Reset current number
        setCurrNum();
    }

    // LONGEST INC SUBSEQUENCE FORMULA
    // O(n^2) time...
    function findLIS() {
        setStarted(true);
        var LIS = [];

        // Populate the Array
        for(let i = 0; i < numArr.length; i++){
            LIS.push(1);
        }

        // Reverse iteration of the number array
        for(let i = numArr.length-1; i >= 0; i--){
            for(let j = i+1; j < numArr.length; j++){
                

                // If the current element is greater than the previous element, 
                // we can safely add 1 to the value of previous max sum
                if(numArr[i].value < numArr[j].value){
                    LIS[i] = Math.max(LIS[i], 1+LIS[j]);
                }

                // Add onto the step visualiser...
                // Change color of the numbers...
                let tempSteps = steps;
                tempSteps.push([i, j, LIS[i]]);
                setSteps(tempSteps);
            }
        }

        // Max steps
        let maxNumber = Math.max(...LIS);

        // Find the max number in the array
        setLisArr(maxNumber);

        console.log(steps.length);

        var timeout = 3;

        for(let i = 0; i < steps.length; i++){
            setTimeout(() => {
                const squares = document.getElementsByClassName('number-sq');
                const lisSquares = document.getElementsByClassName('lis-sq');
                for(let k = 0; k < numArr.length; k++){
                    if(k == steps[i][0]){
                        // Update LIS
                        // Cheap way to update array on the frontend...
                        let tempLis = lisArray;
                        tempLis.splice(k, 1, steps[i][2]);
                        setLisArray([]);
                        setLisArray(tempLis);
                    }
                    if(k == steps[i][0] || k == steps[i][1]){
                        squares[k].style.backgroundColor = "orange";
                        lisSquares[k].style.backgroundColor = "orange";
                    }else{
                        squares[k].style.backgroundColor = "white"
                        lisSquares[k].style.backgroundColor = "white";
                    }
                }
                console.log("done");
            }, i * timeout * 100);
        }

        console.log(steps);

        // Find MAX LIS
        let maxIndex = 0;
        let tempMaxNum = maxNumber-1;
        let incSubSeq = [];
        for(let i = 0; i < LIS.length; i++){
            // Find MAX index
            if(LIS[i] === maxNumber){
                maxIndex = i;
                incSubSeq.push(i);
                break;
            }
        }

        // Find the other steps
        for(let i = maxIndex; i < LIS.length; i++){
            if(LIS[i] === tempMaxNum){
                incSubSeq.push(i);
                tempMaxNum--;
                if(tempMaxNum === 0){
                    break;
                }
                continue;
            }
        }

        // Nested timeout to ensure that the solution comes after the solving...
        setTimeout(() => {
            for(let i = 0; i < numArr.length; i++){
                setTimeout(() => {
                    const squares = document.getElementsByClassName('number-sq');
                    if(incSubSeq.includes(i)){
                        squares[i].style.backgroundColor = "green";
                    }else{
                        squares[i].style.backgroundColor = "white";
                    }
                }, i * timeout * 100);
            }

            // After EVERY step is done, allow the user to reset...
            // Prevents resetting in middle of timeout.
            setTimeout(() => {
                setEnded(true);
            }, timeout * 100 * numArr.length);
        }, steps.length * timeout * 100);

        console.log(incSubSeq);
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
                <h2>The Solution</h2>
                <p>The Solution involves uses Dynamic Programming completing the task in O(n^2) time. It uses two pointers starting at one from the end (x1) and the end of the number array (x2). It creates
                    a new array to store the longest increasing subsequence from that index. The pointers steps back comparing the value at x1 to x2 and if x2 > x1 we can safely say that the longest 
                    increasing subsequence at x1 is 1 + the longest increasing subsequence at x2.
                </p>
                <p>Note: this problem is solvable in O(nlogn)
                    time using the patience sort algorithm which is based on the card game "Patience" (similar to solitare).</p>
                <h2>Enter a Number</h2>
                <p>Note: the number must be less than 1,000,000 and must be integer. If floating number is entered the function will use parseInt to convert to integer. Maximum of 12 numbers allowed.</p>
                <div className = "row">
                    <input id = "number-form" onChange = {e => filterInput(e.target.value)}></input>
                    {!started ?
                        <button className = "btn" onClick={ () => {
                            addNumber();
                            document.getElementById('number-form').value = "";
                        }}>SUBMIT</button>
                        :
                        <button className = "btn disabled">SUBMIT</button>   
                    }
                    {!(started && !ended) ?
                        <button className = "btn danger" onClick={ () => {
                            setNumArr([]); 
                            setLisArray([]);  
                            setSteps([]);
                            setStarted(false);
                            setEnded(false);
                        }}>RESET</button>
                        :
                        <button className = "btn danger disabled">RESET</button>
                    }
                    
                </div>
            </div>
            <h2>Your Array</h2>
            {numArr.length > 0 &&
                <div className = "row">
                {numArr.map(numberX => {return (
                    <div className = "number-sq">
                        <p>{numberX.value}</p>
                    </div>
                )})} 
                </div>
            }

            <h2>Dynamic Programming LIS Array</h2>
            {lisArray.length > 0 &&
                <div className = "row">
                {lisArray.map(lisNum => {return (
                    <div className = "lis-sq">
                        <p>{lisNum}</p>
                    </div>
                )})} 
                </div>
            }
                
            <button className = "btn" onClick={() => findLIS()}>SOLVE</button>
            <p>Key: ORANGE = comparing the numbers in DP Array | GREEN = member of longest subsequence</p>
            <p>Max Increasing Subsequence Length is: {lisArr}</p>
            <p>Made by Kevin Su</p>
        </div>
    );
}

export default LongestIncSubseq;
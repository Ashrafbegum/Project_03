// Retrieving the values of form elements 
document.addEventListener("DOMContentLoaded", () => {

    const scheduleForm = document.querySelector("#scheduleForm")
    const user_id = document.querySelector("#user_id")
    const day = document.querySelector("#day")
    const start_at  = document.querySelector("#start_at")
    const end_at = document.querySelector("#end_at")
 
    scheduleForm.onsubmit = (e) => { 
        console.log("testing form")
        if (validateUserId(user_id) && validateDay(day) && validateTime(start_at) && validateTime(end_at)) {
             console.log("Form validation is successful")
             console.log(validateTime(end_at))
        }
        else {
            console.log("Error while validating the form.")
            e.preventDefault()
        }
    } 

    function validateUserId(user_id) {
        if(!user_id.value === ""){
            printError("userIdErr", "Please select the user id");
            return false;
        } else {
            printError("userIdErr", "");
            return true;
        }
    } 
    
    function validateDay(day) {
        if(!day.value === ""){
            printError("dayErr", "Please select the day");
            return false;
        } else {
            printError("dayErr", "");
            return true;
        }
    } 
    
    function validateTime(time) {
        if(!time.value === "") {
            if(time === start_at) {
                printError("startAtErr", "Please select the start at time");
                return false;
             } else if(time === end_at) {
                printError("entAtErr", "Please select the end at time");
                return false;
             }          
        } else {
            if(time === start_at) {
                printError("startAtErr", "");
                return true
             } else if(time === end_at) {
                printError("endAtErr", "");
                return true;
             }          
        }  
    } 
    
     // Defining a function to display error message
    function printError(elemId, hintMsg) {
         document.getElementById(elemId).innerHTML = hintMsg;
    }      
})

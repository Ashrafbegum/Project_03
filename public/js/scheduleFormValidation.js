// Retrieving the values of form elements 
document.addEventListener("DOMContentLoaded", () => {
    console.log("testing form")

    const scheduleForm = document.querySelector("#scheduleForm")
    const user_id = document.querySelector("#user_id")
    const day = document.querySelector("#day")
    const start_time  = document.querySelector("#start_time")
    const end_time = document.querySelector("#end_time")
 
    scheduleForm.onsubmit = (e) => { 
        if (validateUserId(user_id) && validateDay(day) && validateTimings(start_time, end_time)) {
             console.log("Form validation is successful")
        } else {
            console.log("Error while validating the form.")
            e.preventDefault()
        }
    } 

    function validateUserId(user_id) {
        if(!user_id.value === ""){
            printError("userIdErr", "Please select the user name");
            return false
        } else {
            printError("userIdErr", "");
            return true
        }
    } 
    
    function validateDay(day) {
        if(!day.value === ""){
            printError("dayErr", "Please select the day");
            return false
        } else {
            printError("dayErr", "");
            return true
        }
    } 
    
    function validateTimings(startTime, endTime) {
      if(validateTime(startTime) && validateTime(endTime) && compareTime(startTime, endTime)) 
          return true
       return false
    }

    function validateTime(time) {
        if(!time.value === "") {
            if(time === start_time) {
                printError("startTimeErr", "Please select the start time");
                return false
             } else if(time === end_time) {
                printError("endTimeErr", "Please select the end time");
                return false
             }          
        } else {
            if(time === start_time) {
                printError("startTimeErr", "")
                return true
             } else if(time === end_time) {
                printError("endTimeErr", "")
                return true
             }          
        }  
    } 

    function compareTime(startTime, endTime) {
        
        var startTimeDate= new Date("06/15/2021 "+startTime.value)
        var endTimeDate= new Date("06/15/2021 "+endTime.value)
      
        if(startTimeDate >= endTimeDate ){
            printError("endTimeErr","End time can't be less than the start time")
            console.log("Start time is greater than the end time")
            return false
        }else{
            printError("endTimeErr", "");
            console.log("End time is greater than the start time")
            return true
        }
    } 

     // Defining a function to display error message
    function printError(elemId, hintMsg) {
         document.getElementById(elemId).innerHTML = hintMsg;
    }      
})

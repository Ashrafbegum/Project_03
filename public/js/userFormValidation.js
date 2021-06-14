// Retrieving the values of form elements 
document.addEventListener("DOMContentLoaded", () => {

    const userForm = document.querySelector("#userForm")
    const firstName = document.querySelector("#firstname")
    const lastName = document.querySelector("#lastname")
    const email = document.querySelector("#email")
    const pwd = document.querySelector("#password")
    userForm.onsubmit = (e) => { 
        console.log("user form validation")
        if (validateName(firstName) && validateName(lastName) && validateEmail(email) && validatePwd(pwd)) {
             console.log("Form validation is successful")
            // form.reset();    //reset the form
        }
        else {
            console.log("Error while validating the form.")
            e.preventDefault()
        }
     }   

    function validateName(name) {
        
        let nameRegExp = /^\p{L}+[\p{L} ,.'-]{0,}$/u
  
        if(!(nameRegExp.test(name.value))) {
             if(name === lastName) {
                printError("lastNameErr", "Please enter a valid last name");
                return false;
             } else if(name === firstName) {
                printError("firstNameErr", "Please enter a valid first name");
                return false;
             }
        } else {
            if(name === lastName) {
                printError("lastNameErr", "");
                return true;
             } else if(name === firstName) {
                printError("firstNameErr", "");
             return true;
            }
        }        
    }

    function validateEmail (email) {
        const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(!(emailRegExp.test(email.value))) {
            printError("emailErr", "Please enter a valid email address");
            return false;
        } else {
            printError("emailErr", "");
            return true;
        }       
    }

    function validatePwd(pwd) {
        if(pwd.value.length < 1 ) {
            printError("pwdErr", "Please enter the password");
            return false;
        } else {
            printError("pwdErr", "");
            return true;
        }    
    }
  
     // Defining a function to display error message
    function printError(elemId, hintMsg) {
         document.getElementById(elemId).innerHTML = hintMsg;
    }      
})

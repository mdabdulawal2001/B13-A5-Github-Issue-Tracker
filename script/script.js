

document.getElementById("input-form").addEventListener ("submit", (event) => {
    event.preventDefault();

    const inputUser = document.getElementById("input-user").value;
    const inputPassword = document.getElementById("input-password").value;
    
    if(inputUser === ""){
        alert ("Please Provide a User Name");
        return;
    }
    else if(inputPassword === ""){
        alert("Please Provide the Password");
        return;
    }
    else if(inputUser !== "admin"){
        alert("Please Provide a valid User Name");
        return;
    } 
    else (inputPassword !== "admin123"){
        alert("Please Provide a valid Password");
        return;
    }

    // window.location.href = "../main-page.html";
    window.location.assign("../main-page.html");

    event.target.reset();
})





alert("This project is only a simulation of sending email. No data is collected");

 eventListeners();
//var
var btnSend = document.getElementById("btnSend");
var btnReset = document.getElementById("btnReset");
var emailFromImput = document.getElementById("emailFromImput");
var emailToImput = document.getElementById("emailToImput");
var matterImput = document.getElementById("matterImput");
var messageInput = document.getElementById("messageInput");
var form =document.getElementById("formId"); 
const exreg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
function eventListeners(){
    document.addEventListener('DOMContentLoaded', startApp);
}

//functions
function startApp(){
   btnSend.disabled=true;
   btnSend.classList.add('disabled');
   emailFromImput.addEventListener('blur',validallenado);
   emailToImput.addEventListener('blur',validallenado);
   matterImput.addEventListener('blur',validallenado);
   messageInput.addEventListener('blur',validallenado);
   btnReset.addEventListener('click', resetForm)
   form.addEventListener('submit', sendEmail);

}
function resetForm(){
    form.reset();
    rSError(emailFromImput);
    rSError(emailToImput);
    rSError(matterImput);
    rSError(messageInput);
    btnSend.disabled=true;
    btnSend.classList.add('disabled');
    startApp();
}

//function removeStylesError - remove styles generated from validations 
function rSError(nameInput){
    console.log(nameInput);
    if(nameInput.classList.contains("errorborder")){
        nameInput.classList.remove("errorborder");
        console.log(nameInput.parentElement);
        //mensaje de error
        let msgError = nameInput.parentElement.lastChild;

        if(msgError.classList.contains("text-danger")){
            nameInput.parentElement.removeChild(msgError);
        }
        
    }
}



function validallenado(e){  
    var fElement =e.currentTarget.parentNode;
    
    if(e.target.value.length >0){
        //console.log("hay algo");
        if(fElement.children.length>2){
            fElement.removeChild(fElement.lastChild);
            e.target.classList.remove("errorborder");
        }
        if(e.target.type === "email"){
            if(!exreg.test(e.target.value)){
                if(fElement.children.length==2){
                    viewError("Wrong email");
                }
            }
        }
    }else{
        if(fElement.children.length==2){
            viewError();
        }
    }
    function viewError(mensaje = "This field is required"){
        
        e.target.classList.add("errorborder");
        var errormessage = document.createElement('small');
        errormessage.classList.add("text-danger");
        errormessage.textContent=mensaje;
        fElement.appendChild(errormessage);
    }

    if(exreg.test(emailFromImput.value) && exreg.test(emailToImput.value) && 
        !matterImput.value ==""&& !messageInput.value =="" ){
        btnSend.disabled=false;
        btnSend.classList.remove('disabled');
    }else{
        btnSend.disabled=true;
        btnSend.classList.add('disabled');
    }
}
function sendEmail(e){
    
    var ready =document.getElementById("ready"); 
    e.preventDefault();
    console.log("enviando....");
    let spinner = document.getElementById("spinner");

    spinner.classList.remove("d-none"); //hago visible el spinner

    setTimeout(()=>{
        spinner.classList.add("d-none"); //oculto el spinner
        
        ready.classList.remove("d-none");
    },4000);

    setTimeout(()=>{
         
        ready.classList.add("d-none");
    },8000);



   
    resetForm();
}
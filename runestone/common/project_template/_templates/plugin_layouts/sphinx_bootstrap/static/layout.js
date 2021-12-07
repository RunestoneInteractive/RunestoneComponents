function renderinstitution_name(){
    myword = document.getElementById("institution2").textContent;
    let noinstitution;
              
    if (myword == "None" ) {
        noinstitution = "";
    }
    else {
        noinstitution = myword;
    }
    
    
    document.getElementById("institution2").innerHTML = noinstitution;
}
function displayAge(){
    var yearBorn = prompt("What year were you born in?");
    var ageCalc = (2022 - yearBorn) * 365;
    var h2 = document.createElement("h2");
    var msg = document.createTextNode("You are" +" "+ ageCalc +" "+ "days old!");
    h2.setAttribute('id','display');
    h2.appendChild(msg);
    document.getElementById("flex-box-result").appendChild(h2);
}

function clearText(){;
    document.getElementById("display").remove();
    window.location.reload();
}

function generateCat(){
    var img = document.createElement("img");
    var div = document.getElementById("flex-box-generate");
    img.src = "https://static.scientificamerican.com/sciam/cache/file/9CAE9C60-8BC5-4CA3-95C180EFACDD99FD_source.jpg?w=390&h=520&5DC00F08-F74F-402B-811CEE0D33E933CB";
    img.setAttribute('style', 'width:200px; height:150px');
    div.appendChild(img);
}

function clearImg(){;
    document.getElementById("flex-box-generate").remove();
    window.location.reload();
}

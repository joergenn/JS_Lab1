const aButton = document.getElementsByClassName('ham-menu')[0],
      navBarList = document.getElementsByClassName('header-nav')[0],
      calcButton = document.getElementById('calc'),
      calcResultField =  document.getElementById('calc_result'),
      buttons = Array.from(document.getElementsByClassName('calc_button')),
      progressionResultField =  document.getElementById('progression_result'),
      numbers =  document.getElementById('numbers'),
      progressionButton =  document.getElementById('progressionButton'),
      logo =  document.getElementById('logoImage'),
      aboutMe = document.getElementById('about_me');

const mToFeet = () => {
    const speed = document.getElementById("speedInput").value;

    if (speed == "" || speed < 0){
        document.getElementById("result").innerHTML="Некоректні дані!";
        return false;
    } 
    else if (document.getElementById("radio1").checked == true){
        let result = speed / 3.28084;
        document.getElementById("result").innerHTML = speed + " футів = " + result.toPrecision(3) + " метрів";
        return false;
    } 
    else if (document.getElementById("radio2").checked == true){
        let result = speed * 3.28084;
        document.getElementById("result").innerHTML = speed + " метрів = " + result.toPrecision(3) + " футів";
        return false;
    } 
}

const isProgression = () => {
    let numbersArray = numbers.value.trim().split(' ');
    let newNumbersArray = [];
    let tempFloat;
    let flag = true;
    console.log(numbersArray);
    numbersArray.forEach(function(elem){
        tempFloat = parseFloat(elem);
        if(!Number.isNaN(tempFloat)){
            newNumbersArray.push(tempFloat);
        }
        else{
            flag = false;
        }    
    });

    console.log(newNumbersArray);
    let arithmetical = true;
    let geometrical = true;
    if(newNumbersArray.length < 2 || flag == false){
        progressionResultField.innerHTML = 'Некоректні дані';
    }
    else if(newNumbersArray.length == 2){
        progressionResultField.innerHTML = `Арифметична - true   Геометрична - true`;
    }
    else{
        let a = newNumbersArray[1] - newNumbersArray[0],
            b = newNumbersArray[1] / newNumbersArray[0],
            i = 2;
        
        while(arithmetical || geometrical){
            if(newNumbersArray[i] - newNumbersArray[i-1] != a){
                arithmetical = false;
            }
            if(newNumbersArray[i] / newNumbersArray[i-1] != b){
                geometrical = false;
            }
            i++;
            if(i == newNumbersArray.length){
                break;
            }
        }
        progressionResultField.innerHTML = `Арифметична - ${arithmetical}   Геометрична - ${geometrical}`;
    }
    

}

const open = () =>{
    aboutMe.style.display = 'flex';
}

const close = () =>{
    aboutMe.style.display = 'none';
}

aButton.addEventListener('click', () => {
    navBarList.classList.toggle('active');
})

calcButton.addEventListener('click', mToFeet);
progressionButton.addEventListener('click', isProgression);
logo.addEventListener('mouseenter', open);
logo.addEventListener('mouseleave', close);


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        switch(buttons[i].innerHTML){
            case 'C':
                calcResultField.innerHTML = '';
                break;
            case '=':
                result = '';
                try{
                    result = eval(calcResultField.innerHTML);
                }
                catch(err){
                    if(calcResultField.innerHTML.match(/\(/gi).length != calcResultField.innerHTML.match(/\)/gi).length){
                        calcResultField.innerHTML = 'Check brackets';
                        break;
                    }
                    calcResultField.innerHTML = 'Error occured';
                    break;
                }
                if(result == Infinity){
                    calcResultField.innerHTML = 'Zero division';
                    break;
                }
                calcResultField.innerHTML = result;               
                break;
            case '←':
                let str = calcResultField.innerHTML;
                calcResultField.innerHTML = str.slice(0, str.length-1);
                break;
            default:
                if(calcResultField.innerHTML.length > 22){
                    break;
                }
                calcResultField.innerHTML += buttons[i].innerHTML;
                break;
        }
    });
  }



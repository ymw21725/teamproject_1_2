`use strict`;

export default function accordion(targetEvent){

    if(targetEvent.parentNode.children[1].className === `accordion_hidden`) {
            
        targetEvent.parentNode.children[1].classList.remove(`accordion_hidden`);
        targetEvent.children[1].textContent =  '-';
        targetEvent.children[1].style.fontWeight= 'bolder';
    } else {
        
        targetEvent.parentNode.children[1].classList.add(`accordion_hidden`);
        targetEvent.children[1].textContent = '+';
        targetEvent.children[1].style.fontWeight= 'bolder';
    }
}


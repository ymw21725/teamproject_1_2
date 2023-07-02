'use strict';

const header = document.querySelector(`header`),
    headerBigNav = header.querySelector(`.headerBigNav`);

    let delY = 0;

    window.addEventListener(`wheel`, (e) => {
        delY += e.deltaY;
    
        if(delY > 300) {
            headerBigNav.style.top = `-${headerBigNav.offsetHeight}px`;
            delY = 0;
        };
    
        if(delY < -300) {
            headerBigNav.style.top = `0px`;
            delY = 0;
        };
    
    });

// ========================================================
const checkcodeMain = document.querySelector('.checkcode_main'),
    inputCode = checkcodeMain.querySelector('.input_code'),
    userCode = inputCode.querySelector('#user_code'),
    codeP = checkcodeMain.getElementsByTagName('p'),
    checkbutton = checkcodeMain.querySelector('.check_button'),
    resend_button = checkcodeMain.querySelector('.resend_button');

const CodeValidation = /^[0-9]{6}$/;
let Flag = 0;

function changeColor(PTag , Color, FlagValue ){
    PTag.style.color = `${Color}`;
    Flag = FlagValue;
}

let NumAr = new Array(6).fill(0);
    for(let i =0 ; i< NumAr.length ; i++ ){
        NumAr[i] = Math.trunc(Math.random() * 10);
        //trunc() 메소드 : 소수점 부분을 날려 정수로 치환 ,random()메소드 : (Math.ramdom ()* 최대값)  0 ~ 최대값 까지의 난수 생성 
    }

console.log(NumAr);
let TextValuAr;

function Validation(textValue){

    codeP[1].style.display = `block`;
    codeP[1].textContent = '* Please enter the 6-digit code.';
    
    if(CodeValidation.test(textValue)){
        TextValuAr = textValue.split('');
        if(TextValuAr.length){
            for(let i =0 ; i < NumAr.length ; i++){
                if(NumAr[i] === +TextValuAr[i]){
                    changeColor(codeP[1], 'green', 0);
                }else{
                    changeColor(codeP[1], 'green', 1);
                    break;
                }   
                
            }
        }
    }else{
        changeColor( codeP[1], 'red', 1);
    }
    
    if (!textValue ){
        codeP[1].textContent = '* Didn’t get an email?';
        changeColor( codeP[1], 'black', 1);
    }
}

userCode.addEventListener('keyup' , (e) =>{
    Validation(e.target.value);
})

checkbutton.addEventListener('click' , (e) => {
    if(Flag){
        alert('Your code is not confirmed. Check your code which we sent you should be 6-digit.');
        userCode.focus();
        e.preventDefault();
    }
});

/*============================================================== */
const container = document.querySelector('.container'),
    footer_icon= container.querySelector('.footer_icon'),
    div = container.getElementsByTagName('div'),
    footer_btn = footer_icon.getElementsByTagName('a'),
    footer_icon_span = footer_icon.getElementsByTagName('span');

const first_icon = document.querySelector('.first_icon'),
    second_icon = document.querySelector('.second_icon'),
    third_icon = document.querySelector('.third_icon'),
    fourth_icon = document.querySelector('.fourth_icon');

// ======================================================
//푸터 아이콘 클릭시 다른페이지 이동.
footer_icon.addEventListener('click',(e)=>{
    const target = e.target.closest('a');

    if(target === footer_btn[0]){// a를 사용하면 한번 클릭한 사이트는 보라색으로 변하기때문. 
        // location.href = 'https://www.facebook.com';
        window.open('https://www.facebook.com');    // 새창에 띄우기 위헤 
        
    } else if(target === footer_btn[1]){
        // location.href = 'https://www.twitter.com';
        window.open('https://www.twitter.com');
        
    } else if(target === footer_btn[2]){
        // location.href = 'https://www.google.com';
        window.open('https://www.google.com');
        
    } else {
        // location.href = 'https://www.instagram.com';
        window.open('https://www.instagram.com');  
    }
});

function footer_move(i) {
    footer_icon_span[i].style.width = '100%';
    footer_icon_span[i].style.borderRadius = '30px';
    footer_icon_span[i].style.transition = 'width 2s';
}

function footer_initial(i) {
    footer_icon_span[i].style.width = '40px';
    footer_icon_span[i].style.borderRadius = '50%';
    footer_icon_span[i].style.transition = 'width 2s';
}

first_icon.addEventListener('mouseenter', (e) => {
    if(e.target === first_icon) footer_move(0);
});
first_icon.addEventListener('mouseleave', (e) => {
    if(e.target === first_icon) footer_initial(0);
});

second_icon.addEventListener('mouseenter', (e) => {
    if(e.target === second_icon) footer_move(1);
});
second_icon.addEventListener('mouseleave', (e) => {
    if(e.target === second_icon) footer_initial(1);
});

third_icon.addEventListener('mouseenter', (e) => {
    if(e.target === third_icon) footer_move(2);
});
third_icon.addEventListener('mouseleave', (e) => {
    if(e.target === third_icon) footer_initial(2);
});

fourth_icon.addEventListener('mouseenter', (e) => {
    if(e.target === fourth_icon) footer_move(3);
});
fourth_icon.addEventListener('mouseleave', (e) => {
    if(e.target === fourth_icon) footer_initial(3);
});


// ===============================================================
// 줄어들었을때 글자 클릭 시 화면에 띄우기.(css가 js보다 늦게 실행되므로 
// 동작된다.)

let before_div = div[2];
div[2].classList.add('footer_hidden');
div[4].classList.add('footer_hidden');
div[6].classList.add('footer_hidden');

container.addEventListener('click', (e) => {
    const target = e.target.closest('div');
    let nextSib = target.nextElementSibling;
    if(target.classList.contains("footer_font_size")) {

        before_div.classList.add('footer_hidden');
        nextSib.classList.remove('footer_hidden');

        before_div = nextSib;
    }

});
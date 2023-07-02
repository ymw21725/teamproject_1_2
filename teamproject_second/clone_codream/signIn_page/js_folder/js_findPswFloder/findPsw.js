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
const findpwMain = document.querySelector('.findpw_main'),
    userAddress = findpwMain.querySelector('#user_address'),
    sendButtom = findpwMain.querySelector('.send_button'),
    textDiv = findpwMain.querySelector('.textDiv'),
    [EmailP ,remA]= textDiv.getElementsByTagName('p');
   
let popup;
const addressAr = [
    '1111@1111.aa',
    'qazwsx@gmail.com',
    'qazwsx123@gmail.com',
    'zxczxc@gmail.com',
    'zxczxc123@gmail.com',
    'qweqwe@gmail.com',
    'qweqwe123@gmail.com',
    'asdasd213@gmail.com',
    'asdasd123@gmail.com',
    'edcedc@gmail.com',
    'edcedc123@gmail.com',
    'qweqwe@gamil.com'
];

function popupOpen(){
    let locationX = (screen.width - 500) / 2;  
    let locationY = (screen.height - 500) / 2; 
    popup = open('findEmail.html', 'FindEmail', `left=${locationX}px, top=${locationY}px` );
    popup.resizeTo(500, 500);
}

console.log('1111@1111.aa',);

let Flag = 0
userAddress.addEventListener('keyup' , (e) => {
    const eventObj = e.target.value;
    EmailP.style.display = 'block';
    remA.style.display = 'none';
    if(addressAr.includes(eventObj)){
        EmailP.textContent = '* Your email has been verified.';
        EmailP.style.color = 'green';
        Flag = 0;
    }else{
        EmailP.textContent = '* Email does not exist. please check again.';
        EmailP.style.color = 'red';
        Flag = 1;
    }
    if(!eventObj){
        EmailP.style.display = 'none';
        remA.style.display = 'block';
        Flag = 1;
    }

});

findpwMain.addEventListener( 'click' , (e) =>{
    const eventObj = e.target;
    if(eventObj === remA){
        popupOpen();
    }else if(eventObj === sendButtom){
        if(Flag){
            alert('Email does not exist. please check again.');
            userAddress.focus();
            e.preventDefault();
        }
    }
})

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
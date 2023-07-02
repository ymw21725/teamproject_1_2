`use strict`

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
import changePswAttr , {ValidationPsw} from "../../module_JsFolder/changePswAttr.js";

const singupMainDiv = document.querySelector('#singup_main_div'),
    password = singupMainDiv.querySelector('.password'),
    confirmPassword = singupMainDiv.querySelector('.confirm_password'),
    email = singupMainDiv.querySelector('.email'),
    userEemailaddress = email.querySelector('#user_emailaddress'),
    userPassword =password.querySelector('#user_password'),
    userConfirmPasswords =confirmPassword.querySelector('#user_confirm_passwords'),
    pswFaEye = password.querySelector('.fa-eye'),
    pswFaEyeSlash = password.querySelector('.fa-eye-slash'),
    confirmFaEye = confirmPassword.querySelector('.fa-eye'),
    confirmEyeSlash = confirmPassword.querySelector('.fa-eye-slash');

// 인풋태그 
const  creatButton = singupMainDiv.querySelector('.create_account'),
    mobilePhoneNum = singupMainDiv.querySelector('.mobile_phone_number'),
    PhoneNumInput = mobilePhoneNum.querySelector('#Moblie_Phone_Number'),
    firstName = singupMainDiv.querySelector('.first_name'),
    lastName = singupMainDiv.querySelector('.last_name'),
    userFirstName = firstName.querySelector('#user_firstname'),
    userLastName = lastName.querySelector('#user_lastname');

// p태그 
const EmailP = email.getElementsByTagName('p'),
    moblieP = mobilePhoneNum.getElementsByTagName('p'),
    firstP = firstName.getElementsByTagName('p'),
    lastP = lastName.getElementsByTagName('p'),
    pawP = password.getElementsByTagName('p'),
    conP = confirmPassword.getElementsByTagName('p');

// 인풋 태그 정규 표현식 
const emailValidation = /^[a-zA-Z0-9]*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z]+)\.([a-zA-Z]){1,3}$/,
    PhoneNumValidation = /^[0-9]{5,}$/,
    lastNameValidation = /^[A-Z]([a-zA-Z]){1,}$/,
    firstNameValidation = /^[a-zA-Z]{4,}$/;

// 모듈 비밀번호 플래그 배열 
let PswFlagAr = [2].fill(1);

// first ~ email 플래그 배열 
let FlagAr = [4].fill(1);

// 텍스트 배열

let PTextAr = [
    '* Please enter at least 3 characters.',
    '* Enter the first letter in upper case.',
    '* Only numbers.',
    '* The email format is ex) avc12@gmail.com',
];

/* ======================== ========================================================*/

/*===================================인풋태그 유효성 검사 ====================================*/
// 모듈 콜백 호출 
function ModulechangeColor(PTag , Color ,FlagArjIndx , Flag ){
    PTag.style.color = `${Color}`;
    PswFlagAr[FlagArjIndx] = Flag;  
}

function changeColor(PTag , Color ,FlagArjIndx , Flag ){
    PTag.style.color = `${Color}`;
    FlagAr[FlagArjIndx] = Flag;  
}

function Validation(ptag , text, checkVaildation, textValue, Flags){
    ptag.style.display = `block`;
    ptag.textContent = PTextAr[text];
    
    if(checkVaildation.test(textValue)){
        changeColor(ptag, 'green', Flags, 0);
    }else{
        changeColor( ptag, 'red', Flags, 1);
    }
    
    if (!textValue ){
        ptag.style.display = `none`;
        changeColor( ptag, 'red', Flags, 1);
    }
}

function ButtonValidation(alertText , InputTag){
    alert(`Check ${alertText}`);
    InputTag.focus();
}


/* ========================================================================================*/

/* ========================================탑아이콘 scroll===================================*/
import topScroll , {scrollDisplay} from "../../module_JsFolder/topScroll.js";

// 탑아이콘 
const scrollTop = document.querySelector('.fa-angle-up');

document.addEventListener('scroll', () => {
    scrollDisplay(scrollTop);
});


// 스크롤탑 버튼을 클릭했을 때

scrollTop.addEventListener('click', () => {
   topScroll(headerBigNav);
});

/* ========================================================================================*/
// 실인수 설명 ( p태그 , PTextAr베열[인덱스 number] , input태그.value , FlagObj베열[인덱스 number]);
//Validation(firstP[0] , 0, firstNameValidation, userFirstName.value, 0);

// 모둘 실인수 설명 (input태그 , input태그 , p태그 , p태그 , 모듈에서 콜백 호출 함수 참조주소 )
//ValidationPsw(userPassword , userConfirmPasswords, pawP[0], conP[0], ModulechangeColor);

singupMainDiv.addEventListener('click' , (e) =>{
    if(e.target.closest('span')){
        if(e.target === pswFaEye || e.target === pswFaEyeSlash){
            changePswAttr(e.target , pswFaEye , pswFaEyeSlash ,userPassword);
        }else if( e.target === confirmFaEye || e.target === confirmEyeSlash){
            changePswAttr(e.target , confirmFaEye , confirmEyeSlash ,userConfirmPasswords);
        }
    }
});

//input 태그 이벤트리스너 
singupMainDiv.addEventListener('keyup', (e) => {
    const eventObj = e.target;
    if(eventObj === userPassword || eventObj === userConfirmPasswords){
        ValidationPsw(userPassword , userConfirmPasswords, pawP[0], conP[0], ModulechangeColor);
    }else if(eventObj === userFirstName){
        Validation(firstP[0] , 0, firstNameValidation, userFirstName.value, 0);
    }else if(eventObj === userLastName){
        Validation(lastP[0] , 1, lastNameValidation, userLastName.value, 1);
    }else if(eventObj === PhoneNumInput){
        Validation(moblieP[0] , 2, PhoneNumValidation,  PhoneNumInput.value, 2);
    }else if(eventObj === userEemailaddress){
        Validation(EmailP[0] , 3, emailValidation, userEemailaddress.value, 3);
    }
});

//버튼 이벤트리스너
creatButton.addEventListener('click' , (e) =>{
    if(FlagAr[0]){
        ButtonValidation('FirstName' ,userFirstName);
    }else if(FlagAr[1]){
        ButtonValidation('LastName' , userLastName);
    }else if(FlagAr[2]){
        ButtonValidation('MobliePhoneNumber' , PhoneNumInput);
    }else if(FlagAr[3]){
        ButtonValidation('Email' , userEemailaddress);
    }else if(PswFlagAr[0]){
        ButtonValidation('Password' , userPassword);
    }else if(PswFlagAr[1]){
        ButtonValidation('ConfirmPassword' , userConfirmPasswords);
    }else {
        return ;
    }
    e.preventDefault();
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
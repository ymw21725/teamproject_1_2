'use strict';

export default function changePswAttr(changeTarget , pswFaEye , pswFaEyeSlash, userPassword){
        
    if(changeTarget === pswFaEye){
        userPassword.setAttribute('type' , 'text');
        pswFaEye.style.display = 'none';
        pswFaEyeSlash.style.display = 'block';
    }else if(changeTarget === pswFaEyeSlash){
        userPassword.setAttribute('type' , 'password');
        pswFaEyeSlash.style.display = 'none';
        pswFaEye.style.display = 'block';
    }

}

const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[\da-zA-Z!@#$%^&*]{8,}$/

let PTextAr =[
    '* Use 8 or more characters with a mix of Uppercase and Lowercase Letters, numbers & symbols(!@#$%^&*)',
    '* Those passwords didn’t match. Try again.',
    '* Passwords Match.',
];


function ModulDisplayChange(ptag , value){
    ptag.style.display = `${value}`;
}

function ModuleTextPtagChange(ptag , value){
    ptag.textContent = PTextAr[value];
}

// 모둘 매개변수 설명 (input태그 , input태그 , p태그 , p태그 , 모듈에서 콜백 호출 함수 참조주소 )
export function ValidationPsw( userPassword, userConfirmPasswords, pswpP, conP ,changeColor){
    let checkPassword = userPassword.value;
    let checkconfirmPassword = userConfirmPasswords.value;
    
    ModuleTextPtagChange(pswpP, 0 );
    ModuleTextPtagChange(conP, 1 );
    
    ModulDisplayChange( pswpP, 'block' );
    if(userPassword.value || userConfirmPasswords.value){
        ModuleTextPtagChange(conP, 1 );
        ModulDisplayChange( conP, 'block' );
    }

    if((passwordValidation.test(checkPassword))){
        changeColor(  pswpP , 'green', 0 , 0 );
        if(checkPassword === checkconfirmPassword ){
            ModulDisplayChange( conP ,'block' );
            changeColor( conP , 'green', 1 , 0  );
            ModuleTextPtagChange(conP, 2 );
        }else{
            changeColor(conP, 'red', 1  ,1  );
        }
    }else{
        changeColor( pswpP, 'red', 0, 1 );
        changeColor(conP, 'red', 1, 1  ); 
    }

    if(!userPassword.value && !userConfirmPasswords.value){
        ModulDisplayChange( pswpP, 'none' );
        ModulDisplayChange( conP , 'none' );
    }

}

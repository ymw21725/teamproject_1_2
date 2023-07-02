'use strict';

const section_bottom = document.querySelector('.section_bottom'),
    bottom_nav_ul_first = document.querySelector('.bottom_nav_ul_first'),
    bottom_nav_div_method = document.querySelector('.bottom_nav_div_method'),
    li_first = bottom_nav_ul_first.getElementsByTagName('li');
    console.log(li_first)
const paying_popup = document.getElementById('paying_popup');

let beforeEventTime = -new Date(); 
function executable() {
    let currentEventTime = new Date();

    if (currentEventTime - beforeEventTime > 1000) {
        beforeEventTime = currentEventTime;

        return true;
    }
}

bottom_nav_ul_first.addEventListener('click', (e) => {
    if(executable()) {
    const target = e.target.closest('li');

    bottom_nav_div_method.innerHTML = `<p>Credit Card Selected</p>`;
    bottom_nav_div_method.style.fontSize = '1.5em';
    if(target === li_first[0]) {
        alert('Credit Card Selected');
        li_first[0].children[0].classList.add('change_color');
        li_first[1].children[0].classList.remove('change_color');
        li_first[2].children[0].classList.remove('change_color');

    } else if (target === li_first[1]) {
        bottom_nav_div_method.innerHTML = `<p>Account Transfer Selected</p>`;
        alert('Account Transfer Selected');
        li_first[1].children[0].classList.add('change_color');
        li_first[0].children[0].classList.remove('change_color');
        li_first[2].children[0].classList.remove('change_color');
    } else if (target === li_first[2]) {
        bottom_nav_div_method.innerHTML = `<p> Mobile Banking Selected</p>`;
        alert('Mobile Banking Selected');
        li_first[2].children[0].classList.add('change_color');
        li_first[0].children[0].classList.remove('change_color');
        li_first[1].children[0].classList.remove('change_color');
    }
}
});

// ===========================================
const header = document.querySelector(`header`),
    headerBigNav = header.querySelector(`.headerBigNav`);
let delY = 0;

    window.addEventListener(`wheel`, (e) => {
        console.log(headerBigNav.offsetHeight);
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

// ================================================

let popup1,popup2,popup3;

paying_popup.addEventListener('click', (e) => { 
    const target = e.target;

    if(li_first[0].childNodes[0].className == 'change_color') {
        if(target === paying_popup) {
            let locationX = (screen.width - 500) / 2;
            let locationY = (screen.height - 500) / 2;
        popup1 = open('./popup1.html', '팝업창1', `width=500px, height=500px, left=${locationX}px, top=${locationY}px`);
        }
    }

    if(li_first[1].childNodes[0].className == 'change_color') {
        if(target === paying_popup) {
            let locationX = (screen.width - 500) / 2;
            let locationY = (screen.height - 500) / 2;
        popup2 = open('./popup2.html', '팝업창2', `width=500px, height=500px, left=${locationX}px, top=${locationY}px`);
        }
    }

    if(li_first[2].childNodes[0].className == 'change_color') {
        if(target === paying_popup) {
            let locationX = (screen.width - 500) / 2;
            let locationY = (screen.height - 500) / 2;
        popup3 = open('./popup3.html', '팝업창3', `width=500px, height=500px, left=${locationX}px, top=${locationY}px`);
        }
    }
});
//=================================================================





// ================================================================================
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
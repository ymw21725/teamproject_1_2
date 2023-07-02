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

const main = document.querySelector(`main`),
    slideBox = main.querySelector(`.slideBox`),
    radioBox = main.querySelector(`.radioBox`),
    playBtn = main.querySelector(`button`);

const bgAr = [
    './image_folder/brandnew_intro1.png',
    './image_folder/brandnew_intro2.png',
    './image_folder/brandnew_intro3.png',
];

for (let i = 0; i < bgAr.length; i++) {
    radioBox.innerHTML += `<a href = "#" data-num = ${i}><div class="innerCircle"></div></a>`;
}

const slideLi = slideBox.getElementsByTagName(`li`),
    miniCircle = radioBox.getElementsByClassName(`innerCircle`);

for (let i = 1; i < bgAr.length; i++) {
    slideLi[i].style.background = `url(${bgAr[i]}) center / cover`;
}

let currentIdx = 0,
    nextIdx;
let beforeEventTime = -new Date();


function executable() {
    if (new Date() - beforeEventTime > 1300) {
        beforeEventTime = new Date();
        return true;
    }
}

function radioPager() {
    miniCircle[currentIdx].style.backgroundColor = 'white';
    miniCircle[nextIdx].style.backgroundColor = 'rgb(49, 47, 47)';
}

function preSlide(){
    slideLi[nextIdx].classList.remove('animated');
    slideLi[nextIdx].style.top = `-100%`;
}

function autoSlide() {
    setTimeout(()=>{
        slideLi[currentIdx].classList.add('animated');
        slideLi[nextIdx].classList.add('animated');
    
        slideLi[currentIdx].style.top = `100%`;
        slideLi[nextIdx].style.top = `0`;

        radioPager();

        currentIdx = nextIdx;

    }, 50);
}

radioBox.addEventListener(`click`, function (e) {
    const eventEle = e.target.closest('a');

    e.preventDefault();
    if( this.contains(eventEle) && executable()) {
        
        const extractValue = +eventEle.dataset.num;

        nextIdx = extractValue;

        if( currentIdx != nextIdx ){
            preSlide();
        } else {
            return;
        }

        autoSlide();
    }
})

let autoInterval = setInterval(() => {
    if(executable()){
        
        nextIdx = (currentIdx + 1) % bgAr.length;
        
        
        preSlide();
        autoSlide();
    }

}, 3300);

let playFlag = 0;

playBtn.addEventListener(`click`, ()=> {
    if(playFlag === 0) {
        playBtn.style.background = `url(./image_folder/playBtn.png) center / cover`
        clearInterval(autoInterval);
        playFlag = 1;
    } else {
        playBtn.style.background = `url(./image_folder/stopBtn.png) center / cover`
        autoInterval = setInterval(() => {
            if(executable()){
                nextIdx = (currentIdx + 1) % bgAr.length;
                
                preSlide();
                autoSlide();
            }
        
        }, 3300);
        playFlag = 0;
    }
    
})

// ================================================================================
const fixedBack = main.querySelector(`.fixedBack`);

window.addEventListener(`scroll`, ()=> {
    if (scrollY >= slideBox.offsetHeight*2) {
        fixedBack.style.background = `url(./image_folder/main_banner.jpeg) center / cover`;
    } else if (scrollY <= slideBox.offsetHeight*2) {
        fixedBack.style.background = `url(./image_folder/main_back.jpeg) center / cover`;
    }
})

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
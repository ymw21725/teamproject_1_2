`use strict`;

// ================< 헤더 >====================

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

// 헤더 끝^====================================

// ================< 메인 >====================

/* 슬라이드 - subContainer Middle */
const slide_container = document.querySelector(".slide_container"),
    slide_lists = slide_container.querySelectorAll(".slide_list li"),
    btn = slide_container.querySelectorAll(".slide_container>a"),
    pager = slide_container.querySelector(".pager");

for (let i = 0; i < slide_lists.length; i++) {
    pager.innerHTML += `<a href = "#" data-direction = ${i}></a>`;
}

const pagers = pager.getElementsByTagName("a");
const DELAYTIME = 1000;

function executable() {
    let beforTime = -new Date();

    return function () {
        const currentTime = new Date();

        if (currentTime - beforTime > DELAYTIME + 100) {
            beforTime = currentTime;

            return true;
        }
    };
}

let currentIdx = 0,
    nextIdx,
    direction;

// ============
/* 함수 */

/* < 버튼 히든 설정 > */
function checkBtnView() {
    btn[0].classList.remove("nonVisible");
    btn[1].classList.remove("nonVisible");

    if (nextIdx <= 0) {
        btn[0].classList.add("nonVisible");
    } else if (nextIdx >= slide_lists.length - 1) {
        btn[1].classList.add("nonVisible");
    }
}

/* < 페이저 하이라이트 함수 > */
function highlightPager() {
    pagers[currentIdx].style.backgroundColor = "darkgray";
    pagers[nextIdx].style.backgroundColor = "rgb(49, 47, 47)";
}

function preparationActive() {
    slide_lists[nextIdx].classList.remove("animated");
    slide_lists[nextIdx].style.left = `${direction * 100}%`;
}

function activeSlide() {
    setTimeout(() => {
        slide_lists[currentIdx].classList.add("animated");
        slide_lists[nextIdx].classList.add("animated");

        slide_lists[currentIdx].style.left = `${-direction * 100}%`;
        slide_lists[nextIdx].style.left = 0;

        highlightPager();
        checkBtnView();

        currentIdx = nextIdx;
    }, 10);
}

// ======================================
/* < 이벤트 > */

const slide_list = slide_container.querySelector(".slide_list");
let autoslide;

slide_container.addEventListener("click", function (e) {
    const eventEle = e.target.closest("a");

    if (this.contains(eventEle) && executable()) {
        e.preventDefault();

        const extractValue = +eventEle.dataset.direction;

        nextIdx = currentIdx + extractValue;

        if (eventEle.children[0]) {
            direction = extractValue;
        } else {
            nextIdx = extractValue;
            direction = extractValue > currentIdx ? 1 : -1;
        }

        if (currentIdx != nextIdx) {
            preparationActive();
        } else {
            return;
        }

        activeSlide();
    }
});

slide_list.addEventListener("mouseenter", () => {
    autoslide = setInterval(() => {
        if (executable()) {
            nextIdx = (currentIdx + 1) % slide_lists.length;
            direction = 1;

            preparationActive();
            activeSlide();
        }
    }, DELAYTIME);
});

slide_list.addEventListener("mouseleave", () => {
    clearInterval(autoslide);
});

// =========================================
/* < 모달 - section_bottom > */

const section_bottom = document.querySelector(".section_bottom"),
    modal = section_bottom.querySelector(".modal"),
    modal_body = modal.querySelector(".modal_body"),
    btnOpenPopup = section_bottom.querySelector(".click_open_popup");

btnOpenPopup.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("show");
});

modal_body.addEventListener("click", () => {
    modal.classList.remove("show");
});

// 메인 끝^====================================


/* ===================================================================================== */
// footer 시작 

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

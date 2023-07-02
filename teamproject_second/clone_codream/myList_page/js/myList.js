'use strict';

const section = document.querySelector('section'),
    table_a = section.querySelector('.table_a'),
    th_check = table_a.querySelector('#th_check');

// ==============================메인. 
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

//==============================================장바구니 계산기.

const all_check = th_check.querySelector("#all_check"); // 전체 체크
const button_minus1 = document.getElementById('button_minus1'),
    button_plus1 = document.getElementById('button_plus1'), // 버튼들 
    button_minus2 = document.getElementById('button_minus2'),
    button_plus2 = document.getElementById('button_plus2'),
    button_minus3 = document.getElementById('button_minus3'),
    button_plus3 = document.getElementById('button_plus3');

const checkbox1 = document.getElementById("item1"), // checkbox 
    checkbox2 = document.getElementById("item2"),
    checkbox3 = document.getElementById("item3");

const item1_price_insertValue = document.getElementById("item1_price"), // 개별항목 금액(수량 * 가격)total부분
    item2_price_insertValue = document.getElementById("item2_price"),
    item3_price_insertValue = document.getElementById("item3_price");

item1_price_insertValue.dataset.value = 6000000;    // 1개씩 선택했을때 기본값(total부분.) 
item2_price_insertValue.dataset.value = 43000000;
item3_price_insertValue.dataset.value = 13000000;

const btn_minus = document.getElementById('button_minus'),  // 수량 버튼 +,- 
    btn_plus = document.getElementById('button_plus');

const p_item1 = document.getElementById("p_item1"), // 수량변경시 숫자 바뀌는 부분
    p_item2 = document.getElementById("p_item2"),
    p_item3 = document.getElementById("p_item3");

const totalGoodsCnt = document.getElementById("totalGoodsCnt"), // 밑에 총 수량, 금액 
    totalGoodsPrice = document.getElementById("totalGoodsPrice");

totalGoodsCnt.dataset.value = 3;    // 초기값(수량 금액) value값 주기.
totalGoodsPrice.dataset.value = 62000000;

//=========================================================
all_check.addEventListener('click',(e)=> {
    
    let obj = document.getElementsByName("all_check");
    if(obj[0].checked === false) {
        for(let i =0; i<obj.length;i++) {
            obj[i].checked = false;
        }

        totalGoodsCnt.dataset.value = 0;
        totalGoodsCnt.textContent = totalGoodsCnt.dataset.value;

        totalGoodsPrice.dataset.value = 0;
        totalGoodsPrice.textContent = totalGoodsPrice.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");;
    } else if(obj[0].checked === true) {
        for(let i =0; i < obj.length;i++ ) {
            obj[i].checked = true;
        }

        totalGoodsCnt.dataset.value = +p_item1.textContent + +p_item2.textContent + +p_item3.textContent
        totalGoodsCnt.textContent = totalGoodsCnt.dataset.value;

        totalGoodsPrice.dataset.value = +item1_price_insertValue.dataset.value + +item2_price_insertValue.dataset.value + +item3_price_insertValue.dataset.value
        totalGoodsPrice.textContent = totalGoodsPrice.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");
    }
})

//===============================================================공통 함수.

function totalCnt(pM) {
    totalGoodsCnt.dataset.value = +totalGoodsCnt.dataset.value + +pM;
    totalGoodsCnt.textContent = +totalGoodsCnt.dataset.value;
}

function totalPrice(pM) {
    totalGoodsPrice.dataset.value = +totalGoodsPrice.dataset.value + +pM;
    totalGoodsPrice.textContent = totalGoodsPrice.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");
}

// =====================================================개별클릭.

table_a.addEventListener('click',(e)=> {
    const eventOj = e.target;

    if(eventOj === checkbox1) {
        if(checkbox1.checked) {
            totalCnt(+p_item1.textContent) 
            totalPrice(+item1_price_insertValue.dataset.value)
        } else {
            totalCnt(-p_item1.textContent)
            totalPrice(-item1_price_insertValue.dataset.value)     
        }
    } else if(eventOj === checkbox2) {
        if(checkbox2.checked) {
            totalCnt(+p_item2.textContent)
            totalPrice(+item2_price_insertValue.dataset.value)
        } else {
            totalCnt(-p_item2.textContent)
            totalPrice(-item2_price_insertValue.dataset.value)
        }
    } else if(eventOj === checkbox3) {
        if(checkbox3.checked) {
            totalCnt(+p_item3.textContent)
            totalPrice(+item3_price_insertValue.dataset.value)
        } else {
            totalCnt(-p_item3.textContent)
            totalPrice(-item3_price_insertValue.dataset.value)
        }
    } 
});
//========================================버튼 수량 변경 함수
function choiceCnt(item_tmp_cnt,pM) {
    item_tmp_cnt = item_tmp_cnt +pM;
    
    totalGoodsCnt.dataset.value = +totalGoodsCnt.dataset.value + pM;
    totalGoodsCnt.textContent = totalGoodsCnt.dataset.value;
    
    return item_tmp_cnt;
}

function choicePrice(item_tmp_price_value, price) { 
    item_tmp_price_value =  +item_tmp_price_value + price; 
    totalGoodsPrice.dataset.value = +totalGoodsPrice.dataset.value +price;
    totalGoodsPrice.textContent = totalGoodsPrice.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");
    
    return String(item_tmp_price_value);
}


// ================================= 버튼 수량 변경.
table_a.addEventListener('click', (e) => {
    const eventOj = e.target; 
    if(checkbox1.checked) {
        if(eventOj === button_minus1) {
            if(p_item1.textContent >0 ) {
                p_item1.textContent = choiceCnt(+p_item1.textContent,-1);

                item1_price_insertValue.dataset.value = choicePrice(+item1_price_insertValue.dataset.value,-6000000);
                item1_price_insertValue.textContent = '￦ ' + item1_price_insertValue.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,","); 
            }
        } else if(eventOj === button_plus1) {
            if( p_item1.textContent <10) {
                p_item1.textContent = choiceCnt(+p_item1.textContent,+1);

                item1_price_insertValue.dataset.value = choicePrice(+item1_price_insertValue.dataset.value,+6000000);
                item1_price_insertValue.textContent = '￦ ' + item1_price_insertValue.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");
            }
        }
    }
    if(checkbox2.checked) {
        if(eventOj === button_minus2) {
            if(p_item2.textContent >0) {
                p_item2.textContent = choiceCnt(+p_item2.textContent,-1);
                
                item2_price_insertValue.dataset.value = choicePrice(+item2_price_insertValue.dataset.value,-43000000);
                item2_price_insertValue.textContent = '￦ ' + item2_price_insertValue.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");
            }
        } else if(eventOj === button_plus2){
            if(p_item2.textContent <10) {
                p_item2.textContent = choiceCnt(+p_item2.textContent,+1);
                
                item2_price_insertValue.dataset.value = choicePrice(+item2_price_insertValue.dataset.value,+43000000);
                item2_price_insertValue.textContent = '￦ ' + item2_price_insertValue.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");
            }
        }
    }

    if(checkbox3.checked) {
        if(eventOj === button_minus3) {
            if(p_item3.textContent >0) {
                p_item3.textContent = choiceCnt(+p_item3.textContent,-1);
                
                item3_price_insertValue.dataset.value = choicePrice(+item3_price_insertValue.dataset.value,-13000000);
                item3_price_insertValue.textContent = '￦ ' + item3_price_insertValue.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");
            }
        } else if(eventOj === button_plus3) {
            if(p_item3.textContent <10) {
                p_item3.textContent = choiceCnt(+p_item3.textContent,+1);
                
                item3_price_insertValue.dataset.value = choicePrice(+item3_price_insertValue.dataset.value,+13000000);
                item3_price_insertValue.textContent = '￦ ' + item3_price_insertValue.dataset.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",");
                    // 정규식 해석 - replace 앞 문자열을 replace뒤 문자열로 변환.
                    // replace안 (/정규표현식  / "대체문자열(,)") 
                    // \B - 63개 문자 일치하는 경계
                    // () - 그룹화
                    // (?<!\.d*)  - ?<! 부정 뒤쪽 일치.
                    //            - \.  .은 모든 문자열(줄바꿈x)
                    //            - \d*  \d 숫자    * 없거나 or있거나

                    // ?=   - 앞쪽일치 
                    // (\d{3}) - 숫자 3개
                    // (?!\d))/g    - ?! - 부정 앞쪽 일치
                    //              - \d - 숫자
                    //              - /g - 문자열내 모든 패턴 검색.
            }
        }
    }
});


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
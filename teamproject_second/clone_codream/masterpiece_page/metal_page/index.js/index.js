`use strict`

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

// =======================================================

const main = document.querySelector(`main`),
    main_items = main.querySelector(`.main_items`),
    button = main.querySelector(`button`),
    dialog = main.querySelector(`dialog`),
    input_all = dialog.getElementsByTagName(`input`);

let itemObjAr = [
    {
        itemName : 'Item01',
        price : '1,000,000',
        order : 'Available',
        bgImage : '../image_folder/itemOne_01.jpeg',
    },
    {
        itemName : 'Item01',
        price : '1,000,000',
        order : 'Available',
        bgImage : '../image_folder/itemOne_02.jpeg',
    },
    {
        itemName : 'Item01',
        price : '1,000,000',
        order : 'Available',
        bgImage : '../image_folder/itemOne_03.jpeg',
    },
];

for (let i = 0; i < itemObjAr.length; i++) {
    main_items.innerHTML += '<a href="../item_detail_page/item1.html" class="all_item"></a>'
}

const a_list = main_items.getElementsByTagName('a');

for (let i = 0; i < itemObjAr.length; i++) {
    a_list[i].style.background = `url(${itemObjAr[i].bgImage}) center / 100% no-repeat`;
}

function addItemBtn(itemName, price, order, bgImage) {
    itemObjAr = [
        ...itemObjAr,
        {
            itemName,
            price,
            order,
            bgImage,
        },
    ];
    let arIdx = itemObjAr.length-1
    main_items.innerHTML += '<a href="../item_detail_page/item1.html" class="all_item"></a>'
    a_list[arIdx].style.background = `url(${itemObjAr[arIdx].bgImage}) center / 100% no-repeat`;
}

button.addEventListener('click', ()=> {
    dialog.showModal();
});

dialog.addEventListener(`close`, ()=> {
    if(dialog.returnValue === 'resister') {

        addItemBtn(input_all[0].value, input_all[1].value ,input_all[2].value , input_all[3].value);

        for (let i = 0; i < input_all.length-1; i++) input_all[i].value = '';
    }
});

// ===============================================================================
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
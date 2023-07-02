`use strict`

const header = document.querySelector(`header`),
    headerBigNav = header.querySelector(`.headerBigNav`),
    main = document.querySelector(`main`),
    aside = main.querySelector(`aside`);

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

// ======================================================


window.addEventListener(`scroll`, ()=>{
    setTimeout(()=> {
        aside.style.top = `calc(50% - 175px + ${scrollY}px)`;
    }, 200)
});


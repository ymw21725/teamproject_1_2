'use strict';

export default function topScroll(headerBigNav){
    const stopScroll = setInterval(() => {
        window.scrollBy(0, -10);
        headerBigNav.style.top = `0px`;

        if (window.scrollY <= 0) clearInterval(stopScroll);
    });

}

export function scrollDisplay(scrollTop){
    scrollTop.style.display = 'none';
    if (window.scrollY > window.innerHeight / 6) {
        scrollTop.style.display = 'block';
    } else {
        scrollTop.style.display = 'none';
    }
}

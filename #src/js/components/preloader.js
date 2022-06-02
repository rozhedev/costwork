// * PRELOADER

window.onload = function () {
    document.body.classList.add('loaded-hiding');
    document.body.style.overflow = 'hidden';
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded-hiding');
        document.body.style.overflow = 'auto';
    }, 500);
}

// // * HOVER RESET FOR ALL BROWSERS

// if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
//     console.log('this is a touch device');
// } else {
//     console.log('this is not a touch device');
//     document.body.classList.add('no-touch');
// }
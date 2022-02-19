// const subscribeEmail = document.querySelector('.subscribe__form-inp');
// const subscribeForm = document.getElementById('subscribe-form');

let shortInterval = 4000;
let longInterval = 6000;

// * Email

function checkEmail(email) {
    const emailValue = email.value.trim();

    if (emailValue === '') {
        setErrorFor(email, 'Поле не может быть пустым');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Почта введена некорректно');
    } else {
        setSuccessFor(email);
    }
}

// * Set functions

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.classList.add('_error')
    formControl.classList.remove('_success');
    small.textContent = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.classList.remove('_error')
    formControl.classList.add('_success');
}

// * RegEx

function isFullname(fullname) {
    return /\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1}[a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5}/.test(fullname);
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// * Call functions

// if (subscribeForm) {
//     subscribeEmail.addEventListener('input', function (e) {
//         e.preventDefault();
//         e = event.currentTarget;
//         if (subscribeEmail && e == subscribeEmail) {
//             setTimeout(function () {
//                 checkEmail(subscribeEmail);
//             }, shortInterval);
//         }
//     });

//     subscribeForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//         checkEmail(subscribeEmail);
//     });
// }
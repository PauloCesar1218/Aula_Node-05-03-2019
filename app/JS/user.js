
function setCookie(name,value,hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + hours * 3600 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
$(document).ready(function () {
    console.log('ready');
    if (!getCookie('info')) {
        console.log('true');  
        window.location.href = "http://localhost:3000/login.html"
    }
    const API_URL = 'http://localhost:5000/login'
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData();
        const user = {
            email: formData.get('email'),
            senha: formData.get('senha')
        };

        console.log(user);
        

        fetch(API_URL, {
            method:'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
        .then(res => {
            console.log(res);
            if (!res.token) {
                setCookie('info', JSON.stringify(res), 2);
                window.location.href = 'http://localhost:3000/';                
            } else {
                console.log('deu ruim');
                
            }
            
        })
    })

})
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
;(function () {
    const form = document.querySelector('form');
    const API_URL = 'http://localhost:5000/cadastrar';
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const user = {
            nome: formData.get('nome'),
            eid: formData.get('eid'),
            pid: formData.get('pid'),
            email: formData.get('email'),
            senha: formData.get('senha')
        };

        console.log(user);        
        
        fetch(API_URL, {
            method:'POST',
            body:JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
        .then(res => {            
            window.location.href = 'http://localhost:3000/login.html'            
        });
    });
    
    const cepBox = document.querySelector('#cep');
    //Declaring a variable for each input box
    const cidadeBox = form.querySelector('input[name="cidade"]')
    const bairroBox = form.querySelector('input[name="bairro"]')
    const ruaBox = form.querySelector('input[name="rua"]')
    //Asigning them to an array for easier use
    const boxes = [cidadeBox, bairroBox, ruaBox];
    cepBox.addEventListener('input', () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.value = ''
        });
        
        //Ajax only executes if the cep input box have 8 characters
        if (cepBox.value.length === 8) {
            $.ajax({
                url: `http://viacep.com.br/ws/${cepBox.value}/json/`,
                method: 'GET',
                success: function (data){
                    console.log(data);
                    //Setting the data to the input boxes
                    cidadeBox.value = data.localidade;
                    bairroBox.value = data.bairro;
                    ruaBox.value = data.logradouro;
                    //Disabling all boxes
                    boxes.forEach(box => {
                        box.disabled = true;
                    });
                },
                error: function (err) {
                    //Logging the possible error
                    console.log(err);                    
                }
            });
        }
        
        
    })
})()
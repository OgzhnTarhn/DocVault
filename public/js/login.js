if (localStorage.getItem('token')) location.href='files.html';
const msg = document.getElementById('msg');

async function login(e){
    e.preventDefault();
    const u=username.value.trim(), p=password.value;
    const res = await fetch('/api/auth/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username:u,password:p})
    });
    const d = await res.json();
    if(res.ok){ localStorage.setItem('token',d.token); location.href='files.html'; }
    else      { msg.textContent=d.msg; }
}
login_form.addEventListener('submit',login);

if (localStorage.getItem('token')) location.href='files.html';
const msg=document.getElementById('msg');
const USER=/^[a-zA-Z0-9]{3,20}$/, PASS=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;

async function register(e){
    e.preventDefault();
    const u=username.value.trim(), p=password.value;
    if(!USER.test(u)) return msg.textContent='Kullanıcı adı 3-20 harf/rakam';
    if(!PASS.test(p)) return msg.textContent='Şifre ≥8, 1Büyük 1Küçük 1Rakam';

    const res = await fetch('/api/auth/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username:u,password:p})
    });
    const d = await res.json();
    msg.style.color = res.ok?'green':'red';
    msg.textContent=d.msg;
    if(res.ok) setTimeout(()=>location.href='login.html',1500);
}
register_form.addEventListener('submit',register);

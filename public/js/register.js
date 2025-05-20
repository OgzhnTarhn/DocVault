/* ========== DOM ========== */
const form = document.getElementById('register-form');
const msg  = document.getElementById('msg');

/* ========== Regex kısıtları ========== */
const USER_RE = /^[a-zA-Z0-9]{3,20}$/;                 // 3-20 harf-rakam
const PASS_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // ≥8, 1Büyük,1Küçük,1Rakam

/* ========== Form Submit ========== */
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    msg.style.color = 'red';
    if (!USER_RE.test(username))
        return (msg.textContent = 'Kullanıcı adı 3-20 harf/rakam olmalı');
    if (!PASS_RE.test(password))
        return (msg.textContent = 'Şifre ≥8, 1 büyük, 1 küçük harf ve 1 rakam içermeli');

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        msg.style.color = res.ok ? 'green' : 'red';
        msg.textContent = data.msg;
        if (res.ok) setTimeout(() => (location.href = 'login.html'), 1500);
    } catch {
        msg.textContent = 'Sunucuya ulaşılamadı';
    }
});

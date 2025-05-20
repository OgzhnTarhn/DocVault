/* ----------- DOM ----------- */
const form = document.getElementById('login-form');
const msg  = document.getElementById('msg');

/* ----------- Submit ----------- */
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    msg.textContent = '';
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            /*  token query-string ile files.html’e geç  */
            location.href = `files.html?token=${data.token}`;
        } else {
            msg.style.color = 'red';
            msg.textContent = data.msg;
        }
    } catch {
        msg.style.color = 'red';
        msg.textContent = 'Sunucuya ulaşılamadı';
    }
});

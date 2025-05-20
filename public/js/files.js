/* -------- DOM elemanları -------- */
const logout_btn  = document.getElementById('logout');
const upload_form = document.getElementById('upload-form');
const file_input  = document.getElementById('file-input');
const upload_msg  = document.getElementById('upload-msg');
const files_table = document.getElementById('files-table');
const list_msg    = document.getElementById('list-msg');

/* -------- Token kontrolü -------- */
const token = localStorage.getItem('token');
if (!token) location.href = 'login.html';

/* -------- Çıkış -------- */
logout_btn.onclick = () => {
    localStorage.removeItem('token');
    location.href = 'login.html';
};

/* -------- Dosya listesini getir -------- */
async function listFiles() {
    try {
        const res = await fetch('/api/files', {
            headers: { Authorization: 'Bearer ' + token }
        });
        if (!res.ok) throw new Error('liste');
        const arr = await res.json();

        const tbody = files_table.querySelector('tbody');
        tbody.innerHTML = '';
        arr.forEach(f => {
            tbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${f.originalName}</td>
          <td>${new Date(f.createdAt).toLocaleString()}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-primary dl" data-id="${f._id}">İndir</button>
            <button class="btn btn-sm btn-outline-danger del" data-id="${f._id}">Sil</button>
          </td>
        </tr>`);
        });
    } catch {
        list_msg.textContent = 'Listeleme başarısız';
    }
}

/* -------- Dosya yükle -------- */
upload_form.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', file_input.files[0]);

    const res = await fetch('/api/files/upload', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        body: fd
    });
    const d = await res.json();
    upload_msg.textContent = d.msg;
    if (res.ok) {
        file_input.value = '';
        listFiles();
    }
});

/* -------- İndir / Sil -------- */
files_table.addEventListener('click', async e => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('dl')) {          // İndir
        window.location = `/api/files/${id}/download?token=${token}`;
    }

    if (e.target.classList.contains('del')) {         // Sil
        if (!confirm('Silmek istediğinize emin misiniz?')) return;
        await fetch(`/api/files/${id}`, {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + token }
        });
        listFiles();
    }
});

/* -------- Başlangıç -------- */
listFiles();

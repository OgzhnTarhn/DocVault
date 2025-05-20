const token=localStorage.getItem('token');
if(!token) location.href='login.html';

logout.onclick=()=>{ localStorage.removeItem('token'); location.href='login.html'; };

async function list(){
    const r=await fetch('/api/files',{headers:{Authorization:'Bearer '+token}});
    if(!r.ok) return list_msg.textContent='Listeleme başarısız';
    const f=await r.json(), tbody=document.querySelector('#files-table tbody');
    tbody.innerHTML='';
    f.forEach(x=>{
        tbody.insertAdjacentHTML('beforeend',`
      <tr>
        <td>${x.originalName}</td>
        <td>${new Date(x.createdAt).toLocaleString()}</td>
        <td class="text-end">
          <button data-id="${x._id}" class="btn btn-sm btn-outline-primary dl">İndir</button>
          <button data-id="${x._id}" class="btn btn-sm btn-outline-danger del">Sil</button>
        </td>
      </tr>`);
    });
}

upload_form.addEventListener('submit',async e=>{
    e.preventDefault();
    const fd=new FormData(); fd.append('file',file_input.files[0]);
    const r=await fetch('/api/files/upload',{method:'POST',headers:{Authorization:'Bearer '+token},body:fd});
    const d=await r.json(); upload_msg.textContent=d.msg;
    if(r.ok){ file_input.value=''; list(); }
});

files_table.addEventListener('click',async e=>{
    const id=e.target.dataset.id; if(!id) return;
    if(e.target.classList.contains('dl')){
        window.location=`/api/files/${id}/download?token=${token}`;
    } else if(e.target.classList.contains('del') && confirm('Silinsin mi?')){
        const r=await fetch(`/api/files/${id}`,{method:'DELETE',headers:{Authorization:'Bearer '+token}});
        if(r.ok) list();
    }
});

list();

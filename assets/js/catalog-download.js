(function(){
  const modal=document.getElementById('catalogModal');
  const pdfPath='/catalogs/nameer-custom-backpack-bag-catalog.pdf';
  function openModal(){modal?.classList.add('open');}
  function closeModal(){modal?.classList.remove('open');}
  function downloadPdf(){const a=document.createElement('a');a.href=pdfPath;a.download='Nameer-Custom-Backpack-Bag-Catalog.pdf';document.body.appendChild(a);a.click();a.remove();}
  window.openCatalogModal=openModal; window.closeCatalogModal=closeModal;
  document.querySelectorAll('[data-open-catalog]').forEach(b=>b.addEventListener('click',openModal));
  document.querySelectorAll('[data-close-catalog]').forEach(b=>b.addEventListener('click',closeModal));
  const form=document.getElementById('catalogLeadForm');
  if(form) form.addEventListener('submit',async function(e){
    e.preventDefault();
    const fd=new FormData(form); const payload=Object.fromEntries(fd.entries());
    const msg=document.getElementById('catalogLeadMsg'); const btn=form.querySelector('button[type="submit"]');
    if(payload.website) return;
    btn.disabled=true; btn.textContent='Preparing catalog...';
    const makeBody=()=>encodeURIComponent(`Name: ${payload.name || ''}
Email: ${payload.email || ''}
Company: ${payload.company || ''}
Interested Products: ${payload.products || ''}`);
    try{
      const res=await fetch('/api/catalog-lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const data=await res.json().catch(()=>({}));
      downloadPdf();
      if(data.sent){msg.textContent='Thank you. The catalog is downloading and your request was sent to our sales email.';}
      else{
        msg.textContent='The catalog is downloading. Email provider is not configured yet, so a backup email window may open.';
        const subject=encodeURIComponent('Catalog Download Lead - '+(payload.company||payload.name||''));
        const body=makeBody();
        setTimeout(()=>{window.location.href='mailto:232119507@qq.com?subject='+subject+'&body='+body;},500);
      }
    }catch(err){
      downloadPdf();
      msg.textContent='The catalog is downloading. A backup email window will open because the backend endpoint did not respond.';
      const subject=encodeURIComponent('Catalog Download Lead');
      const body=makeBody();
      setTimeout(()=>{window.location.href='mailto:232119507@qq.com?subject='+subject+'&body='+body;},500);
    }finally{btn.disabled=false; btn.textContent='Download Catalog';}
  });
})();

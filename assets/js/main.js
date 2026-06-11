
(function(){
  const logo=document.querySelector('[data-admin-trigger]');
  let clicks=0,timer=null;
  if(logo){logo.addEventListener('click',function(e){
    clicks++; clearTimeout(timer); timer=setTimeout(()=>clicks=0,1200);
    if(clicks>=5){e.preventDefault(); clicks=0; document.getElementById('adminPanel')?.classList.add('open');}
  });}
  document.querySelectorAll('[data-close-admin]').forEach(b=>b.addEventListener('click',()=>document.getElementById('adminPanel')?.classList.remove('open')));
  const q=document.querySelector('[data-product-search]');
  const cat=document.querySelector('[data-product-category]');
  function filterProducts(){
    const term=(q?.value||'').toLowerCase(); const c=(cat?.value||'all'); let visible=0;
    document.querySelectorAll('[data-product-card]').forEach(card=>{
      const text=(card.dataset.name+' '+card.dataset.category+' '+card.dataset.keywords).toLowerCase();
      const ok=(!term || text.includes(term)) && (c==='all' || card.dataset.category===c);
      card.style.display=ok?'flex':'none'; if(ok) visible++;
    });
    const count=document.querySelector('[data-product-count]'); if(count) count.textContent=visible+' products shown';
  }
  if(q) q.addEventListener('input',filterProducts); if(cat) cat.addEventListener('change',filterProducts); filterProducts();
})();

(function(){
  const data = window.siteData;
  const body = document.body;
  const base = body.dataset.base || '.';

  function path(p){
    if(!p) return '#';
    if(p.startsWith('http') || p.startsWith('mailto:')) return p;
    if(p.startsWith('/')) return p;
    return `${base}/${p}`.replace(/\\/g,'/').replace(/\/{2,}/g,'/');
  }

  function imgTag(src, alt='', cls=''){
    return `<img ${cls?`class="${cls}"`:''} src="${path(src)}" alt="${alt.replace(/"/g,'&quot;')}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${path('assets/images/generated/hero-student.webp')}'">`;
  }

  function attachImageFallback(scope=document){
    scope.querySelectorAll('img').forEach(img=>{
      if(img.dataset.boundFallback) return;
      img.dataset.boundFallback = '1';
      img.loading = img.loading || 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', ()=>{
        img.onerror = null;
        img.src = path('assets/images/generated/hero-student.webp');
      });
      if(img.complete && img.naturalWidth === 0){
        img.src = path('assets/images/generated/hero-student.webp');
      }
    });
  }

  function renderHeader(){
    const headerTarget = document.getElementById('site-header');
    if(!headerTarget) return;
    headerTarget.innerHTML = `
      <div class="topbar">
        <div class="container">
          <div class="topbar-items">
            <span>📧 ${data.company.email}</span>
            <span>💬 WhatsApp: ${data.company.whatsapp}</span>
            <span>🟢 WeChat: ${data.company.wechat}</span>
          </div>
          <div class="topbar-actions">
            <span>OEM / ODM Custom Bag Manufacturer</span>
            <span>Low MOQ · Fast Response</span>
          </div>
        </div>
      </div>
      <header class="site-header">
        <div class="container nav-wrap">
          <a href="${path('index.html')}" class="brand" aria-label="Nameer home">
            <img class="brand-logo" src="${path('assets/images/brand/nameer-logo-horizontal.png')}" alt="Nameer">
          </a>
          <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation">☰</button>
          <ul class="nav-links" id="navLinks">
            <li><a href="${path('index.html')}">Home</a></li>
            <li><a href="${path('pages/products.html')}">Products</a></li>
            <li><a href="${path('pages/custom-service.html')}">Customization</a></li>
            <li><a href="${path('pages/factory.html')}">Factory</a></li>
            <li><a href="${path('pages/about.html')}">About Us</a></li>
            <li><a href="${path('pages/contact.html')}">Contact</a></li>
          </ul>
          <div class="nav-actions">
            <a class="btn btn-secondary" href="mailto:${data.company.email}">Email Us</a>
            <a class="btn btn-primary" href="${data.company.whatsappLink}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </header>`;
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if(toggle && navLinks){
      toggle.addEventListener('click', ()=>navLinks.classList.toggle('open'));
      navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));
    }
  }

  function renderFooter(){
    const footerTarget = document.getElementById('site-footer');
    if(!footerTarget) return;
    const year = new Date().getFullYear();
    footerTarget.innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div>
            <div class="brand footer-brand">
              <span class="footer-logo-panel">
                <img class="brand-logo footer-logo" src="${path('assets/images/brand/nameer-logo-horizontal.png')}" alt="Nameer">
              </span>
              <small>${data.company.tagline}</small>
            </div>
            <p class="editable">${data.company.name} supplies custom bag solutions for global B2B buyers, including backpacks, waist bags, sling bags, mommy bags and gym bags.</p>
          </div>
          <div><h4>Products</h4><ul>${data.categories.map(c=>`<li><a href="${path(c.link)}">${c.name}</a></li>`).join('')}</ul></div>
          <div><h4>Buyer Service</h4><ul><li><a href="${path('pages/custom-service.html')}">OEM / ODM Service</a></li><li><a href="${path('pages/factory.html')}">Factory Strength</a></li><li><a href="${path('pages/products.html')}">Product Catalog</a></li><li><a href="${path('pages/contact.html')}">Send Inquiry</a></li></ul></div>
          <div><h4>Contact</h4><ul><li>Email: <a href="mailto:${data.company.email}">${data.company.email}</a></li><li>WhatsApp: <a href="${data.company.whatsappLink}" target="_blank" rel="noopener">${data.company.whatsapp}</a></li><li>WeChat: ${data.company.wechat}</li><li>${data.company.priceText}</li></ul></div>
        </div>
        <div class="container footer-bottom" id="editTriggerArea"><span>© ${year} ${data.company.name}. All rights reserved.</span></div>
      </footer>
      <a class="floating-wa" href="${data.company.whatsappLink}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
      <div class="floating-label">WhatsApp Inquiry</div>
      <div class="mobile-contact-bar"><a class="btn btn-secondary" href="mailto:${data.company.email}">Email</a><a class="btn btn-primary" href="${data.company.whatsappLink}" target="_blank" rel="noopener">WhatsApp</a></div>
      <div class="edit-mode-banner" id="editBanner">Edit mode enabled.</div>`;
  }

  function renderHero(){
    const hero = document.getElementById('heroMount');
    if(!hero) return;
    const slides = data.heroSlides;
    let active = 0;
    let timer;
    function paint(reset=true){
      const s = slides[active];
      hero.innerHTML = `<section class="hero"><div class="container hero-grid">
        <div class="hero-copy">
          <span class="badge">${s.subtitle}</span>
          <h2 class="editable">${s.title}</h2>
          <p class="editable">${s.text}</p>
          <div class="hero-metrics"><div><strong>OEM/ODM</strong><span>Custom Service</span></div><div><strong>Low MOQ</strong><span>Flexible Orders</span></div><div><strong>Factory</strong><span>Direct Support</span></div></div>
          <div class="hero-cta"><a class="btn btn-primary" href="${path(s.link)}">${s.cta}</a><a class="btn btn-secondary" href="${path('pages/products.html')}">Browse Products</a></div>
        </div>
        <div class="hero-media">
          <div class="frame hero-carousel-frame">${imgTag(s.image, s.title)}<button class="hero-arrow hero-prev" type="button">‹</button><button class="hero-arrow hero-next" type="button">›</button></div>
          <div class="hero-dots">${slides.map((_,i)=>`<button class="hero-dot ${i===active?'active':''}" data-slide="${i}" type="button"></button>`).join('')}</div>
        </div>
      </div></section>`;
      hero.querySelector('.hero-prev').addEventListener('click', ()=>{active=(active-1+slides.length)%slides.length; paint();});
      hero.querySelector('.hero-next').addEventListener('click', ()=>{active=(active+1)%slides.length; paint();});
      hero.querySelectorAll('.hero-dot').forEach(b=>b.addEventListener('click',()=>{active=Number(b.dataset.slide); paint();}));
      attachImageFallback(hero);
      if(reset){clearInterval(timer); timer=setInterval(()=>{active=(active+1)%slides.length;paint(false);},5000);}
    }
    paint();
  }

  function productCard(p, slug, simple=false){
    return `<article class="card product-card">
      <a class="card-media" href="${path('pages/product-'+slug+'.html')}">${imgTag(simple ? p.hero : p.variants[0].image, p.title)}</a>
      <div class="card-body"><div class="chip-list">${p.badges.slice(0,3).map(b=>`<span class="badge">${b}</span>`).join('')}</div><h3 class="card-title">${p.title}</h3><p class="muted">${p.intro}</p><div class="card-price">${data.company.priceText}</div></div>
      <div class="card-actions"><a class="btn btn-primary" href="${path('pages/product-'+slug+'.html')}">View Details</a><a class="btn btn-secondary" href="${path('pages/contact.html')}?product=${slug}">Get Quote</a></div>
    </article>`;
  }

  function renderCategories(){
    const mount = document.getElementById('categoryGrid');
    if(!mount) return;
    mount.innerHTML = data.categories.map(cat=>`<article class="card category-card"><a class="card-media" href="${path(cat.link)}">${imgTag(cat.image, cat.name)}</a><div class="card-body"><h3 class="card-title">${cat.name}</h3><p class="muted">${cat.desc}</p><div class="card-price">${data.company.priceText}</div></div><div class="card-actions"><a class="btn btn-primary" href="${path(cat.link)}">View Details</a><a class="btn btn-secondary" href="${path('pages/contact.html')}?product=${cat.slug}">Request Quote</a></div></article>`).join('');
    attachImageFallback(mount);
  }

  function renderFeaturedProducts(){
    const mount = document.getElementById('featuredProducts');
    if(!mount) return;
    mount.innerHTML = Object.entries(data.products).slice(0,6).map(([slug,p])=>productCard(p,slug)).join('');
    attachImageFallback(mount);
  }

  function renderTestimonials(){
    const mount = document.getElementById('testimonialGrid');
    if(!mount) return;
    mount.innerHTML = data.testimonials.map(t=>`<div class="card testimonial-card"><div class="stars">★★★★★</div><p class="editable">“${t}”</p></div>`).join('');
  }

  function renderFAQ(){
    const mount = document.getElementById('faqAccordion');
    if(!mount) return;
    mount.innerHTML = data.faq.map((item, idx)=>`<div class="acc-item ${idx===0?'active':''}"><div class="acc-head">${item[0]} <span>+</span></div><div class="acc-body">${item[1]}</div></div>`).join('');
    mount.querySelectorAll('.acc-head').forEach(head=>head.addEventListener('click', ()=>head.parentElement.classList.toggle('active')));
  }

  function renderAllProducts(){
    const mount = document.getElementById('allProductsGrid');
    if(!mount) return;
    const q = new URLSearchParams(location.search).get('category');
    const filtered = q ? Object.entries(data.products).filter(([slug])=>slug===q) : Object.entries(data.products);
    mount.innerHTML = filtered.map(([slug,p])=>productCard(p,slug,true)).join('');
    const filters = document.getElementById('filterLinks');
    if(filters){filters.innerHTML = `<a class="filter-link ${!q?'active':''}" href="products.html">All Products</a>` + data.categories.map(c=>`<a class="filter-link ${q===c.slug?'active':''}" href="products.html?category=${c.slug}">${c.name}</a>`).join('');}
    attachImageFallback(mount);
  }

  function renderDetailPage(){
    const detailMount = document.getElementById('productDetailMount');
    if(!detailMount) return;
    const key = body.dataset.product;
    const p = data.products[key];
    if(!p){detailMount.innerHTML='<div class="container section-sm">Product not found.</div>';return;}
    detailMount.innerHTML = `<div class="breadcrumb container"><a href="${path('index.html')}">Home</a><span>/</span><a href="${path('pages/products.html')}">Products</a><span>/</span>${p.title}</div>
    <section class="section-sm"><div class="container detail-grid">
      <div><div class="gallery-main">${imgTag(p.gallery[0], p.title, 'detail-main-image')}</div><div class="gallery-thumbs">${p.gallery.map((g,i)=>`<img class="${i===0?'active':''}" src="${path(g)}" data-full="${path(g)}" alt="${p.title} ${i+1}" onerror="this.onerror=null;this.src='${path('assets/images/generated/hero-student.webp')}'">`).join('')}</div></div>
      <div class="detail-main"><div class="badge">${p.category}</div><h1 class="editable">${p.title}</h1><div class="detail-meta">Model: ${p.model}</div><p class="editable">${p.intro}</p><div class="inline-badges">${p.badges.map(b=>`<span class="badge">${b}</span>`).join('')}</div><div class="quote-price">${data.company.priceText}</div><h3>Key Features</h3><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><div class="quick-icons"><div class="mini">Custom Logo</div><div class="mini">Custom Color</div><div class="mini">OEM / ODM</div><div class="mini">Low MOQ</div></div></div>
      <aside class="quote-card"><h3>Quick Inquiry</h3><p class="muted">Send quantity, logo idea, target material and packaging requirements.</p><form class="form inquiry-form" data-product-title="${p.title}"><input name="name" placeholder="Your Name" required><input type="email" name="email" placeholder="Your Email" required><input name="qty" placeholder="Quantity / MOQ target"><textarea name="message" placeholder="Tell us your logo, color, material and packing needs"></textarea><button class="btn btn-primary btn-block" type="submit">Send Inquiry</button><a class="btn btn-secondary btn-block" href="${data.company.whatsappLink}" target="_blank" rel="noopener">WhatsApp Now</a></form><div class="contact-mini"><div>📧 ${data.company.email}</div><div>💬 ${data.company.whatsapp}</div><div>🟢 ${data.company.wechat}</div></div></aside>
    </div></section>
    <section class="section-sm bg-soft"><div class="container"><div class="section-head"><div><span class="badge">Procurement Details</span><h2>Specifications & Custom Options</h2><p>Structured details help B2B customers compare quickly and send accurate inquiries.</p></div></div><div class="spec-grid"><div class="spec-card spec-wide"><table class="spec-table"><tbody>${p.specs.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div><div class="spec-card"><h3>Custom Service</h3><ul><li>Logo method suggestion</li><li>Color and material matching</li><li>Sample and production support</li><li>Packaging option discussion</li></ul></div></div></div></section>
    <section class="section-sm"><div class="container about-grid"><div><div class="section-head"><div><span class="badge">Scene Display</span><h2>Model Scene & Wearing Effect</h2><p>Scene images show product scale and help buyers understand market positioning.</p></div></div>${imgTag(p.lifestyle, p.title+' lifestyle', 'scene-image')}</div><div><div class="section-head"><div><span class="badge">More Items</span><h2>Available Variants</h2><p>Each category is expanded into multiple product choices for a richer catalog.</p></div></div><div class="grid grid-3">${p.variants.map(v=>`<article class="card product-card"><div class="card-media">${imgTag(v.image,v.name)}</div><div class="card-body"><h3 class="card-title">${v.name}</h3><p class="muted">SKU: ${v.sku}</p><div class="card-price">${data.company.priceText}</div></div><div class="card-actions"><a class="btn btn-primary" href="${path('pages/contact.html')}?product=${key}&variant=${encodeURIComponent(v.name)}">Request Quote</a></div></article>`).join('')}</div></div></div></section>`;
    detailMount.querySelectorAll('.gallery-thumbs img').forEach(img=>img.addEventListener('click',()=>{detailMount.querySelectorAll('.gallery-thumbs img').forEach(i=>i.classList.remove('active'));img.classList.add('active');detailMount.querySelector('.detail-main-image').src=img.dataset.full;}));
    attachImageFallback(detailMount);
  }

  function renderAboutFactory(){
    const aboutMount = document.getElementById('aboutFactoryMount');
    if(aboutMount){aboutMount.innerHTML = `<section class="section-sm"><div class="container about-grid"><div><span class="badge">Factory Overview</span><h2 class="editable" style="font-size:2.3rem;margin:16px 0">Reliable custom bag manufacturing partner</h2><p class="editable muted">We support OEM / ODM bag production with workshop capability, process control, logo customization and export-oriented service.</p><div class="stats" style="margin-top:26px"><div class="stat-card"><span class="stat-num">OEM</span><div>Custom Service</div></div><div class="stat-card"><span class="stat-num">ODM</span><div>Development Support</div></div><div class="stat-card"><span class="stat-num">QC</span><div>Inspection Process</div></div><div class="stat-card"><span class="stat-num">B2B</span><div>Wholesale Focus</div></div></div></div><div class="media-panel">${imgTag('assets/images/context/factory-building.webp','factory building')}</div></div></section><section class="section-sm bg-soft"><div class="container process-grid"><div><div class="section-head"><div><h2>Workshop & Production</h2><p>Real factory and workshop images help build trust with importers and brand buyers.</p></div></div><div class="media-stack">${['factory-workshop.jpg','factory-sewing-1.jpg','factory-sewing-2.jpg','factory-machine-worker.jpg'].map(x=>imgTag('assets/images/context/'+x,x)).join('')}</div></div><div class="media-panel">${imgTag('assets/images/context/custom-process.webp','custom process')}</div></div></section><section class="section-sm"><div class="container about-grid"><div class="media-panel">${imgTag('assets/images/context/honors.webp','honors')}</div><div><div class="section-head"><div><h2>Certificates & Honors</h2><p>Trust elements for professional B2B presentation.</p></div></div><p class="muted">Workshop images, honor wall, certification graphics and production process content improve buyer confidence.</p>${imgTag('assets/images/context/certifications.webp','certifications')}</div></div></section>`; attachImageFallback(aboutMount);}

    const customMount = document.getElementById('customServiceMount');
    if(customMount){customMount.innerHTML = `<section class="section-sm"><div class="container about-grid"><div><span class="badge">Customization Service</span><h2 style="font-size:2.3rem;margin:16px 0">Custom logo, material, color and packaging options</h2><p class="muted">Your custom bag project can start from reference images, sketches or an existing product idea.</p><ul class="feature-list" style="margin-top:24px"><li class="feature-item"><div class="icon-bubble">🎨</div><div><strong>Custom Colors</strong><div class="muted">Pantone and brand color matching support.</div></div></li><li class="feature-item"><div class="icon-bubble">🏷️</div><div><strong>Custom Logos</strong><div class="muted">Embroidery, print, heat transfer, rubber patch and woven labels.</div></div></li><li class="feature-item"><div class="icon-bubble">🧵</div><div><strong>Custom Fabrics</strong><div class="muted">Polyester, nylon, canvas, PU and other options.</div></div></li><li class="feature-item"><div class="icon-bubble">📦</div><div><strong>Packaging</strong><div class="muted">Hangtags, polybags and basic packaging solutions.</div></div></li></ul></div><div class="media-panel">${imgTag('assets/images/context/logo-options.webp','logo options')}</div></div></section><section class="section-sm bg-soft"><div class="container process-grid"><div class="media-panel">${imgTag('assets/images/context/pantone.webp','pantone')}</div><div><div class="section-head"><div><h2>Color & Design Development</h2><p>We organize logo, fabric and pattern choices into practical production solutions.</p></div></div>${imgTag('assets/images/context/oem-odm-collage.webp','oem odm collage')}</div></div></section>`; attachImageFallback(customMount);}

    const contactMount = document.getElementById('contactPageMount');
    if(contactMount){const q=new URLSearchParams(location.search);const pre=[q.get('product')||'',q.get('variant')||''].filter(Boolean).join(' - ');contactMount.innerHTML = `<section class="section-sm"><div class="container contact-grid"><div class="detail-main"><span class="badge">Contact & Inquiry</span><h1>Start your custom bag inquiry</h1><p class="muted">Send us product type, quantity, logo method and target market. We will help you move faster.</p><div class="contact-mini contact-big"><div>Company: ${data.company.name}</div><div>Email: <a href="mailto:${data.company.email}">${data.company.email}</a></div><div>WhatsApp: <a href="${data.company.whatsappLink}" target="_blank" rel="noopener">${data.company.whatsapp}</a></div><div>WeChat: ${data.company.wechat}</div></div><div style="margin-top:22px">${imgTag('assets/images/context/factory-building.webp','factory')}</div></div><div class="quote-card"><h3>Send Inquiry</h3><form class="form inquiry-form" data-product-title="${pre || 'General Inquiry'}"><input name="name" placeholder="Your Name" required><input type="email" name="email" placeholder="Your Email" required><input name="company" placeholder="Company Name"><input name="product" placeholder="Interested Product" value="${pre}"><textarea name="message" placeholder="Quantity, logo method, material, color and packaging requirements"></textarea><button class="btn btn-primary btn-block" type="submit">Send by Email</button><a class="btn btn-secondary btn-block" href="${data.company.whatsappLink}" target="_blank" rel="noopener">Contact via WhatsApp</a></form></div></div></section>`; attachImageFallback(contactMount);}
  }

  function bindInquiryForms(){
    document.querySelectorAll('.inquiry-form').forEach(form=>form.addEventListener('submit',e=>{
      e.preventDefault();
      const fd=new FormData(form);
      const subject=`[Website Inquiry] ${form.dataset.productTitle || fd.get('product') || 'Custom Bag Project'}`;
      const bodyText=[`Name: ${fd.get('name')||''}`,`Email: ${fd.get('email')||''}`,`Company: ${fd.get('company')||''}`,`Product: ${fd.get('product')||form.dataset.productTitle||''}`,`Quantity: ${fd.get('qty')||''}`,'',`Message: ${fd.get('message')||''}`].join('\n');
      window.location.href=`mailto:${data.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    }));
  }

  function initEditMode(){
    let clicks=0,timer=null;
    const banner=document.getElementById('editBanner');
    const nodes=[document.getElementById('editTriggerArea'),document.querySelector('.site-header'),...document.querySelectorAll('.brand,.logo-mark')].filter(Boolean);
    if(!banner) return;
    const toggle=()=>{const enable=!document.body.classList.contains('editing');document.body.classList.toggle('editing',enable);document.querySelectorAll('.editable').forEach(el=>el.setAttribute('contenteditable',enable?'true':'false'));banner.textContent=enable?'Edit mode enabled. You can modify highlighted text blocks directly.':'Edit mode disabled.';banner.style.display='block';setTimeout(()=>{if(!document.body.classList.contains('editing')) banner.style.display='none';},1800);};
    const count=()=>{clicks++;clearTimeout(timer);if(clicks>=5){toggle();clicks=0;return;}timer=setTimeout(()=>clicks=0,2400);};
    nodes.forEach(n=>{n.addEventListener('click',count);});
  }

  function renderHomeSections(){
    const why=document.getElementById('whyChooseUs');
    if(why){why.innerHTML=`<div class="grid grid-4"><article class="card info-card"><div class="card-body"><div class="icon-bubble">🏭</div><h3 class="card-title">Real Factory Support</h3><p class="muted">Workshop photos and production content help buyers trust your business faster.</p></div></article><article class="card info-card"><div class="card-body"><div class="icon-bubble">🎯</div><h3 class="card-title">Clear Customization</h3><p class="muted">Logo, fabric, color, pattern and packaging options are presented clearly.</p></div></article><article class="card info-card"><div class="card-body"><div class="icon-bubble">📦</div><h3 class="card-title">Buyer-friendly MOQ</h3><p class="muted">Suitable for importers, wholesalers, retailers and promotional companies.</p></div></article><article class="card info-card"><div class="card-body"><div class="icon-bubble">✅</div><h3 class="card-title">Professional Follow-up</h3><p class="muted">Fast response and practical quotation support for long-term B2B cooperation.</p></div></article></div>`;}
    const factory=document.getElementById('homeFactoryBlock');
    if(factory){factory.innerHTML=`<div class="process-grid"><div><div class="section-head"><div><span class="badge">Buyer Workflow</span><h2>Designed around procurement browsing habits</h2><p>Homepage first builds trust, then shows categories, customization capability, factory strength and clear inquiry paths.</p></div></div><div class="feature-list"><div class="feature-item"><div class="icon-bubble">1</div><div><strong>Choose Product Type</strong><div class="muted">Backpacks, mommy bags, waist bags, chest bags, shoulder bags, crossbody bags, running chest bags and gym bags.</div></div></div><div class="feature-item"><div class="icon-bubble">2</div><div><strong>Confirm Custom Details</strong><div class="muted">Logo, color, pattern, fabric, hardware, packaging and multi-style product display.</div></div></div><div class="feature-item"><div class="icon-bubble">3</div><div><strong>Sample & Production</strong><div class="muted">Sample development, page confirmation and bulk production follow-up.</div></div></div><div class="feature-item"><div class="icon-bubble">4</div><div><strong>Shipment & Repeat Orders</strong><div class="muted">Stable communication for future orders.</div></div></div></div></div><div class="media-panel">${imgTag('assets/images/context/factory-workshop.webp','factory workshop')}</div></div>`;attachImageFallback(factory);}
  }

  renderHeader();renderFooter();renderHero();renderCategories();renderFeaturedProducts();renderTestimonials();renderFAQ();renderAllProducts();renderDetailPage();renderAboutFactory();renderHomeSections();bindInquiryForms();attachImageFallback(document);initEditMode();
})();

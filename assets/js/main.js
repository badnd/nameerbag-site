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

  function inquiryContext(){
    const params = new URLSearchParams(location.search);
    const productKey = body.dataset.product || params.get('product');
    return {
      product: productKey ? data.products[productKey] : null,
      variant: params.get('variant') || ''
    };
  }

  function whatsappUrl(product=null, variant=''){
    const context = inquiryContext();
    const selectedProduct = product || context.product;
    const selectedVariant = variant || context.variant;
    const baseUrl = data.company.whatsappLink.split('?')[0];
    const message = selectedProduct
      ? `Hi, I'm interested in your ${selectedProduct.title} (${selectedProduct.model})${selectedVariant ? ` - ${selectedVariant}` : ''}. Please send MOQ, customization options and quotation.`
      : `Hi, I'm interested in your custom bag products. Please send your product catalog, MOQ, customization options and quotation.`;
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  function privacyNotice(){
    return `<p class="form-privacy">By contacting us, you acknowledge our <a href="${path('pages/privacy-policy.html')}">Privacy Policy</a>.</p>`;
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
            <img class="brand-logo" src="${path('assets/images/brand/nameer-logo-horizontal.png?v=2')}" alt="Nameer">
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
            <a class="btn btn-primary" href="${whatsappUrl()}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </header>`;
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if(toggle && navLinks){
      toggle.addEventListener('click', ()=>navLinks.classList.toggle('open'));
      navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));
    }
    const siteHeader = headerTarget.querySelector('.site-header');
    const updateHeaderShadow = ()=>siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
    updateHeaderShadow();
    window.addEventListener('scroll', updateHeaderShadow, {passive:true});
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
                <img class="brand-logo footer-logo" src="${path('assets/images/brand/nameer-logo-horizontal.png?v=2')}" alt="Nameer">
              </span>
              <small>${data.company.tagline}</small>
            </div>
            <p class="editable">${data.company.name} supplies custom bag solutions for global B2B buyers, including backpacks, waist bags, sling bags, mommy bags and gym bags.</p>
          </div>
          <div><h4>Products</h4><ul>${data.categories.map(c=>`<li><a href="${path(c.link)}">${c.name}</a></li>`).join('')}</ul></div>
          <div><h4>Buyer Service</h4><ul><li><a href="${path('pages/custom-service.html')}">OEM / ODM Service</a></li><li><a href="${path('pages/factory.html')}">Factory Strength</a></li><li><a href="${path('pages/products.html')}">Product Catalog</a></li><li><a href="${path('pages/contact.html')}">Send Inquiry</a></li><li><a href="${path('pages/privacy-policy.html')}">Privacy Policy</a></li></ul></div>
          <div><h4>Contact</h4><ul><li>Email: <a href="mailto:${data.company.email}">${data.company.email}</a></li><li>WhatsApp: <a href="${whatsappUrl()}" target="_blank" rel="noopener">${data.company.whatsapp}</a></li><li>WeChat: ${data.company.wechat}</li><li>${data.company.priceText}</li></ul></div>
        </div>
        <div class="container footer-bottom" id="editTriggerArea"><span>© ${year} ${data.company.name}. All rights reserved.</span></div>
      </footer>
      <a class="floating-wa" href="${whatsappUrl()}" target="_blank" rel="noopener" aria-label="WhatsApp inquiry">💬</a>
      <div class="floating-label">WhatsApp Inquiry</div>
      <div class="mobile-contact-bar"><a class="btn btn-secondary" href="mailto:${data.company.email}">Email</a><a class="btn btn-primary" href="${whatsappUrl()}" target="_blank" rel="noopener">WhatsApp</a></div>
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

  function productCard(p, slug, simple=false, options={}){
    const imageSrc = simple || options.useHeroImage ? p.hero : p.variants[0].image;
    const logoZone = options.showLogoZone ? '<span class="logo-location-pill">Custom Logo Zone</span>' : '';
    return `<article class="card product-card">
      <a class="card-media" href="${path('pages/product-'+slug+'.html')}">${imgTag(imageSrc, p.title)}${logoZone}</a>
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
    const featured = (data.homeFeaturedProducts || [])
      .filter(slug=>data.products[slug])
      .map(slug=>[slug,data.products[slug]]);
    const items = featured.length ? featured : Object.entries(data.products).slice(0,6);
    mount.innerHTML = items.map(([slug,p])=>productCard(p,slug,true,{showLogoZone:true})).join('');
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

  function variantPresentation(variant){
    const name = variant.name.toLowerCase();
    const options = [
      ['black', 'Black', '#20242b', 'Color'],
      ['white', 'White', '#f4f4f1', 'Color'],
      ['ivory', 'Ivory', '#eee8d8', 'Color'],
      ['pink', 'Pink', '#d9879a', 'Color'],
      ['khaki', 'Khaki', '#a89472', 'Color'],
      ['blue', 'Blue', '#355d8a', 'Color'],
      ['floral', 'Floral Print', 'linear-gradient(135deg,#d78598 0 33%,#638166 33% 66%,#e7c99c 66%)', 'Print'],
      ['color series', 'Multi-color Options', 'linear-gradient(135deg,#20242b 0 25%,#355d8a 25% 50%,#a89472 50% 75%,#d9879a 75%)', 'Colors'],
      ['color display', 'Multi-color Options', 'linear-gradient(135deg,#20242b 0 25%,#355d8a 25% 50%,#a89472 50% 75%,#d9879a 75%)', 'Colors'],
      ['classic', 'Classic Black', '#20242b', 'Color'],
      ['promotion', 'Logo Display', '#0d5bd7', 'View'],
      ['lifestyle', 'Lifestyle View', '#6d7786', 'View'],
      ['scene', 'Lifestyle View', '#6d7786', 'View'],
      ['model collage', 'Lifestyle View', '#6d7786', 'View'],
      ['detail', 'Detail View', '#0d5bd7', 'View'],
      ['parameter', 'Detail View', '#0d5bd7', 'View'],
      ['poster', 'Product Display', '#0d5bd7', 'View']
    ];
    const match = options.find(option=>name.includes(option[0]));
    return match ? {label:match[1],color:match[2],type:match[3]} : {label:'Product View',color:'#6d7786',type:'View'};
  }

  function renderDetailPage(){
    const detailMount = document.getElementById('productDetailMount');
    if(!detailMount) return;
    const key = body.dataset.product;
    const p = data.products[key];
    if(!p){detailMount.innerHTML='<div class="container section-sm">Product not found.</div>';return;}
    detailMount.innerHTML = `<div class="breadcrumb container"><a href="${path('index.html')}">Home</a><span>/</span><a href="${path('pages/products.html')}">Products</a><span>/</span>${p.title}</div>
    <section class="section-sm"><div class="container detail-grid">
      <div><div class="gallery-main" tabindex="0" role="button" aria-label="Open large product image">${imgTag(p.gallery[0], p.title, 'detail-main-image')}<span class="gallery-zoom-hint">Click to enlarge</span></div><div class="gallery-thumbs">${p.gallery.map((g,i)=>`<img class="${i===0?'active':''}" src="${path(g)}" data-full="${path(g)}" data-index="${i}" alt="${p.title} ${i+1}" onerror="this.onerror=null;this.src='${path('assets/images/generated/hero-student.webp')}'">`).join('')}</div></div>
      <div class="detail-main"><div class="badge">${p.category}</div><h1 class="editable">${p.title}</h1><div class="detail-meta">Model: ${p.model}</div><p class="editable">${p.intro}</p><div class="inline-badges">${p.badges.map(b=>`<span class="badge">${b}</span>`).join('')}</div><div class="quote-price">${data.company.priceText}</div><h3>Key Features</h3><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><div class="quick-icons"><div class="mini">Custom Logo</div><div class="mini">Custom Color</div><div class="mini">OEM / ODM</div><div class="mini">Low MOQ</div></div></div>
      <aside class="quote-card"><h3>Quick Inquiry</h3><p class="muted">Send quantity, logo idea, target material and packaging requirements.</p><form class="form inquiry-form" data-product-title="${p.title}"><input name="name" placeholder="Your Name" required><input type="email" name="email" placeholder="Your Email" required><input name="qty" placeholder="Quantity / MOQ target"><textarea name="message" placeholder="Tell us your logo, color, material and packing needs"></textarea><button class="btn btn-primary btn-block" type="submit">Send Inquiry</button><a class="btn btn-secondary btn-block" href="${whatsappUrl(p)}" target="_blank" rel="noopener">WhatsApp Now</a>${privacyNotice()}</form><div class="contact-mini"><div>📧 ${data.company.email}</div><div>💬 ${data.company.whatsapp}</div><div>🟢 ${data.company.wechat}</div></div></aside>
    </div></section>
    <section class="section-sm bg-soft"><div class="container"><div class="section-head"><div><span class="badge">Procurement Details</span><h2>Specifications & Custom Options</h2><p>Structured details help B2B customers compare quickly and send accurate inquiries.</p></div></div><div class="spec-grid"><div class="spec-card spec-wide"><table class="spec-table"><tbody>${p.specs.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div><div class="spec-card"><h3>Custom Service</h3><ul><li>Logo method suggestion</li><li>Color and material matching</li><li>Sample and production support</li><li>Packaging option discussion</li></ul></div></div></div></section>
    <section class="section-sm"><div class="container about-grid"><div><div class="section-head"><div><span class="badge">Scene Display</span><h2>Model Scene & Wearing Effect</h2><p>Scene images show product scale and help buyers understand market positioning.</p></div></div>${imgTag(p.lifestyle, p.title+' lifestyle', 'scene-image')}</div><div><div class="section-head"><div><span class="badge">Same Product</span><h2>Colors & Product Views</h2><p>Compare available colors, prints and product views. Click any image to enlarge.</p></div></div><div class="grid grid-3 variant-grid">${p.variants.map((v,i)=>{const option=variantPresentation(v);return `<article class="card variant-card"><button class="variant-media" type="button" data-variant-index="${i}" aria-label="Enlarge ${v.name}">${imgTag(v.image,v.name)}<span class="variant-zoom-hint">Enlarge</span></button><div class="card-body"><div class="variant-option"><span class="variant-swatch" style="background:${option.color}"></span><span><small>${option.type}</small><strong>${option.label}</strong></span></div><h3 class="card-title">${v.name}</h3><p class="muted">SKU: ${v.sku}</p></div><div class="card-actions"><a class="btn btn-primary" href="${path('pages/contact.html')}?product=${key}&variant=${encodeURIComponent(v.name)}">Request Quote</a></div></article>`;}).join('')}</div></div></div></section>`;
    initProductGallery(detailMount, p);
    attachImageFallback(detailMount);
  }

  function initProductGallery(detailMount, product){
    const gallery = detailMount.querySelector('.gallery-main');
    const mainImage = detailMount.querySelector('.detail-main-image');
    const thumbs = [...detailMount.querySelectorAll('.gallery-thumbs img')];
    const variantButtons = [...detailMount.querySelectorAll('.variant-media')];
    if(!gallery || !mainImage || !thumbs.length) return;
    let activeIndex = 0;
    const galleryImages = thumbs.map(thumb=>({src:thumb.dataset.full,alt:thumb.alt}));
    const variantImages = product.variants.map(variant=>({src:path(variant.image),alt:variant.name}));

    const selectImage = index=>{
      activeIndex = (index + thumbs.length) % thumbs.length;
      thumbs.forEach((thumb,i)=>thumb.classList.toggle('active',i===activeIndex));
      mainImage.src = thumbs[activeIndex].dataset.full;
    };

    thumbs.forEach((thumb,index)=>thumb.addEventListener('click',()=>selectImage(index)));

    gallery.addEventListener('mousemove',event=>{
      if(!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
      const rect = gallery.getBoundingClientRect();
      mainImage.style.transformOrigin = `${((event.clientX-rect.left)/rect.width)*100}% ${((event.clientY-rect.top)/rect.height)*100}%`;
      gallery.classList.add('is-zooming');
    });
    gallery.addEventListener('mouseleave',()=>{
      gallery.classList.remove('is-zooming');
      mainImage.style.transformOrigin = 'center center';
    });

    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role','dialog');
    lightbox.setAttribute('aria-modal','true');
    lightbox.setAttribute('aria-label',`${product.title} image gallery`);
    lightbox.innerHTML = `<button class="lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
      <button class="lightbox-arrow lightbox-prev" type="button" aria-label="Previous image">&#8249;</button>
      <div class="lightbox-stage"><img alt="${product.title.replace(/"/g,'&quot;')}"><div class="lightbox-counter"></div></div>
      <button class="lightbox-arrow lightbox-next" type="button" aria-label="Next image">&#8250;</button>`;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('img');
    const counter = lightbox.querySelector('.lightbox-counter');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let viewerImages = galleryImages;
    let viewerIndex = 0;
    let returnFocus = gallery;
    const updateLightbox = ()=>{
      lightboxImage.src = viewerImages[viewerIndex].src;
      lightboxImage.alt = viewerImages[viewerIndex].alt;
      counter.textContent = `${viewerIndex+1} / ${viewerImages.length}`;
    };
    const openLightbox = (images=galleryImages,index=activeIndex,trigger=gallery)=>{
      viewerImages = images;
      viewerIndex = index;
      returnFocus = trigger;
      updateLightbox();
      lightbox.classList.add('open');
      document.body.classList.add('lightbox-open');
      closeButton.focus();
    };
    const closeLightbox = ()=>{
      lightbox.classList.remove('open');
      document.body.classList.remove('lightbox-open');
      returnFocus.focus();
    };
    const move = step=>{
      viewerIndex = (viewerIndex + step + viewerImages.length) % viewerImages.length;
      if(viewerImages===galleryImages) selectImage(viewerIndex);
      updateLightbox();
    };

    gallery.addEventListener('click',()=>openLightbox());
    gallery.addEventListener('keydown',event=>{
      if(event.key==='Enter' || event.key===' '){
        event.preventDefault();
        openLightbox();
      }
    });
    variantButtons.forEach((button,index)=>button.addEventListener('click',()=>openLightbox(variantImages,index,button)));
    closeButton.addEventListener('click',closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>move(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click',()=>move(1));
    lightbox.addEventListener('click',event=>{if(event.target===lightbox) closeLightbox();});
    document.addEventListener('keydown',event=>{
      if(!lightbox.classList.contains('open')) return;
      if(event.key==='Escape') closeLightbox();
      if(event.key==='ArrowLeft') move(-1);
      if(event.key==='ArrowRight') move(1);
    });
  }

  function renderAboutFactory(){
    const aboutMount = document.getElementById('aboutFactoryMount');
    if(aboutMount){aboutMount.innerHTML = `<section class="section-sm"><div class="container about-grid"><div><span class="badge">Factory Overview</span><h2 class="editable" style="font-size:2.3rem;margin:16px 0">Reliable partner for premium functional bags & cases</h2><p class="editable muted">We support OEM/ODM custom bag projects from design discussion, sampling and material selection to production, inspection, packing and shipping.</p><div class="stats stats-tight" style="margin-top:26px"><div class="stat-card"><span class="stat-num">300+</span><div>Low MOQ Options</div></div><div class="stat-card"><span class="stat-num">7-15</span><div>Day Samples</div></div><div class="stat-card"><span class="stat-num">15-30</span><div>Day Production</div></div><div class="stat-card"><span class="stat-num">OEM</span><div>ODM Support</div></div></div></div><div class="media-panel trust-media">${imgTag('assets/images/trust/factory-exterior.jpg','Nameerbag factory exterior')}</div></div></section><section class="section-sm bg-soft"><div class="container"><div class="section-head"><div><span class="badge">Production Workflow</span><h2>From design to packing and shipping</h2><p>Real workflow content helps buyers understand how a custom bag order moves from idea to finished goods.</p></div></div><div class="wide-media">${imgTag('assets/images/trust/factory-process.jpg?v=2','custom bag production workflow')}</div></div></section><section class="section-sm"><div class="container process-grid"><div><div class="section-head"><div><span class="badge">Workshop Strength</span><h2>Pattern room, sample development and production follow-up</h2><p>We organize custom bag details around material, structure, logo method, color, accessories and packing requirements.</p></div></div><div class="feature-list"><div class="feature-item"><div class="icon-bubble">01</div><div><strong>Design & Sampling</strong><div class="muted">Reference sample, sketch, logo artwork and material selection can be reviewed before sampling.</div></div></div><div class="feature-item"><div class="icon-bubble">02</div><div><strong>Quality Control</strong><div class="muted">Production details are checked through the order process before packing and shipment.</div></div></div><div class="feature-item"><div class="icon-bubble">03</div><div><strong>Packing & Shipping</strong><div class="muted">Bulk goods are packed for export handling according to actual order requirements.</div></div></div></div></div><div class="media-stack trust-stack">${['workshop-design.jpg','packing-bales.jpg','why-choose-us.jpg','buyer-reviews.jpg'].map(x=>imgTag('assets/images/trust/'+x,x.replace('.jpg',''))).join('')}</div></div></section>`; attachImageFallback(aboutMount);}

    const customMount = document.getElementById('customServiceMount');
    if(customMount){customMount.innerHTML = `<section class="section-sm"><div class="container about-grid"><div><span class="badge">Customization Service</span><h2 style="font-size:2.3rem;margin:16px 0">Custom logo, material, color, pattern and packaging options</h2><p class="muted">Send a reference product, design file, logo artwork or target style. We help confirm the practical production details for your bag project.</p><ul class="feature-list" style="margin-top:24px"><li class="feature-item"><div class="icon-bubble">A</div><div><strong>Custom Bag Categories</strong><div class="muted">Backpacks, waist bags, mommy bags, chest bags, gym bags and more functional bags.</div></div></li><li class="feature-item"><div class="icon-bubble">B</div><div><strong>Logo & Brand Details</strong><div class="muted">Printing, embroidery, rubber patch, woven label, heat transfer and hangtag options.</div></div></li><li class="feature-item"><div class="icon-bubble">C</div><div><strong>Low MOQ Plan</strong><div class="muted">Typical MOQ options are 300 / 500 / 1000 pcs depending on style, material and logo method.</div></div></li><li class="feature-item"><div class="icon-bubble">D</div><div><strong>Sample & Bulk Schedule</strong><div class="muted">Sampling usually takes 7-15 days. Bulk production is usually 15-30 days after sample approval.</div></div></li></ul></div><div class="media-panel trust-media">${imgTag('assets/images/trust/custom-patterns.jpg','custom bag pattern and logo options')}</div></div></section><section class="section-sm bg-soft"><div class="container process-grid"><div class="media-panel trust-media">${imgTag('assets/images/trust/bag-categories.jpg','custom bag categories')}</div><div><div class="section-head"><div><span class="badge">How to Start</span><h2>Send the details buyers normally prepare</h2><p>Quantity, product type, logo method, target material, color, packaging and delivery plan help us reply faster with the right direction.</p></div></div><div class="workflow-row"><span>Inquiry</span><span>Confirm Details</span><span>Sample</span><span>Production</span><span>Shipping</span></div></div></div></section>`; attachImageFallback(customMount);}

    const contactMount = document.getElementById('contactPageMount');
    if(contactMount){const q=new URLSearchParams(location.search);const pre=[q.get('product')||'',q.get('variant')||''].filter(Boolean).join(' - ');contactMount.innerHTML = `<section class="section-sm"><div class="container contact-grid"><div class="detail-main"><span class="badge">Contact & Inquiry</span><h2>Start your custom bag inquiry</h2><p class="muted">Tell us your product type, quantity, logo method, material preference and target delivery plan. We will reply with practical suggestions.</p><div class="contact-mini contact-big"><div>Company: ${data.company.name}</div><div>Email: <a href="mailto:${data.company.email}">${data.company.email}</a></div><div>WhatsApp: <a href="${whatsappUrl()}" target="_blank" rel="noopener">${data.company.whatsapp}</a></div><div>WeChat: ${data.company.wechat}</div></div><div class="inquiry-facts"><div><strong>MOQ</strong><span>300 / 500 / 1000 pcs by style</span></div><div><strong>Sample Time</strong><span>7-15 days</span></div><div><strong>Production</strong><span>15-30 days, subject to schedule</span></div></div><div style="margin-top:22px">${imgTag('assets/images/trust/factory-exterior.jpg','Nameerbag factory')}</div></div><div class="quote-card"><h3>Send Inquiry</h3><form class="form inquiry-form" data-product-title="${pre || 'General Inquiry'}"><input name="name" placeholder="Your Name" required><input type="email" name="email" placeholder="Your Email" required><input name="company" placeholder="Company Name"><input name="product" placeholder="Interested Product" value="${pre}"><input name="qty" placeholder="Estimated Quantity"><textarea name="message" placeholder="Product type, logo method, material, color, packaging and delivery requirements"></textarea><button class="btn btn-primary btn-block" type="submit">Send by Email</button><a class="btn btn-secondary btn-block" href="${whatsappUrl()}" target="_blank" rel="noopener">Contact via WhatsApp</a>${privacyNotice()}</form></div></div></section>`; attachImageFallback(contactMount);}
  }
  function bindInquiryForms(){
    document.querySelectorAll('.inquiry-form').forEach(form=>{
      form.insertAdjacentHTML('afterbegin','<input class="form-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">');
      form.addEventListener('submit',async e=>{
      e.preventDefault();
      const fd=new FormData(form);
      const subject=`[Website Inquiry] ${form.dataset.productTitle || fd.get('product') || 'Custom Bag Project'}`;
      const button=form.querySelector('button[type="submit"]');
      let status=form.querySelector('.form-status');
      if(!status){
        status=document.createElement('p');
        status.className='form-status';
        status.setAttribute('role','status');
        status.setAttribute('aria-live','polite');
        button.insertAdjacentElement('afterend',status);
      }
      if(fd.get('_honey')) return;
      const payload=new FormData();
      payload.set('name',fd.get('name')||'');
      payload.set('email',fd.get('email')||'');
      payload.set('company',fd.get('company')||'');
      payload.set('product',fd.get('product')||form.dataset.productTitle||'');
      payload.set('quantity',fd.get('qty')||'');
      payload.set('message',fd.get('message')||'');
      payload.set('_subject',subject);
      payload.set('_template','table');
      payload.set('_captcha','false');
      payload.set('_honey','');
      const originalText=button.textContent;
      button.disabled=true;
      button.textContent='Sending...';
      status.className='form-status';
      status.textContent='Sending your inquiry...';
      try{
        const response=await fetch(`https://formsubmit.co/ajax/${data.company.email}`,{
          method:'POST',
          headers:{'Accept':'application/json'},
          body:payload
        });
        const result=await response.json().catch(()=>({}));
        if(!response.ok || result.success !== 'true') throw new Error(result.message || 'Submission failed');
        form.reset();
        status.className='form-status success';
        status.textContent='Thank you. Your inquiry has been sent successfully.';
      }catch(error){
        status.className='form-status error';
        status.textContent='The form could not be sent. Please use WhatsApp or email us directly.';
      }finally{
        button.disabled=false;
        button.textContent=originalText;
      }
      });
    });
  }

  function enhanceWhatsAppLinks(){
    document.querySelectorAll('a[href*="wa.me/"]').forEach(link=>{
      if(!link.href.includes('text=')) link.href = whatsappUrl();
    });
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
    if(why){why.innerHTML=`<div class="grid grid-4"><article class="card info-card"><div class="card-body"><div class="icon-bubble">01</div><h3 class="card-title">Wide Bag Categories</h3><p class="muted">Backpacks, waist bags, mommy bags, chest bags, gym bags and more functional bags can be developed.</p></div></article><article class="card info-card"><div class="card-body"><div class="icon-bubble">02</div><h3 class="card-title">Low MOQ Options</h3><p class="muted">MOQ can be discussed around 300 / 500 / 1000 pcs depending on style, material and logo details.</p></div></article><article class="card info-card"><div class="card-body"><div class="icon-bubble">03</div><h3 class="card-title">Fast Sampling</h3><p class="muted">Sample development usually takes 7-15 days after artwork and material details are confirmed.</p></div></article><article class="card info-card"><div class="card-body"><div class="icon-bubble">04</div><h3 class="card-title">Reliable Production</h3><p class="muted">Bulk production usually takes 15-30 days after sample approval, subject to actual order schedule.</p></div></article></div><div class="trust-showcase"><div class="media-panel">${imgTag('assets/images/trust/why-choose-us.jpg','why choose Nameerbag')}</div><div class="media-panel">${imgTag('assets/images/trust/buyer-reviews.jpg','buyer reviews for custom bags')}</div></div>`;attachImageFallback(why);}
    const factory=document.getElementById('homeFactoryBlock');
    if(factory){factory.innerHTML=`<div class="process-grid"><div><div class="section-head"><div><span class="badge">Buyer Workflow</span><h2>Simple custom bag order process</h2><p>Built for importers, wholesalers and brands that need clear communication before sampling and bulk production.</p></div></div><div class="feature-list"><div class="feature-item"><div class="icon-bubble">1</div><div><strong>Send Requirements</strong><div class="muted">Product type, quantity, logo, material, color, packaging and target market.</div></div></div><div class="feature-item"><div class="icon-bubble">2</div><div><strong>Confirm Details</strong><div class="muted">We review practical production options and help align the custom direction.</div></div></div><div class="feature-item"><div class="icon-bubble">3</div><div><strong>Sample & Approve</strong><div class="muted">Typical sample time is 7-15 days after key details are confirmed.</div></div></div><div class="feature-item"><div class="icon-bubble">4</div><div><strong>Bulk Production</strong><div class="muted">Production usually takes 15-30 days after sample approval, based on actual scheduling.</div></div></div></div></div><div class="media-panel trust-media">${imgTag('assets/images/trust/factory-process.jpg?v=2','custom bag manufacturing workflow')}</div></div>`;attachImageFallback(factory);}
  }
  renderHeader();renderFooter();renderHero();renderCategories();renderFeaturedProducts();renderTestimonials();renderFAQ();renderAllProducts();renderDetailPage();renderAboutFactory();renderHomeSections();bindInquiryForms();enhanceWhatsAppLinks();attachImageFallback(document);initEditMode();
})();

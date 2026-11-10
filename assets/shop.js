/* Ishara store preview: a small stand-in for the Salla SDK plus the store pages
   (home, category, product, cart, checkout, wishlist, account, info).
   Cart, wishlist and orders live in this browser only (localStorage). Nothing is sent anywhere. */
(function () {
  'use strict';
  var P = window.ISH_P || [], CATS = window.ISH_CATS || [];
  var BY = {}; P.forEach(function (p) { BY[p.id] = p; });
  var PAGE = document.body.getAttribute('data-page') || 'home';
  var HASH = decodeURIComponent(location.hash.slice(1));
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var fmt = function (v) { return Number(v).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ر.س'; };
  var off = function (p) { return p.is_on_sale ? Math.round((1 - p.price / p.regular_price) * 100) : 0; };
  var plural = function (n) { return n === 1 ? 'منتج واحد' : n === 2 ? 'منتجان' : n + (n >= 3 && n <= 10 ? ' منتجات' : ' منتج'); };
  window.addEventListener('hashchange', function () { location.reload(); });

  /* ---------- storage (falls back to memory when blocked) ---------- */
  var MEM = {};
  function load(k, d) { try { var v = localStorage.getItem(k); return v == null ? (k in MEM ? MEM[k] : d) : JSON.parse(v); } catch (e) { return k in MEM ? MEM[k] : d; } }
  function save(k, v) { MEM[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  // share links: #showroom opens phones, #banner opens laptops (each category has its own layout)
  if (PAGE === 'home' && (HASH === 'showroom' || HASH === 'banner')) { location.replace(HASH === 'showroom' ? 'collection.html#c1' : 'collection.html#c2'); return; }

  /* ---------- cart ---------- */
  var SHIP_FREE = 500, SHIP_STD = 25, SHIP_EXP = 45, COD_FEE = 15;
  var COUPONS = { ISHARA10: { pct: 10, label: 'خصم 10%' }, WELCOME50: { amount: 50, min: 300, label: 'خصم 50 ر.س للطلبات فوق 300' } };
  var cartFns = [];
  function cart() { return load('ish_cart', []).filter(function (l) { return BY[l.id] && l.qty > 0; }); }
  function setCart(c) { save('ish_cart', c); paintCounts(); cartFns.forEach(function (f) { try { f(c); } catch (e) {} }); }
  function cartCount() { return cart().reduce(function (a, l) { return a + l.qty; }, 0); }
  function lkey(l) { return l.id + (l.o ? '|' + l.o : ''); }
  function unit(l) { return BY[l.id].price + (l.x || 0); }
  function cartAdd(id, q, opt) {
    var o = (opt && opt.o) || '', c = cart(), l = c.filter(function (x) { return x.id == id && (x.o || '') === o; })[0];
    if (l) l.qty = Math.min(10, l.qty + (q || 1));
    else { l = { id: +id, qty: Math.min(10, q || 1) }; if (o) { l.o = o; l.x = +opt.x || 0; } c.push(l); }
    setCart(c);
  }
  // after an add: the custom code's cart drawer opens if it listens, otherwise a toast
  var addedFns = [];
  function added(p, n) {
    if (addedFns.length) { addedFns.forEach(function (f) { try { f({ product: p }); } catch (e) {} }); return; }
    say('أُضيف للسلة: ' + (p ? p.name : 'منتج') + (n > 1 ? ' × ' + n : ''), ['عرض السلة', 'cart.html']);
  }
  function cartSet(id, q) { setCart(cart().map(function (l) { if (lkey(l) === String(id)) l.qty = Math.max(0, Math.min(10, q)); return l; }).filter(function (l) { return l.qty > 0; })); }
  function totals(lines, ship, pay) {
    var sub = 0, was = 0;
    lines.forEach(function (l) { var p = BY[l.id]; sub += unit(l) * l.qty; was += (p.regular_price + (l.x || 0)) * l.qty; });
    var code = load('ish_coupon', ''), cp = COUPONS[code], disc = 0;
    if (cp && (!cp.min || sub >= cp.min)) disc = cp.pct ? Math.round(sub * cp.pct) / 100 : cp.amount; else code = '';
    var shipping = !lines.length ? 0 : ship === 'express' ? SHIP_EXP : (sub - disc >= SHIP_FREE ? 0 : SHIP_STD);
    var fee = pay === 'cod' ? COD_FEE : 0;
    var total = Math.max(0, sub - disc) + shipping + fee;
    return { sub: sub, saved: was - sub, code: code, disc: disc, ship: shipping, fee: fee, total: total, vat: Math.round(total / 1.15 * 0.15 * 100) / 100 };
  }

  /* ---------- wishlist ---------- */
  function wish() { return load('ish_wished', []).map(Number).filter(function (id) { return BY[id]; }); }
  function toggleWish(id) {
    var w = wish(), i = w.indexOf(+id);
    if (i > -1) w.splice(i, 1); else w.push(+id);
    save('ish_wished', w.map(String)); paintCounts();
    $$('[data-wish="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', i < 0); b.setAttribute('aria-label', i < 0 ? 'إزالة من المفضلة' : 'أضف للمفضلة'); });
    say(i < 0 ? 'أُضيف للمفضلة' : 'أُزيل من المفضلة', i < 0 ? ['المفضلة', 'wishlist.html'] : null);
    if (PAGE === 'wishlist') renderWishlist();
  }
  function paintCounts() {
    var n = cartCount(), w = wish().length;
    $$('.s-cart-summary-count').forEach(function (e) { e.textContent = n; e.classList.toggle('zero', !n); });
    $$('.wish-count').forEach(function (e) { e.textContent = w; e.classList.toggle('zero', !w); });
  }

  /* ---------- toast ---------- */
  var toastT;
  function say(msg, link) {
    var t = $('#toast'); if (!t) return;
    t.innerHTML = '<span>' + esc(msg) + '</span>' + (link ? '<a href="' + esc(link[1]) + '">' + esc(link[0]) + '</a>' : '');
    t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 3200);
  }

  /* ---------- shared markup ---------- */
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>';
  function heartBtn(p, cls) { var on = wish().indexOf(p.id) > -1; return '<button type="button" class="' + (cls || 'heart') + '" data-wish="' + p.id + '" aria-pressed="' + on + '" aria-label="' + (on ? 'إزالة من المفضلة' : 'أضف للمفضلة') + '">' + HEART + '</button>'; }
  function card(p) {
    var d = off(p);
    return '<custom-salla-product-card id="' + p.id + '" class="rc"><div class="s-product-card-image"><a href="' + p.url + '" tabindex="-1" aria-hidden="true"><img src="' + p.image.url + '" alt="' + esc(p.name) + '" loading="lazy"></a>' +
      (d ? '<span class="rc-badge">خصم ' + d + '%</span>' : '') + heartBtn(p) + '</div>' +
      '<div class="s-product-card-content"><span class="rc-brand">' + esc(p.brand) + '</span><h3><a href="' + p.url + '">' + esc(p.name) + '</a></h3>' +
      '<div class="rc-price"><b>' + fmt(p.price) + '</b>' + (d ? '<s>' + fmt(p.regular_price) + '</s>' : '') + '</div>' +
      '<button type="button" class="rc-add" data-ish-add="' + p.id + '">أضف للسلة</button></div></custom-salla-product-card>';
  }
  var ICON = {
    cart: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21.5 7H6"/></svg>',
    box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
  };
  function empty(icon, title, text, btn) { return '<div class="empty">' + (ICON[icon] || HEART) + '<b>' + esc(title) + '</b><span>' + esc(text) + '</span>' + (btn ? '<a class="btn" href="' + btn[1] + '">' + esc(btn[0]) + '</a>' : '') + '</div>'; }

  /* ---------- Salla SDK stand-in (what ishara-custom.js calls) ---------- */
  var cfgPage = { slug: 'index' };
  var cat = /^c\d+$/.test(HASH) ? +HASH.slice(1) : null;
  var pid = /^p\d+$/.test(HASH) ? +HASH.slice(1) : null;
  if (PAGE === 'collection') cfgPage = { slug: 'product.index', id: cat };
  // preview only: each category has its own layout, like CONFIG.collection.layouts on the live store.
  // Laptops (2) use the banner layout; phones and every other category use the showroom layout.
  var LAYOUTS = { 2: 'banner' };
  if (PAGE === 'collection') window.ISHARA_COLLECTION_LAYOUT = LAYOUTS[cat] || 'showroom';
  // preview only: background photos come from local copies of the same Unsplash photos,
  // and the laptops banner gets a laptop photo (on the live store: CONFIG.photos.collections)
  window.ISHARA_LINKS = { about: 'info.html#about' };   // preview only: CONFIG.links.about on the live store
  window.ISHARA_PHOTO_SRC = function (id) { return 'img/u/' + id + '.jpg'; };
  if (PAGE === 'collection' && cat === 2) window.ISHARA_COLLECTION_PHOTO = '1603302576837-37561b2e2302';
  if (PAGE === 'product' && BY[pid]) cfgPage = { slug: 'product.single', id: pid, parent: { url: 'store/c' + BY[pid].cat } };
  if (PAGE === 'cart') cfgPage = { slug: 'cart' };
  // preview only: phones use the studio product page, every other category the theme's classic one
  // (on the live store this is CONFIG.product.layout / CONFIG.product.layouts)
  if (PAGE === 'product' && BY[pid]) window.ISHARA_PRODUCT_LAYOUT = BY[pid].cat === 1 ? 'studio' : 'classic';
  if (PAGE === 'checkout') cfgPage = { slug: 'checkout' };
  if (PAGE === 'wishlist') cfgPage = { slug: 'customer.wishlist' };
  if (PAGE === 'account') cfgPage = { slug: 'customer.orders.index' };
  if (PAGE === 'info') cfgPage = { slug: 'page-single' };
  var URLS = { '': 'index.html', products: 'collection.html#all', offers: 'collection.html#offers', wishlist: 'wishlist.html', cart: 'cart.html', profile: 'account.html', checkout: 'checkout.html' };
  function list(o) {
    var l = P;
    if (o.source === 'offers') l = P.filter(function (p) { return p.is_on_sale; });
    if (o.source === 'categories') l = P.filter(function (p) { return (o.source_value || []).map(Number).indexOf(p.cat) > -1; });
    return l.slice(0, o.limit || 8);
  }
  window.salla = {
    onReady: function (f) { setTimeout(f, 30); },
    config: { get: function (k) { return k === 'page' ? cfgPage : null; } },
    money: function (v) { return Number(v).toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' <small>ر.س</small>'; },
    url: { get: function (p) { return URLS[p] || 'index.html'; } },
    notify: { info: function (m) { say(m); } },
    cart: {
      addItem: function (o) { cartAdd(o.id, o.quantity || 1); added(BY[o.id], o.quantity || 1); return Promise.resolve({ data: { count: cartCount() } }); },
      details: function () {
        var items = cart().map(function (l) { var p = BY[l.id]; return { id: lkey(l), product_id: l.id, name: p.name + (l.o ? ' — ' + l.o : ''), product_image: p.image.url, url: p.url, price: unit(l), total: unit(l) * l.qty, quantity: l.qty }; });
        return Promise.resolve({ data: { cart: { items: items, sub_total: totals(cart()).sub, count: cartCount() } } });
      },
      updateItem: function (o) { cartSet(o.id, +o.quantity); return Promise.resolve({}); },
      deleteItem: function (id) { cartSet(id, 0); return Promise.resolve({}); },
      event: {
        onUpdated: function (f) { cartFns.push(function () { f({ cart: { sub_total: totals(cart()).sub, count: cartCount() } }); }); },
        onItemAdded: function (f) { addedFns.push(f); }
      }
    },
    product: { event: { onPriceUpdated: function () {} } },
    wishlist: {
      add: function (id) { setTimeout(paintCounts, 50); say('أُضيف للمفضلة', ['المفضلة', 'wishlist.html']); return Promise.resolve({ data: { id: id } }); },
      remove: function (id) { setTimeout(function () { paintCounts(); if (PAGE === 'wishlist') renderWishlist(); }, 50); say('أُزيل من المفضلة'); return Promise.resolve({ data: { id: id } }); }
    },
    api: { product: {
      fetch: function (o) { return new Promise(function (r) { setTimeout(function () { r({ data: list(o) }); }, 60); }); },
      getDetails: function (id) { return Promise.resolve({ data: BY[id] }); },
      categories: function () { return Promise.resolve({ data: CATS.map(function (c) { return { id: c.id, name: c.name, url: 'collection.html#c' + c.id, image: '' }; }) }); }
    } }
  };

  /* ---------- header: search ---------- */
  var norm = function (s) { return String(s).toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[ًٌٍَُِّْ]/g, ''); };
  (function search() {
    var inp = $('#q'), box = $('#sres'); if (!inp) return;
    var hits = [], on = -1;
    var draw = function () {
      var q = norm(inp.value.trim()); on = -1;
      if (!q) { box.hidden = true; return; }
      var words = q.split(/\s+/);
      hits = P.filter(function (p) { var h = norm(p.name + ' ' + p.brand + ' ' + p.category.name); return words.every(function (w) { return h.indexOf(w) > -1; }); }).slice(0, 6);
      box.innerHTML = hits.length ? hits.map(function (p) { return '<a href="' + p.url + '"><img src="' + p.image.url + '" alt=""><span>' + esc(p.name) + '</span><b>' + fmt(p.price) + '</b></a>'; }).join('') : '<p>لا توجد نتائج لـ "' + esc(inp.value.trim()) + '"</p>';
      box.hidden = false;
    };
    inp.addEventListener('input', draw);
    inp.addEventListener('focus', draw);
    inp.addEventListener('keydown', function (e) {
      var as = $$('a', box);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!as.length) return; on = (on + (e.key === 'ArrowDown' ? 1 : -1) + as.length) % as.length; as.forEach(function (a, i) { a.classList.toggle('on', i === on); }); }
      if (e.key === 'Escape') { box.hidden = true; }
    });
    inp.form.addEventListener('submit', function (e) { e.preventDefault(); var a = $$('a', box)[on > -1 ? on : 0]; if (a) location.href = a.getAttribute('href'); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.search')) box.hidden = true; });
  })();

  /* ---------- global clicks ---------- */
  document.addEventListener('click', function (e) {
    var w = e.target.closest('[data-wish]'); if (w) { e.preventDefault(); toggleWish(w.getAttribute('data-wish')); }
  });

  /* ================= PAGES ================= */
  function home() {
    var g = $('#latest'); if (g) g.innerHTML = P.slice(0, 8).map(card).join('');
  }

  function collection() {
    var offersOnly = HASH === 'offers';
    var base = P.filter(function (p) { return cat ? p.cat === cat : (offersOnly ? p.is_on_sale : true); });
    var c = CATS.filter(function (x) { return x.id === cat; })[0];
    var title = c ? c.name : offersOnly ? 'العروض' : 'كل المنتجات';
    $('#crumb').textContent = title; document.title = title + ' | إشارة';
    $$('.nav a').forEach(function (a) { if (a.getAttribute('href') === 'collection.html#' + (HASH || 'all')) a.setAttribute('aria-current', 'page'); });
    var brands = {}; base.forEach(function (p) { brands[p.brand] = (brands[p.brand] || 0) + 1; });
    $('#brands').innerHTML = Object.keys(brands).sort().map(function (b, i) { return '<label class="chk" for="b' + i + '"><input type="checkbox" id="b' + i + '" value="' + esc(b) + '"><span dir="ltr">' + esc(b) + '</span><small>' + brands[b] + '</small></label>'; }).join('');
    var prices = base.map(function (p) { return p.price; }), lo = Math.floor(Math.min.apply(null, prices) / 50) * 50, hi = Math.ceil(Math.max.apply(null, prices) / 50) * 50;
    var pr = $('#priceMax'); pr.min = lo; pr.max = hi; pr.value = hi; $('#pmin').textContent = fmt(lo);
    if (offersOnly) $('#onlyOffers').checked = true;
    function draw() {
      var bs = $$('#brands input:checked').map(function (i) { return i.value; });
      var max = +pr.value; $('#pval').textContent = 'حتى ' + fmt(max);
      var l = base.filter(function (p) { return (!bs.length || bs.indexOf(p.brand) > -1) && p.price <= max && (!$('#onlyOffers').checked || p.is_on_sale); });
      var s = $('#sort').value;
      l = l.slice().sort(function (a, b) { return s === 'low' ? a.price - b.price : s === 'high' ? b.price - a.price : s === 'off' ? off(b) - off(a) : a.id - b.id; });
      $('#count').textContent = plural(l.length);
      $('#grid').innerHTML = l.map(card).join(''); $('#grid').hidden = !l.length; $('#none').hidden = !!l.length;
    }
    function clear() { $$('#filters input[type=checkbox]').forEach(function (i) { i.checked = false; }); pr.value = hi; draw(); }
    $('#filters').addEventListener('input', draw); $('#sort').addEventListener('change', draw);
    $('#clearAll').addEventListener('click', clear); $('#clear2').addEventListener('click', clear);
    $('#ftoggle').addEventListener('click', function () { var o = $('#filters').classList.toggle('open'); this.setAttribute('aria-expanded', o); });
    draw();
  }

  function warranty(p) {   // a priced option, like a Salla product option
    if ([1, 2, 3, 5, 6].indexOf(p.cat) < 0) return null;
    var y1 = Math.max(49, Math.round(p.price * 0.06 / 10) * 10), y2 = Math.round(y1 * 1.8 / 10) * 10 - 1;
    return { name: 'الضمان', values: [['ضمان الوكيل سنتين', 0, 'مشمول'], ['ضمان ممتد + سنة', y1], ['ضمان ممتد + سنتين', y2]] };
  }
  function product() {
    var p = BY[pid], root = $('#pp');
    if (!p) { root.outerHTML = '<div class="wrap gut" style="padding-block:40px">' + empty('box', 'المنتج غير موجود', 'ربما تغيّر الرابط. تصفّح المنتجات من الأقسام.', ['كل المنتجات', 'collection.html#all']) + '</div>'; return; }
    document.title = p.name + ' | إشارة';
    root.id = 'product-' + p.id;
    var c = CATS.filter(function (x) { return x.id === p.cat; })[0], d = off(p), imgs = p.images || [p.image], opt = warranty(p);
    $('#crumbs').innerHTML = '<a href="index.html">الرئيسية</a><span aria-hidden="true">‹</span><a href="collection.html#c' + p.cat + '">' + esc(c.name) + '</a><span aria-hidden="true">‹</span><span>' + esc(p.name) + '</span>';
    var specs = String(p.description).split(/[،.]\s*/).map(function (s) { return s.trim(); }).filter(Boolean);
    var stock = p.qty <= 5 ? '<span class="pill pill--sale">باقي ' + p.qty + ' فقط</span>' : '<span class="pill pill--ok">متوفر</span>';
    root.innerHTML =
      '<div class="sidebar pp-gal"><salla-slider class="details-slider" data-images=\'' + esc(JSON.stringify(imgs)) + '\'>' +
        imgs.map(function (x, i) { return '<div class="swiper-slide magnify-wrapper pp-main' + (i ? '' : ' swiper-slide-active') + '"' + (i ? ' hidden' : '') + ' role="img" aria-label="' + esc(x.alt || p.name) + '"><img src="' + x.url + '" alt="' + esc(x.alt || p.name) + '">' + (d && !i ? '<span class="rc-badge" style="top:16px;right:16px;font-size:13px">خصم ' + d + '%</span>' : '') + '</div>'; }).join('') +
        (imgs.length > 1 ? '<div class="pp-thumbs">' + imgs.map(function (x, i) { return '<button type="button" class="slide--one-fourth" data-th="' + i + '" aria-label="الصورة ' + (i + 1) + '"' + (i ? '' : ' aria-current="true"') + '><img src="' + x.url + '" alt=""></button>'; }).join('') + '</div>' : '') +
      '</salla-slider></div>' +
      '<div class="main-content pp-info">' +
        '<div class="pp-meta"><span class="rc-brand" style="font-size:12px">' + esc(p.brand) + '</span>' + stock + (p.promo ? '<span class="pill">' + esc(p.promo) + '</span>' : '') + '</div>' +
        '<h1 data-testid="store-product-title">' + esc(p.name) + '</h1>' +
        '<small class="color-grey muted" style="font-size:13px">السعر شامل ضريبة القيمة المضافة</small>' +
        '<div data-testid="store-product-price" class="pp-price"><b>' + fmt(p.price) + '</b>' + (d ? '<s>' + fmt(p.regular_price) + '</s><span class="pill pill--sale">وفّر ' + fmt(p.regular_price - p.price) + '</span>' : '') + '</div>' +
        '<div class="product__description box"><h2 class="pp-desc-t">أبرز المواصفات</h2><article class="article--main"><ul class="pp-specs">' + specs.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></article></div>' +
        '<salla-installment class="pp-inst"></salla-installment>' +
        '<form class="form product-form" novalidate>' +
          (opt ? '<fieldset class="pp-opts"><legend>' + esc(opt.name) + '</legend>' + opt.values.map(function (v, i) {
            return '<label><input type="radio" name="opt" value="' + i + '"' + (i ? '' : ' checked') + '><span>' + esc(v[0]) + '</span><b>' + (v[1] ? '+ ' + fmt(v[1]) : esc(v[2])) + '</b></label>';
          }).join('') + '</fieldset>' : '') +
          '<div class="price-wrapper pp-total"><span>الإجمالي</span><h2 class="total-price">' + fmt(p.price) + '</h2></div>' +
          '<div class="pp-buy"><div class="qty" role="group" aria-label="الكمية"><button type="button" data-q="1" aria-label="زيادة">+</button><input id="qty" type="number" min="1" max="10" value="1" aria-label="الكمية" inputmode="numeric"><button type="button" data-q="-1" aria-label="إنقاص">−</button></div>' +
          '<salla-add-product-button style="display:flex;flex:1;min-width:140px"><button type="button" class="btn" id="addBtn" style="flex:1">أضف للسلة</button></salla-add-product-button><button type="button" class="btn btn--dark" id="buyBtn">اشترِ الآن</button>' + heartBtn(p, 'pp-heart') + '</div>' +
        '</form>' +
        '<div class="pp-perks"><div><b>توصيل سريع</b><span class="muted">1–3 أيام</span></div><div><b>ضمان الوكيل</b><span class="muted">منتج أصلي</span></div><div><b>استرجاع</b><span class="muted">خلال 7 أيام</span></div></div>' +
        '<table class="pp-table"><tr><th>الماركة</th><td dir="ltr" style="text-align:right">' + esc(p.brand) + '</td></tr><tr><th>القسم</th><td><a href="collection.html#c' + p.cat + '">' + esc(c.name) + '</a></td></tr><tr><th>رمز المنتج</th><td dir="ltr" style="text-align:right">' + esc(p.sku) + '</td></tr></table>' +
      '</div>';
    var q = $('#qty'), form = $('.product-form', root);
    function chosen() { var r = $('input[name=opt]:checked', root); var v = opt && r ? opt.values[+r.value] : null; return v && v[1] ? { o: v[0], x: v[1] } : null; }
    function n() { return Math.max(1, Math.min(10, +q.value || 1)); }
    function reprice() {   // like Salla: the price updates with the option and the quantity
      var o = chosen(), u = p.price + (o ? o.x : 0), t = u * n();
      $('.total-price', root).textContent = fmt(t);
      $('.pp-inst', root).innerHTML = '<span><span class="tag tag--tabby">tabby</span> قسّمها على 4 دفعات: <b class="num">' + fmt(Math.round(t / 4 * 100) / 100) + '</b> بدون فوائد</span><span><span class="tag tag--tamara">tamara</span> أو على 3 دفعات: <b class="num">' + fmt(Math.round(t / 3 * 100) / 100) + '</b></span>';
    }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-q]'); if (b) { q.value = Math.max(1, Math.min(10, (+q.value || 1) + +b.getAttribute('data-q'))); reprice(); } });
    form.addEventListener('change', reprice); q.addEventListener('input', reprice);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    reprice();
    var add = function () { cartAdd(p.id, n(), chosen()); added(p, n()); };
    $('#addBtn').addEventListener('click', add);
    $('#buyBtn').addEventListener('click', function () { cartAdd(p.id, n(), chosen()); location.href = 'checkout.html'; });
    // classic gallery: thumbnails switch the active slide (the studio gallery follows it)
    var slides = $$('.pp-main', root);
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-th]'); if (!t) return;
      var k = +t.getAttribute('data-th');
      slides.forEach(function (sl, i) { sl.hidden = i !== k; sl.classList.toggle('swiper-slide-active', i === k); });
      $$('[data-th]', root).forEach(function (b, i) { if (i === k) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    });
    slides.forEach(function (z) {
      z.addEventListener('click', function () { z.classList.toggle('zoom'); });
      z.addEventListener('mousemove', function (e) { var r = z.getBoundingClientRect(); $('img', z).style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%'; });
      z.addEventListener('mouseleave', function () { z.classList.remove('zoom'); });
    });
    // related: same category first, then offers
    var rel = P.filter(function (x) { return x.cat === p.cat && x.id !== p.id; });
    rel = rel.concat(P.filter(function (x) { return x.is_on_sale && x.cat !== p.cat; })).slice(0, 4);
    $('#related').innerHTML = rel.map(card).join('');
  }

  function summaryRows(t) {
    return '<div class="row"><span>المجموع</span><span>' + fmt(t.sub) + '</span></div>' +
      (t.saved > 0 ? '<div class="row save"><span>وفّرت من العروض</span><span>' + fmt(t.saved) + '</span></div>' : '') +
      (t.disc ? '<div class="row save"><span>كوبون ' + esc(t.code) + '</span><span>−' + fmt(t.disc) + '</span></div>' : '') +
      '<div class="row"><span>الشحن</span><span>' + (t.ship ? fmt(t.ship) : 'مجاني') + '</span></div>' +
      (t.fee ? '<div class="row"><span>رسوم الدفع عند الاستلام</span><span>' + fmt(t.fee) + '</span></div>' : '') +
      '<div class="row tot"><span>الإجمالي</span><span>' + fmt(t.total) + '</span></div><span class="muted" style="font-size:12px">شامل ضريبة القيمة المضافة (' + fmt(t.vat) + ')</span>';
  }

  function cartPage() {
    var root = $('#cart');
    function draw() {
      var lines = cart(), t = totals(lines);
      $('#cartTitle').textContent = lines.length ? 'سلة المشتريات (' + plural(cartCount()) + ')' : 'سلة المشتريات';
      if (!lines.length) { root.innerHTML = '<div style="grid-column:1/-1">' + empty('cart', 'سلتك فاضية', 'تصفّح الأقسام وأضف اللي يعجبك.', ['ابدأ التسوق', 'index.html']) + '</div>'; return; }
      root.innerHTML = '<div class="box" style="min-width:0">' + lines.map(function (l) {
        var p = BY[l.id];
        return '<div class="cline"><a href="' + p.url + '"><img src="' + p.image.url + '" alt=""></a><div style="min-width:0"><h3><a href="' + p.url + '">' + esc(p.name) + '</a></h3>' + (l.o ? '<span class="muted" style="font-size:13px;display:block">' + esc(l.o) + ' (+' + fmt(l.x) + ')</span>' : '') + '<span class="muted num" style="font-size:13px">' + fmt(unit(l)) + (off(p) ? ' · <s>' + fmt(p.regular_price + (l.x || 0)) + '</s>' : '') + '</span></div>' +
          '<div class="r"><b>' + fmt(unit(l) * l.qty) + '</b><div class="qty qty--sm" role="group" aria-label="كمية ' + esc(p.name) + '"><button type="button" data-set="' + esc(lkey(l)) + '" data-v="' + (l.qty + 1) + '" aria-label="زيادة">+</button><input value="' + l.qty + '" readonly aria-label="الكمية"><button type="button" data-set="' + esc(lkey(l)) + '" data-v="' + (l.qty - 1) + '" aria-label="إنقاص">−</button></div><button type="button" class="rm" data-set="' + esc(lkey(l)) + '" data-v="0">حذف</button></div></div>';
      }).join('') + '</div>' +
        '<aside class="box sum"><h2>ملخص الطلب</h2>' +
        summaryRows(t) +
        '<form class="coupon" id="cpForm"><input class="inp" id="cp" placeholder="كود الخصم" aria-label="كود الخصم" value="' + esc(t.code) + '" autocomplete="off"><button class="btn btn--ghost" type="submit">' + (t.code ? 'إزالة' : 'تطبيق') + '</button></form><span class="msg" id="cpMsg">' + (t.code ? '<span class="ok">تم تطبيق ' + esc(COUPONS[t.code].label) + '</span>' : 'جرّب الكود <b dir="ltr">ISHARA10</b>') + '</span>' +
        '<a class="btn btn--block" href="checkout.html">إتمام الطلب</a>' +
        '<span class="muted" style="font-size:12px;text-align:center"><span class="tag tag--tabby">tabby</span> 4 دفعات × <b class="num">' + fmt(Math.round(t.total / 4 * 100) / 100) + '</b></span></aside>';
    }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-set]'); if (b) cartSet(b.getAttribute('data-set'), +b.getAttribute('data-v')); });
    root.addEventListener('submit', function (e) {
      e.preventDefault();
      var have = load('ish_coupon', ''); if (have) { save('ish_coupon', ''); draw(); return; }
      var v = $('#cp').value.trim().toUpperCase(), c = COUPONS[v], t = totals(cart());
      if (!c) { $('#cpMsg').innerHTML = '<span class="err">الكود غير صحيح</span>'; return; }
      if (c.min && t.sub < c.min) { $('#cpMsg').innerHTML = '<span class="err">هذا الكود للطلبات فوق ' + fmt(c.min) + '</span>'; return; }
      save('ish_coupon', v); draw();
    });
    cartFns.push(draw); draw();
    $('#alsoLike').innerHTML = P.filter(function (p) { return p.is_on_sale && !cart().some(function (l) { return l.id === p.id; }); }).slice(0, 4).map(card).join('');
  }

  var CITIES = ['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر', 'الظهران', 'الطائف', 'تبوك', 'بريدة', 'أبها', 'خميس مشيط', 'حائل', 'جازان', 'نجران', 'الأحساء', 'ينبع', 'الجبيل'];
  var PAYS = [['mada', 'مدى / بطاقة ائتمانية', 'Visa · Mastercard · mada'], ['applepay', 'Apple Pay', 'ادفع بلمسة'], ['stcpay', 'STC Pay', 'من محفظتك'], ['tabby', 'tabby', '4 دفعات بدون فوائد'], ['tamara', 'tamara', '3 دفعات بدون فوائد'], ['cod', 'الدفع عند الاستلام', '+ ' + COD_FEE + ' ر.س رسوم']];
  function checkout() {
    var root = $('#co');
    if (!cart().length) { root.innerHTML = '<div style="grid-column:1/-1">' + empty('cart', 'ما فيه منتجات في السلة', 'أضف منتجات أولاً ثم ارجع لإتمام الطلب.', ['تصفّح المنتجات', 'collection.html#all']) + '</div>'; return; }
    var me = load('ish_me', {});
    var f = function (id, label, attrs, full) { return '<div class="fld' + (full ? ' full' : '') + '"><label for="' + id + '">' + label + '</label><input class="inp" id="' + id + '" name="' + id + '" value="' + esc(me[id] || '') + '" ' + attrs + '><span class="err" hidden></span></div>'; };
    root.innerHTML = '<form id="coForm" novalidate>' +
      '<fieldset><legend><i>1</i>بيانات التواصل</legend>' + f('name', 'الاسم الكامل', 'autocomplete="name" required') + f('phone', 'رقم الجوال', 'type="tel" inputmode="tel" autocomplete="tel" placeholder="05XXXXXXXX" dir="ltr" required') + '</fieldset>' +
      '<fieldset><legend><i>2</i>عنوان التوصيل</legend><div class="fld"><label for="city">المدينة</label><select id="city" name="city" required><option value="">اختر المدينة</option>' + CITIES.map(function (c) { return '<option' + (me.city === c ? ' selected' : '') + '>' + c + '</option>'; }).join('') + '</select><span class="err" hidden></span></div>' +
        f('district', 'الحي', 'required') + f('street', 'الشارع ورقم المبنى', 'required', true) + f('note', 'ملاحظات للمندوب (اختياري)', '', true) + '</fieldset>' +
      '<fieldset><legend><i>3</i>طريقة الشحن</legend><div class="opts">' +
        '<label class="opt"><input type="radio" name="ship" value="std" checked><span><b>شحن عادي</b><small>2–4 أيام عمل</small></span><em id="stdPrice"></em></label>' +
        '<label class="opt"><input type="radio" name="ship" value="express"><span><b>شحن سريع</b><small>خلال يوم عمل</small></span><em>' + fmt(SHIP_EXP) + '</em></label></div></fieldset>' +
      '<fieldset><legend><i>4</i>طريقة الدفع</legend><div class="opts">' + PAYS.map(function (x, i) { return '<label class="opt"><input type="radio" name="pay" value="' + x[0] + '"' + (i ? '' : ' checked') + '><span><b>' + x[1] + '</b><small>' + x[2] + '</small></span></label>'; }).join('') + '</div>' +
        '<p class="muted full" style="grid-column:1/-1;margin:0;font-size:13px">في المتجر الحقيقي تفتح صفحة الدفع الآمنة من سلة. هذه معاينة: ما يُطلب منك أي بيانات بطاقة ولا يتم أي دفع.</p></fieldset>' +
      '<button class="btn btn--block" type="submit" id="placeBtn" style="padding:14px;font-size:16px">تأكيد الطلب</button></form>' +
      '<aside class="box sum"><h2>طلبك (' + plural(cartCount()) + ')</h2><div class="mini">' + cart().map(function (l) { var p = BY[l.id]; return '<div><img src="' + p.image.url + '" alt=""><span>' + esc(p.name) + (l.o ? ' <span class="muted">(' + esc(l.o) + ')</span>' : '') + ' <span class="muted">× ' + l.qty + '</span></span><b>' + fmt(unit(l) * l.qty) + '</b></div>'; }).join('') + '</div><div id="coSum" style="display:flex;flex-direction:column;gap:10px"></div><a href="cart.html" class="linkbtn" style="text-align:center">تعديل السلة</a></aside>';
    var form = $('#coForm');
    function sel(n) { return (form.querySelector('[name=' + n + ']:checked') || {}).value; }
    function draw() { var t = totals(cart(), sel('ship'), sel('pay')); $('#coSum').innerHTML = summaryRows(t); var ts = totals(cart(), 'std'); $('#stdPrice').textContent = ts.ship ? fmt(ts.ship) : 'مجاني'; $('#placeBtn').textContent = 'تأكيد الطلب · ' + fmt(t.total); }
    form.addEventListener('change', draw); draw();
    form.addEventListener('input', function (e) { var fl = e.target.closest('.fld.bad'); if (fl) { fl.classList.remove('bad'); $('.err', fl).hidden = true; e.target.removeAttribute('aria-invalid'); } });
    function check(id, ok, msg) { var el = $('#' + id).closest('.fld'), e = $('.err', el); el.classList.toggle('bad', !ok); e.hidden = ok; e.textContent = msg; if (!ok) $('#' + id).setAttribute('aria-invalid', 'true'); else $('#' + id).removeAttribute('aria-invalid'); return ok; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return $('#' + id).value.trim(); };
      var phone = v('phone').replace(/[\s-]/g, '').replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }).replace(/^(\+?966)/, '0');
      var ok = [check('name', v('name').length >= 3, 'اكتب اسمك الكامل'), check('phone', /^05\d{8}$/.test(phone), 'رقم جوال سعودي يبدأ بـ 05 ومكوّن من 10 أرقام'), check('city', !!v('city'), 'اختر المدينة'), check('district', !!v('district'), 'اكتب الحي'), check('street', !!v('street'), 'اكتب الشارع ورقم المبنى')];
      if (ok.indexOf(false) > -1) { var bad = $('.fld.bad .inp, .fld.bad select', form); if (bad) bad.focus(); return; }
      save('ish_me', { name: v('name'), phone: phone, city: v('city'), district: v('district'), street: v('street') });
      var lines = cart(), t = totals(lines, sel('ship'), sel('pay'));
      var order = { no: String(Date.now()).slice(-7), at: Date.now(), lines: lines, t: t, ship: sel('ship'), pay: sel('pay'), city: v('city') };
      save('ish_orders', [order].concat(load('ish_orders', [])).slice(0, 20));
      save('ish_coupon', ''); setCart([]);
      var pay = PAYS.filter(function (x) { return x[0] === order.pay; })[0][1];
      $('#coTitle').hidden = true; $('#coCrumbs').hidden = true;
      root.outerHTML = '<div class="done gut"><div class="ok">' + ICON.check + '</div><h1>تم استلام طلبك</h1><p class="muted" style="margin:0">شكراً ' + esc(v('name').split(' ')[0]) + '! رقم طلبك <b class="num" dir="ltr">#' + order.no + '</b>، ورح نرسل لك تحديثات الشحن على جوالك.</p>' +
        '<div class="box sum" style="position:static"><div class="mini">' + lines.map(function (l) { var p = BY[l.id]; return '<div><img src="' + p.image.url + '" alt=""><span>' + esc(p.name) + (l.o ? ' <span class="muted">(' + esc(l.o) + ')</span>' : '') + ' <span class="muted">× ' + l.qty + '</span></span><b>' + fmt(unit(l) * l.qty) + '</b></div>'; }).join('') + '</div>' + summaryRows(t) + '<div class="row"><span>الدفع</span><span>' + esc(pay) + '</span></div><div class="row"><span>التوصيل إلى</span><span>' + esc(v('city')) + '</span></div></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn" href="account.html">تتبع طلبك</a><a class="btn btn--ghost" href="index.html">متابعة التسوق</a></div>' +
        '<span class="muted" style="font-size:12px">معاينة تجريبية: الطلب محفوظ في هذا المتصفح فقط.</span></div>';
      scrollTo(0, 0);
    });
  }

  var STEPS = ['تم استلام الطلب', 'قيد التجهيز', 'تم الشحن', 'تم التوصيل'];
  function account() {
    var orders = load('ish_orders', []), root = $('#orders');
    if (!orders.length) { root.innerHTML = empty('box', 'ما عندك طلبات للحين', 'أول ما تطلب، تقدر تتابع حالة طلبك من هنا.', ['ابدأ التسوق', 'index.html']); return; }
    root.innerHTML = orders.map(function (o) {
      var mins = (Date.now() - o.at) / 60000, step = mins < 2 ? 0 : mins < 10 ? 1 : mins < 60 ? 2 : 3;
      var d = new Date(o.at), date = d.toLocaleDateString('ar-SA-u-ca-gregory-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' });
      var n = o.lines.reduce(function (a, l) { return a + l.qty; }, 0);
      return '<article class="box order"><header><div style="display:flex;flex-direction:column"><b>طلب <span class="num" dir="ltr">#' + esc(o.no) + '</span></b><span class="muted" style="font-size:13px">' + date + ' · ' + plural(n) + ' · ' + esc(o.city) + '</span></div><b class="num">' + fmt(o.t.total) + '</b></header>' +
        '<div class="thumbs">' + o.lines.filter(function (l) { return BY[l.id]; }).map(function (l) { var p = BY[l.id]; return '<a href="' + p.url + '" title="' + esc(p.name) + '"><img src="' + p.image.url + '" alt="' + esc(p.name) + '"></a>'; }).join('') + '</div>' +
        '<div class="track" aria-label="حالة الطلب: ' + STEPS[step] + '">' + STEPS.map(function (s, i) { return '<div class="' + (i <= step ? 'on' : '') + '">' + s + '</div>'; }).join('') + '</div>' +
        '<div><button type="button" class="btn btn--ghost" data-again="' + esc(o.no) + '">اطلبه مرة ثانية</button></div></article>';
    }).join('');
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-again]'); if (!b) return;
      var o = orders.filter(function (x) { return x.no === b.getAttribute('data-again'); })[0];
      o.lines.forEach(function (l) { if (BY[l.id]) cartAdd(l.id, l.qty, l.o ? { o: l.o, x: l.x } : null); });
      say('أُضيفت منتجات الطلب للسلة', ['عرض السلة', 'cart.html']);
    });
    var me = load('ish_me', {});
    if (me.name) $('#hello').textContent = 'أهلاً ' + me.name.split(' ')[0];
  }

  function renderWishlist() {
    var w = wish(), root = $('#wish');
    $('#wishTitle').textContent = w.length ? 'المفضلة (' + plural(w.length) + ')' : 'المفضلة';
    if (!w.length) { root.innerHTML = empty('heart', 'قائمة المفضلة فاضية', 'اضغط على القلب في أي منتج عشان تحفظه هنا.', ['تصفّح المنتجات', 'collection.html#all']); $('#wishAll').hidden = true; return; }
    root.innerHTML = '<div class="rgrid">' + w.map(function (id) { return card(BY[id]); }).join('') + '</div>';
    var b = $('#wishAll'); b.hidden = false; b.setAttribute('data-ish-addmany', w.join(','));
  }

  function info() {
    var ids = $$('.prose[id]').map(function (s) { return s.id; });
    var cur = ids.indexOf(HASH) > -1 ? HASH : ids[0];
    $$('.prose[id]').forEach(function (s) { s.hidden = s.id !== cur; });
    $$('.acc nav a').forEach(function (a) { if (a.getAttribute('href') === '#' + cur) a.setAttribute('aria-current', 'page'); });
    var t = $('#' + cur + ' h1'); if (t) { document.title = t.textContent + ' | إشارة'; $('#crumb').textContent = t.textContent; }
    var f = $('#contactForm');
    if (f) f.addEventListener('submit', function (e) { e.preventDefault(); if (!f.reportValidity()) return; f.reset(); say('وصلتنا رسالتك، بنرد عليك قريباً (معاينة تجريبية)'); });
  }

  /* ---------- go ---------- */
  ({ home: home, collection: collection, product: product, cart: cartPage, checkout: checkout, account: account, wishlist: renderWishlist, info: info }[PAGE] || function () {})();
  paintCounts();
  window.addEventListener('storage', function (e) { if (/^ish_/.test(e.key || '')) paintCounts(); });
})();

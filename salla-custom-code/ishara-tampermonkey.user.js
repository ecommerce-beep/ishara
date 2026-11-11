// ==UserScript==
// @name         Ishara custom code (Salla preview tester)
// @namespace    ishara
// @version      2.4
// @description  Injects ishara-custom.css + ishara-custom.js into the Salla store to preview them before a custom domain is linked
// @match        https://demostore.salla.sa/*
// @match        https://salla.sa/*
// @match        https://*.salla.sa/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(function () {
  if (window.__ishInjected) return; window.__ishInjected = true;
  var st = document.createElement('style'); st.id = 'ish-custom-css';
  st.textContent = "/* =====================================================================\n   Ishara \u2014 advanced sections for Salla (Raed theme)\n   Paste into: Salla dashboard \u2192 Store design (\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0645\u062a\u062c\u0631) \u2192 Custom code \u2192 CSS\n   Works together with ishara-custom.js\n   ===================================================================== */\n:root{\n  --ish-primary: var(--color-primary, #1746D1);\n  --ish-ink:#0B1220; --ish-ink2:#121B30; --ish-cyan:#00C2FF; --ish-orange:#FF6A1A;\n  --ish-cloud:#F4F6FA; --ish-line:#E3E7EF; --ish-muted:#5B6475; --ish-text:#0B1220;\n  --ish-success:#12A150; --ish-star:#FFB020; --ish-radius:22px;\n}\n.ish *,.ish-modal *,.ish-tray *,.ish-mbar *{box-sizing:border-box}\n.ish{font-family:inherit;color:var(--ish-text);direction:rtl;position:relative}\n.ish-wrap{max-width:1200px;margin:0 auto;padding:0 16px}\n.ish-sec{padding:48px 0}\n.ish-h{font-size:28px;line-height:1.3;font-weight:800;margin:0}\n.ish-h-sm{font-size:20px;font-weight:800;margin:0}\n.ish-eyebrow{font-size:12px;font-weight:800;color:var(--ish-primary)}\n.ish-muted{color:var(--ish-muted)}\n.ish-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:22px;flex-wrap:wrap}\n.ish-head>div{display:flex;flex-direction:column;gap:4px}\n.ish-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;cursor:pointer;background:var(--ish-primary);color:#fff;font:inherit;font-weight:700;font-size:14px;border-radius:12px;padding:11px 18px;transition:filter .2s,transform .2s;text-decoration:none}\n.ish-btn:hover{filter:brightness(1.1)}\n.ish-btn:active{transform:scale(.98)}\n.ish-btn--light{background:#fff;color:var(--ish-ink)}\n.ish-btn--ghost{background:transparent;color:inherit;border:1.5px solid currentColor}\n.ish-btn--outline{background:#fff;color:var(--ish-primary);border:1.5px solid var(--ish-primary)}\n.ish-btn[disabled]{opacity:.45;cursor:not-allowed}\n.ish-loading{opacity:.6;pointer-events:none}\n.ish button{font:inherit;cursor:pointer}\n\n/* card */\n.ish-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}\n.ish-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}\n.ish-card{background:#fff;border:1px solid var(--ish-line);border-radius:20px;padding:10px;display:flex;flex-direction:column;gap:8px;position:relative;color:var(--ish-text);transition:box-shadow .25s,transform .25s}\n.ish-card:hover{box-shadow:0 20px 40px rgba(11,18,32,.10);transform:translateY(-3px)}\n.ish-card__img{display:block;aspect-ratio:1/1;border-radius:14px;overflow:hidden;background:var(--ish-cloud)}\n.ish-card__img img{width:100%;height:100%;object-fit:cover;transition:transform .4s}\n.ish-card:hover .ish-card__img img{transform:scale(1.05)}\n.ish-card__name{font-weight:700;line-height:1.5;color:inherit;text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:42px}\n.ish-badge{position:absolute;top:18px;right:18px;background:var(--ish-orange);color:#fff;font-weight:800;font-size:11px;border-radius:7px;padding:3px 8px}\n.ish-price{display:flex;align-items:baseline;gap:8px;margin-top:auto;flex-wrap:wrap}\n.ish-price b{font-size:18px;color:var(--ish-primary);font-weight:800}\n.ish-price s{font-size:12px;color:var(--ish-muted)}\n.ish-card .ish-btn{width:100%}\n\n/* flash sale */\n.ish-flash{background:var(--ish-ink);color:#fff;overflow:hidden;isolation:isolate}\n.ish-flash::before{content:\"\";position:absolute;inset:0;z-index:-1;background:rgba(6,9,16,.66)}\n.ish-flash .ish-eyebrow{color:#FF9E66}\n.ish-cd{display:flex;gap:8px}\n.ish-cd span{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:14px;min-width:62px;padding:8px 6px;text-align:center;font-size:24px;font-weight:900;font-variant-numeric:tabular-nums;line-height:1.1}\n.ish-cd small{display:block;font-size:10px;font-weight:500;opacity:.7}\n.ish-stock{display:flex;flex-direction:column;gap:4px;font-size:11px;color:var(--ish-muted)}\n.ish-stock i{display:block;height:6px;border-radius:3px;background:#FBE3D6;overflow:hidden}\n.ish-stock i b{display:block;height:100%;background:linear-gradient(90deg,#FF9E33,var(--ish-orange))}\n.ish-stock strong{color:var(--ish-orange)}\n\n/* shop the setup */\n.ish-setup{display:grid;grid-template-columns:1fr 340px;gap:22px}\n.ish-scene{position:relative;min-height:520px;border-radius:28px;overflow:hidden;background:#0B1220;isolation:isolate}\n.ish-scene>img.ish-scene__bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-1}\n.ish-pin{position:absolute;padding:0;line-height:1;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;background:#fff;color:var(--ish-primary);display:grid;place-items:center;font-weight:900;font-size:18px;border:0;box-shadow:0 0 0 6px rgba(255,255,255,.22);z-index:3;cursor:pointer}\n.ish-pin::after{content:\"\";position:absolute;inset:-6px;border-radius:50%;border:2px solid #fff;animation:ish-ping 2s infinite}\n@keyframes ish-ping{to{transform:scale(1.8);opacity:0}}\n.ish-pin[aria-pressed=\"true\"]{background:var(--ish-orange);color:#fff}\n.ish-pop{position:absolute;z-index:4;background:#fff;color:var(--ish-text);border-radius:16px;padding:10px;display:none;gap:10px;align-items:center;width:280px;box-shadow:0 20px 50px rgba(0,0,0,.4)}\n.ish-pop.on{display:flex}\n.ish-pop img{width:62px;height:62px;border-radius:12px;object-fit:cover;flex:none}\n.ish-list{display:flex;flex-direction:column;gap:10px}\n.ish-row{display:flex;gap:12px;align-items:center;background:#fff;border:1px solid var(--ish-line);border-radius:16px;padding:8px;cursor:pointer;transition:border-color .2s,box-shadow .2s}\n.ish-row.on{border-color:var(--ish-primary);box-shadow:0 0 0 3px rgba(23,70,209,.15)}\n.ish-row img{width:64px;height:64px;border-radius:12px;object-fit:cover;flex:none}\n.ish-row__mid{flex:1;min-width:0;display:flex;flex-direction:column}\n.ish-row__mid span{font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.ish-row__mid b{color:var(--ish-primary)}\n.ish-plus{width:40px;height:40px;border-radius:12px;background:var(--ish-primary);color:#fff;display:grid;place-items:center;flex:none;border:0;cursor:pointer}\n.ish-total{background:var(--ish-ink);color:#fff;border-radius:18px;padding:16px;display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:auto}\n\n/* quiz */\n.ish-quiz{display:grid;grid-template-columns:360px 1fr;gap:26px;background:var(--ish-cloud);border-radius:28px;padding:26px;min-height:420px}\n.ish-qside{background:var(--ish-ink);color:#fff;border-radius:22px;padding:26px;display:flex;flex-direction:column;gap:16px;position:relative;overflow:hidden;isolation:isolate}\n.ish-qside::before{content:\"\";position:absolute;width:240px;height:240px;border-radius:50%;background:var(--ish-primary);filter:blur(60px);opacity:.7;left:-80px;bottom:-80px;z-index:-1}\n.ish-pill{display:inline-flex;align-self:flex-start;border-radius:999px;padding:4px 12px;font-size:12px;font-weight:700;background:rgba(0,194,255,.18);color:var(--ish-cyan)}\n.ish-steps{display:flex;gap:6px}\n.ish-steps i{flex:1;height:4px;border-radius:2px;background:rgba(255,255,255,.2)}\n.ish-steps i.on{background:var(--ish-cyan)}\n.ish-qsum{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}\n.ish-qsum li{display:flex;justify-content:space-between;gap:10px}\n.ish-qsum b{color:var(--ish-cyan)}\n.ish-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}\n.ish-opt{background:#fff;border:2px solid var(--ish-line);border-radius:20px;padding:18px 12px;display:flex;flex-direction:column;align-items:center;gap:10px;font-weight:800;color:var(--ish-text);transition:border-color .2s,transform .2s,box-shadow .2s}\n.ish-opt:hover{border-color:var(--ish-primary);transform:translateY(-3px);box-shadow:0 14px 30px rgba(23,70,209,.12)}\n.ish-opt img{width:84px;height:84px;border-radius:16px;object-fit:cover}\n.ish-opt .ish-ico{width:64px;height:64px;border-radius:18px;background:rgba(23,70,209,.08);color:var(--ish-primary);display:grid;place-items:center;font-size:26px;font-weight:900}\n.ish-opt small{font-weight:500;color:var(--ish-muted)}\n\n/* compare */\n.ish-cmpwrap{border:1px solid var(--ish-line);border-radius:22px;overflow:auto;background:#fff}\n.ish-cmp{width:100%;border-collapse:collapse;table-layout:fixed;min-width:640px}\n.ish-cmp td{padding:12px 16px;border-bottom:1px solid var(--ish-line);text-align:center;vertical-align:middle}\n.ish-cmp td:first-child{text-align:right;color:var(--ish-muted);font-weight:600;width:170px;background:var(--ish-cloud)}\n.ish-cmp tr:last-child td{border-bottom:0}\n.ish-cmp select{font:inherit;border:1.5px solid var(--ish-line);border-radius:10px;padding:8px;width:100%;font-weight:700;background:#fff;color:var(--ish-text)}\n.ish-cmp img{width:120px;height:120px;object-fit:cover;border-radius:14px;margin:10px auto 6px;display:block}\n.ish-cmp td.best{background:rgba(18,161,80,.08);color:var(--ish-success);font-weight:800}\n\n/* product page */\n.ish-fbt{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:center;border:1px solid var(--ish-line);border-radius:24px;padding:22px;background:#fff}\n.ish-fbt__items{display:flex;gap:10px;align-items:stretch}\n.ish-fbt__plus{align-self:center;font-size:24px;color:var(--ish-muted)}\n.ish-fbt__it{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;border:2px solid var(--ish-line);border-radius:18px;padding:10px;position:relative;cursor:pointer;opacity:.55;transition:opacity .2s,border-color .2s}\n.ish-fbt__it.on{opacity:1;border-color:var(--ish-primary)}\n.ish-fbt__it img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:12px}\n.ish-fbt__it input{position:absolute;top:16px;right:16px;width:18px;height:18px;accent-color:var(--ish-primary)}\n.ish-fbt__it span{font-size:12px;font-weight:700;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.ish-fbt__it b{color:var(--ish-primary);margin-top:auto}\n.ish-sum{background:var(--ish-cloud);border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:10px}\n.ish-sum .r{display:flex;justify-content:space-between}\n.ish-calc{display:grid;grid-template-columns:1fr 1fr;gap:22px}\n.ish-panel{border:1px solid var(--ish-line);border-radius:22px;padding:22px;display:flex;flex-direction:column;gap:14px;background:#fff}\n.ish-plans{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}\n.ish-plans button,.ish-conds button{border:1.5px solid var(--ish-line);border-radius:14px;padding:12px 6px;display:flex;flex-direction:column;align-items:center;gap:4px;font-weight:800;background:#fff;color:var(--ish-text)}\n.ish-plans button small,.ish-conds button small{font-weight:600;color:var(--ish-muted);font-size:11px}\n.ish-plans button[aria-pressed=\"true\"],.ish-conds button[aria-pressed=\"true\"]{border-color:var(--ish-primary);color:var(--ish-primary);background:rgba(23,70,209,.05)}\n.ish-tag{border-radius:6px;padding:2px 8px;font-weight:800;font-size:12px;direction:ltr;color:#0B1220}\n.ish-tag--tabby{background:#3BFFC1}.ish-tag--tamara{background:#F7C8B4}\n.ish-sched{display:flex;gap:6px}\n.ish-sched div{flex:1;background:var(--ish-cloud);border-radius:12px;padding:10px 6px;text-align:center;font-size:11px;color:var(--ish-muted)}\n.ish-sched b{display:block;font-size:14px;color:var(--ish-text)}\n.ish-conds{display:flex;gap:8px}.ish-conds button{flex:1}\n.ish-select{font:inherit;border:1.5px solid var(--ish-line);border-radius:12px;padding:11px 12px;font-weight:600;background:#fff;width:100%;color:var(--ish-text)}\n.ish-chk{display:flex;align-items:center;gap:10px;cursor:pointer}\n.ish-chk input{width:18px;height:18px;accent-color:var(--ish-primary)}\n.ish-trade{background:var(--ish-ink);color:#fff;border-radius:18px;padding:16px;display:flex;justify-content:space-between;align-items:center;gap:10px}\n.ish-trade b{display:block;font-size:20px}\n.ish-faq-search{display:flex;gap:10px;align-items:center;border:1.5px solid var(--ish-line);border-radius:14px;padding:12px 16px;background:#fff}\n.ish-faq-search:focus-within{border-color:var(--ish-primary)}\n.ish-faq-search input{border:0;outline:0;flex:1;font:inherit;background:transparent}\n.ish-faq details{border-bottom:1px solid var(--ish-line);padding:15px 0}\n.ish-faq summary{font-weight:700;cursor:pointer;display:flex;justify-content:space-between;list-style:none}\n.ish-faq summary::-webkit-details-marker{display:none}\n.ish-faq summary::after{content:\"+\";color:var(--ish-primary);font-size:20px;line-height:1}\n.ish-faq details[open] summary::after{content:\"\u2212\"}\n.ish-faq p{color:var(--ish-muted);margin:8px 0 0}\n.ish-faq mark{background:rgba(255,176,32,.35);color:inherit;border-radius:3px}\n\n/* listing: quick view + compare */\n.ish-qv{position:absolute;bottom:10px;left:50%;transform:translate(-50%,8px);opacity:0;z-index:5;background:rgba(11,18,32,.88);color:#fff;border:0;border-radius:999px;padding:6px 14px;font:inherit;font-size:12px;font-weight:700;white-space:nowrap;cursor:pointer;transition:.25s}\ncustom-salla-product-card:hover .ish-qv,.ish-qv:focus-visible{opacity:1;transform:translate(-50%,0)}\n@media (hover:none){.ish-qv{opacity:1;transform:translate(-50%,0)}}\n.ish-cmpchk{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--ish-muted);cursor:pointer;margin:6px 0 0;padding:0 4px}\n.ish-cmpchk input{width:16px;height:16px;accent-color:var(--ish-primary)}\n.ish-tray{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:9990;background:var(--ish-ink);color:#fff;border-radius:18px;padding:12px 16px;display:none;align-items:center;gap:14px;box-shadow:0 20px 50px rgba(11,18,32,.4);direction:rtl;font-family:inherit;max-width:calc(100% - 24px)}\n.ish-tray.on{display:flex}\n.ish-slot{position:relative;width:52px;height:52px;border-radius:12px;background:rgba(255,255,255,.08);border:1px dashed rgba(255,255,255,.25);overflow:visible;flex:none}\n.ish-slot img{width:100%;height:100%;object-fit:cover;border-radius:12px}\n.ish-slot button{position:absolute;top:-6px;left:-6px;width:20px;height:20px;border-radius:50%;background:var(--ish-orange);color:#fff;border:0;font-size:12px;line-height:1;cursor:pointer}\n.ish-modal{position:fixed;inset:0;z-index:9999;background:rgba(5,7,12,.6);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:16px;direction:rtl;font-family:inherit}\n.ish-modal.on{display:flex}\n.ish-modal__box{background:#fff;color:var(--ish-text);border-radius:24px;max-width:980px;width:100%;max-height:90vh;overflow:auto;position:relative;padding:26px;box-shadow:0 40px 100px rgba(0,0,0,.4)}\n.ish-modal__x{position:absolute;top:12px;left:12px;width:40px;height:40px;border-radius:50%;background:var(--ish-cloud);border:0;font-size:22px;cursor:pointer;z-index:2}\n.ish-qvgrid{display:grid;grid-template-columns:1fr 1fr;gap:26px;align-items:center}\n.ish-qvgrid>img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:20px;background:var(--ish-cloud)}\n.ish-qvgrid .ish-desc{color:var(--ish-muted);font-size:14px;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}\n\n/* mobile bottom bar */\n.ish-mbar{display:none}\n@media (max-width:767px){\n  .ish-mbar{display:grid;position:fixed;bottom:0;inset-inline:0;z-index:9980;grid-template-columns:repeat(5,1fr);background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border-top:1px solid var(--ish-line);padding:8px 4px calc(8px + env(safe-area-inset-bottom));direction:rtl;font-family:inherit}\n  .ish-mbar a{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:10px;color:var(--ish-muted);text-decoration:none;position:relative}\n  .ish-mbar a.on{color:var(--ish-primary);font-weight:700}\n  .ish-mbar svg{width:22px;height:22px}\n  .ish-mbar .ish-cnt{position:absolute;top:-4px;left:calc(50% - 22px);background:var(--ish-orange);color:#fff;border-radius:999px;font-size:10px;min-width:16px;height:16px;display:grid;place-items:center;padding:0 4px}\n  body.ish-has-mbar{padding-bottom:64px}\n  body.ish-has-mbar .ish-tray{bottom:84px}\n}\n\n/* responsive */\n@media (max-width:1023px){\n  .ish-grid4{grid-template-columns:repeat(2,1fr)}\n  .ish-setup,.ish-quiz,.ish-fbt,.ish-calc{grid-template-columns:1fr}\n  .ish-scene{min-height:420px}\n}\n@media (max-width:767px){\n  .ish-sec{padding:28px 0}\n  .ish-h{font-size:22px}\n  .ish-grid4{display:flex;overflow-x:auto;gap:12px;scroll-snap-type:x mandatory;padding-bottom:6px}\n  .ish-grid4>.ish-card{flex:0 0 62%;scroll-snap-align:start}\n  .ish-grid3{grid-template-columns:repeat(2,1fr);gap:10px}\n  .ish-cd span{min-width:44px;font-size:17px;padding:5px 4px}\n  .ish-opts{grid-template-columns:repeat(2,1fr)}\n  .ish-quiz{padding:14px}\n  .ish-scene{min-height:340px}\n  .ish-pop{width:240px}\n  .ish-fbt__items{overflow-x:auto}\n  .ish-fbt__it{flex:0 0 42%}\n  .ish-plans{grid-template-columns:repeat(2,1fr)}\n  .ish-qvgrid{grid-template-columns:1fr}\n  .ish-tray{gap:8px;padding:10px}\n  .ish-tray .ish-tray__txt{display:none}\n}\n@media (prefers-reduced-motion:reduce){.ish *,.ish-pin::after{animation:none!important;transition:none!important}}\n\n.ish-mbar [hidden]{display:none!important}\n\n/* setup: auto grid (no overlap) */\n.ish-scene--grid{display:grid;grid-template-columns:1.35fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:14px;padding:18px;min-height:540px}\n.ish-scene--grid .ish-tile{position:relative;border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 20px 44px rgba(0,0,0,.4);min-height:0;transition:transform .35s}\n.ish-scene--grid .ish-tile:first-child{grid-row:1 / span 2}\n.ish-scene--grid.ish-n1,.ish-scene--grid.ish-n2{grid-template-columns:repeat(2,1fr);grid-template-rows:1fr}\n.ish-scene--grid.ish-n1 .ish-tile:first-child,.ish-scene--grid.ish-n2 .ish-tile:first-child{grid-row:auto}\n.ish-scene--grid.ish-n3{grid-template-columns:1.35fr 1fr}\n.ish-scene--grid.ish-n4 .ish-tile:nth-child(4){grid-column:span 2}\n.ish-scene--grid .ish-tile:hover{transform:translateY(-4px)}\n.ish-scene--grid .ish-tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}\n.ish-scene--grid .ish-pin{left:50%;top:58%}\n@media (max-width:767px){\n  .ish-scene--grid{grid-template-columns:1fr 1fr;grid-template-rows:none;grid-auto-rows:190px;min-height:0;padding:12px;gap:10px}\n  .ish-scene--grid .ish-tile:first-child{grid-row:auto;grid-column:1 / -1}\n  .ish-scene--grid.ish-n4 .ish-tile:nth-child(4){grid-column:auto}\n}\n\n/* ================= basic home sections ================= */\n.ish-pill{display:inline-block;align-self:flex-start;font-size:12px;font-weight:800;border-radius:999px;padding:5px 12px;background:rgba(255,255,255,.14);color:#fff}\n.ish-more{color:var(--ish-primary);font-weight:700;text-decoration:none;font-size:14px}\n.ish-lead{opacity:.75;margin:-10px 0 22px}\n\n/* hero */\n.ish-hero{padding:20px 0 8px}\n.ish-slider{position:relative;height:440px;border-radius:28px;overflow:hidden;background:var(--ish-ink)}\n.ish-slide{position:absolute;inset:0;display:grid;grid-template-columns:1fr;align-items:center;gap:20px;padding:40px 56px;color:#fff;opacity:0;visibility:hidden;transition:opacity .7s,visibility .7s;isolation:isolate}\n.ish-slide::before{content:\"\";position:absolute;inset:0;z-index:-1;background:rgba(6,9,16,.55)}\n.ish-slide.on{opacity:1;visibility:visible}\n.ish-slide__txt{display:flex;flex-direction:column;gap:14px;max-width:520px}\n.ish-slide__txt h2{font-size:44px;line-height:1.2;font-weight:900;margin:0;color:#fff}\n.ish-slide__txt p{font-size:17px;opacity:.8;margin:0}\n.ish-slide__txt .ish-btn{align-self:flex-start;padding:13px 26px;text-decoration:none}\n.ish-slide__img{height:100%;display:flex;align-items:center;justify-content:center}\n.ish-slide__img img{height:100%;max-height:380px;width:auto;max-width:100%;aspect-ratio:3/4;object-fit:cover;object-position:top;border-radius:22px;box-shadow:0 30px 70px rgba(0,0,0,.45);transform:rotate(-2deg)}\n.ish-slide.on .ish-slide__img img{animation:ish-rise .9s both}\n.ish-slide__img--full{position:absolute;inset:0;z-index:-2}\n.ish-slide__img--full img{width:100%;height:100%;max-height:none;aspect-ratio:auto;border-radius:0;transform:none;box-shadow:none}\n@keyframes ish-rise{from{opacity:0;transform:translateY(24px) rotate(-2deg)}}\n.ish-dots{position:absolute;bottom:20px;inset-inline-start:56px;display:flex;gap:8px;z-index:2}\n.ish-dots button{width:10px;height:10px;border-radius:5px;border:0;padding:0;background:rgba(255,255,255,.4);transition:width .3s}\n.ish-dots button[aria-current]{width:30px;background:#fff}\n\n/* categories */\n.ish-cats{padding:36px 0 12px}\n.ish-catrow{display:flex;gap:18px;overflow-x:auto;scrollbar-width:none;padding:4px 2px 8px}\n.ish-catrow::-webkit-scrollbar{display:none}\n.ish-cat{flex:0 0 auto;width:112px;display:flex;flex-direction:column;align-items:center;gap:10px;text-decoration:none;color:var(--ish-text);font-weight:700;font-size:14px;text-align:center}\n.ish-cat__img{width:96px;height:96px;border-radius:50%;overflow:hidden;display:grid;place-items:center;background:rgba(23,70,209,.08);border:2px solid var(--ish-line);transition:border-color .2s,transform .2s}\n.ish-cat__img img{width:100%;height:100%;object-fit:cover}\n.ish-cat__img b{font-size:34px;font-weight:900;color:var(--ish-primary)}\n.ish-cat:hover .ish-cat__img{border-color:var(--ish-primary);transform:translateY(-3px)}\n\n/* features */\n.ish-feats{padding:32px 0 40px}\n.ish-featrow{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}\n.ish-feat{display:flex;align-items:center;gap:14px;background:var(--ish-cloud);border-radius:18px;padding:18px 20px}\n.ish-feat__ico{width:52px;height:52px;flex:none;border-radius:14px;background:#fff;display:grid;place-items:center;font-size:24px;box-shadow:0 6px 16px rgba(11,18,32,.06)}\n.ish-feat b{display:block;font-size:16px}\n.ish-feat small{color:var(--ish-muted)}\n\n/* product row slider */\n.ish-rowwrap{position:relative}\n.ish-row-scroll{display:grid;grid-auto-flow:column;grid-auto-columns:calc((100% - 60px)/4);gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4px 2px 10px}\n.ish-row-scroll::-webkit-scrollbar{display:none}\n.ish-row-scroll>*{scroll-snap-align:start}\n.ish-arrow{position:absolute;top:40%;z-index:2;width:44px;height:44px;border-radius:50%;border:1px solid var(--ish-line);background:#fff;color:var(--ish-text);font-size:24px;line-height:1;display:grid;place-items:center;box-shadow:0 8px 20px rgba(11,18,32,.12);padding:0}\n.ish-arrow--prev{right:-18px}\n.ish-arrow--next{left:-18px}\n\n/* banners */\n.ish-banners{padding:16px 0 36px}\n.ish-bannergrid{display:grid;grid-template-columns:1fr 1fr;gap:20px}\n.ish-banner{position:relative;display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:230px;border-radius:24px;overflow:hidden;padding:28px 32px;color:#fff;text-decoration:none;isolation:isolate}\n.ish-banner::before{content:\"\";position:absolute;inset:0;z-index:-1;background:rgba(6,9,16,.5)}\n.ish-banner__txt{display:flex;flex-direction:column;gap:8px;max-width:60%;position:relative;z-index:1}\n.ish-banner__txt h3{font-size:26px;font-weight:900;margin:0;color:#fff}\n.ish-banner__txt p{margin:0;opacity:.9}\n.ish-banner__txt .ish-btn{align-self:flex-start;margin-top:6px}\n.ish-banner__img{position:absolute;inset-inline-end:0;top:0;bottom:0;width:42%;z-index:0}\n.ish-banner__img img{width:100%;height:100%;object-fit:cover;object-position:top;-webkit-mask-image:linear-gradient(to left,#000 55%,transparent);mask-image:linear-gradient(to left,#000 55%,transparent)}\n.ish-banner:hover .ish-banner__img img{transform:scale(1.04);transition:transform .5s}\n.ish-banner--wide{min-height:260px;padding:36px 48px}\n.ish-banner--wide .ish-banner__txt h3{font-size:32px}\n.ish-banner--wide .ish-banner__img{width:36%}\n.ish-widebanner{padding:24px 0}\n\n/* tabs */\n.ish-tabs-sec{background:var(--ish-cloud)}\n.ish-tabs{display:flex;gap:6px;background:#fff;border-radius:999px;padding:5px;border:1px solid var(--ish-line)}\n.ish-tabs button{border:0;background:transparent;border-radius:999px;padding:9px 18px;font-weight:700;color:var(--ish-muted)}\n.ish-tabs button[aria-selected=\"true\"]{background:var(--ish-ink);color:#fff}\n\n/* dark products */\n.ish-dark{background:#05070c;color:#fff;overflow:hidden;isolation:isolate}\n.ish-dark::before{content:\"\";position:absolute;inset:0;z-index:-1;background:rgba(5,7,12,.8)}\n.ish-dark .ish-eyebrow{color:#FF9E66}\n.ish-dark .ish-more{color:var(--ish-cyan)}\n\n/* video */\n.ish-yt{position:relative;display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:24px;overflow:hidden;background:#000 center/cover no-repeat;padding:0}\n.ish-yt span{position:absolute;inset:0;margin:auto;width:84px;height:84px;border-radius:50%;background:var(--ish-primary);color:#fff;font-size:30px;display:grid;place-items:center;box-shadow:0 0 0 12px rgba(255,255,255,.2)}\n.ish-yt iframe{position:absolute;inset:0;width:100%;height:100%;border:0}\n\n/* story */\n.ish-story{background:var(--ish-ink);color:#fff;text-align:center;padding:90px 0;overflow:hidden;isolation:isolate}\n.ish-story::before{content:\"\";position:absolute;inset:0;z-index:-1;background:rgba(8,13,26,.68)}\n.ish-story__in{display:flex;flex-direction:column;align-items:center;gap:16px}\n.ish-story__in .ish-pill{align-self:center;color:var(--ish-cyan)}\n.ish-story h2{font-size:42px;font-weight:900;margin:0;max-width:18ch;color:#fff}\n.ish-story p{font-size:18px;opacity:.75;max-width:52ch;margin:0}\n.ish-stats{display:flex;gap:44px;margin:8px 0}\n.ish-stats b{display:block;font-size:30px;font-weight:900;direction:ltr}\n.ish-stats span{opacity:.6}\n.ish-story .ish-btn--ghost{color:#fff;background:transparent;box-shadow:inset 0 0 0 1.5px #fff;text-decoration:none;padding:12px 26px}\n\n/* brands */\n.ish-brandrow{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:14px}\n.ish-brandrow>*{height:86px;border:1px solid var(--ish-line);border-radius:18px;display:grid;place-items:center;background:#fff;color:var(--ish-text);text-decoration:none;padding:12px;transition:border-color .2s}\n.ish-brandrow>*:hover{border-color:var(--ish-primary)}\n.ish-brandrow img{max-width:100%;max-height:48px;object-fit:contain;filter:grayscale(1);opacity:.75;transition:filter .2s,opacity .2s}\n.ish-brandrow>*:hover img{filter:none;opacity:1}\n.ish-brandrow b{font-size:18px;font-weight:900;letter-spacing:.5px}\n\n/* reviews */\n.ish-reviews .ish-row-scroll{grid-auto-columns:calc((100% - 40px)/3)}\n.ish-rev{margin:0;background:#fff;border:1px solid var(--ish-line);border-radius:20px;padding:22px;display:flex;flex-direction:column;gap:14px}\n.ish-stars{color:var(--ish-star);font-size:16px;letter-spacing:2px}\n.ish-stars i{color:var(--ish-line);font-style:normal}\n.ish-rev blockquote{margin:0;line-height:1.8;flex:1}\n.ish-rev figcaption{display:flex;align-items:center;gap:10px}\n.ish-rev figcaption small{display:block;color:var(--ish-muted)}\n.ish-avatar{width:42px;height:42px;border-radius:50%;background:var(--ish-primary);color:#fff;display:grid;place-items:center;font-weight:900}\n\n@media (max-width:1023px){\n  .ish-row-scroll{grid-auto-columns:calc((100% - 40px)/3)}\n  .ish-slide{padding:32px}\n  .ish-slide__txt h2{font-size:34px}\n}\n@media (max-width:767px){\n  .ish-slider{height:190px;min-height:0;border-radius:20px}\n  .ish-slide{grid-template-columns:1fr;padding:16px 18px 26px;gap:0;align-items:center}\n  .ish-slide__txt{gap:8px}\n  .ish-slide__txt h2{font-size:21px;line-height:1.25}\n  .ish-slide__txt p{display:none}\n  .ish-slide__txt .ish-btn{padding:8px 16px;font-size:13px}\n  .ish-slide .ish-pill{padding:3px 10px;font-size:11px}\n  .ish-slide__img img{max-height:250px}\n  .ish-dots{inset-inline-start:18px;bottom:12px}\n  .ish-cat{width:84px;font-size:12px}\n  .ish-cat__img{width:76px;height:76px}\n  .ish-featrow{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}\n  .ish-feat{flex-direction:column;justify-content:flex-start;text-align:center;gap:8px;padding:12px 6px;border-radius:14px}\n  .ish-feat__ico{width:40px;height:40px;border-radius:12px;font-size:19px}\n  .ish-feat b{font-size:13px;line-height:1.3}\n  .ish-feat small{display:block;font-size:11px;line-height:1.35}\n  .ish-row-scroll,.ish-reviews .ish-row-scroll{grid-auto-columns:72%;gap:12px}\n  .ish-arrow{display:none}\n  .ish-bannergrid{grid-template-columns:1fr}\n  .ish-banner,.ish-banner--wide{min-height:200px;padding:22px}\n  .ish-banner__txt{max-width:62%}\n  .ish-banner__txt h3,.ish-banner--wide .ish-banner__txt h3{font-size:21px}\n  .ish-tabs{width:100%;overflow-x:auto}\n  .ish-tabs button{white-space:nowrap;padding:8px 14px}\n  .ish-story{padding:60px 0}\n  .ish-story h2{font-size:30px}\n  .ish-stats{gap:22px;flex-wrap:wrap;justify-content:center}\n}\n.ish-head>.ish-tabs{flex-direction:row}\n\n/* ================= category (collection) banner ================= */\n.ish-coll{padding:20px 0 6px}\n.ish-coll__band{position:relative;display:grid;grid-template-columns:1.2fr 1fr;align-items:center;gap:24px;min-height:260px;border-radius:26px;overflow:hidden;padding:34px 40px;color:#fff;background:var(--ish-ink);isolation:isolate}\n.ish-coll__band::before{content:\"\";position:absolute;inset:0;z-index:-1;background:rgba(8,13,26,.66)}\n.ish-coll__txt{display:flex;flex-direction:column;gap:10px;min-width:0}\n.ish-coll__txt .ish-pill{color:var(--ish-cyan)}\n.ish-coll__txt h1{font-size:40px;line-height:1.2;font-weight:900;margin:0;color:#fff;text-wrap:balance}\n.ish-coll__txt p{margin:0;opacity:.75;max-width:46ch}\n.ish-coll__stats{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0 0}\n.ish-coll__stats div{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:8px 14px;display:flex;flex-direction:column-reverse}\n.ish-coll__stats dt{font-size:11px;opacity:.7}\n.ish-coll__stats dd{margin:0;font-size:18px;font-weight:800;font-variant-numeric:tabular-nums}\n.ish-coll__pics{position:relative;height:220px}\n.ish-coll__pics span{position:absolute;width:44%;aspect-ratio:3/4;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 24px 50px rgba(0,0,0,.45)}\n.ish-coll__pics img{width:100%;height:100%;object-fit:cover}\n.ish-coll__pics span:nth-child(1){inset-inline-start:28%;top:-8%;z-index:2;transform:rotate(-2deg)}\n.ish-coll__pics span:nth-child(2){inset-inline-start:0;top:14%;width:36%;transform:rotate(-7deg)}\n.ish-coll__pics span:nth-child(3){inset-inline-end:0;top:16%;width:36%;transform:rotate(6deg)}\n.ish-coll__pics.ish-n1 span:nth-child(1){inset-inline-start:28%}\n.ish-coll__chips{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:14px 2px 4px}\n.ish-coll__chips::-webkit-scrollbar{display:none}\n.ish-coll__chips a{flex:none;text-decoration:none;color:var(--ish-text);border:1px solid var(--ish-line);background:#fff;border-radius:999px;padding:8px 16px;font-weight:700;font-size:14px;transition:border-color .2s,color .2s}\n.ish-coll__chips a:hover{border-color:var(--ish-primary);color:var(--ish-primary)}\n.ish-coll__chips a[aria-current]{background:var(--ish-ink);border-color:var(--ish-ink);color:#fff}\n@media (max-width:767px){\n  .ish-coll__band{grid-template-columns:1fr;padding:24px 20px;min-height:0;gap:12px}\n  .ish-coll__txt h1{font-size:28px}\n  .ish-coll__pics{display:none}\n  .ish-coll__stats dd{font-size:16px}\n}\n\n/* narrow screens: let grid/flex children shrink instead of widening the page */\n.ish-setup>*,.ish-quiz>*,.ish-fbt>*,.ish-calc>*,.ish-scene--grid>*,.ish-row__mid{min-width:0}\n\n/* ================= shopping helpers ================= */\n.ish-card .ish-heart{position:absolute;top:16px;left:16px;z-index:2}\n.ish-heart{width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.94);display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 12px rgba(11,18,32,.12);padding:0}\n.ish-heart svg{width:18px;height:18px;fill:none;stroke:var(--ish-ink);stroke-width:1.8}\n.ish-heart[aria-pressed=\"true\"] svg{fill:#E5304B;stroke:#E5304B}\n.ish-heart:disabled{opacity:.6}\n.ish-freeship{padding:16px 0 0}\n.ish-meter{display:flex;flex-direction:column;gap:8px;background:var(--ish-cloud);border-radius:16px;padding:14px 18px;font-size:14px}\n.ish-meter b{font-variant-numeric:tabular-nums}\n.ish-meter i{display:block;height:8px;border-radius:4px;background:#fff;overflow:hidden}\n.ish-meter i b{display:block;height:100%;border-radius:4px;background:var(--ish-primary);transition:width .4s}\n.ish-meter.is-done{color:var(--ish-success);font-weight:700}\n.ish-meter.is-done i b{background:var(--ish-success)}\n.ish-sticky{position:fixed;inset:auto 0 0;z-index:90;background:#fff;border-top:1px solid var(--ish-line);box-shadow:0 -10px 30px rgba(11,18,32,.08);padding-bottom:env(safe-area-inset-bottom,0px)}\n.ish-sticky__in{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:12px;padding:10px max(16px,env(safe-area-inset-left,0px)) 10px max(16px,env(safe-area-inset-right,0px))}\n.ish-sticky img{width:48px;height:48px;border-radius:10px;object-fit:cover;flex:none;background:var(--ish-cloud)}\n.ish-sticky__txt{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.4}\n.ish-sticky__txt span{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.ish-sticky__txt b{color:var(--ish-primary);font-variant-numeric:tabular-nums}\n.ish-sticky .ish-btn{flex:none;min-width:150px}\nbody.ish-has-sticky{padding-bottom:72px}\n.ish-top{position:fixed;z-index:85;left:max(16px,env(safe-area-inset-left,0px));bottom:calc(24px + env(safe-area-inset-bottom,0px));width:44px;height:44px;border-radius:50%;border:1px solid var(--ish-line);background:#fff;display:grid;place-items:center;cursor:pointer;box-shadow:0 8px 20px rgba(11,18,32,.12);padding:0}\n.ish-top svg{width:20px;height:20px;fill:none;stroke:var(--ish-ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}\nbody.ish-has-mbar .ish-top{bottom:calc(84px + env(safe-area-inset-bottom,0px))}\nbody.ish-has-sticky .ish-top{bottom:calc(88px + env(safe-area-inset-bottom,0px))}\n@media (max-width:767px){\n  .ish-sticky__txt span{display:none}\n  .ish-sticky .ish-btn{flex:1;min-width:0}\n}\n\n/* ================= category page: showroom layout ================= */\n.ish-show{padding:24px 0 8px}\n.ish-show__head{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;padding-bottom:20px;border-bottom:2px solid var(--ish-ink)}\n.ish-show__title{display:flex;flex-direction:column;gap:6px;min-width:0;max-width:640px}\n.ish-show__title h1{margin:0;font-size:52px;line-height:1.1;font-weight:900;color:var(--ish-ink);text-wrap:balance}\n.ish-show__title p{margin:0;color:var(--ish-muted);font-size:16px}\n.ish-show__facts{display:flex;margin:0;border:1px solid var(--ish-line);border-radius:16px;overflow:hidden;background:#fff}\n.ish-show__facts div{display:flex;flex-direction:column;gap:2px;padding:12px 20px;min-width:0}\n.ish-show__facts div+div{border-inline-start:1px solid var(--ish-line)}\n.ish-show__facts dd{margin:0;font-size:22px;font-weight:800;color:var(--ish-ink);font-variant-numeric:tabular-nums;white-space:nowrap}\n.ish-show__facts dt{font-size:12px;color:var(--ish-muted)}\n.ish-show__tabs{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;margin-top:4px}\n.ish-show__tabs::-webkit-scrollbar{display:none}\n.ish-show__tabs a{flex:none;text-decoration:none;color:var(--ish-muted);font-weight:700;font-size:15px;padding:12px 14px;border-bottom:3px solid transparent;transition:color .2s,border-color .2s}\n.ish-show__tabs a:hover{color:var(--ish-ink)}\n.ish-show__tabs a[aria-current]{color:var(--ish-primary);border-bottom-color:var(--ish-primary)}\n.ish-show__picks{margin-top:28px}\n.ish-show__bento{display:grid;grid-template-columns:1.25fr 1fr;grid-template-rows:auto auto;gap:16px}\n.ish-spot{position:relative;display:grid;grid-template-columns:44% minmax(0,1fr);align-items:center;gap:16px;background:var(--ish-cloud);border-radius:var(--ish-radius);padding:14px;color:var(--ish-text);min-width:0}\n.ish-spot--big{grid-row:span 2;grid-template-columns:1fr;align-content:start;padding:18px;background:#EEF2FC}\n.ish-spot__img{display:block;aspect-ratio:1/1;max-width:100%;border-radius:16px;overflow:hidden;background:#fff}\n.ish-spot--big{grid-template-rows:minmax(0,1fr) auto}\n.ish-spot--big .ish-spot__img{position:relative;aspect-ratio:auto;height:100%;min-height:240px}\n.ish-spot--big .ish-spot__img img{position:absolute;inset:0}\n.ish-spot__img img{width:100%;height:100%;object-fit:cover;transition:transform .4s}\n.ish-spot:hover .ish-spot__img img{transform:scale(1.04)}\n.ish-spot__txt{display:flex;flex-direction:column;gap:8px;min-width:0;align-items:flex-start}\n.ish-spot__label{font-size:12px;font-weight:800;color:var(--ish-orange)}\n.ish-spot__name{font-weight:800;font-size:16px;line-height:1.45;color:var(--ish-ink);text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.ish-spot--big .ish-spot__name{font-size:22px}\n.ish-spot__name:hover{color:var(--ish-primary)}\n.ish-spot--big .ish-price b{font-size:22px}\n.ish-spot .ish-heart{position:absolute;top:22px;left:auto;inset-inline-start:22px;z-index:2}\n.ish-btn--ghost{background:#fff;color:var(--ish-primary);box-shadow:inset 0 0 0 1.5px var(--ish-primary)}\n.ish-viewbar{display:flex;align-items:center;justify-content:flex-end;gap:10px;margin:0 0 14px;font-size:13px;color:var(--ish-muted)}\n.ish-viewbar [role=group]{display:flex;background:var(--ish-cloud);border-radius:12px;padding:3px}\n.ish-viewbar button{display:inline-flex;align-items:center;gap:6px;border:0;background:transparent;font:inherit;font-weight:700;color:var(--ish-muted);border-radius:9px;padding:7px 12px;cursor:pointer}\n.ish-viewbar button svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8}\n.ish-viewbar button[aria-pressed=\"true\"]{background:#fff;color:var(--ish-ink);box-shadow:0 2px 6px rgba(11,18,32,.08)}\n/* theme product cards inside the showroom layout */\n.ish-layout-showroom custom-salla-product-card{border:0!important;background:var(--ish-cloud)!important;border-radius:20px!important;overflow:hidden}\n.ish-layout-showroom custom-salla-product-card .s-product-card-image{background:#fff;border-radius:16px;margin:8px;overflow:hidden}\n.ish-view-list salla-products-list,.ish-view-list .s-products-list-wrapper{grid-template-columns:repeat(2,minmax(0,1fr))!important}\n.ish-view-list custom-salla-product-card{flex-direction:row!important;align-items:stretch}\n.ish-view-list custom-salla-product-card .s-product-card-image{flex:0 0 40%;width:40%;aspect-ratio:1/1;height:auto}\n.ish-view-list custom-salla-product-card .s-product-card-content{flex:1;min-width:0;justify-content:center}\n.ish-show__tiles.ish-cols3{grid-template-columns:repeat(3,minmax(0,1fr))}\n.ish-show__more{padding:40px 0 24px}\n.ish-show__tiles{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}\n.ish-ctile{position:relative;display:flex;align-items:flex-end;aspect-ratio:16/10;max-width:100%;border-radius:18px;overflow:hidden;background:var(--ish-ink);color:#fff;text-decoration:none;isolation:isolate}\n.ish-ctile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transition:transform .4s}\n.ish-ctile::after{content:\"\";position:absolute;inset:0;z-index:-1;background:linear-gradient(to top,rgba(11,18,32,.8),rgba(11,18,32,.05) 60%)}\n.ish-ctile i{position:absolute;inset:0;display:grid;place-items:center;font-style:normal;font-size:48px;font-weight:900;color:rgba(255,255,255,.18);z-index:-1;background:var(--ish-ink)}\n.ish-ctile span{padding:14px 16px;font-weight:800;font-size:16px}\n.ish-ctile:hover img{transform:scale(1.05)}\n@media (max-width:991px){\n  .ish-show__title h1{font-size:40px}\n  .ish-show__tiles{grid-template-columns:repeat(3,minmax(0,1fr))}\n}\n@media (max-width:767px){\n  .ish-show{padding-top:16px}\n  .ish-show__head{gap:14px}\n  .ish-show__title h1{font-size:32px}\n  .ish-show__facts{width:100%}\n  .ish-show__facts div{flex:1;padding:10px 12px}\n  .ish-show__facts dd{font-size:16px}\n  .ish-show__bento{grid-template-columns:1fr}\n  .ish-spot--big{grid-row:auto}\n  .ish-spot{grid-template-columns:38% minmax(0,1fr);gap:12px}\n  .ish-spot--big{grid-template-columns:1fr;grid-template-rows:auto}\n  .ish-spot--big .ish-spot__img{aspect-ratio:4/3;height:auto;min-height:0}\n  .ish-spot__name{font-size:14px}\n  .ish-spot--big .ish-spot__name{font-size:18px}\n  .ish-view-list salla-products-list,.ish-view-list .s-products-list-wrapper{grid-template-columns:1fr!important}\n  .ish-show__tiles,.ish-show__tiles.ish-cols3{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n  .ish-ctile span{font-size:14px;padding:10px 12px}\n}\n\n/* ================= cart drawer ================= */\nhtml.ish-noscroll{overflow:hidden}\n.ish-drawer{position:fixed;inset:0;z-index:100000}\n.ish-drawer__bg{position:absolute;inset:0;background:rgba(11,18,32,.5);opacity:0;transition:opacity .25s}\n.ish-drawer__panel{position:absolute;top:0;bottom:0;inset-inline-end:0;width:min(420px,100%);background:#fff;color:var(--ish-text);display:flex;flex-direction:column;box-shadow:0 0 40px rgba(11,18,32,.2);transform:translateX(-100%);transition:transform .25s ease;padding-top:env(safe-area-inset-top,0px)}\n[dir=ltr] .ish-drawer__panel{transform:translateX(100%)}\n.ish-drawer.on .ish-drawer__bg{opacity:1}\n.ish-drawer.on .ish-drawer__panel{transform:none}\n.ish-drawer__head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:1px solid var(--ish-line)}\n.ish-drawer__head h2{margin:0;font-size:18px;font-weight:800}\n.ish-drawer__head h2 span{color:var(--ish-muted);font-weight:700;font-size:15px}\n.ish-drawer__x{width:40px;height:40px;border:0;border-radius:50%;background:var(--ish-cloud);font-size:24px;line-height:1;cursor:pointer;color:var(--ish-ink)}\n.ish-drawer__body{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:14px;overscroll-behavior:contain}\n.ish-drawer__list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}\n.ish-dline{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--ish-line)}\n.ish-dline:last-child{border-bottom:0}\n.ish-dline__img{flex:none;width:76px;height:76px;border-radius:12px;overflow:hidden;background:var(--ish-cloud)}\n.ish-dline__img img{width:100%;height:100%;object-fit:cover}\n.ish-dline__mid{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}\n.ish-dline__name{font-weight:700;font-size:14px;line-height:1.5;color:var(--ish-ink);text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.ish-dline__name:hover{color:var(--ish-primary)}\n.ish-dline__mid>b{color:var(--ish-primary);font-variant-numeric:tabular-nums}\n.ish-dline__row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:2px}\n.ish-qty{display:inline-flex;align-items:center;border:1px solid var(--ish-line);border-radius:10px;overflow:hidden}\n.ish-qty button{width:34px;height:32px;border:0;background:#fff;font:inherit;font-size:18px;cursor:pointer;color:var(--ish-ink)}\n.ish-qty button:hover{background:var(--ish-cloud)}\n.ish-qty span{min-width:28px;text-align:center;font-weight:700;font-variant-numeric:tabular-nums}\n.ish-dline__del{width:34px;height:34px;border:0;border-radius:10px;background:transparent;cursor:pointer;display:grid;place-items:center;color:var(--ish-muted)}\n.ish-dline__del:hover{background:#FDECEE;color:#D92D20}\n.ish-dline__del svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}\n.ish-drawer.is-busy .ish-drawer__body{opacity:.6;pointer-events:none}\n.ish-drawer__foot{background:#fff;color:var(--ish-text);border-top:1px solid var(--ish-line);padding:16px 20px calc(16px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:10px}\n.ish-drawer__sum{display:flex;justify-content:space-between;align-items:baseline;font-size:16px}\n.ish-drawer__sum b{font-size:20px;font-variant-numeric:tabular-nums}\n.ish-drawer__foot small{color:var(--ish-muted);font-size:12px;margin-top:-6px}\n.ish-drawer__foot .ish-btn{width:100%;padding:14px}\n.ish-drawer__link{text-align:center;font-weight:700;font-size:14px;color:var(--ish-primary);text-decoration:none;padding:4px}\n.ish-drawer__link:hover{text-decoration:underline}\n.ish-drawer__note{margin:0;color:var(--ish-muted)}\n.ish-drawer__empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;color:var(--ish-muted);padding:40px 0}\n.ish-drawer__empty svg{width:56px;height:56px;fill:none;stroke:var(--ish-line);stroke-width:1.5}\n.ish-drawer__empty b{color:var(--ish-ink);font-size:17px}\n.ish-drawer__empty .ish-btn{margin-top:8px}\n.ish-drawer__load{height:120px;border-radius:14px;background:linear-gradient(90deg,var(--ish-cloud),#fff,var(--ish-cloud));background-size:200% 100%;animation:ish-shine 1.2s linear infinite}\n@keyframes ish-shine{to{background-position:-200% 0}}\n@media (prefers-reduced-motion:reduce){.ish-drawer__panel,.ish-drawer__bg{transition:none}.ish-drawer__load{animation:none}}\n\n/* ================= product page: studio layout ================= */\n.ish-pdp-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 32px;align-items:end;padding:8px 0 24px;margin-bottom:28px;border-bottom:1px solid var(--ish-line)}\n.ish-pdp-head__main{display:flex;flex-direction:column;gap:8px;min-width:0}\n.ish-pdp-head__main .product-brand{margin:0!important;width:auto!important;max-width:120px}\n.ish-pdp-head__main h1{font-size:40px!important;line-height:1.2!important;font-weight:900!important;margin:0!important;color:var(--ish-ink)!important;text-wrap:balance}\n.ish-pdp-head__main .product-entry__sub-title{margin:0!important;font-size:16px!important}\n.ish-pdp-head__price{display:flex;flex-direction:column;align-items:flex-end;gap:4px;text-align:end}\n.ish-pdp-head__price [data-testid=\"store-product-price\"]{font-size:28px}\n.ish-pdp-head__price [data-testid=\"store-product-price\"] p,.ish-pdp-head__price [data-testid=\"store-product-price\"] b{font-size:30px!important;font-weight:900!important}\n.ish-pdp-perks{grid-column:1/-1;list-style:none;margin:12px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px}\n.ish-pdp-perks li{display:flex;align-items:baseline;gap:6px;background:var(--ish-cloud);border-radius:999px;padding:7px 14px;font-size:13px}\n.ish-pdp-perks li span{color:var(--ish-muted)}\n.ish-pdp-studio .ish-pdp{display:grid!important;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:24px 40px;align-items:start}\n.ish-pdp-studio .ish-pdp>.sidebar{grid-column:1;grid-row:1;width:auto!important;margin:0!important;position:static!important;overflow:visible!important}\n.ish-pdp-studio .ish-pdp>.main-content{grid-column:2;grid-row:1/span 2;width:auto!important;position:sticky!important;top:96px;overflow:visible!important;background:#fff;border:1px solid var(--ish-line);border-radius:24px;padding:22px;box-shadow:0 24px 50px rgba(11,18,32,.07)}\n.ish-pdp-studio .ish-pdp>.ish-pdp-story{grid-column:1;grid-row:2;min-width:0}\n.ish-pdp-buyt{font-weight:800;font-size:17px;margin-bottom:12px;color:var(--ish-ink)}\n.ish-pdp-story{background:var(--ish-cloud);border-radius:24px;padding:24px 28px}\n.ish-pdp-story .product__description{padding:0!important;margin:0!important;font-size:15px;line-height:1.9}\n.ish-pdp-story .ish-h-sm{margin:0 0 10px}\n/* gallery */\n.ish-gal-ready>salla-slider,.ish-gal-ready>.details-slider{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}\n.ish-gal{display:grid;grid-template-columns:84px minmax(0,1fr);gap:14px;align-items:start}\n.ish-gal--one{grid-template-columns:minmax(0,1fr)}\n.ish-gal__stage{grid-column:2;grid-row:1;position:relative;min-width:0}\n.ish-gal--one .ish-gal__stage{grid-column:1}\n.ish-gal__track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;border-radius:24px;background:var(--ish-cloud);outline-offset:3px}\n.ish-gal__track::-webkit-scrollbar{display:none}\n.ish-gal__slide{flex:0 0 100%;scroll-snap-align:center;aspect-ratio:1/1;max-width:100%;border:0;padding:0;margin:0;background:transparent;cursor:zoom-in;display:block}\n.ish-gal__slide img{width:100%;height:100%;object-fit:cover;display:block}\n.ish-gal__count{position:absolute;bottom:16px;inset-inline-start:16px;background:rgba(11,18,32,.75);color:#fff;border-radius:999px;padding:4px 12px;font-size:13px;font-variant-numeric:tabular-nums}\n.ish-gal__hint{position:absolute;bottom:16px;inset-inline-end:16px;background:rgba(255,255,255,.92);color:var(--ish-ink);border-radius:999px;padding:4px 12px;font-size:12px;font-weight:700;pointer-events:none}\n.ish-gal .ish-heart{position:absolute;top:16px;inset-inline-start:16px;left:auto;z-index:2}\n.ish-gal__thumbs{grid-column:1;grid-row:1;display:flex;flex-direction:column;gap:10px}\n.ish-gal__thumbs button{width:84px;aspect-ratio:1/1;max-width:100%;border:2px solid transparent;border-radius:14px;padding:0;overflow:hidden;background:var(--ish-cloud);cursor:pointer;opacity:.65;transition:opacity .2s,border-color .2s}\n.ish-gal__thumbs button:hover{opacity:1}\n.ish-gal__thumbs button[aria-current]{opacity:1;border-color:var(--ish-primary)}\n.ish-gal__thumbs img{width:100%;height:100%;object-fit:cover;display:block}\n.ish-viewer{position:fixed;inset:0;z-index:100001;background:rgba(11,18,32,.94);display:flex;align-items:center;justify-content:center;padding:max(56px,env(safe-area-inset-top,0px)) max(16px,env(safe-area-inset-right,0px)) max(56px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}\n.ish-viewer img{max-width:min(100%,900px);max-height:100%;object-fit:contain;border-radius:16px;background:#fff}\n.ish-viewer__x{position:absolute;top:calc(12px + env(safe-area-inset-top,0px));inset-inline-end:16px;width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.12);color:#fff;font-size:26px;cursor:pointer}\n.ish-viewer__nav{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:28px;cursor:pointer}\n.ish-viewer__prev{inset-inline-start:16px}\n.ish-viewer__next{inset-inline-end:16px}\n.ish-viewer__n{position:absolute;bottom:calc(16px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);color:#fff;font-size:14px;font-variant-numeric:tabular-nums}\n@media (max-width:991px){\n  .ish-pdp-studio .ish-pdp{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px 24px}\n  .ish-pdp-head__main h1{font-size:32px!important}\n}\n@media (max-width:767px){\n  .ish-pdp-head{grid-template-columns:minmax(0,1fr);gap:10px;margin-bottom:16px;padding-bottom:16px}\n  .ish-pdp-head__main h1{font-size:26px!important}\n  .ish-pdp-head__price{align-items:flex-start;text-align:start}\n  .ish-pdp-perks{margin-top:4px}\n  .ish-pdp-perks li{padding:6px 12px;font-size:12px}\n  .ish-pdp-studio .ish-pdp{grid-template-columns:minmax(0,1fr);gap:16px}\n  .ish-pdp-studio .ish-pdp>.sidebar,.ish-pdp-studio .ish-pdp>.main-content,.ish-pdp-studio .ish-pdp>.ish-pdp-story{grid-column:1;grid-row:auto;position:static!important}\n  .ish-pdp-studio .ish-pdp>.main-content{padding:16px;border-radius:20px}\n  .ish-pdp-story{padding:18px;border-radius:20px}\n  .ish-gal{grid-template-columns:minmax(0,1fr)}\n  .ish-gal__stage{grid-column:1}\n  .ish-gal__thumbs{grid-row:2;flex-direction:row;overflow-x:auto;scrollbar-width:none}\n  .ish-gal__thumbs button{flex:none;width:64px}\n  .ish-gal__track{border-radius:18px}\n  .ish-viewer__nav{top:auto;bottom:calc(8px + env(safe-area-inset-bottom,0px));transform:none}\n}\n\n/* background photos (CONFIG.photos, slides and banners) */\n.ish-photo{background-color:var(--ish-ink);background-size:cover;background-position:center;background-repeat:no-repeat}\n";
  document.head.appendChild(st);
/* =====================================================================
   Ishara — advanced sections for Salla (Raed theme)
   Paste into: Salla dashboard → Store design (تصميم المتجر) → Custom code → JavaScript
   Needs ishara-custom.css in the CSS box.
   Every section reads your real products through Salla's SDK (salla.api.*),
   and adds to the real cart (salla.cart.addItem).
   ===================================================================== */
(function () {
  'use strict';

  /* ===================== 1) SETTINGS — edit freely ===================== */
  var CONFIG = {
    // Where the buttons of the custom sections go when their own url is empty.
    // products: all products, offers: the offers page (empty = Salla's own pages).
    // about: your "about us" page (a page you made in Salla, e.g. '/p/about-us'); empty = the story button is hidden.
    links: { products: '', offers: '', about: '' },
    // Background photos for the dark sections (Unsplash). Each value is an Unsplash photo id, the part
    // after "photo-" in images.unsplash.com/photo-..., or any full image URL. Empty = plain dark color.
    // A dark tint is laid over each photo so the text on it stays readable.
    photos: {
      flash: '1626218174358-7769486c4b79',      // flash sale: RGB gaming desk
      dark: '1518770660439-4636190af475',       // special prices: circuit board
      story: '1510519138101-570d1dca3d66',      // our story: desk at night
      collection: '1593305841991-05c297ba4575', // category banner (banner layout), any category
      collections: {},                          // per category id, e.g. { 123456: '1603302576837-37561b2e2302' }
      // Category pictures (home categories row, the quiz, and the category tiles) when a category has no
      // image of its own in Salla: the first row whose words appear in the category name wins.
      categories: [
        ['ايربود|إيربود|airpod|earbud|بودز', '1606741965326-cb990ae01bb2'],
        ['سماع|headphone|headset|audio', '1618366712010-f4ae9c647dcb'],
        ['ساعة|ساعات|watch', '1546868871-7041f2a55e12'],
        ['جوال|موبايل|هاتف|هواتف|phone|mobile', '1511707171634-5f897ff02aa9'],
        ['لابتوب|لاب توب|حاسب|حواسيب|كمبيوتر|laptop|computer|notebook', '1611186871348-b1ce696e52c9'],
        ['تابلت|ايباد|آيباد|أيباد|لوحي|tablet|ipad', '1544244015-0df4b3ffc6b0'],
        ['ألعاب|العاب|قيمنق|جيمنج|بلايستيشن|بلاي ستيشن|اكس بوكس|gaming|game|playstation|xbox|console', '1606144042614-b2417e99c4e3'],
        ['كاميرا|كاميرات|تصوير|camera', '1516035069371-29a1b244cc32'],
        ['تلفزيون|تلفاز|شاشات|شاشة|television|\\btv\\b|screen|monitor', '1593359677879-a4bb92f829d1'],
        ['إكسسوار|اكسسوار|ملحقات|شاحن|شواحن|كابل|كيبل|accessor|charger|cable', '1572721546624-05bf65ad7679']
      ],
      category: '1498049794561-7780e7231661'    // any other category
    },
    home: {
      // The sections go right after the first of these blocks (your hero banner).
      // If none exists, they go at the top of the home page.
      insertAfter: '.s-block--hero-slider, .s-block--photos-slider, .s-block--fixed-banner',
      // The theme's "latest products" block moves up to right after the hero banner. '' = leave it where it is.
      latestFirst: '.s-block--latest-products',

      flashSale: {
        enabled: true,
        eyebrow: '⚡ عروض البرق',
        title: 'خصومات لفترة محدودة',
        subtitle: 'كميات محدودة، والسعر يرجع طبيعي بعد انتهاء العرض.',
        source: 'offers',          // products on sale in Salla
        limit: 4,
        // End of the offer, e.g. '2026-11-30T23:59:00+03:00'.
        // Empty = use the products' own Salla discount end date. If neither exists, the timer is hidden.
        endsAt: ''
      },

      setup: {
        enabled: true,
        eyebrow: 'اضغط على أي منتج في الصورة',
        title: 'تسوّق الإعداد كاملاً',
        // Your own scene photo (upload it in Salla, copy its link). Empty = automatic collage of your products.
        image: '',
        // Used only with your own photo: product id + position in % (x from the left, y from the top).
        // Example: [{ id: 259064692, x: 50, y: 40 }, { id: 1033167979, x: 20, y: 60 }]
        hotspots: [],
        source: 'latest',          // used for the automatic collage
        limit: 5
      },

      quiz: {
        enabled: true,
        title: 'محتار وش تختار؟ جاوب على 3 أسئلة',
        steps: ['وش تبحث عنه؟', 'كم ميزانيتك؟', 'وش أهم شي عندك؟']
      },

      compare: {
        enabled: true,
        eyebrow: 'اختر أي 3 منتجات',
        title: 'قارن قبل ما تقرر',
        source: 'latest',
        limit: 12
      }
    },

    product: {
      // Product page layout: 'classic' (the theme's own) or 'studio' (title and price on top, a large photo
      // gallery with thumbnails and full-screen view, the description beside it, and a sticky buy card).
      layout: 'classic',
      // Different layout for the products of some categories, by category id: { 123456: 'studio' }
      layouts: {},
      studio: {
        perks: [['توصيل سريع', 'خلال 1–3 أيام'], ['ضمان الوكيل', 'منتج أصلي 100%'], ['استرجاع سهل', 'خلال 7 أيام']],
        storyTitle: 'عن المنتج',
        buyTitle: 'اختر وأضف للسلة',
        // Raed's product page parts. Change only if your theme version uses other class names.
        row: '.container--product-details > [id^="product-"]', gallery: '.sidebar', slider: 'salla-slider.details-slider', info: '.main-content'
      },
      fbt: { enabled: true, title: 'يُشترى معاً بشكل متكرر', limit: 3 },

      installments: {
        enabled: true,
        title: 'قسّط مشترياتك',
        // Keep only the providers you have activated in Salla.
        plans: [{ provider: 'tabby', n: 4 }, { provider: 'tamara', n: 3 }, { provider: 'tamara', n: 6 }, { provider: 'tamara', n: 12 }]
      },

      // Shows an estimate only. You must handle the trade-in yourself (inspection + refund/discount).
      tradeIn: {
        enabled: true,
        title: 'استبدل جهازك القديم',
        note: 'القيمة تقديرية، ويتأكد منها فريقنا عند استلام جهازك.',
        devices: [
          ['بدون استبدال', 0],
          ['آيفون 13 · 128 جيجا', 950],
          ['آيفون 14 برو · 256 جيجا', 1900],
          ['جالكسي S22 · 128 جيجا', 700],
          ['جالكسي S23 ألترا · 256 جيجا', 1750]
        ],
        conditions: [['ممتاز', 'بدون خدوش', 1], ['جيد', 'خدوش بسيطة', 0.8], ['مقبول', 'خدوش واضحة', 0.55]]
      },

      faq: {
        enabled: true,
        title: 'أسئلة وأجوبة',
        items: [
          ['هل المنتجات أصلية؟', 'نعم، كل منتجاتنا أصلية وبضمان الوكيل في السعودية.'],
          ['كم مدة التوصيل؟', 'داخل الرياض خلال 1–2 يوم، وباقي المدن خلال 1–3 أيام.'],
          ['هل أقدر أرجع المنتج؟', 'تقدر ترجعه خلال 7 أيام إذا كان بتغليفه الأصلي.'],
          ['هل يتوفر الدفع بالتقسيط؟', 'نعم، تقدر تقسّط مع tabby أو tamara عند إتمام الطلب.'],
          ['هل الضمان سعودي؟', 'نعم، ضمان الوكيل في السعودية ويشمل عيوب التصنيع.']
        ]
      }
    },

    listing: { quickView: true, compare: true, maxCompare: 3 },

    // Category (collection) pages: banner with the category name, live stats from your products,
    // a few product photos and quick links to the other categories.
    collection: {
      enabled: true, eyebrow: 'تسوّق حسب القسم', text: 'منتجات أصلية، توصيل سريع، وتقسيط بدون فوائد.', chips: true, photos: true,
      // Page layout: 'banner' (dark banner with photos) or 'showroom' (light header, picks of the category,
      // grid/list switch for the theme's product list, and tiles to the other categories).
      layout: 'banner',
      // Different layout for some categories only, by category id: { 123456: 'showroom' }
      layouts: {},
      showroom: {
        spotlight: true, spotlightTitle: 'مختارات القسم',
        viewSwitch: true,      // grid / list buttons above the theme's product list
        moreCats: true, moreTitle: 'تسوّق أقسام أخرى',
        list: 'salla-products-list, .s-products-list'   // the theme's product list on category pages
      }
    },

    mobileBar: { enabled: true },

    // Shopping helpers that work across the store
    shopping: {
      // Progress bar on the cart page: "add X more for free shipping". Use the same amount as your Salla shipping rule.
      freeShipping: { enabled: true, threshold: 500, text: 'أضف {left} وتحصل على شحن مجاني', done: 'مبروك! طلبك شحنه مجاني' },
      // Product page: a buy bar that appears when the theme's add-to-cart button scrolls out of view.
      // It presses the theme's own button, so options and quantity still work.
      stickyBar: { enabled: true, button: 'salla-add-product-button, .s-add-product-button-main, .product-form button[type=submit]' },
      // Product page: products this visitor opened before (kept in their browser).
      recentlyViewed: { enabled: true, title: 'شاهدتها مؤخراً', limit: 4 },
      // Heart button on the product cards of the custom sections (uses Salla's wishlist; asks guests to log in).
      wishlistHearts: true,
      backToTop: true,
      // Cart drawer: the cart icon opens a side panel with the items, quantities, free-shipping progress and checkout.
      // openOnAdd: open it after a product is added. trigger: extra elements that open it (links to the cart page always do).
      cartDrawer: { enabled: true, openOnAdd: true, title: 'سلة المشتريات', trigger: 'salla-cart-summary, .s-cart-summary-wrapper', checkoutUrl: '' }
    }
  };

  /* ===================== 1b) BASIC HOME SECTIONS — edit freely =====================
     These build the rest of the home page with code (no Raed settings needed).
     Order on the page: banner → advanced sections (above) → these, in this order.
     Set enabled:false on any you don't want. Empty image = a product image from your store. */
  var BASICS = {
    hero: {
      enabled: true,            // only shown if your theme has no slider of its own
      autoplay: 6000,
      slides: [
        { eyebrow: 'وصل حديثاً', title: 'تشكيلة الموسم الجديدة', text: 'قطع مختارة بعناية، وتوصيل سريع لكل مدن المملكة.', btn: 'تسوّق الآن', url: '', go: 'products', photo: '1531297484001-80022131f5a1' },
        { eyebrow: 'عروض حصرية', title: 'خصومات تصل إلى 50%', text: 'على منتجات مختارة ولفترة محدودة.', btn: 'شوف العروض', url: '', go: 'offers', photo: '1607083206968-13611e3d76db' },
        { eyebrow: 'الأكثر طلباً', title: 'اختيارات عملائنا', text: 'المنتجات اللي الكل يسأل عنها.', btn: 'اكتشف المزيد', url: '', go: 'products', photo: '1616588589676-62b3bd4ff6d2' }
      ]
    },
    categories: { enabled: true, title: 'تسوّق حسب القسم', eyebrow: 'الأقسام', limit: 8 },
    features: {
      enabled: true,
      items: [
        ['🚚', 'توصيل سريع', 'لكل مدن المملكة'],
        ['🛡️', 'منتجات أصلية', 'جودة مضمونة'],
        ['💳', 'قسّطها', 'مع تابي وتمارا']
      ]
    },
    offers: { enabled: true, eyebrow: 'لفترة محدودة', title: 'عروض الأسبوع', source: 'offers', limit: 10 },
    banners: {
      enabled: true,
      items: [
        { eyebrow: 'جديدنا', title: 'وصل حديثاً', text: 'أحدث القطع في المتجر', btn: 'تسوّق', url: '', go: 'products', image: '', photo: '1517336714731-489689fd1ca8' },
        { eyebrow: 'تخفيضات', title: 'لا تفوّت العروض', text: 'خصومات على منتجات مختارة', btn: 'العروض', url: '', go: 'offers', image: '', photo: '1607082349566-187342175e2f' }
      ]
    },
    tabs: { enabled: true, eyebrow: 'مختارة لك', title: 'اكتشف منتجاتنا', limit: 8 },
    darkProducts: { enabled: true, eyebrow: 'مختارات خاصة', title: 'أسعار خاصة لفترة محدودة', text: 'منتجات منتقاة بعناية من متجرنا.', source: 'latest', limit: 4, linkText: 'عرض الكل', url: '' },
    wideBanner: { enabled: true, eyebrow: 'عرض خاص', title: 'تسوّق أكثر ووفّر أكثر', text: 'أضف منتجاتك المفضلة للسلة واستمتع بالعروض.', btn: 'ابدأ التسوق', url: '', go: 'products', image: '', photo: '1599669454699-248893623440' },
    bestSellers: { enabled: true, eyebrow: 'الأكثر طلباً', title: 'الأكثر مبيعاً', limit: 4 },
    video: { enabled: true, youtubeId: '', title: 'شاهد منتجاتنا عن قرب' },   // e.g. youtubeId: 'dQw4w9WgXcQ'. Empty = hidden
    story: {
      enabled: true, eyebrow: 'قصتنا', title: 'جودة تستاهل ثقتك', text: 'متجر سعودي نختار منتجاته بعناية، ونوصلها لك أينما كنت في المملكة.', btn: 'تعرّف علينا', url: '',
      stats: []                // your REAL numbers only, e.g. [['+12,000', 'عميل'], ['48 ساعة', 'متوسط التوصيل']]
    },
    brands: { enabled: true, title: 'الماركات', items: [] },   // e.g. [{ name: 'Apple', logo: 'https://…/apple.png', url: '' }]. Empty = hidden
    reviews: { enabled: true, title: 'آراء عملائنا', items: [] } // REAL reviews only: [{ name: 'عبدالله', city: 'الرياض', text: '…', rating: 5 }]. Empty = hidden
  };

  /* ===================== 2) HELPERS ===================== */
  var STORE = {};           // product cache by id
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(v) { try { return salla.money(v); } catch (e) { return Number(v).toLocaleString('ar-SA') + ' ر.س'; } }
  function num(v) { return Number(v) || 0; }
  function imgOf(p) { return (p && p.image && p.image.url) || (p && p.thumbnail) || (p && p.images && p.images[0] && p.images[0].url) || ''; }
  function discount(p) { return p.is_on_sale && num(p.regular_price) > num(p.price) ? Math.round((1 - num(p.price) / num(p.regular_price)) * 100) : 0; }
  function catIdFromUrl(u) { var m = decodeURI(String(u || '')).match(/\/c(\d+)(?:[\/?#]|$)/); return m ? +m[1] : null; }
  function catId(x) { return (x && (+x.id || catIdFromUrl(x.url))) || null; }
  function remember(list) { (list || []).forEach(function (p) { STORE[p.id] = p; }); return list || []; }
  function page() { try { return salla.config.get('page') || {}; } catch (e) { return {}; } }
  function nProducts(n) { return n === 1 ? 'منتج واحد' : n === 2 ? 'منتجان' : n + ' منتجات'; }
  function months(m) { return m === 1 ? 'شهر' : m === 2 ? 'شهرين' : m <= 10 ? m + ' أشهر' : m + ' شهراً'; }
  function warn(e) { if (window.console) console.warn('[ishara]', e); }

  var FETCHES = {};
  function fetchProducts(opts) {
    var key = JSON.stringify(opts);
    if (FETCHES[key]) return FETCHES[key];
    return (FETCHES[key] = salla.api.product.fetch(opts).then(function (r) { return remember((r && r.data) || []); }).catch(function (e) { warn(e); delete FETCHES[key]; return []; }));
  }
  function details(id) {
    if (STORE[id] && STORE[id]._full) return Promise.resolve(STORE[id]);
    return salla.api.product.getDetails(id).then(function (r) { var p = Object.assign({}, STORE[id] || {}, r.data, { _full: true }); STORE[id] = p; return p; }).catch(function (e) { warn(e); return STORE[id] || null; });
  }
  function addToCart(id, btn) {
    var p = STORE[id];
    if (p && p.has_options) { location.href = p.url; return Promise.resolve(false); }
    if (btn) btn.classList.add('ish-loading');
    return salla.cart.addItem({ id: +id, quantity: 1 })
      .then(function () { return true; })
      .catch(function () { if (p && p.url) location.href = p.url; return false; })
      .then(function (ok) { if (btn) btn.classList.remove('ish-loading'); return ok; });
  }
  function addMany(ids, btn) {
    if (btn) btn.classList.add('ish-loading');
    var skipped = [];
    return ids.reduce(function (chain, id) {
      return chain.then(function () {
        var p = STORE[id];
        if (p && p.has_options) { skipped.push(p.name); return; }
        return salla.cart.addItem({ id: +id, quantity: 1 }).catch(function () { skipped.push(p ? p.name : id); });
      });
    }, Promise.resolve()).then(function () {
      if (btn) btn.classList.remove('ish-loading');
      if (skipped.length) { try { salla.notify.info('اختر الخيارات (المقاس/اللون) لهذه المنتجات من صفحتها: ' + skipped.join('، ')); } catch (e) {} }
    });
  }

  function card(p, extra) {
    var d = discount(p);
    return '<article class="ish-card">' +
      '<a class="ish-card__img" href="' + esc(p.url) + '"><img src="' + esc(imgOf(p)) + '" alt="' + esc(p.name) + '" loading="lazy"></a>' +
      (d ? '<span class="ish-badge">خصم ' + d + '%</span>' : '') + wishBtn(p.id) +
      '<a class="ish-card__name" href="' + esc(p.url) + '">' + esc(p.name) + '</a>' +
      '<div class="ish-price"><b>' + money(p.price) + '</b>' + (d ? '<s>' + money(p.regular_price) + '</s>' : '') + '</div>' +
      (extra || '') +
      '<button type="button" class="ish-btn" data-ish-add="' + p.id + '">' + (p.has_options ? 'اختر الخيارات' : 'أضف للسلة') + '</button>' +
      '</article>';
  }
  function head(eyebrow, title, end) {
    return '<div class="ish-head"><div>' + (eyebrow ? '<span class="ish-eyebrow">' + esc(eyebrow) + '</span>' : '') + '<h2 class="ish-h">' + esc(title) + '</h2></div>' + (end || '') + '</div>';
  }
  // background photo: an Unsplash id or a full URL -> CSS background-image value ('' if none)
  function screenW() {   // screen width in real pixels, rounded up to 200px steps
    var px = (window.innerWidth || 1200) * Math.min(window.devicePixelRatio || 1, 2);
    return Math.max(600, Math.ceil(px / 200) * 200);
  }
  function photoUrl(v, w) {
    if (!v) return '';
    if (/[\/:.]/.test(v)) return v;                                 // a full URL
    if (window.ISHARA_PHOTO_SRC) return window.ISHARA_PHOTO_SRC(v);   // preview: local copies
    return 'https://images.unsplash.com/photo-' + v + '?auto=format&fit=crop&w=' + Math.min(w || 1800, screenW()) + '&q=70';
  }
  function photoStyle(v, bg) {
    var u = photoUrl(v);
    return u ? 'background-image:url(' + esc(u) + ')' : (bg ? 'background:' + esc(bg) : '');
  }
  function photoOn(el, v) { var u = photoUrl(v); if (el && u) { el.classList.add('ish-photo'); el.style.backgroundImage = 'url("' + u + '")'; } }
  // picture for a category: its own Salla image, else a photo that matches its name
  function catMatch(name) {
    var n = String(name || '').toLowerCase(), rows = CONFIG.photos.categories || [];
    for (var i = 0; i < rows.length; i++) if (new RegExp(rows[i][0], 'i').test(n)) return rows[i][1];
    return '';
  }
  function catPic(x, w) { return x.image || photoUrl(catMatch(x.name) || CONFIG.photos.category, w || 400); }
  function section(cls, inner) { var s = document.createElement('section'); s.className = 'ish ish-sec ' + (cls || ''); s.innerHTML = '<div class="ish-wrap">' + inner + '</div>'; return s; }

  /* modal */
  var modal;
  function openModal(html) {
    if (!modal) {
      modal = document.createElement('div'); modal.className = 'ish-modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
      modal.innerHTML = '<div class="ish-modal__box ish"><button type="button" class="ish-modal__x" aria-label="إغلاق">×</button><div class="ish-modal__body"></div></div>';
      document.body.appendChild(modal);
      modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('.ish-modal__x')) closeModal(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    }
    $('.ish-modal__body', modal).innerHTML = html; modal.classList.add('on'); $('.ish-modal__x', modal).focus();
  }
  function closeModal() { if (modal) modal.classList.remove('on'); }

  /* global click: add to cart */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ish-add]'); if (b) { e.preventDefault(); addToCart(b.getAttribute('data-ish-add'), b); return; }
    var m = e.target.closest('[data-ish-addmany]'); if (m) { e.preventDefault(); addMany(m.getAttribute('data-ish-addmany').split(',').filter(Boolean), m); }
  });

  /* ===================== 3) HOME ===================== */
  function homeAnchor() {
    var main = $('.app-inner > main') || $('main');
    if (!main) return null;
    var hero = $(CONFIG.home.insertAfter, main) || document.getElementById('ish-hero-ph');
    var holder = document.createElement('div'); holder.className = 'ish-home';
    if (hero) hero.parentNode.insertBefore(holder, hero.nextSibling);
    else { var first = $('section, .s-block', main); if (first) first.parentNode.insertBefore(holder, first); else main.prepend(holder); }
    return holder;
  }

  /* 3.1 flash sale */
  function flashSale(holder) {
    var c = CONFIG.home.flashSale; if (!c.enabled) return;
    var sec = section('ish-flash', ''); holder.appendChild(sec); photoOn(sec, CONFIG.photos.flash);
    fetchProducts({ source: c.source, limit: c.limit }).then(function (list) {
      if (!list.length) return fetchProducts({ source: 'latest', limit: c.limit });
      return list;
    }).then(function (list) {
      if (!list.length) { sec.remove(); return; }
      var ends = c.endsAt ? new Date(c.endsAt) : null;
      if (!ends) list.forEach(function (p) { if (p.discount_ends) { var d = new Date(String(p.discount_ends).replace(' ', 'T')); if (!isNaN(d) && (!ends || d < ends)) ends = d; } });
      if (ends && (isNaN(ends) || ends < new Date())) ends = null;
      var timer = ends ? '<div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end"><span style="opacity:.7;font-size:13px">ينتهي العرض خلال</span><div class="ish-cd" data-ish-cd></div></div>' : '';
      var cards = list.slice(0, c.limit).map(function (p) {
        var q = p.quantity, s = p.sold_quantity, bar = '';
        if (q != null && s != null && !p.is_hidded_quantity && !p.unlimited_quantity && (q + s) > 0) {
          var pc = Math.round(s / (q + s) * 100);
          bar = '<div class="ish-stock"><i><b style="width:' + pc + '%"></b></i><span>تم بيع ' + pc + '%' + (q <= 20 ? ' · <strong>باقي ' + q + ' فقط</strong>' : '') + '</span></div>';
        }
        return card(p, bar);
      }).join('');
      sec.firstChild.innerHTML = head(c.eyebrow, c.title, timer) + (c.subtitle ? '<p style="opacity:.7;margin:-12px 0 20px">' + esc(c.subtitle) + '</p>' : '') + '<div class="ish-grid4">' + cards + '</div>';
      if (ends) {
        var el = $('[data-ish-cd]', sec);
        var tick = function () {
          var d = Math.max(0, ends - new Date()) / 1000;
          var parts = [[Math.floor(d / 86400), 'يوم'], [Math.floor(d % 86400 / 3600), 'ساعة'], [Math.floor(d % 3600 / 60), 'دقيقة'], [Math.floor(d % 60), 'ثانية']];
          if (parts[0][0] === 0) parts.shift();
          el.innerHTML = parts.map(function (x) { return '<span>' + String(x[0]).padStart(2, '0') + '<small>' + x[1] + '</small></span>'; }).join('');
        };
        tick(); setInterval(tick, 1000);
      }
    });
  }

  /* 3.2 shop the setup (hotspots) */
  var AUTO_TILES = 5; // auto mode: 1 large + 4 small tiles, no overlap
  function setup(holder) {
    var c = CONFIG.home.setup; if (!c.enabled) return;
    var sec = section('', ''); holder.appendChild(sec);
    var custom = c.image && c.hotspots && c.hotspots.length;
    var load = custom
      ? Promise.all(c.hotspots.map(function (h) { return details(h.id); })).then(function (ps) { return ps.filter(Boolean); })
      : fetchProducts({ source: c.source, limit: c.limit });
    load.then(function (list) {
      if (!list.length) { sec.remove(); return; }
      var pins = custom
        ? c.hotspots.map(function (h, i) { return { p: list[i], x: h.x, y: h.y }; }).filter(function (o) { return o.p; })
        : list.slice(0, AUTO_TILES).map(function (p) { return { p: p }; });
      var pinBtn = function (o, i, style) { return '<button type="button" class="ish-pin" data-ish-pin="' + i + '" aria-pressed="false" aria-label="' + esc(o.p.name) + '"' + (style ? ' style="' + style + '"' : '') + '>+</button>'; };
      var scene = custom
        ? '<div class="ish-scene" data-ish-scene><img class="ish-scene__bg" src="' + esc(c.image) + '" alt="">' + pins.map(function (o, i) { return pinBtn(o, i, 'left:' + o.x + '%;top:' + o.y + '%'); }).join('') + '<div class="ish-pop"></div></div>'
        : '<div class="ish-scene ish-scene--grid ish-n' + pins.length + '" data-ish-scene>' + pins.map(function (o, i) { return '<div class="ish-tile"><img src="' + esc(imgOf(o.p)) + '" alt="' + esc(o.p.name) + '" loading="lazy">' + pinBtn(o, i) + '</div>'; }).join('') + '<div class="ish-pop"></div></div>';
      var total = pins.reduce(function (a, o) { return a + num(o.p.price); }, 0);
      var side = '<div class="ish-list">' + pins.map(function (o, i) {
        return '<div class="ish-row" data-ish-row="' + i + '"><img src="' + esc(imgOf(o.p)) + '" alt=""><div class="ish-row__mid"><span>' + esc(o.p.name) + '</span><b>' + money(o.p.price) + '</b></div><button type="button" class="ish-plus" data-ish-add="' + o.p.id + '" aria-label="أضف للسلة">+</button></div>';
      }).join('') + '<div class="ish-total"><div><span style="opacity:.7;font-size:12px">الإعداد كاملاً</span><div style="font-size:20px;font-weight:800">' + money(total) + '</div></div><button type="button" class="ish-btn ish-btn--light" data-ish-addmany="' + pins.map(function (o) { return o.p.id; }).join(',') + '">أضف الكل</button></div></div>';
      sec.firstChild.innerHTML = head(c.eyebrow, c.title) + '<div class="ish-setup">' + scene + side + '</div>';
      var pop = $('.ish-pop', sec);
      function activate(i) {
        var pin = $('[data-ish-pin="' + i + '"]', sec), was = pin.getAttribute('aria-pressed') === 'true';
        $$('.ish-pin', sec).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        $$('.ish-row', sec).forEach(function (r) { r.classList.remove('on'); });
        if (was) { pop.classList.remove('on'); return; }
        var o = pins[i]; pin.setAttribute('aria-pressed', 'true'); $('[data-ish-row="' + i + '"]', sec).classList.add('on');
        pop.innerHTML = '<img src="' + esc(imgOf(o.p)) + '" alt=""><div style="flex:1;min-width:0"><b style="display:block;font-size:13px;line-height:1.4">' + esc(o.p.name) + '</b><b style="color:var(--ish-primary)">' + money(o.p.price) + '</b></div><button type="button" class="ish-plus" data-ish-add="' + o.p.id + '" aria-label="أضف للسلة">+</button>';
        pop.classList.add('on');
        // place the popup beside the clicked pin, kept inside the scene
        var sc = $('[data-ish-scene]', sec).getBoundingClientRect(), pr = pin.getBoundingClientRect();
        var cx = pr.left + pr.width / 2 - sc.left, cy = pr.top + pr.height / 2 - sc.top, pw = pop.offsetWidth, ph = pop.offsetHeight;
        var left = cx + 28 + pw <= sc.width - 10 ? cx + 28 : cx - 28 - pw;
        left = Math.max(10, Math.min(left, sc.width - pw - 10));
        var top = Math.max(10, Math.min(cy - ph / 2, sc.height - ph - 10));
        pop.style.left = left + 'px'; pop.style.top = top + 'px';
      }
      sec.addEventListener('click', function (e) {
        var p = e.target.closest('[data-ish-pin]'); if (p) { activate(+p.getAttribute('data-ish-pin')); return; }
        var r = e.target.closest('[data-ish-row]'); if (r && !e.target.closest('[data-ish-add]')) activate(+r.getAttribute('data-ish-row'));
        if (!e.target.closest('.ish-pop') && e.target.closest('[data-ish-scene]')) { pop.classList.remove('on'); $$('.ish-pin', sec).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); }); $$('.ish-row', sec).forEach(function (x) { x.classList.remove('on'); }); }
      });
    });
  }

  /* 3.3 product finder quiz */
  function quiz(holder) {
    var c = CONFIG.home.quiz; if (!c.enabled) return;
    var sec = section('', '<div class="ish-quiz" data-ish-quiz></div>'); holder.appendChild(sec);
    var box = $('[data-ish-quiz]', sec);
    var st = { s: 0, cat: null, catName: '', budget: null, budgetName: '', prio: null, prioName: '' }, cats = [], pool = [];
    var PRIOS = [['price', 'أفضل سعر', '﷼'], ['sold', 'الأكثر مبيعاً', '★'], ['discount', 'أعلى خصم', '%']];
    salla.api.product.categories().then(function (r) {
      cats = ((r && r.data) || []).map(function (x) { return { id: catId(x), name: x.name, image: x.image }; }).filter(function (x) { return x.id; }).slice(0, 6);
      if (!cats.length) { sec.remove(); return; }
      render();
    }).catch(function (e) { warn(e); sec.remove(); });
    function budgets() {
      var prices = pool.map(function (p) { return num(p.price); }).sort(function (a, b) { return a - b; });
      if (prices.length < 3) return [[0, Infinity, 'كل الأسعار', '']];
      var t1 = prices[Math.floor(prices.length / 3)], t2 = prices[Math.floor(prices.length * 2 / 3)];
      if (t1 === t2) return [[0, Infinity, 'كل الأسعار', '']];
      return [[0, t1, 'اقتصادي', 'أقل من ' + money(t1)], [t1, t2, 'متوسط', money(t1) + ' – ' + money(t2)], [t2, Infinity, 'فئة عليا', 'من ' + money(t2) + ' وأكثر']];
    }
    function results() {
      var b = st.budget, list = pool.filter(function (p) { return num(p.price) >= b[0] && num(p.price) < b[1]; });
      if (list.length < 3) list = list.concat(pool.filter(function (p) { return list.indexOf(p) < 0; }));
      list.sort(function (x, y) { return st.prio === 'price' ? num(x.price) - num(y.price) : st.prio === 'sold' ? num(y.sold_quantity) - num(x.sold_quantity) : discount(y) - discount(x); });
      return list.slice(0, 3);
    }
    function render() {
      var chosen = [st.catName, st.budgetName, st.prioName];
      var side = '<div class="ish-qside"><span class="ish-pill">مساعد الاختيار</span><h3 class="ish-h" style="color:#fff">' + esc(c.title) + '</h3>' +
        '<div class="ish-steps">' + [0, 1, 2].map(function (i) { return '<i class="' + (i < st.s ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
        '<ul class="ish-qsum">' + c.steps.map(function (s, i) { return '<li style="opacity:' + (chosen[i] ? 1 : .45) + '"><span>' + esc(s) + '</span><b>' + esc(chosen[i] || '—') + '</b></li>'; }).join('') + '</ul>' +
        (st.s > 0 ? '<button type="button" class="ish-btn ish-btn--ghost" data-ish-q="back" style="align-self:flex-start;margin-top:auto">رجوع</button>' : '') + '</div>';
      var main;
      var opts = function (items) {
        return '<div><span class="ish-eyebrow">السؤال ' + (st.s + 1) + ' من 3</span><h3 class="ish-h-sm" style="margin:4px 0 16px">' + esc(c.steps[st.s]) + '</h3><div class="ish-opts">' + items.join('') + '</div></div>';
      };
      if (st.s === 0) main = opts(cats.map(function (x, i) { return '<button type="button" class="ish-opt" data-ish-q="cat" data-v="' + i + '">' + '<img src="' + esc(catPic(x)) + '" alt="">' + '<span>' + esc(x.name) + '</span></button>'; }));
      else if (st.s === 1) main = opts(budgets().map(function (b, i) { return '<button type="button" class="ish-opt" data-ish-q="budget" data-v="' + i + '"><span class="ish-ico">' + '●'.repeat(i + 1) + '</span><span>' + esc(b[2]) + '</span>' + (b[3] ? '<small>' + b[3] + '</small>' : '') + '</button>'; }));
      else if (st.s === 2) main = opts(PRIOS.map(function (x, i) { return '<button type="button" class="ish-opt" data-ish-q="prio" data-v="' + i + '"><span class="ish-ico">' + x[2] + '</span><span>' + x[1] + '</span></button>'; }));
      else main = '<div>' + head('اخترنا لك', 'أفضل الخيارات لك', '<button type="button" class="ish-btn ish-btn--outline" data-ish-q="reset">ابدأ من جديد</button>') + '<div class="ish-grid3">' + results().map(function (p) { return card(p); }).join('') + '</div></div>';
      box.innerHTML = side + main;
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ish-q]'); if (!b) return;
      var t = b.getAttribute('data-ish-q'), v = +b.getAttribute('data-v');
      if (t === 'cat') {
        st.cat = cats[v]; st.catName = st.cat.name; b.classList.add('ish-loading');
        fetchProducts({ source: 'categories', source_value: [st.cat.id], limit: 30 }).then(function (l) { pool = l.filter(function (p) { return p.is_available !== false; }); st.s = 1; render(); });
        return;
      }
      if (t === 'budget') { var bs = budgets(); st.budget = bs[v]; st.budgetName = bs[v][2]; st.s = 2; }
      if (t === 'prio') { st.prio = PRIOS[v][0]; st.prioName = PRIOS[v][1]; st.s = 3; }
      if (t === 'back') { st.s--; if (st.s === 0) st.catName = ''; if (st.s === 1) st.budgetName = ''; if (st.s === 2) st.prioName = ''; }
      if (t === 'reset') st = { s: 0, cat: null, catName: '', budget: null, budgetName: '', prio: null, prioName: '' };
      render();
    });
  }

  /* 3.4 comparison table (also used by the listing compare tray) */
  function cmpRows(list) {
    var rows = [
      ['السعر', function (p) { return num(p.price); }, money, 'min'],
      ['السعر قبل الخصم', function (p) { return num(p.regular_price) || num(p.price); }, money, null],
      ['الخصم', discount, function (v) { return v ? v + '%' : '—'; }, 'max'],
      ['التقييم', function (p) { return p.rating && p.rating.stars ? +p.rating.stars : 0; }, function (v) { return v ? '★ ' + v : '—'; }, 'max'],
      ['المبيعات', function (p) { return num(p.sold_quantity); }, function (v) { return v ? v.toLocaleString('ar-SA') + '+' : '—'; }, 'max'],
      ['التوفر', function (p) { return p.is_available === false || p.is_out_of_stock ? 'نفدت الكمية' : 'متوفر'; }, String, null],
      ['الشحن المجاني', function (p) { return p.is_free_shipping ? 'نعم' : 'لا'; }, String, null]
    ];
    return rows.map(function (r) {
      var vals = list.map(r[1]);
      var nums = vals.filter(function (v) { return typeof v === 'number' && v > 0; });
      var best = r[3] && nums.length > 1 ? (r[3] === 'max' ? Math.max.apply(null, nums) : Math.min.apply(null, nums)) : null;
      return '<tr><td>' + r[0] + '</td>' + vals.map(function (v) { return '<td class="' + (best !== null && v === best ? 'best' : '') + '">' + r[2](v) + '</td>'; }).join('') + '</tr>';
    }).join('');
  }
  function cmpTable(list, options) {
    var headRow = '<tr><td>' + (options ? 'اختر المنتج' : '') + '</td>' + list.map(function (p, i) {
      return '<td>' + (options ? '<select data-ish-cmpsel="' + i + '" aria-label="المنتج ' + (i + 1) + '">' + options.map(function (o) { return '<option value="' + o.id + '"' + (o.id === p.id ? ' selected' : '') + '>' + esc(o.name) + '</option>'; }).join('') + '</select>' : '') +
        '<img src="' + esc(imgOf(p)) + '" alt=""><b style="display:block;line-height:1.4">' + esc(p.name) + '</b></td>';
    }).join('') + '</tr>';
    var foot = '<tr><td></td>' + list.map(function (p) { return '<td><button type="button" class="ish-btn" style="width:100%" data-ish-add="' + p.id + '">' + (p.has_options ? 'اختر الخيارات' : 'أضف للسلة') + '</button></td>'; }).join('') + '</tr>';
    return '<div class="ish-cmpwrap"><table class="ish-cmp"><tbody>' + headRow + cmpRows(list) + foot + '</tbody></table></div>';
  }
  function compare(holder) {
    var c = CONFIG.home.compare; if (!c.enabled) return;
    var sec = section('', ''); holder.appendChild(sec);
    fetchProducts({ source: c.source, limit: c.limit }).then(function (list) {
      if (list.length < 2) { sec.remove(); return; }
      var sel = list.slice(0, Math.min(3, list.length));
      var draw = function () { sec.firstChild.innerHTML = head(c.eyebrow, c.title) + cmpTable(sel, list) + '<p class="ish-muted" style="font-size:12px;margin-top:10px">الخانة الخضراء هي الأفضل في كل صف.</p>'; };
      draw();
      sec.addEventListener('change', function (e) {
        var s = e.target.closest('[data-ish-cmpsel]'); if (!s) return;
        sel[+s.getAttribute('data-ish-cmpsel')] = STORE[s.value]; draw();
      });
    });
  }


  /* ===================== 3b) BASIC HOME SECTIONS ===================== */
  var CATS = null;
  function getCats() {
    if (!CATS) CATS = salla.api.product.categories().then(function (r) {
      return ((r && r.data) || []).map(function (x) { var img = x.image && (x.image.url || x.image); return { id: catId(x), name: x.name, url: x.url, image: typeof img === 'string' ? img : '' }; }).filter(function (x) { return x.name && x.url; });
    }).catch(function (e) { warn(e); return []; });
    return CATS;
  }
  function homeUrl(u, fallback) { return u || fallback || (function () { try { return salla.url.get(''); } catch (e) { return '/'; } })(); }
  function goUrl(k) {
    var own = (window.ISHARA_LINKS && window.ISHARA_LINKS[k]) || (CONFIG.links && CONFIG.links[k]);
    if (own || !k || k === 'about') return own || '';
    try { return salla.url.get(k); } catch (e) { return '/' + k; }
  }
  function offersUrl() { return goUrl('offers'); }
  function rowSlider(cards) {
    return '<div class="ish-rowwrap"><button type="button" class="ish-arrow ish-arrow--prev" data-ish-scroll="1" aria-label="السابق">›</button><div class="ish-row-scroll" data-ish-row-scroll>' + cards + '</div><button type="button" class="ish-arrow ish-arrow--next" data-ish-scroll="-1" aria-label="التالي">‹</button></div>';
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-ish-scroll]'); if (!a) return;
    var row = $('[data-ish-row-scroll]', a.parentNode); if (!row) return;
    row.scrollBy({ left: +a.getAttribute('data-ish-scroll') * row.clientWidth * 0.8, behavior: 'smooth' });
  });
  function bannerHTML(b, img, cls) {
    return '<a class="ish-banner ish-photo ' + (cls || '') + '" href="' + esc(homeUrl(b.url, goUrl(b.go))) + '" style="' + photoStyle(b.photo, b.bg) + '">' +
      '<div class="ish-banner__txt">' + (b.eyebrow ? '<span class="ish-pill">' + esc(b.eyebrow) + '</span>' : '') + '<h3>' + esc(b.title) + '</h3>' + (b.text ? '<p>' + esc(b.text) + '</p>' : '') + (b.btn ? '<span class="ish-btn ish-btn--light">' + esc(b.btn) + '</span>' : '') + '</div>' +
      (img ? '<div class="ish-banner__img"><img src="' + esc(img) + '" alt="" loading="lazy"></div>' : '') + '</a>';
  }

  /* hero slider (top of page, only when the theme has none) */
  function hero(before) {
    var c = BASICS.hero; if (!c.enabled || !c.slides.length) return;
    // a page may already hold the first slide as static HTML (for speed): keep it and add the rest around it
    var ph = document.getElementById('ish-hero-ph');
    var sec = ph || section('ish-hero', ''); if (!ph) before.parentNode.insertBefore(sec, before);
    (function () {
      var slides = c.slides.map(function (s, i) {
        return '<div class="ish-slide ish-photo' + (i ? '' : ' on') + '"' + (i ? ' data-ish-style="' + photoStyle(s.photo, s.bg) : ' style="' + photoStyle(s.photo, s.bg)) + '"><div class="ish-slide__txt">' + (s.eyebrow ? '<span class="ish-pill">' + esc(s.eyebrow) + '</span>' : '') + '<h2>' + esc(s.title) + '</h2>' + (s.text ? '<p>' + esc(s.text) + '</p>' : '') + (s.btn ? '<a class="ish-btn ish-btn--light" href="' + esc(homeUrl(s.url, goUrl(s.go))) + '">' + esc(s.btn) + '</a>' : '') + '</div>' +
          '</div>';
      }).join('');
      var dots = c.slides.length > 1 ? '<div class="ish-dots">' + c.slides.map(function (_, i) { return '<button type="button" data-ish-dot="' + i + '" aria-label="شريحة ' + (i + 1) + '"' + (i ? '' : ' aria-current="true"') + '></button>'; }).join('') + '</div>' : '';
      if (ph) {
        var box = document.createElement('div'); box.innerHTML = slides + dots; box.removeChild(box.firstChild);
        var sl = $('.ish-slider', ph); while (box.firstChild) sl.appendChild(box.firstChild);
      } else sec.firstChild.innerHTML = '<div class="ish-slider">' + slides + dots + '</div>';
      var later = function () { $$('[data-ish-style]', sec).forEach(function (el) { el.setAttribute('style', el.getAttribute('data-ish-style')); el.removeAttribute('data-ish-style'); }); };
      if (document.readyState === 'complete') setTimeout(later, 300); else window.addEventListener('load', function () { setTimeout(later, 300); });
      var cur = 0, n = c.slides.length, timer;
      var go = function (i) {
        cur = (i + n) % n;
        $$('.ish-slide', sec).forEach(function (el, k) { el.classList.toggle('on', k === cur); });
        $$('[data-ish-dot]', sec).forEach(function (el, k) { if (k === cur) el.setAttribute('aria-current', 'true'); else el.removeAttribute('aria-current'); });
      };
      var play = function () { clearInterval(timer); if (n > 1 && c.autoplay) timer = setInterval(function () { go(cur + 1); }, c.autoplay); };
      sec.addEventListener('click', function (e) { var d = e.target.closest('[data-ish-dot]'); if (d) { go(+d.getAttribute('data-ish-dot')); play(); } });
      sec.addEventListener('mouseenter', function () { clearInterval(timer); });
      sec.addEventListener('mouseleave', play);
      var x0 = null;
      sec.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      sec.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { go(cur + (dx > 0 ? 1 : -1)); play(); } x0 = null; });
      play();
    })();
  }

  function basics(holder) {
    var B = BASICS, add = function (cls, inner) { var s = section(cls, inner || ''); holder.appendChild(s); return s; };

    if (B.categories.enabled) {
      var sc = add('ish-cats');
      getCats().then(function (cats) {
        cats = cats.slice(0, B.categories.limit); if (!cats.length) { sc.remove(); return; }
        sc.firstChild.innerHTML = head(B.categories.eyebrow, B.categories.title) + '<div class="ish-catrow">' + cats.map(function (x) {
          return '<a class="ish-cat" href="' + esc(x.url) + '"><span class="ish-cat__img"><img src="' + esc(catPic(x)) + '" alt="" loading="lazy"></span><span>' + esc(x.name) + '</span></a>';
        }).join('') + '</div>';
      });
    }

    if (B.features.enabled && B.features.items.length) {
      var sf = add('ish-feats', '<div class="ish-featrow">' + B.features.items.map(function (f) { return '<div class="ish-feat"><span class="ish-feat__ico" aria-hidden="true">' + esc(f[0]) + '</span><div><b>' + esc(f[1]) + '</b><small>' + esc(f[2]) + '</small></div></div>'; }).join('') + '</div>');
      // goes at the end of the home page, right before the footer
      var mainEl = holder.closest('main') || holder.parentNode;
      if (mainEl) mainEl.appendChild(sf);
    }

    if (B.offers.enabled) {
      var so = add('ish-offers');
      fetchProducts({ source: B.offers.source, limit: B.offers.limit }).then(function (list) {
        if (!list.length) { so.remove(); return; }
        so.firstChild.innerHTML = head(B.offers.eyebrow, B.offers.title, '<a class="ish-more" href="' + esc(offersUrl()) + '">عرض الكل ‹</a>') + rowSlider(list.map(function (p) { return card(p); }).join(''));
      });
    }

    if (B.banners.enabled && B.banners.items.length) {
      var sb = add('ish-banners');
      fetchProducts({ source: 'latest', limit: 12 }).then(function (list) {
        var pics = list.map(imgOf).filter(Boolean).slice(3);
        sb.firstChild.innerHTML = '<div class="ish-bannergrid">' + B.banners.items.map(function (b, i) { return bannerHTML(b, b.image || pics[i] || '', ''); }).join('') + '</div>';
      });
    }

    if (B.tabs.enabled) {
      var st = add('ish-tabs-sec');
      var TABS = [['latest', 'وصل حديثاً'], ['sold', 'الأكثر مبيعاً'], ['offers', 'العروض']];
      st.firstChild.innerHTML = head(B.tabs.eyebrow, B.tabs.title, '<div class="ish-tabs" role="tablist">' + TABS.map(function (t, i) { return '<button type="button" role="tab" data-ish-tab="' + t[0] + '" aria-selected="' + (i === 0) + '">' + t[1] + '</button>'; }).join('') + '</div>') + '<div class="ish-grid4" data-ish-tabgrid></div>';
      var grid = $('[data-ish-tabgrid]', st);
      var show = function (k) {
        grid.classList.add('ish-loading');
        var q = k === 'offers' ? fetchProducts({ source: 'offers', limit: B.tabs.limit }) : fetchProducts({ source: 'latest', limit: k === 'sold' ? 30 : B.tabs.limit });
        q.then(function (list) {
          if (k === 'sold') list = list.slice().sort(function (a, b) { return num(b.sold_quantity) - num(a.sold_quantity); });
          list = list.slice(0, B.tabs.limit);
          grid.innerHTML = list.length ? list.map(function (p) { return card(p); }).join('') : '<p class="ish-muted">لا توجد منتجات هنا حالياً.</p>';
          grid.classList.remove('ish-loading');
        });
      };
      st.addEventListener('click', function (e) { var t = e.target.closest('[data-ish-tab]'); if (!t) return; $$('[data-ish-tab]', st).forEach(function (b) { b.setAttribute('aria-selected', b === t); }); show(t.getAttribute('data-ish-tab')); });
      show('latest');
    }

    if (B.darkProducts.enabled) {
      var c = B.darkProducts, sd = add('ish-dark'); photoOn(sd, CONFIG.photos.dark);
      fetchProducts({ source: c.source, limit: c.limit + 4 }).then(function (list) {
        list = list.slice(-c.limit); if (!list.length) { sd.remove(); return; }
        sd.firstChild.innerHTML = head(c.eyebrow, c.title, c.linkText ? '<a class="ish-more" href="' + esc(homeUrl(c.url, offersUrl())) + '">' + esc(c.linkText) + ' ‹</a>' : '') + (c.text ? '<p class="ish-lead">' + esc(c.text) + '</p>' : '') + '<div class="ish-grid4">' + list.map(function (p) { return card(p); }).join('') + '</div>';
      });
    }

    if (B.wideBanner.enabled) {
      var sw = add('ish-widebanner');
      fetchProducts({ source: 'latest', limit: 12 }).then(function (list) {
        var img = B.wideBanner.image || (list[list.length - 1] && imgOf(list[list.length - 1])) || '';
        sw.firstChild.innerHTML = bannerHTML(B.wideBanner, img, 'ish-banner--wide');
      });
    }

    if (B.bestSellers.enabled) {
      var sbs = add('ish-best');
      fetchProducts({ source: 'latest', limit: 30 }).then(function (list) {
        list = list.slice().sort(function (a, b) { return num(b.sold_quantity) - num(a.sold_quantity); }).slice(0, B.bestSellers.limit);
        if (!list.length) { sbs.remove(); return; }
        sbs.firstChild.innerHTML = head(B.bestSellers.eyebrow, B.bestSellers.title) + '<div class="ish-grid4">' + list.map(function (p) { return card(p); }).join('') + '</div>';
      });
    }

    if (B.video.enabled && B.video.youtubeId) {
      var sv = add('ish-video', head('', B.video.title) + '<button type="button" class="ish-yt" data-ish-yt style="background-image:url(https://i.ytimg.com/vi/' + encodeURIComponent(B.video.youtubeId) + '/hqdefault.jpg)" aria-label="تشغيل الفيديو"><span>▶</span></button>');
      sv.addEventListener('click', function (e) { var b = e.target.closest('[data-ish-yt]'); if (!b) return; b.outerHTML = '<div class="ish-yt"><iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(B.video.youtubeId) + '?autoplay=1" title="' + esc(B.video.title) + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>'; });
    }

    if (B.story.enabled) {
      var s = B.story;
      var sst = add('ish-story', '<div class="ish-story__in">' + (s.eyebrow ? '<span class="ish-pill">' + esc(s.eyebrow) + '</span>' : '') + '<h2>' + esc(s.title) + '</h2>' + (s.text ? '<p>' + esc(s.text) + '</p>' : '') +
        (s.stats.length ? '<div class="ish-stats">' + s.stats.map(function (x) { return '<div><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }).join('') + '</div>' : '') +
        (s.btn && (s.url || goUrl('about')) ? '<a class="ish-btn ish-btn--ghost" href="' + esc(s.url || goUrl('about')) + '">' + esc(s.btn) + '</a>' : '') + '</div>');
      photoOn(sst, CONFIG.photos.story);
    }

    if (B.brands.enabled && B.brands.items.length) {
      add('ish-brands', head('', B.brands.title) + '<div class="ish-brandrow">' + B.brands.items.map(function (b) { var inner = b.logo ? '<img src="' + esc(b.logo) + '" alt="' + esc(b.name) + '" loading="lazy">' : '<b>' + esc(b.name) + '</b>'; return b.url ? '<a href="' + esc(b.url) + '">' + inner + '</a>' : '<div>' + inner + '</div>'; }).join('') + '</div>');
    }

    if (B.reviews.enabled && B.reviews.items.length) {
      add('ish-reviews', head('', B.reviews.title) + rowSlider(B.reviews.items.map(function (r) {
        var n = Math.max(0, Math.min(5, Math.round(r.rating || 5)));
        return '<figure class="ish-rev"><div class="ish-stars" aria-label="' + n + ' من 5">' + '★'.repeat(n) + '<i>' + '★'.repeat(5 - n) + '</i></div><blockquote>' + esc(r.text) + '</blockquote><figcaption><span class="ish-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><circle cx="12" cy="8" r="4.2"/><path d="M3.5 21c.6-4.4 4.1-6.8 8.5-6.8s7.9 2.4 8.5 6.8z"/></svg></span><div><b>' + esc(r.name) + '</b>' + (r.city ? '<small>' + esc(r.city) + '</small>' : '') + '</div></figcaption></figure>';
      }).join('')));
    }
  }

  /* ===================== 4) PRODUCT PAGE ===================== */
  function productPage() {
    var pg = page(), id = pg.id; if (!id) return;
    var main = $('.app-inner > main') || $('main');
    var slot = $('.s-before-reviews', main) || $('.container--product-details', main);
    var slotEnd = $('.s-after-related', main) || slot;
    if (!slot) return;
    var top = document.createElement('div'); top.className = 'ish-product';
    slot.parentNode.insertBefore(top, slot);
    var pcat = catIdFromUrl(pg.parent && pg.parent.url);
    var lay = window.ISHARA_PRODUCT_LAYOUT || (CONFIG.product.layouts && pcat && CONFIG.product.layouts[pcat]) || CONFIG.product.layout;
    if (lay === 'studio') productStudio(main);
    details(id).then(function (cur) {
      if (!cur) return;
      var catId = pcat;
      if (CONFIG.product.fbt.enabled && catId) fbt(top, cur, catId);
      if (CONFIG.product.installments.enabled || CONFIG.product.tradeIn.enabled) calc(top, cur);
      if (CONFIG.product.faq.enabled) faq(slotEnd);
      stickyBar(cur);
      recentlyViewed(cur, slotEnd);
    });
  }

  /* ---------- product page: studio layout ----------
     Only rearranges the theme's static parts (title, top price, description) and adds a photo gallery.
     The theme's form (options, live price, quantity, add to cart) is not moved or changed. */
  function productStudio(main) {
    var c = CONFIG.product.studio || {};
    var row = $(c.row, main); if (!row) return;
    var gal = $(c.gallery, row), info = $(c.info, row); if (!gal || !info) return;
    var slider = $(c.slider, gal);
    document.body.classList.add('ish-pdp-studio'); row.classList.add('ish-pdp');
    var pick = function (sel) { return $(sel, info); };

    // 1) header: brand, name, subtitle, rating, price, perks
    var head = document.createElement('div'); head.className = 'ish ish-pdp-head';
    head.innerHTML = '<div class="ish-pdp-head__main"></div><div class="ish-pdp-head__price"></div>' +
      (c.perks && c.perks.length ? '<ul class="ish-pdp-perks">' + c.perks.map(function (x) { return '<li><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></li>'; }).join('') + '</ul>' : '');
    var hm = head.children[0], hp = head.children[1];
    ['.product-brand', 'h1', '.product-entry__sub-title', 'salla-rating-stars'].forEach(function (sel) { var el = pick(sel); if (el) hm.appendChild(el); });
    var price = pick('[data-testid="store-product-price"]'), tax = $$(':scope > small', info)[0];
    if (price) hp.appendChild(price);
    if (tax) hp.appendChild(tax);
    row.parentNode.insertBefore(head, row);

    // 2) description beside the gallery, fully open
    var desc = pick('.product__description');
    if (desc) {
      var story = document.createElement('div'); story.className = 'ish ish-pdp-story';
      story.innerHTML = '<h2 class="ish-h-sm">' + esc(c.storyTitle || '') + '</h2>';
      story.appendChild(desc);
      var more = $('#more-content', desc); if (more) more.style.maxHeight = 'none';
      var mb = $('#btn-show-more', desc); if (mb) mb.hidden = true;
      row.appendChild(story);
    }
    if (c.buyTitle) { var bt = document.createElement('div'); bt.className = 'ish ish-pdp-buyt'; bt.textContent = c.buyTitle; info.insertBefore(bt, info.firstChild); }

    // 3) gallery from the theme slider's own image list (skipped for videos and 3D, the theme slider stays)
    var imgs = [];
    try { imgs = JSON.parse((slider && slider.getAttribute('data-images')) || '[]') || []; } catch (e) { imgs = []; }
    if (!imgs.length || imgs.some(function (x) { return x && (x.video_url || x.three_d_image_url); })) return;
    imgs = imgs.map(function (x) { return { url: typeof x === 'string' ? x : (x.url || (x.image && x.image.url) || ''), alt: (x && x.alt) || '' }; }).filter(function (x) { return x.url; });
    if (!imgs.length) return;
    var name = (hm.querySelector('h1') || {}).textContent || '';
    var g = document.createElement('div'); g.className = 'ish ish-gal' + (imgs.length > 1 ? '' : ' ish-gal--one');
    g.innerHTML = '<div class="ish-gal__stage"><div class="ish-gal__track" tabindex="0" aria-label="صور المنتج">' + imgs.map(function (x, i) {
        return '<button type="button" class="ish-gal__slide" data-ish-zoom="' + i + '" aria-label="عرض الصورة ' + (i + 1) + ' بحجم كامل"><img src="' + esc(x.url) + '" alt="' + esc(x.alt || name) + '"' + (i ? ' loading="lazy"' : '') + '></button>';
      }).join('') + '</div>' + wishBtn(page().id) +
      (imgs.length > 1 ? '<span class="ish-gal__count" aria-live="polite"><b>1</b> / ' + imgs.length + '</span>' : '') +
      '<span class="ish-gal__hint" aria-hidden="true">اضغط للتكبير</span></div>' +
      (imgs.length > 1 ? '<div class="ish-gal__thumbs" role="group" aria-label="اختر صورة">' + imgs.map(function (x, i) {
        return '<button type="button" data-ish-go="' + i + '" aria-label="الصورة ' + (i + 1) + '"' + (i ? '' : ' aria-current="true"') + '><img src="' + esc(x.url) + '" alt="" loading="lazy"></button>';
      }).join('') + '</div>' : '');
    gal.insertBefore(g, gal.firstChild);
    gal.classList.add('ish-gal-ready');
    var track = $('.ish-gal__track', g), cur = 0;
    function mark(i) {
      cur = i; var cnt = $('.ish-gal__count b', g); if (cnt) cnt.textContent = i + 1;
      $$('[data-ish-go]', g).forEach(function (b) { if (+b.getAttribute('data-ish-go') === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    }
    function go(i, smooth) {
      i = Math.max(0, Math.min(imgs.length - 1, i)); mark(i);
      var sl = track.children[i]; if (sl) track.scrollTo({ left: sl.offsetLeft - track.offsetLeft, behavior: smooth === false ? 'auto' : 'smooth' });
    }
    g.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ish-go]'); if (t) { go(+t.getAttribute('data-ish-go')); return; }
      var z = e.target.closest('[data-ish-zoom]'); if (z) viewer(+z.getAttribute('data-ish-zoom'));
    });
    var st; track.addEventListener('scroll', function () {
      clearTimeout(st); st = setTimeout(function () { var w = track.clientWidth || 1; mark(Math.round(Math.abs(track.scrollLeft) / w)); }, 80);
    }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur + 1); }      // RTL: left is next
      if (e.key === 'ArrowRight') { e.preventDefault(); go(cur - 1); }
    });

    // full-screen viewer
    var box;
    function viewer(i) {
      if (!box) {
        box = document.createElement('div'); box.className = 'ish ish-viewer'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'صور المنتج');
        box.innerHTML = '<button type="button" class="ish-viewer__x" aria-label="إغلاق">×</button><button type="button" class="ish-viewer__nav ish-viewer__prev" aria-label="السابقة">›</button><img alt=""><button type="button" class="ish-viewer__nav ish-viewer__next" aria-label="التالية">‹</button><span class="ish-viewer__n"></span>';
        document.body.appendChild(box);
        box.addEventListener('click', function (e) {
          if (e.target === box || e.target.closest('.ish-viewer__x')) close();
          else if (e.target.closest('.ish-viewer__prev')) show(box._i - 1);
          else if (e.target.closest('.ish-viewer__next')) show(box._i + 1);
        });
        document.addEventListener('keydown', function (e) {
          if (box.hidden) return;
          if (e.key === 'Escape') close();
          if (e.key === 'ArrowLeft') show(box._i + 1);
          if (e.key === 'ArrowRight') show(box._i - 1);
        });
      }
      box.hidden = false; document.documentElement.classList.add('ish-noscroll'); show(i); $('.ish-viewer__x', box).focus();
    }
    function show(i) {
      i = (i + imgs.length) % imgs.length; box._i = i;
      var im = $('img', box); im.src = imgs[i].url; im.alt = imgs[i].alt || name;
      $('.ish-viewer__n', box).textContent = (i + 1) + ' / ' + imgs.length;
      $$('.ish-viewer__nav', box).forEach(function (b) { b.hidden = imgs.length < 2; });
    }
    function close() { box.hidden = true; document.documentElement.classList.remove('ish-noscroll'); var sl = track.children[box._i]; if (sl) { go(box._i, false); sl.focus(); } }

    // follow the theme slider when an option with its own photo is picked
    if (slider && window.MutationObserver) {
      var base = function (u) { return String(u || '').split('?')[0].split('/').pop(); };
      new MutationObserver(function () {
        var a = $('.swiper-slide-active:not(.slide--one-fourth) img', slider); if (!a) return;
        var src = base(a.getAttribute('src') || a.getAttribute('data-src'));
        for (var k = 0; k < imgs.length; k++) if (base(imgs[k].url) === src) { if (k !== cur) go(k); break; }
      }).observe(slider, { subtree: true, attributes: true, attributeFilter: ['class'] });
    }
  }

  function fbt(holder, cur, catId) {
    var c = CONFIG.product.fbt, sec = section('', ''); holder.appendChild(sec);
    fetchProducts({ source: 'categories', source_value: [catId], limit: 10 }).then(function (list) {
      var others = list.filter(function (p) { return String(p.id) !== String(cur.id) && p.is_available !== false; }).slice(0, c.limit);
      if (!others.length) { sec.remove(); return; }
      var items = [cur].concat(others);
      sec.firstChild.innerHTML = '<div class="ish-fbt"><div><h2 class="ish-h-sm" style="margin-bottom:14px">' + esc(c.title) + '</h2><div class="ish-fbt__items">' +
        items.map(function (p, i) {
          return (i ? '<span class="ish-fbt__plus">+</span>' : '') + '<label class="ish-fbt__it on"><input type="checkbox" data-ish-fbt="' + p.id + '" checked' + (i === 0 ? ' disabled' : '') + ' aria-label="' + esc(p.name) + '"><img src="' + esc(imgOf(p)) + '" alt=""><span>' + (i === 0 ? 'هذا المنتج: ' : '') + esc(p.name) + '</span><b>' + money(p.price) + '</b></label>';
        }).join('') + '</div></div><div class="ish-sum" data-ish-sum></div></div>';
      var draw = function () {
        var ins = $$('[data-ish-fbt]', sec); ins.forEach(function (i) { i.closest('.ish-fbt__it').classList.toggle('on', i.checked); });
        var ids = ins.filter(function (i) { return i.checked; }).map(function (i) { return i.getAttribute('data-ish-fbt'); });
        var sum = ids.reduce(function (a, id) { return a + num(STORE[id].price); }, 0);
        $('[data-ish-sum]', sec).innerHTML = '<span class="ish-muted" style="font-size:13px">' + nProducts(ids.length) + ' مختارة</span><div class="r" style="border-top:1px solid var(--ish-line);padding-top:10px"><b>الإجمالي</b><b style="font-size:22px;color:var(--ish-primary)">' + money(sum) + '</b></div><button type="button" class="ish-btn" style="width:100%" data-ish-addmany="' + ids.join(',') + '">أضف ' + nProducts(ids.length) + ' للسلة</button>';
      };
      draw(); sec.addEventListener('change', function (e) { if (e.target.matches('[data-ish-fbt]')) draw(); });
    });
  }
  function calc(holder, cur) {
    var ci = CONFIG.product.installments, ct = CONFIG.product.tradeIn;
    var plan = 0, cond = ct.conditions[1] ? 1 : 0, price = num(cur.price);
    var sec = section('', ''); holder.appendChild(sec);
    var inst = ci.enabled ? '<div class="ish-panel"><h3 class="ish-h-sm">' + esc(ci.title) + '</h3><div class="ish-plans" data-ish-plans></div><div class="ish-sched" data-ish-sched></div><p class="ish-muted" style="font-size:12px;margin:0" data-ish-note></p></div>' : '';
    var trade = ct.enabled ? '<div class="ish-panel"><h3 class="ish-h-sm">' + esc(ct.title) + '</h3><select class="ish-select" data-ish-dev aria-label="جهازك الحالي">' + ct.devices.map(function (d, i) { return '<option value="' + i + '"' + (i === 2 ? ' selected' : '') + '>' + esc(d[0]) + '</option>'; }).join('') + '</select>' +
      '<div class="ish-conds">' + ct.conditions.map(function (x, i) { return '<button type="button" data-ish-cond="' + i + '" aria-pressed="' + (i === cond) + '">' + esc(x[0]) + '<small>' + esc(x[1]) + '</small></button>'; }).join('') + '</div>' +
      '<label class="ish-chk"><input type="checkbox" data-ish-apply><span>اخصم قيمة الاستبدال من السعر</span></label>' +
      '<div class="ish-trade"><div><span style="opacity:.7;font-size:12px">قيمة جهازك التقديرية</span><b data-ish-val></b></div><div style="text-align:left"><span style="opacity:.7;font-size:12px">السعر بعد الاستبدال</span><b data-ish-net style="color:var(--ish-cyan)"></b></div></div>' +
      '<p class="ish-muted" style="font-size:11px;margin:0">' + esc(ct.note) + '</p></div>' : '';
    sec.firstChild.innerHTML = head('احسب قسطك أو استبدل جهازك القديم', 'خطط الدفع والاستبدال') + '<div class="ish-calc">' + inst + trade + '</div>';
    function draw() {
      var val = 0;
      if (ct.enabled) {
        var dev = ct.devices[+$('[data-ish-dev]', sec).value];
        val = Math.round(dev[1] * ct.conditions[cond][2] / 10) * 10;
        $('[data-ish-val]', sec).innerHTML = money(val);
      }
      var ded = ct.enabled && $('[data-ish-apply]', sec).checked ? val : 0;
      if (ded >= price) ded = 0; // trade-in covers the whole price: show plans on the full price instead of 0
      var net = price - ded;
      if (ct.enabled) $('[data-ish-net]', sec).innerHTML = money(net);
      if (!ci.enabled) return;
      $('[data-ish-plans]', sec).innerHTML = ci.plans.map(function (p, i) { return '<button type="button" data-ish-plan="' + i + '" aria-pressed="' + (i === plan) + '"><span class="ish-tag ish-tag--' + p.provider + '">' + p.provider + '</span><span>' + p.n + ' ' + (p.n <= 10 ? 'دفعات' : 'دفعة') + '</span><small>' + money(Math.round(net / p.n * 100) / 100) + '</small></button>'; }).join('');
      var n = ci.plans[plan].n, amt = money(Math.round(net / n * 100) / 100);
      var cells = n <= 4 ? Array.apply(null, Array(n)).map(function (_, i) { return [i === 0 ? 'اليوم' : 'بعد ' + months(i), amt]; }) : [['اليوم', amt], ['كل شهر × ' + (n - 2), amt], ['آخر دفعة بعد ' + months(n - 1), amt]];
      $('[data-ish-sched]', sec).innerHTML = cells.map(function (x) { return '<div><b>' + x[1] + '</b>' + x[0] + '</div>'; }).join('');
      $('[data-ish-note]', sec).innerHTML = (n <= 4 ? 'بدون فوائد أو رسوم إضافية. ' : 'الخطط الأطول من 4 دفعات قد تشمل رسوماً حسب شروط مزوّد التقسيط. ') + 'محسوبة على ' + money(net) + '.';
    }
    draw();
    sec.addEventListener('click', function (e) {
      var p = e.target.closest('[data-ish-plan]'); if (p) { plan = +p.getAttribute('data-ish-plan'); draw(); return; }
      var c2 = e.target.closest('[data-ish-cond]'); if (c2) { cond = +c2.getAttribute('data-ish-cond'); $$('[data-ish-cond]', sec).forEach(function (b) { b.setAttribute('aria-pressed', b === c2); }); draw(); }
    });
    sec.addEventListener('change', draw);
    try { salla.product.event.onPriceUpdated(function (r) { var v = r && r.data && (r.data.price || (r.data.total && r.data.total.amount)); if (v) { price = num(v); draw(); } }); } catch (e) {}
  }
  function faq(after) {
    var c = CONFIG.product.faq;
    var sec = section('', head(c.items.length + ' أسئلة', c.title) + '<div class="ish-faq-search"><span aria-hidden="true">⌕</span><input data-ish-faq placeholder="ابحث في الأسئلة…" aria-label="ابحث في الأسئلة"></div><div class="ish-faq" data-ish-faqlist></div><p class="ish-muted" data-ish-faqnone hidden>ما لقينا سؤال مطابق.</p>');
    sec.firstChild.style.maxWidth = '900px';
    after.parentNode.insertBefore(sec, after.nextSibling);
    var draw = function () {
      var q = $('[data-ish-faq]', sec).value.trim();
      var hi = function (t) { return q ? esc(t).split(esc(q)).join('<mark>' + esc(q) + '</mark>') : esc(t); };
      var list = c.items.filter(function (x) { return !q || x[0].indexOf(q) > -1 || x[1].indexOf(q) > -1; });
      $('[data-ish-faqlist]', sec).innerHTML = list.map(function (x, i) { return '<details' + (i === 0 || q ? ' open' : '') + '><summary><span>' + hi(x[0]) + '</span></summary><p>' + hi(x[1]) + '</p></details>'; }).join('');
      $('[data-ish-faqnone]', sec).hidden = list.length > 0;
    };
    draw(); sec.addEventListener('input', draw);
  }

  /* ===================== 5) PRODUCT CARDS: quick view + compare ===================== */
  var cmpIds = [], tray;
  function enhanceCards(root) {
    $$('custom-salla-product-card:not([data-ish])', root).forEach(function (cardEl) {
      var pidEl = cardEl.querySelector('[product-id]');
      var id = cardEl.id || (pidEl ? pidEl.getAttribute('product-id') : '');
      if (!id || !/^\d+$/.test(id)) return;
      cardEl.setAttribute('data-ish', '1');
      var imgBox = $('.s-product-card-image', cardEl);
      if (CONFIG.listing.quickView && imgBox) {
        if (getComputedStyle(imgBox).position === 'static') imgBox.style.position = 'relative';
        imgBox.insertAdjacentHTML('beforeend', '<button type="button" class="ish-qv" data-ish-qv="' + id + '">نظرة سريعة</button>');
      }
      if (CONFIG.listing.compare) {
        var content = $('.s-product-card-content', cardEl) || cardEl;
        content.insertAdjacentHTML('beforeend', '<label class="ish-cmpchk"><input type="checkbox" data-ish-cmp="' + id + '"' + (cmpIds.indexOf(id) > -1 ? ' checked' : '') + '> أضف للمقارنة</label>');
      }
    });
  }
  function quickView(id) {
    openModal('<div style="padding:60px;text-align:center" class="ish-muted">جاري التحميل…</div>');
    details(id).then(function (p) {
      if (!p) { closeModal(); return; }
      var d = discount(p), desc = String(p.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 260);
      var inst = CONFIG.product.installments.plans[0];
      $('.ish-modal__body', modal).innerHTML = '<div class="ish-qvgrid"><img src="' + esc(imgOf(p)) + '" alt="' + esc(p.name) + '"><div style="display:flex;flex-direction:column;gap:12px">' +
        '<h3 class="ish-h-sm" style="font-size:22px">' + esc(p.name) + '</h3>' +
        '<div class="ish-price"><b style="font-size:28px">' + money(p.price) + '</b>' + (d ? '<s>' + money(p.regular_price) + '</s><span class="ish-badge" style="position:static">خصم ' + d + '%</span>' : '') + '</div>' +
        (inst ? '<div class="ish-muted" style="font-size:13px"><span class="ish-tag ish-tag--' + inst.provider + '">' + inst.provider + '</span> ' + inst.n + ' دفعات × ' + money(Math.round(num(p.price) / inst.n * 100) / 100) + '</div>' : '') +
        (desc ? '<p class="ish-desc">' + esc(desc) + '</p>' : '') +
        '<div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" class="ish-btn" data-ish-add="' + p.id + '">أضف للسلة</button><a class="ish-btn ish-btn--outline" href="' + esc(p.url) + '">التفاصيل الكاملة</a></div></div></div>';
    });
  }
  function drawTray() {
    if (!tray) {
      tray = document.createElement('div'); tray.className = 'ish-tray';
      document.body.appendChild(tray);
      tray.addEventListener('click', function (e) {
        var x = e.target.closest('[data-ish-uncmp]'); if (x) { toggleCmp(x.getAttribute('data-ish-uncmp'), false); return; }
        if (e.target.closest('[data-ish-cmpclear]')) { cmpIds.slice().forEach(function (i) { toggleCmp(i, false); }); return; }
        if (e.target.closest('[data-ish-cmpgo]') && cmpIds.length > 1) {
          openModal('<div style="padding:60px;text-align:center" class="ish-muted">جاري التحميل…</div>');
          Promise.all(cmpIds.map(details)).then(function (ps) { $('.ish-modal__body', modal).innerHTML = '<h3 class="ish-h-sm" style="margin-bottom:14px">مقارنة المنتجات</h3>' + cmpTable(ps.filter(Boolean)); });
        }
      });
    }
    tray.classList.toggle('on', cmpIds.length > 0);
    var max = CONFIG.listing.maxCompare;
    tray.innerHTML = '<div class="ish-tray__txt" style="display:flex;flex-direction:column"><b>قارن المنتجات</b><span style="font-size:12px;opacity:.7">' + (cmpIds.length < 2 ? 'اختر منتجين على الأقل' : cmpIds.length + ' من ' + max + ' جاهزة') + '</span></div>' +
      '<div style="display:flex;gap:8px">' + Array.apply(null, Array(max)).map(function (_, i) {
        var id = cmpIds[i]; if (!id) return '<span class="ish-slot"></span>';
        var im = (STORE[id] && imgOf(STORE[id])) || ((document.getElementById(id) || {}).querySelector && (document.getElementById(id).querySelector('img') || {}).src) || '';
        return '<span class="ish-slot"><img src="' + esc(im) + '" alt=""><button type="button" data-ish-uncmp="' + id + '" aria-label="إزالة">×</button></span>';
      }).join('') + '</div>' +
      '<button type="button" class="ish-btn ish-btn--light" data-ish-cmpgo' + (cmpIds.length < 2 ? ' disabled' : '') + '>قارن الآن</button><button type="button" data-ish-cmpclear style="background:none;border:0;color:#fff;opacity:.75;font:inherit;cursor:pointer">مسح</button>';
  }
  function toggleCmp(id, on) {
    var i = cmpIds.indexOf(id);
    if (on && i < 0) { if (cmpIds.length >= CONFIG.listing.maxCompare) { try { salla.notify.info('الحد الأقصى ' + CONFIG.listing.maxCompare + ' منتجات للمقارنة'); } catch (e) {} $$('[data-ish-cmp="' + id + '"]').forEach(function (c) { c.checked = false; }); return; } cmpIds.push(id); }
    if (!on && i > -1) cmpIds.splice(i, 1);
    $$('[data-ish-cmp="' + id + '"]').forEach(function (c) { c.checked = cmpIds.indexOf(id) > -1; });
    drawTray();
  }
  document.addEventListener('click', function (e) {
    var q = e.target.closest('[data-ish-qv]'); if (q) { e.preventDefault(); e.stopPropagation(); quickView(q.getAttribute('data-ish-qv')); }
  }, true);
  document.addEventListener('change', function (e) {
    var c = e.target.closest('[data-ish-cmp]'); if (c) toggleCmp(c.getAttribute('data-ish-cmp'), c.checked);
  });

  /* ===================== 6) MOBILE BOTTOM BAR ===================== */
  function mobileBar() {
    if (!CONFIG.mobileBar.enabled) return;
    var slug = page().slug || '';
    if (/product\.single|cart|checkout/.test(slug)) return;   // the theme has its own sticky bar there
    var u = function (p) { try { return salla.url.get(p); } catch (e) { return '/' + p; } };
    var ico = {
      home: '<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
      tag: '<path d="M20 12 12 20 4 12V4h8z"/><circle cx="8.5" cy="8.5" r="1.5"/>',
      heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
      cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21.5 7H6"/>',
      user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'
    };
    var items = [['home', 'الرئيسية', u(''), slug === 'index'], ['tag', 'العروض', u('offers'), /offers/.test(location.pathname)], ['heart', 'المفضلة', u('wishlist'), false], ['cart', 'السلة', u('cart'), false], ['user', 'حسابي', u('profile'), false]];
    var bar = document.createElement('nav'); bar.className = 'ish-mbar'; bar.setAttribute('aria-label', 'التنقل السريع');
    bar.innerHTML = items.map(function (x) { return '<a href="' + esc(x[2]) + '" class="' + (x[3] ? 'on' : '') + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ico[x[0]] + '</svg>' + (x[0] === 'cart' ? '<span class="ish-cnt" data-ish-cnt hidden></span>' : '') + '<span>' + x[1] + '</span></a>'; }).join('');
    document.body.appendChild(bar); document.body.classList.add('ish-has-mbar');
    var cnt = $('[data-ish-cnt]', bar);
    var setCount = function (n) { n = String(parseInt(n, 10) || 0); if (cnt.textContent !== n) cnt.textContent = n; cnt.hidden = n === '0'; };
    var mirror = function () { var el = $('.s-cart-summary-count'); if (el) setCount(el.textContent.replace(/[^\d٠-٩]/g, '').replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); })); };
    mirror(); new MutationObserver(mirror).observe(document.body, { subtree: true, childList: true, characterData: true });
    try { salla.cart.event.onUpdated(function (r) { var c = r && (r.cart || r.data || r); if (c && c.count != null) setCount(c.count); }); } catch (e) {}
  }



  /* ===================== 6b) SHOPPING HELPERS ===================== */
  function local(k, v) {
    try { if (v === undefined) { var x = localStorage.getItem(k); return x ? JSON.parse(x) : null; } localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; }
  }
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>';
  function wished() { return (local('ish_wished') || []).map(String); }
  function wishBtn(id) {
    if (!CONFIG.shopping || !CONFIG.shopping.wishlistHearts) return '';
    var on = wished().indexOf(String(id)) > -1;
    return '<button type="button" class="ish-heart" data-ish-wish="' + id + '" aria-pressed="' + on + '" aria-label="' + (on ? 'إزالة من المفضلة' : 'أضف للمفضلة') + '">' + HEART + '</button>';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ish-wish]'); if (!b) return;
    e.preventDefault();
    var id = b.getAttribute('data-ish-wish'), list = wished(), on = list.indexOf(id) > -1;
    var call; try { call = on ? salla.wishlist.remove(+id) : salla.wishlist.add(+id); } catch (err) { call = null; }
    if (!call || typeof call.then !== 'function') return;
    b.disabled = true;
    call.then(function () {
      list = wished(); if (on) list.splice(list.indexOf(id), 1); else list.push(id); local('ish_wished', list);
      $$('[data-ish-wish="' + id + '"]').forEach(function (x) { x.setAttribute('aria-pressed', !on); x.setAttribute('aria-label', on ? 'أضف للمفضلة' : 'إزالة من المفضلة'); });
    }).catch(warn).then(function () { b.disabled = false; });
  });

  function cartAmount(r) {
    var c = r && (r.cart || (r.data && (r.data.cart || r.data)) || r);
    var v = c && (c.sub_total != null ? c.sub_total : c.total);
    return num(v && v.amount != null ? v.amount : v);
  }
  function meterHTML(amount) {
    var c = CONFIG.shopping.freeShipping; if (!c || !c.enabled || !c.threshold || amount <= 0) return '';
    var left = c.threshold - amount, pct = Math.max(0, Math.min(100, amount / c.threshold * 100));
    return '<div class="ish-meter' + (left <= 0 ? ' is-done' : '') + '" role="status"><span>' + (left > 0 ? esc(c.text).replace('{left}', '<b>' + money(Math.ceil(left)) + '</b>') : esc(c.done)) + '</span>' +
      '<i aria-hidden="true"><b style="width:' + pct + '%"></b></i></div>';
  }
  function freeShipping() {
    var c = CONFIG.shopping.freeShipping; if (!c || !c.enabled || !c.threshold) return;
    var main = $('.app-inner > main') || $('main'); if (!main) return;
    var sec = section('ish-freeship', ''); main.insertBefore(sec, main.firstChild);
    var draw = function (amount) {
      if (amount <= 0) { sec.hidden = true; return; }
      sec.hidden = false; sec.firstChild.innerHTML = meterHTML(amount);
    };
    try { salla.cart.details().then(function (r) { draw(cartAmount(r)); }).catch(warn); } catch (e) { warn(e); }
    try { salla.cart.event.onUpdated(function (r) { draw(cartAmount(r)); }); } catch (e) {}
  }


  /* ---------- cart drawer ---------- */
  function cartDrawer() {
    var c = CONFIG.shopping.cartDrawer; if (!c || !c.enabled || !window.salla || !salla.cart) return;
    var slug = page().slug || '';
    if (/^(cart|checkout)/.test(slug)) return;   // the cart page itself stays as it is
    var u = function (k) { try { return salla.url.get(k); } catch (e) { return '/' + k; } };
    var cartUrl = u('cart'), abs = function (h) { try { return new URL(h, location.href).href.split('#')[0]; } catch (e) { return h; } };
    var ICON = {
      cart: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21.5 7H6"/></svg>',
      bin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>'
    };
    var root = document.createElement('div'); root.className = 'ish ish-drawer'; root.hidden = true;
    root.innerHTML = '<div class="ish-drawer__bg" data-ish-close></div>' +
      '<aside class="ish-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="ish-drawer-t">' +
      '<div class="ish-drawer__head"><h2 id="ish-drawer-t">' + esc(c.title) + ' <span data-ish-dcount></span></h2><button type="button" class="ish-drawer__x" data-ish-close aria-label="إغلاق">×</button></div>' +
      '<div class="ish-drawer__body" data-ish-dbody></div><div class="ish-drawer__foot" data-ish-dfoot></div></aside>';
    document.body.appendChild(root);
    var body = $('[data-ish-dbody]', root), foot = $('[data-ish-dfoot]', root), lastFocus = null, busy = false;

    function val(v) { return num(v && v.amount != null ? v.amount : v); }
    function items(r) {
      var cart = r && (r.cart || (r.data && (r.data.cart || r.data)) || r) || {};
      var list = (cart.items || []).map(function (it) {
        var pr = it.product || {};
        return {
          id: it.id, pid: it.product_id || pr.id, qty: num(it.quantity) || 1,
          name: it.product_name || it.name || pr.name || '',
          img: it.product_image || it.image || it.thumbnail || imgOf(pr),
          url: it.url || it.product_url || pr.url || '',
          price: val(it.price != null ? it.price : (it.product_price != null ? it.product_price : pr.price)),
          total: val(it.total != null ? it.total : null)
        };
      });
      var count = num(cart.count) || list.reduce(function (a, x) { return a + x.qty; }, 0);
      return { list: list, sub: cartAmount(r), count: count };
    }
    function render(d) {
      $('[data-ish-dcount]', root).textContent = d.count ? '(' + d.count + ')' : '';
      if (!d.count) {
        body.innerHTML = '<div class="ish-drawer__empty">' + ICON.cart + '<b>سلتك فاضية</b><span>تصفّح الأقسام وأضف اللي يعجبك.</span><button type="button" class="ish-btn" data-ish-close>ابدأ التسوق</button></div>';
        foot.innerHTML = ''; foot.hidden = true; return;
      }
      foot.hidden = false;
      body.innerHTML = meterHTML(d.sub) + (d.list.length ? '<ul class="ish-drawer__list">' + d.list.map(function (x) {
        return '<li class="ish-dline"><a class="ish-dline__img" href="' + esc(x.url || cartUrl) + '" tabindex="-1" aria-hidden="true">' + (x.img ? '<img src="' + esc(x.img) + '" alt="">' : '') + '</a>' +
          '<div class="ish-dline__mid"><a class="ish-dline__name" href="' + esc(x.url || cartUrl) + '">' + esc(x.name) + '</a>' +
          '<b>' + money(x.total || x.price * x.qty) + '</b>' +
          '<div class="ish-dline__row"><div class="ish-qty" role="group" aria-label="الكمية"><button type="button" data-ish-q="' + x.id + '" data-v="' + (x.qty + 1) + '" aria-label="زيادة">+</button><span aria-live="polite">' + x.qty + '</span><button type="button" data-ish-q="' + x.id + '" data-v="' + (x.qty - 1) + '" aria-label="' + (x.qty > 1 ? 'إنقاص' : 'حذف') + '">−</button></div>' +
          '<button type="button" class="ish-dline__del" data-ish-del="' + x.id + '" aria-label="حذف ' + esc(x.name) + '">' + ICON.bin + '</button></div></div></li>';
      }).join('') + '</ul>' : '<p class="ish-drawer__note">في سلتك ' + nProducts(d.count) + '. افتح السلة لعرض التفاصيل.</p>');
      foot.innerHTML = '<div class="ish-drawer__sum"><span>المجموع</span><b>' + money(d.sub) + '</b></div>' +
        '<small>الشحن والضريبة تظهر في صفحة الدفع.</small>' +
        '<a class="ish-btn" href="' + esc(c.checkoutUrl || cartUrl) + '">إتمام الطلب</a>' +
        '<a class="ish-drawer__link" href="' + esc(cartUrl) + '">عرض السلة كاملة</a>';
    }
    function refresh() {
      try { return salla.cart.details().then(function (r) { render(items(r)); }).catch(function (e) { warn(e); location.href = cartUrl; }); }
      catch (e) { warn(e); location.href = cartUrl; return Promise.resolve(); }
    }
    function open() {
      if (!root.hidden) { refresh(); return; }
      lastFocus = document.activeElement;
      body.innerHTML = '<div class="ish-drawer__load" aria-label="جاري التحميل"></div>';
      root.hidden = false; document.documentElement.classList.add('ish-noscroll');
      void root.offsetWidth; root.classList.add('on');   // start the slide-in (no rAF: it stalls in background tabs)
      $('.ish-drawer__x', root).focus();
      refresh();
    }
    function close() {
      if (root.hidden) return;
      root.classList.remove('on'); document.documentElement.classList.remove('ish-noscroll');
      setTimeout(function () { root.hidden = true; }, 250);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function act(p) {
      if (busy || !p || typeof p.then !== 'function') return;
      busy = true; root.classList.add('is-busy');
      p.catch(warn).then(refresh).then(function () { busy = false; root.classList.remove('is-busy'); });
    }
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-ish-close]')) { close(); return; }
      var q = e.target.closest('[data-ish-q]');
      if (q) { var n = +q.getAttribute('data-v'), id = q.getAttribute('data-ish-q'); act(n > 0 ? salla.cart.updateItem({ id: id, quantity: n }) : salla.cart.deleteItem(id)); return; }
      var d = e.target.closest('[data-ish-del]'); if (d) act(salla.cart.deleteItem(d.getAttribute('data-ish-del')));
    });
    document.addEventListener('keydown', function (e) {
      if (root.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {   // keep focus inside the drawer
        var f = $$('a[href],button:not([disabled])', root).filter(function (x) { return x.offsetParent; });
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    // the cart icon (and any link to the cart page) opens the drawer
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || root.contains(e.target)) return;
      var t = (c.trigger && e.target.closest(c.trigger)) || e.target.closest('a[href]');
      if (!t) return;
      if (t.tagName === 'A' && !(c.trigger && t.matches(c.trigger)) && abs(t.getAttribute('href')) !== abs(cartUrl)) return;
      e.preventDefault(); e.stopPropagation(); open();
    }, true);
    try { if (c.openOnAdd && salla.cart.event.onItemAdded) salla.cart.event.onItemAdded(function () { open(); }); } catch (e) {}
    try { salla.cart.event.onUpdated(function () { if (!root.hidden && !busy) refresh(); }); } catch (e) {}
  }

  function stickyBar(cur) {
    var c = CONFIG.shopping.stickyBar; if (!c || !c.enabled || !window.IntersectionObserver) return;
    var main = $('.app-inner > main') || $('main');
    var btnHost = main && $(c.button, main); if (!btnHost) return;
    var target = btnHost.matches('button') ? btnHost : (btnHost.querySelector('button') || btnHost);
    var bar = document.createElement('div'); bar.className = 'ish ish-sticky'; bar.hidden = true;
    bar.innerHTML = '<div class="ish-sticky__in"><img src="' + esc(imgOf(cur)) + '" alt=""><div class="ish-sticky__txt"><span>' + esc(cur.name) + '</span><b>' + money(cur.price) + '</b></div>' +
      '<button type="button" class="ish-btn">' + (cur.has_options ? 'اختر الخيارات' : 'أضف للسلة') + '</button></div>';
    document.body.appendChild(bar);
    $('button', bar).addEventListener('click', function () {
      if (cur.has_options) { btnHost.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      target.click();
    });
    new IntersectionObserver(function (es) {
      var gone = !es[0].isIntersecting && es[0].boundingClientRect.top < 0;
      bar.hidden = !gone; document.body.classList.toggle('ish-has-sticky', gone);
    }).observe(btnHost);
  }

  function recentlyViewed(cur, after) {
    var c = CONFIG.shopping.recentlyViewed; if (!c || !c.enabled) return;
    var id = String(cur.id), seen = (local('ish_seen') || []).map(String).filter(function (x) { return x !== id; });
    local('ish_seen', [id].concat(seen).slice(0, 12));
    seen = seen.slice(0, c.limit); if (!seen.length || !after) return;
    var sec = section('', head('', c.title) + '<div data-ish-seen></div>');
    after.parentNode.insertBefore(sec, after.nextSibling);
    Promise.all(seen.map(details)).then(function (ps) {
      ps = ps.filter(function (p) { return p && p.name; });
      if (!ps.length) { sec.remove(); return; }
      $('[data-ish-seen]', sec).innerHTML = rowSlider(ps.map(function (p) { return card(p); }).join(''));
    });
  }

  function backToTop() {
    if (!CONFIG.shopping.backToTop) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'ish-top'; b.hidden = true; b.setAttribute('aria-label', 'للأعلى');
    b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    document.body.appendChild(b);
    var t; window.addEventListener('scroll', function () { if (t) return; t = setTimeout(function () { t = 0; b.hidden = window.scrollY < 900; }, 120); }, { passive: true });
  }

  /* ===================== 5b) CATEGORY (COLLECTION) PAGE ===================== */
  function collectionPage() {
    var c = CONFIG.collection; if (!c || !c.enabled) return;
    var pg = page(), id = +pg.id || catIdFromUrl(location.href);
    var main = $('.app-inner > main') || $('main'); if (!main) return;
    var lay = window.ISHARA_COLLECTION_LAYOUT || (c.layouts && id && c.layouts[id]) || c.layout || 'banner';
    var show = lay === 'showroom';
    if (show) document.body.classList.add('ish-layout-showroom');
    var sec = section(show ? 'ish-show' : 'ish-coll', ''); main.insertBefore(sec, main.firstChild);
    Promise.all([getCats(), id ? fetchProducts({ source: 'categories', source_value: [id], limit: 50 }) : Promise.resolve([])]).then(function (r) {
      var cats = r[0], list = r[1];
      var cur = cats.filter(function (x) { return catId(x) === id; })[0];
      var name = cur ? cur.name : String(pg.title || document.title.split('|')[0] || '').trim();
      if (!name) { sec.remove(); return; }
      var prices = list.map(function (p) { return num(p.price); }).filter(Boolean);
      var offers = list.filter(function (p) { return discount(p) > 0; }).length;
      var stats = [];
      if (list.length) stats.push([list.length >= 50 ? '+50' : String(list.length), 'عدد المنتجات']);
      if (prices.length) stats.push([money(Math.min.apply(null, prices)), 'يبدأ من']);
      if (offers) stats.push([String(offers), offers === 1 ? 'منتج عليه خصم' : 'منتجات عليها خصم']);
      var data = { id: id, name: name, cats: cats, list: list, stats: stats };
      if (show) showroom(sec, main, data); else collectionBanner(sec, data);
    });
  }

  function catChips(cls, cats, id) {
    return '<nav class="' + cls + '" aria-label="الأقسام">' + cats.slice(0, 10).map(function (x) {
      return '<a href="' + esc(x.url) + '"' + (catId(x) === id ? ' aria-current="page"' : '') + '>' + esc(x.name) + '</a>';
    }).join('') + '</nav>';
  }

  /* layout 1: dark banner */
  function collectionBanner(sec, d) {
    var c = CONFIG.collection;
    var pics = c.photos ? d.list.map(imgOf).filter(Boolean).slice(0, 3) : [];
    var ph = window.ISHARA_COLLECTION_PHOTO || CONFIG.photos.collections[d.id] || CONFIG.photos.collection;
    sec.firstChild.innerHTML = '<div class="ish-coll__band ish-photo" style="' + photoStyle(ph) + '"><div class="ish-coll__txt">' +
      (c.eyebrow ? '<span class="ish-pill">' + esc(c.eyebrow) + '</span>' : '') +
      '<h1>' + esc(d.name) + '</h1>' + (c.text ? '<p>' + esc(c.text) + '</p>' : '') +
      (d.stats.length ? '<dl class="ish-coll__stats">' + d.stats.map(function (x) { return '<div><dt>' + esc(x[1]) + '</dt><dd>' + x[0] + '</dd></div>'; }).join('') + '</dl>' : '') +
      '</div>' + (pics.length ? '<div class="ish-coll__pics ish-n' + pics.length + '">' + pics.map(function (u) { return '<span><img src="' + esc(u) + '" alt="" loading="lazy"></span>'; }).join('') + '</div>' : '') +
      '</div>' + (c.chips && d.cats.length > 1 ? catChips('ish-coll__chips', d.cats, d.id) : '');
  }

  /* layout 2: showroom */
  function spot(p, label, big) {
    var dc = discount(p);
    return '<article class="ish-spot' + (big ? ' ish-spot--big' : '') + '">' +
      '<a class="ish-spot__img" href="' + esc(p.url) + '" tabindex="-1" aria-hidden="true"><img src="' + esc(imgOf(p)) + '" alt="" loading="lazy"></a>' +
      wishBtn(p.id) +
      '<div class="ish-spot__txt"><span class="ish-spot__label">' + esc(label) + (dc ? ' · خصم ' + dc + '%' : '') + '</span>' +
      '<a class="ish-spot__name" href="' + esc(p.url) + '">' + esc(p.name) + '</a>' +
      '<div class="ish-price"><b>' + money(p.price) + '</b>' + (dc ? '<s>' + money(p.regular_price) + '</s>' : '') + '</div>' +
      '<button type="button" class="ish-btn' + (big ? '' : ' ish-btn--ghost') + '" data-ish-add="' + p.id + '">' + (p.has_options ? 'اختر الخيارات' : 'أضف للسلة') + '</button></div></article>';
  }
  function showroom(sec, main, d) {
    var c = CONFIG.collection, o = c.showroom || {};
    var html = '<header class="ish-show__head"><div class="ish-show__title">' +
      (c.eyebrow ? '<span class="ish-eyebrow">' + esc(c.eyebrow) + '</span>' : '') +
      '<h1>' + esc(d.name) + '</h1>' + (c.text ? '<p>' + esc(c.text) + '</p>' : '') + '</div>' +
      (d.stats.length ? '<dl class="ish-show__facts">' + d.stats.map(function (x) { return '<div><dd>' + x[0] + '</dd><dt>' + esc(x[1]) + '</dt></div>'; }).join('') + '</dl>' : '') +
      '</header>' + (c.chips && d.cats.length > 1 ? catChips('ish-show__tabs', d.cats, d.id) : '');

    // picks: biggest discount, then lowest price, then the newest that's left
    var pool = d.list.filter(function (p) { return p && p.name && imgOf(p); });
    if (o.spotlight && pool.length >= 3) {
      var used = {}, take = function (arr) { var p = arr.filter(function (x) { return !used[x.id]; })[0]; if (p) used[p.id] = 1; return p; };
      var byOff = pool.slice().sort(function (a, b) { return discount(b) - discount(a); });
      var byLow = pool.slice().sort(function (a, b) { return num(a.price) - num(b.price); });
      var a = take(byOff), b = take(byLow), n = take(pool);
      html += '<div class="ish-show__picks">' + head('', o.spotlightTitle || '') + '<div class="ish-show__bento">' +
        spot(a, discount(a) ? 'أعلى خصم' : 'الأكثر طلباً', true) + spot(b, 'الأقل سعراً') + spot(n, 'وصل حديثاً') + '</div></div>';
    }
    sec.firstChild.innerHTML = html;

    // grid / list switch above the theme's own product list (filters, sorting and paging stay the theme's)
    var listEl = o.list && $(o.list, main);
    if (o.viewSwitch && listEl) {
      var KEY = 'ish_view', v = local(KEY) === 'list' ? 'list' : 'grid';
      var bar = document.createElement('div'); bar.className = 'ish ish-viewbar';
      bar.innerHTML = '<span>طريقة العرض</span><div role="group" aria-label="طريقة العرض">' +
        '<button type="button" data-ish-view="grid" aria-label="شبكة"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>شبكة</button>' +
        '<button type="button" data-ish-view="list" aria-label="قائمة"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><path d="M13 6h7M13 9h4M13 16h7M13 19h4"/></svg>قائمة</button></div>';
      listEl.parentNode.insertBefore(bar, listEl);
      var set = function (x) {
        v = x; local(KEY, x); document.body.classList.toggle('ish-view-list', x === 'list');
        $$('[data-ish-view]', bar).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ish-view') === x); });
      };
      bar.addEventListener('click', function (e) { var b = e.target.closest('[data-ish-view]'); if (b) set(b.getAttribute('data-ish-view')); });
      set(v);
    }

    // tiles to the other categories, at the end of the page
    var others = d.cats.filter(function (x) { return catId(x) !== d.id; }).slice(0, 8);
    if (o.moreCats && others.length) {
      var more = section('ish-show__more', head('', o.moreTitle || '') + '<div class="ish-show__tiles">' + others.map(function (x) {
        return '<a class="ish-ctile" href="' + esc(x.url) + '"><img src="' + esc(catPic(x, 700)) + '" alt="" loading="lazy"><span>' + esc(x.name) + '</span></a>';
      }).join('') + '</div>');
      main.appendChild(more);
      if (others.length % 3 === 0 || others.length < 4) more.querySelector('.ish-show__tiles').classList.add('ish-cols3');
      // a category with no image and a name that matches no photo gets a photo of one of its products
      others.forEach(function (x, k) {
        var cid = catId(x); if (x.image || catMatch(x.name) || !cid) return;
        fetchProducts({ source: 'categories', source_value: [cid], limit: 1 }).then(function (ps) {
          var u = ps[0] && imgOf(ps[0]), t = $$('.ish-ctile', more)[k]; if (!u || !t) return;
          var im = new Image(); im.src = u; im.alt = ''; im.loading = 'lazy'; var old = t.querySelector('img'); if (old) old.remove(); t.insertBefore(im, t.firstChild);
        });
      });
    }
  }

  /* ===================== 7) START ===================== */
  function start() {
    var slug = page().slug || '';
    var isHome = slug === 'index' || document.body.classList.contains('index');
    if (isHome) {
      var mainEl = $('.app-inner > main') || $('main');
      var themeHero = mainEl && $(CONFIG.home.insertAfter, mainEl);
      var holder = homeAnchor();
      if (holder) {
        if (!themeHero) hero(holder);                       // banner first
        flashSale(holder); setup(holder); quiz(holder); compare(holder);   // advanced
        var bh = document.createElement('div'); bh.className = 'ish-home ish-basics';
        holder.parentNode.insertBefore(bh, holder.nextSibling); basics(bh);  // basics
        var latest = CONFIG.home.latestFirst && $(CONFIG.home.latestFirst, mainEl);
        if (latest && !latest.closest('.ish')) holder.parentNode.insertBefore(latest, holder);   // new products right after the hero
      }
    }
    if (slug === 'product.single' || document.body.classList.contains('product-single')) productPage();
    if (slug === 'product.index' || document.body.classList.contains('product-index')) collectionPage();
    if (CONFIG.listing.quickView || CONFIG.listing.compare) {
      enhanceCards(document);
      new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) enhanceCards(n.matches && n.matches('custom-salla-product-card') ? n.parentNode : n); }); }); })
        .observe(document.body, { childList: true, subtree: true });
    }
    if (slug === 'cart' || document.body.classList.contains('cart')) freeShipping();
    backToTop();
    mobileBar();
    cartDrawer();
  }
  if (window.salla && typeof salla.onReady === 'function') salla.onReady(start);
  else document.addEventListener('DOMContentLoaded', function () { (window.salla && salla.onReady) ? salla.onReady(start) : start(); });
})();

})();

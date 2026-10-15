(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var PHP = function (n) { return '₱' + n.toLocaleString('en-PH'); };
  var FREE_AT = 3000, SHIPPING = 150, MAX_QTY = 9, KEY = 'hs-cart-v1';

  var CATS = [['all', 'All gear'], ['jersey', 'Jerseys'], ['ball', 'Balls'], ['hoop', 'Hoops & rims'], ['shoe', 'Shoes'], ['acc', 'Accessories']];
  var JS = ['S', 'M', 'L', 'XL', 'XXL'];
  var SHOE = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

  var P = [
    { id: 'j1', cat: 'jersey', name: 'Harbor Tigers Swingman Jersey', price: 2190, spec: 'Mesh knit, heat-pressed number', c: ['#1B3A8A', '#F0B429'], n: '23', sizes: JS, tag: 'Bestseller' },
    { id: 'j2', cat: 'jersey', name: 'Metro Hawks Away Jersey', price: 1990, spec: 'Moisture-wicking, loose cut', c: ['#F4F4F2', '#C8102E'], n: '7', sizes: JS },
    { id: 'j3', cat: 'jersey', name: 'Sunset Court Reversible Jersey', price: 1590, spec: 'Two colors in one, for scrimmages', c: ['#F0561D', '#1D1D1F'], n: '11', sizes: JS },
    { id: 'j4', cat: 'jersey', name: 'Night Shift Practice Jersey', price: 1190, spec: 'Lightweight, quick dry', c: ['#111827', '#7DD3FC'], n: '0', sizes: JS, tag: 'New' },
    { id: 'j5', cat: 'jersey', name: 'Rookie Youth Jersey', price: 1090, spec: 'Youth sizing, ages 6 to 12', c: ['#0E7C66', '#FFFFFF'], n: '3', sizes: ['YS', 'YM', 'YL'] },

    { id: 'b1', cat: 'ball', name: 'Indoor Composite Leather Ball', price: 3290, spec: 'Size 7 · 29.5 in · indoor courts', c: ['#C8662B', '#2A1608'], tag: 'Bestseller' },
    { id: 'b2', cat: 'ball', name: 'Blacktop Rubber Ball', price: 1290, spec: 'Size 7 · 29.5 in · outdoor concrete', c: ['#E8590C', '#1A1A1A'] },
    { id: 'b3', cat: 'ball', name: 'Women’s Game Ball', price: 2490, spec: 'Size 6 · 28.5 in · indoor and outdoor', c: ['#B85A2A', '#2A1608'] },
    { id: 'b4', cat: 'ball', name: 'Youth Mini Ball', price: 890, spec: 'Size 5 · 27.5 in · ages 9 to 11', c: ['#2563EB', '#0B1B4D'], tag: 'New' },

    { id: 'h1', cat: 'hoop', name: 'Portable Hoop, 54 in Backboard', price: 18900, spec: 'Adjusts from 7.5 to 10 ft, water-fill base', v: 'portable' },
    { id: 'h2', cat: 'hoop', name: 'Wall-Mount Breakaway Rim', price: 3490, spec: '18 in inner diameter, spring-loaded', v: 'rim' },
    { id: 'h3', cat: 'hoop', name: 'Over-the-Door Mini Hoop', price: 899, spec: 'Fits doors up to 1.75 in thick', v: 'mini' },
    { id: 'h4', cat: 'hoop', name: 'Nylon Net, 12 Loops', price: 349, spec: 'Fits standard 18 in rims', v: 'net' },

    { id: 's1', cat: 'shoe', name: 'Baseline High-Top', price: 4990, spec: 'Ankle support, cushioned midsole', c: ['#1B3A8A', '#F4F4F2'], high: true, sizes: SHOE, tag: 'Bestseller' },
    { id: 's2', cat: 'shoe', name: 'Quickcut Low', price: 4290, spec: 'Light and fast, herringbone grip', c: ['#111827', '#F0561D'], sizes: SHOE },
    { id: 's3', cat: 'shoe', name: 'Blacktop Outdoor Grip', price: 3690, spec: 'Hard-wearing rubber outsole for concrete', c: ['#7A8794', '#1D1D1F'], high: true, sizes: SHOE },
    { id: 's4', cat: 'shoe', name: 'Rookie Mid, Kids', price: 2490, spec: 'Hook-and-loop strap, youth sizes', c: ['#F0B429', '#111827'], sizes: ['1Y', '2Y', '3Y', '4Y', '5Y', '6Y'] },

    { id: 'a1', cat: 'acc', name: 'Sweat Headband, 2-Pack', price: 349, spec: 'Stretch terry, one size', c: ['#F0561D', '#FFFFFF'], k: 'band' },
    { id: 'a2', cat: 'acc', name: 'Duffel Bag, 40 L', price: 1890, spec: 'Separate ball compartment', c: ['#1B3A8A', '#F0B429'], k: 'bag' },
    { id: 'a3', cat: 'acc', name: 'Cushioned Crew Socks, 3-Pack', price: 590, spec: 'Arch support, padded sole', c: ['#F4F4F2', '#1B3A8A'], k: 'socks', sizes: ['M', 'L'] },
    { id: 'a4', cat: 'acc', name: 'Ball Pump with 2 Needles', price: 450, spec: 'Dual-action, built-in needle storage', c: ['#3C4457', '#F0561D'], k: 'pump' },
    { id: 'a5', cat: 'acc', name: 'Compression Arm Sleeve', price: 490, spec: 'Single sleeve, sold individually', c: ['#111827', '#7DD3FC'], k: 'sleeve', sizes: ['S/M', 'L/XL'] }
  ];
  var BY = {}; P.forEach(function (p) { BY[p.id] = p; });

  /* ---------- product art ---------- */
  var EDGE = 'rgba(15,23,48,.35)';
  function svg(inner) { return '<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">' + inner + '</svg>'; }
  function jersey(p) {
    var a = p.c[0], b = p.c[1];
    return svg(
      '<path d="M64 16L86 16Q100 50 114 16L136 16Q138 62 154 84L154 184L46 184L46 84Q62 62 64 16Z" fill="' + a + '" stroke="' + EDGE + '" stroke-width="2"/>' +
      '<path d="M64 16L86 16Q100 50 114 16" fill="none" stroke="' + b + '" stroke-width="5"/>' +
      '<path d="M64 16Q62 62 46 84M136 16Q138 62 154 84" fill="none" stroke="' + b + '" stroke-width="5"/>' +
      '<rect x="46" y="104" width="6" height="80" fill="' + b + '"/><rect x="148" y="104" width="6" height="80" fill="' + b + '"/>' +
      '<rect x="46" y="176" width="108" height="8" fill="' + b + '"/>' +
      '<text x="100" y="142" text-anchor="middle" style="font-family:var(--display);font-weight:900" font-size="68" fill="' + b + '">' + p.n + '</text>'
    );
  }
  function ball(p) {
    var a = p.c[0], b = p.c[1];
    return svg(
      '<circle cx="100" cy="100" r="74" fill="' + a + '" stroke="' + b + '" stroke-width="4"/>' +
      '<g fill="none" stroke="' + b + '" stroke-width="4" stroke-linecap="round"><path d="M100 26V174"/><path d="M26 100H174"/><path d="M50 48Q92 100 50 152"/><path d="M150 48Q108 100 150 152"/></g>' +
      '<ellipse cx="76" cy="66" rx="22" ry="9" fill="#fff" opacity=".14" transform="rotate(-30 76 66)"/>'
    );
  }
  function net(x1, x2, y1, y2, rows) {
    var s = '', i, n = 6;
    for (i = 0; i <= n; i++) {
      var t = i / n, xa = x1 + (x2 - x1) * t, xb = 100 - (100 - xa) * 0.55;
      s += 'M' + xa.toFixed(1) + ' ' + y1 + 'L' + xb.toFixed(1) + ' ' + y2;
    }
    for (i = 1; i <= rows; i++) {
      var y = y1 + (y2 - y1) * i / (rows + 1), k = 1 - 0.45 * i / (rows + 1);
      s += 'M' + (100 - (100 - x1) * k).toFixed(1) + ' ' + y.toFixed(1) + 'Q100 ' + (y + 6).toFixed(1) + ' ' + (100 + (x2 - 100) * k).toFixed(1) + ' ' + y.toFixed(1);
    }
    return '<path d="' + s + '" fill="none" stroke="#8C96AB" stroke-width="2"/>';
  }
  function hoop(p) {
    var O = '#E8590C', V = p.v, s = '';
    if (V === 'portable') {
      s += '<rect x="94" y="80" width="12" height="104" fill="#5B6478"/><rect x="60" y="182" width="80" height="10" rx="3" fill="#3C4457"/>';
      s += '<rect x="46" y="12" width="108" height="70" rx="4" fill="#F7F8FA" stroke="#8C96AB" stroke-width="3"/><rect x="80" y="42" width="40" height="28" fill="none" stroke="' + O + '" stroke-width="3"/>';
      s += net(78, 122, 96, 140, 2) + '<ellipse cx="100" cy="92" rx="26" ry="6" fill="none" stroke="' + O + '" stroke-width="4"/>';
    } else if (V === 'rim') {
      s += '<rect x="64" y="22" width="72" height="62" rx="4" fill="#5B6478"/><rect x="92" y="78" width="16" height="14" fill="#3C4457"/>';
      s += net(72, 128, 104, 160, 3) + '<ellipse cx="100" cy="100" rx="30" ry="7" fill="none" stroke="' + O + '" stroke-width="5"/>';
    } else if (V === 'mini') {
      s += '<rect x="54" y="16" width="92" height="8" rx="3" fill="#5B6478"/><rect x="62" y="24" width="76" height="52" rx="4" fill="#F7F8FA" stroke="#8C96AB" stroke-width="3"/><rect x="84" y="46" width="32" height="22" fill="none" stroke="' + O + '" stroke-width="3"/>';
      s += net(82, 118, 92, 130, 2) + '<ellipse cx="100" cy="88" rx="20" ry="5" fill="none" stroke="' + O + '" stroke-width="4"/>';
    } else {
      s += net(66, 134, 52, 176, 5) + '<ellipse cx="100" cy="50" rx="34" ry="8" fill="none" stroke="' + O + '" stroke-width="5"/>';
    }
    return svg(s);
  }
  function shoe(p) {
    var a = p.c[0], b = p.c[1], up;
    if (p.high) {
      up = '<path d="M30 130L30 38Q30 30 38 30L74 30Q80 30 82 38L86 62Q100 54 112 58L126 64Q152 70 170 98Q180 112 180 130Z" fill="' + a + '" stroke="' + EDGE + '" stroke-width="2"/><rect x="30" y="30" width="52" height="8" fill="' + b + '"/>';
    } else {
      up = '<path d="M28 130L28 96Q28 88 36 86L64 80Q80 72 92 58Q100 52 110 56L124 62Q150 68 168 98Q180 112 180 130Z" fill="' + a + '" stroke="' + EDGE + '" stroke-width="2"/>';
    }
    return svg(up +
      '<path d="M22 128H184Q186 152 164 154H42Q22 154 22 128Z" fill="' + b + '" stroke="' + EDGE + '" stroke-width="2"/>' +
      '<path d="M98 68L112 80M108 62L124 76M118 64L134 74" stroke="' + b + '" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M44 114Q92 100 146 114" fill="none" stroke="' + b + '" stroke-width="6" stroke-linecap="round"/>'
    );
  }
  function acc(p) {
    var a = p.c[0], b = p.c[1], k = p.k;
    if (k === 'band') {
      return svg('<rect x="30" y="50" width="140" height="44" rx="22" fill="' + a + '" stroke="' + EDGE + '" stroke-width="2"/><rect x="30" y="66" width="140" height="12" fill="' + b + '"/><rect x="30" y="110" width="140" height="44" rx="22" fill="' + b + '" stroke="' + EDGE + '" stroke-width="2"/><rect x="30" y="126" width="140" height="12" fill="' + a + '"/>');
    }
    if (k === 'bag') {
      return svg('<path d="M66 74Q100 22 134 74" fill="none" stroke="' + b + '" stroke-width="8" stroke-linecap="round"/><rect x="28" y="70" width="144" height="92" rx="24" fill="' + a + '" stroke="' + EDGE + '" stroke-width="2"/><rect x="58" y="108" width="84" height="40" rx="8" fill="' + b + '"/><path d="M28 94H172" stroke="' + b + '" stroke-width="3"/>');
    }
    if (k === 'socks') {
      var sock = function (t) { return '<g transform="' + t + '"><path d="M60 30H100V110Q100 124 112 130Q140 142 140 160Q140 172 126 172H78Q60 172 60 150Z" fill="' + a + '" stroke="' + EDGE + '" stroke-width="3"/><rect x="60" y="30" width="40" height="20" fill="' + b + '"/><rect x="60" y="150" width="50" height="8" fill="' + b + '"/></g>'; };
      return svg(sock('translate(8,24) scale(.7)') + sock('translate(78,34) scale(.7)'));
    }
    if (k === 'pump') {
      return svg('<rect x="88" y="62" width="24" height="98" rx="4" fill="' + a + '" stroke="' + EDGE + '" stroke-width="2"/><rect x="68" y="42" width="64" height="10" rx="5" fill="' + b + '"/><rect x="97" y="50" width="6" height="14" fill="' + b + '"/><rect x="74" y="158" width="52" height="10" rx="3" fill="' + b + '"/><path d="M112 148Q154 148 154 112" fill="none" stroke="' + b + '" stroke-width="5" stroke-linecap="round"/><rect x="150" y="96" width="8" height="18" rx="2" fill="' + a + '"/>');
    }
    return svg('<path d="M62 24H138L126 176H74Z" fill="' + a + '" stroke="' + EDGE + '" stroke-width="2"/><rect x="62" y="24" width="76" height="16" rx="3" fill="' + b + '"/><path d="M69 160H131L130 176H72Z" fill="' + b + '"/>');
  }
  function art(p) {
    return p.cat === 'jersey' ? jersey(p) : p.cat === 'ball' ? ball(p) : p.cat === 'hoop' ? hoop(p) : p.cat === 'shoe' ? shoe(p) : acc(p);
  }

  /* ---------- state ---------- */
  var state = { cat: 'all', q: '', sort: 'featured', sel: {}, cart: [], view: 'cart', order: null, errors: {}, form: { pay: 'cod' } };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (Array.isArray(saved)) {
      state.cart = saved.filter(function (l) { return l && BY[l.id] && l.qty > 0; }).map(function (l) {
        return { key: l.id + '|' + (l.size || ''), id: l.id, size: l.size || '', qty: Math.min(MAX_QTY, l.qty | 0) };
      });
    }
  } catch (e) { /* storage unavailable */ }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(state.cart)); } catch (e) { /* ignore */ } }

  function totals() {
    var sub = 0, count = 0;
    state.cart.forEach(function (l) { sub += BY[l.id].price * l.qty; count += l.qty; });
    var ship = sub === 0 ? 0 : (sub >= FREE_AT ? 0 : SHIPPING);
    return { sub: sub, ship: ship, total: sub + ship, count: count };
  }

  /* ---------- shop grid ---------- */
  function catLabel(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i][0] === id) return CATS[i][1]; return ''; }
  function visible() {
    var q = state.q.trim().toLowerCase();
    var list = P.filter(function (p) {
      if (state.cat !== 'all' && p.cat !== state.cat) return false;
      if (!q) return true;
      return (p.name + ' ' + p.spec + ' ' + catLabel(p.cat)).toLowerCase().indexOf(q) !== -1;
    });
    if (state.sort === 'asc') list.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === 'desc') list.sort(function (a, b) { return b.price - a.price; });
    return list;
  }
  function renderChips() {
    $('#chips').innerHTML = CATS.map(function (c) {
      var n = c[0] === 'all' ? P.length : P.filter(function (p) { return p.cat === c[0]; }).length;
      return '<button type="button" class="chip" data-cat="' + c[0] + '" aria-pressed="' + (state.cat === c[0]) + '">' + c[1] + '<small>' + n + '</small></button>';
    }).join('');
  }
  function card(p) {
    var sizes = p.sizes || [], sel = state.sel[p.id];
    return '<article class="card" data-id="' + p.id + '">' +
      '<div class="tile">' + (p.tag ? '<span class="tag">' + p.tag + '</span>' : '') + art(p) + '</div>' +
      '<div class="info"><h3>' + p.name + '</h3><p class="spec">' + p.spec + '</p>' +
      (sizes.length ? '<div class="sizes" role="group" aria-label="Size for ' + p.name + '">' + sizes.map(function (s) {
        return '<button type="button" class="sz" data-size="' + s + '" aria-pressed="' + (sel === s) + '">' + s + '</button>';
      }).join('') + '</div>' : '') +
      '<div class="buy"><span class="price">' + PHP(p.price) + '</span><button type="button" class="add">Add to cart</button></div>' +
      '<p class="hint" role="status"></p></div></article>';
  }
  function renderGrid() {
    var list = visible();
    $('#count').textContent = list.length + (list.length === 1 ? ' product' : ' products');
    $('#grid').innerHTML = list.length ? list.map(card).join('') :
      '<div class="empty"><p>Nothing matches “<span id="qs"></span>” in this category.</p><button type="button" class="btn ghost" id="clearFilters">Clear filters</button></div>';
    var qs = $('#qs'); if (qs) qs.textContent = state.q;
  }

  $('#chips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    state.cat = b.dataset.cat; renderChips(); renderGrid();
  });
  $('#sort').addEventListener('change', function (e) { state.sort = e.target.value; renderGrid(); });
  $('#q').addEventListener('input', function (e) { state.q = e.target.value; renderGrid(); });
  $$('[data-jump]').forEach(function (a) {
    a.addEventListener('click', function () { state.cat = a.dataset.jump; renderChips(); renderGrid(); });
  });
  $('#grid').addEventListener('click', function (e) {
    var c = e.target.closest('.card');
    if (e.target.id === 'clearFilters') {
      state.cat = 'all'; state.q = ''; $('#q').value = ''; renderChips(); renderGrid(); return;
    }
    if (!c) return;
    var p = BY[c.dataset.id], sz = e.target.closest('.sz');
    if (sz) {
      state.sel[p.id] = sz.dataset.size;
      $$('.sz', c).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.size === sz.dataset.size)); });
      $('.hint', c).textContent = '';
      return;
    }
    var add = e.target.closest('.add');
    if (!add) return;
    if (p.sizes && !state.sel[p.id]) { $('.hint', c).textContent = 'Choose a size first.'; return; }
    addToCart(p.id, p.sizes ? state.sel[p.id] : '');
    add.textContent = 'Added';
    setTimeout(function () { add.textContent = 'Add to cart'; }, 1200);
  });

  /* ---------- cart ---------- */
  function updateBadge() {
    var n = totals().count, b = $('#badge');
    b.textContent = n; b.dataset.zero = String(n === 0);
  }
  var toastTimer;
  function toast(msg) {
    $('#toastMsg').textContent = msg;
    var t = $('#toast'); t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function addToCart(id, size) {
    var key = id + '|' + (size || ''), line = null;
    state.cart.forEach(function (l) { if (l.key === key) line = l; });
    if (line) line.qty = Math.min(MAX_QTY, line.qty + 1);
    else state.cart.push({ key: key, id: id, size: size || '', qty: 1 });
    persist(); updateBadge(); toast('Added to cart');
    if (isOpen()) renderDrawer();
  }

  /* ---------- drawer ---------- */
  var lastFocus = null;
  function isOpen() { return !$('#drawer').hidden; }
  function openDrawer(view) {
    if (view) state.view = view;
    if (state.view === 'done' && !state.order) state.view = 'cart';
    lastFocus = document.activeElement;
    $('#toast').classList.remove('show');
    $('#scrim').hidden = false; $('#drawer').hidden = false;
    renderDrawer(); $('#closeCart').focus();
  }
  function closeDrawer() {
    $('#scrim').hidden = true; $('#drawer').hidden = true;
    if (state.view === 'done') { state.view = 'cart'; state.order = null; }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $('#openCart').addEventListener('click', function () { openDrawer('cart'); });
  $('#toastView').addEventListener('click', function () { openDrawer('cart'); });
  $('#closeCart').addEventListener('click', closeDrawer);
  $('#scrim').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape') { closeDrawer(); return; }
    if (e.key === 'Tab') {
      var f = $$('button, input, select, textarea, a[href]', $('#drawer')).filter(function (x) { return !x.disabled && x.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  function summaryRows(t) {
    return '<div class="rows"><div><span>Subtotal</span><span class="price" style="font-size:1rem">' + PHP(t.sub) + '</span></div>' +
      '<div><span>Delivery</span><span>' + (t.ship === 0 ? 'Free' : PHP(t.ship)) + '</span></div>' +
      '<div class="tot"><span>Total</span><span>' + PHP(t.total) + '</span></div></div>';
  }

  function renderDrawer() {
    var body = $('#dBody'), foot = $('#dFoot'), title = $('#drawerTitle'), t = totals();
    if (state.view === 'cart') {
      title.textContent = 'Your cart';
      if (!state.cart.length) {
        body.innerHTML = '<div class="placeholder"><p>Your cart is empty.</p><button type="button" class="btn" id="keep">Keep shopping</button></div>';
        foot.innerHTML = ''; foot.hidden = true; return;
      }
      foot.hidden = false;
      body.innerHTML = '<ul class="lines">' + state.cart.map(function (l) {
        var p = BY[l.id];
        return '<li class="line" data-key="' + l.key + '"><div class="thumb">' + art(p) + '</div>' +
          '<div><p class="lname">' + p.name + '</p><p class="lmeta">' + (l.size ? 'Size ' + l.size : p.spec) + '</p>' +
          '<div class="qty"><button type="button" data-act="dec" aria-label="Decrease quantity of ' + p.name + '">−</button><span aria-live="polite">' + l.qty + '</span><button type="button" data-act="inc" aria-label="Increase quantity of ' + p.name + '">+</button></div></div>' +
          '<div class="lright"><span class="price">' + PHP(p.price * l.qty) + '</span><button type="button" class="rm" data-act="rm" aria-label="Remove ' + p.name + '">Remove</button></div></li>';
      }).join('') + '</ul>';
      var left = Math.max(0, FREE_AT - t.sub);
      foot.innerHTML =
        '<div><div class="meter" aria-hidden="true"><i style="width:' + Math.min(100, t.sub / FREE_AT * 100).toFixed(0) + '%"></i></div>' +
        '<p class="ship-note">' + (left === 0 ? 'You get free delivery.' : 'Add ' + PHP(left) + ' more for free delivery.') + '</p></div>' +
        summaryRows(t) + '<button type="button" class="btn" id="toCheckout">Checkout</button>';
    } else if (state.view === 'checkout') {
      title.textContent = 'Checkout';
      foot.hidden = false;
      var f = state.form, er = state.errors;
      function field(id, label, type, ph) {
        return '<div class="field"><label for="f-' + id + '">' + label + '</label><input id="f-' + id + '" name="' + id + '" type="' + type + '" placeholder="' + ph + '" autocomplete="off" value="" ' + (er[id] ? 'aria-invalid="true" aria-describedby="e-' + id + '"' : '') + '><p class="err" id="e-' + id + '">' + (er[id] || '') + '</p></div>';
      }
      body.innerHTML = '<button type="button" class="back" id="backCart">Back to cart</button>' +
        '<form id="checkoutForm" novalidate>' +
        field('name', 'Full name', 'text', 'Juan Dela Cruz') +
        field('phone', 'Mobile number', 'tel', '0917 123 4567') +
        field('address', 'Street address', 'text', 'House no., street, barangay') +
        field('city', 'City or municipality', 'text', 'Quezon City') +
        '<fieldset><legend class="legend">Payment</legend>' +
        [['cod', 'Cash on delivery'], ['gcash', 'GCash'], ['bank', 'Bank transfer']].map(function (o) {
          return '<label class="pay"><input type="radio" name="pay" value="' + o[0] + '"' + (f.pay === o[0] ? ' checked' : '') + '>' + o[1] + '</label>';
        }).join('') + '</fieldset></form>';
      ['name', 'phone', 'address', 'city'].forEach(function (k) { var el = $('#f-' + k); el.value = f[k] || ''; });
      foot.innerHTML = summaryRows(t) + '<button type="submit" class="btn" form="checkoutForm">Place order · ' + PHP(t.total) + '</button>';
    } else {
      title.textContent = 'Order placed';
      foot.hidden = false;
      var o = state.order;
      body.innerHTML = '<div class="done"><div class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>' +
        '<h2 style="font-size:2rem">Thanks, <span id="dn"></span></h2>' +
        '<dl><div><dt>Order number</dt><dd id="do"></dd></div><div><dt>Deliver to</dt><dd id="da"></dd></div><div><dt>Payment</dt><dd id="dp"></dd></div><div><dt>Total</dt><dd id="dt"></dd></div></dl>' +
        '<p class="note">This is a demo store. Nothing was shipped and no payment was taken.</p></div>';
      $('#dn').textContent = o.name.split(' ')[0];
      $('#do').textContent = o.no;
      $('#da').textContent = o.address + ', ' + o.city;
      $('#dp').textContent = o.pay;
      $('#dt').textContent = PHP(o.total) + ' (' + o.items + (o.items === 1 ? ' item' : ' items') + ')';
      foot.innerHTML = '<button type="button" class="btn" id="keep">Continue shopping</button>';
    }
  }

  $('#dBody').addEventListener('click', function (e) {
    var t = e.target;
    if (t.id === 'keep') { closeDrawer(); return; }
    if (t.id === 'backCart') { captureForm(); state.view = 'cart'; renderDrawer(); return; }
    var act = t.closest('[data-act]'); if (!act) return;
    var li = act.closest('.line'), key = li.dataset.key, a = act.dataset.act, line = null, idx = -1;
    state.cart.forEach(function (l, i) { if (l.key === key) { line = l; idx = i; } });
    if (!line) return;
    if (a === 'inc') line.qty = Math.min(MAX_QTY, line.qty + 1);
    if (a === 'dec') line.qty = Math.max(1, line.qty - 1);
    if (a === 'rm') state.cart.splice(idx, 1);
    persist(); updateBadge(); renderDrawer();
    if (a === 'rm') { $('#closeCart').focus(); }
    else { var again = $('[data-key="' + key + '"] [data-act="' + a + '"]'); if (again) again.focus(); }
  });
  $('#dFoot').addEventListener('click', function (e) {
    if (e.target.id === 'toCheckout') { state.view = 'checkout'; state.errors = {}; renderDrawer(); $('#f-name').focus(); }
    if (e.target.id === 'keep') closeDrawer();
  });

  function captureForm() {
    var form = $('#checkoutForm'); if (!form) return;
    ['name', 'phone', 'address', 'city'].forEach(function (k) { state.form[k] = $('#f-' + k).value; });
    var r = form.querySelector('input[name="pay"]:checked'); if (r) state.form.pay = r.value;
  }
  document.addEventListener('submit', function (e) {
    if (e.target.id !== 'checkoutForm') return;
    e.preventDefault();
    captureForm();
    var f = state.form, er = {};
    if (!(f.name || '').trim() || f.name.trim().length < 2) er.name = 'Enter your full name.';
    var ph = (f.phone || '').replace(/[\s-]/g, '');
    if (!/^(09|\+639)\d{9}$/.test(ph)) er.phone = 'Enter a Philippine mobile number, like 0917 123 4567.';
    if (!(f.address || '').trim()) er.address = 'Enter your street address.';
    if (!(f.city || '').trim()) er.city = 'Enter your city or municipality.';
    state.errors = er;
    var keys = Object.keys(er);
    if (keys.length) { renderDrawer(); $('#f-' + keys[0]).focus(); return; }
    var t = totals(), labels = { cod: 'Cash on delivery', gcash: 'GCash', bank: 'Bank transfer' };
    state.order = { no: 'HS-' + String(Math.floor(10000 + Math.random() * 90000)), name: f.name.trim(), address: f.address.trim(), city: f.city.trim(), pay: labels[f.pay] || 'Cash on delivery', total: t.total, items: t.count };
    state.cart = []; state.form = { pay: 'cod' }; persist(); updateBadge();
    state.view = 'done'; renderDrawer(); $('#closeCart').focus();
  });

  renderChips(); renderGrid(); updateBadge();
})();

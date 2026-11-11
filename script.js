/* ===== DATA ===== */
const NOMOR_WA='6281234567890';
const kategori=[
 {id:'cookies',nama:'Signature Cookies',ket:'Nastar, kastengel, blondies'},
 {id:'brownies',nama:'Artisan Brownies & Snacks',ket:'Putri salju, lava cakes, keripik'},
 {id:'savory',nama:'Savory Indonesian Delights',ket:'Semprit, kacang, abon'}];
const P=(nama,harga,kat,best)=>({nama,harga,kat,best});
const produk=[
 P('Nastar Royal Gold',135000,'cookies',1),P('Kastengels Classic',140000,'cookies',1),P('Blondies Kacang Macadamia',110000,'cookies'),
 P('Brownies Cheese Swirl',110000,'cookies',1),P('Basreng Pedas Daun Jeruk',75000,'cookies'),P('Kerupuk Ikan Tenggiri Premium',80000,'cookies'),
 P('Putri Salju Mede',125000,'brownies',1),P('Lidah Kucing Cokelat Keju',115000,'brownies'),P('Mini Choco Lava Cakes',95000,'brownies'),
 P('Choco Chips Signature Cookies',90000,'brownies'),P('Keripik Tempe Sagu',70000,'brownies'),P('Peyek Kacang & Teri',65000,'brownies'),
 P('Semprit Susu Keju',115000,'savory'),P('Brownies Cookies',90000,'savory'),P('Oatmeal Raisin Cookies',85000,'savory'),
 P('Kacang Medok Special',120000,'savory',1),P('Kripik Bawang Premium',70000,'savory'),P('Abon Sapi Special',95000,'savory')];
const hamper=[
 {nama:'Paket Harmoni',harga:275000,isi:'Dua jar signature (Nastar & Kastengels).'},
 {nama:'Paket Premium',harga:520000,isi:'Box hamper berisi beberapa jar pilihan. (Sesuaikan nama paket)'},
 {nama:'Paket Kemakmuran',harga:880000,isi:'Enam jar premium, kartu ucapan, dan ornamen kembang api.'},
 {nama:'Paket Mewah Nusantara',harga:1800000,isi:'Delapan jar, kartu ucapan besar, lilin aromaterapi, dan piring saji.'}];
const TEKS_DI_GAMBAR=true; /* true = teks sudah ada di dalam gambar AI; false = teks ditampilkan oleh website */
const slides=[
 ['Story 1','Dari Dapur Mama, untuk Orang Tersayang','Sore itu, oven kecil di dapur rumah sudah menyala. Aroma mentega dan nanas menguar pelan, memenuhi rumah dengan rasa pulang. Kenalkan Dapur Adhelia, kue dan camilan artisan yang lahir dari cinta seorang mama.'],
 ['Story 2','Hadiah yang Berkesan Itu Tidak Mudah','Kue kering yang keras dan hambar, kemasan seadanya, atau bingung mencari hadiah yang terasa tulus. Kenapa kue yang enak harus sulit ditemukan?'],
 ['Story 3','Awalnya Hanya Iseng','Mama iseng membuat nastar dan kastengel untuk keluarga dan sahabat dekat. Resepnya sederhana, tapi dibuat dengan hati dan bahan terbaik. Mereka mencicipi, tersenyum, lalu bertanya, “Boleh pesan lagi?”'],
 ['Story 4','Titik Balik: Semua Ingin Pesan','Kabar menyebar dari satu meja makan ke meja makan lain. Pesanan datang dari tetangga, teman kantor, bahkan orang yang belum pernah kami temui. Mama pun memutuskan: Dapur Adhelia resmi dibuka.'],
 ['Story 5','Dari Oven ke Jar Cantik','Nastar Royal Gold, Kastengels Classic, brownies, hingga kripik tempe dan abon sapi. Dibuat dalam batch kecil, dikemas dalam jar eksklusif, siap jadi hadiah.'],
 ['Story 6','Bukan Sekadar Kue','Ini tentang Bu Rina yang selalu memesan Nastar Royal Gold untuk tamu Lebaran keluarganya. Atau Dimas, yang mengirim Paket Kemakmuran untuk klien kantornya dan dikenang sepanjang tahun.'],
 ['Story 7','Setiap Momen Layak Dirayakan','Lebaran, Tahun Baru, atau sekadar ingin menyenangkan seseorang. Biarkan toples emas kami yang bercerita. Pilih kisah manismu hari ini.',{href:'#/produk',l:'75%',t:'81%',w:'22%',h:'11%'}]];  /* area tombol Pesan Sekarang: l=kiri, t=atas, w=lebar, h=tinggi (persen dari gambar) */
const galeri=['produk','store-front','store-mini','store-layout','seragam','tiktok'];
const testi=[['Nastar-nya lembut dan wanginya enak banget, jadi langganan tiap Lebaran.','Rina, Bandung'],
 ['Hamper Kemakmuran rapi sekali, klien kantor saya senang.','Dimas, Jakarta'],['Kastengelnya gurih keju, tidak bikin eneg. Pasti pesan lagi.','Salsa, Bogor']];
const faq=[['Bagaimana cara memesan?','Pilih produk, masukkan ke keranjang, lalu tekan "Pesan lewat WhatsApp". Pesananmu terkirim otomatis ke chat kami.'],
 ['Apakah bisa kirim ke luar kota?','Bisa. Detail ongkos kirim dan estimasi tiba kami konfirmasi lewat WhatsApp.'],
 ['Berapa lama kue kering bertahan?','Dalam jar tertutup rapat dan disimpan di tempat sejuk, produk bertahan beberapa pekan. Cek label pada kemasan.'],
 ['Bisa pesan hamper custom?','Bisa. Hubungi kami dengan jumlah dan budget, nanti kami bantu susun paketnya.']];

/* ===== UTIL ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rp=n=>'Rp '+n.toLocaleString('id-ID');
const nk=id=>(kategori.find(k=>k.id===id)||{}).nama;
const slug=n=>n.toLowerCase().replace(/[^a-z0-9]+/g,'-');
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1800)}

/* ===== KERANJANG ===== */
let cart={};try{cart=JSON.parse(localStorage.getItem('adhelia-cart'))||{}}catch(e){}
const semua=[...produk,...hamper];
const harga=n=>semua.find(x=>x.nama===n).harga;
function save(){try{localStorage.setItem('adhelia-cart',JSON.stringify(cart))}catch(e){}renderCart()}
function add(n){cart[n]=(cart[n]||0)+1;save();toast(n+' masuk keranjang')}
function setQty(n,d){cart[n]+=d;if(cart[n]<=0)delete cart[n];save()}
function renderCart(){
 const k=Object.keys(cart);let tot=0,jml=0;
 $('#items').innerHTML=k.length?k.map(n=>{const s=harga(n)*cart[n];tot+=s;jml+=cart[n];
  return `<div class="it"><div><b>${n}</b><br><small>${rp(harga(n))}</small>
  <div class="qty"><button data-d="-1" data-n="${n}" aria-label="Kurangi">-</button><span>${cart[n]}</span><button data-d="1" data-n="${n}" aria-label="Tambah">+</button></div></div><b>${rp(s)}</b></div>`}).join('')
  :'<p class="note">Keranjang masih kosong. Pilih produk dulu ya.</p>';
 $('#total').textContent=rp(tot);$('#cartCount').textContent=jml;
}
const drawer=(o)=>{$('#drawer').classList.toggle('on',o);$('#overlay').classList.toggle('on',o)};
$('#openCart').onclick=()=>drawer(true);$('#closeCart').onclick=$('#overlay').onclick=()=>drawer(false);
$('#items').onclick=e=>{const b=e.target.closest('button');if(b)setQty(b.dataset.n,+b.dataset.d)};
$('#checkout').onclick=()=>{const k=Object.keys(cart);if(!k.length)return toast('Keranjang masih kosong');
 const t=k.reduce((s,n)=>s+harga(n)*cart[n],0);
 const msg='Halo Dapur Adhelia, saya mau pesan:\n'+k.map(n=>`- ${n} x${cart[n]} (${rp(harga(n)*cart[n])})`).join('\n')+`\nTotal: ${rp(t)}`;
 window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(msg)}`,'_blank')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)add(b.dataset.add)});

/* ===== RENDER ===== */
const kartu=p=>`<article class="card"><span class="tag">${nk(p.kat)}</span><h3>${p.nama}</h3><span class="price">${rp(p.harga)}</span>
 <button class="btn" data-add="${p.nama}">Tambah ke keranjang</button></article>`;
$('#homeCats').innerHTML=kategori.map(k=>`<a class="cat" href="#/produk?k=${k.id}"><h3>${k.nama}</h3><span>${k.ket}</span></a>`).join('');
$('#best').innerHTML=produk.filter(p=>p.best).map(kartu).join('');
$('#hamperGrid').innerHTML=hamper.map(h=>`<article class="card"><span class="tag">Hamper</span><h3>${h.nama}</h3><p>${h.isi}</p>
 <span class="price">${rp(h.harga)}</span><button class="btn" data-add="${h.nama}">Tambah ke keranjang</button></article>`).join('');
$('#gallery').innerHTML=galeri.map(g=>`<img src="images/${g}.jpg" alt="Galeri ${g}" loading="lazy">`).join('');
$('#testi').innerHTML=testi.map(t=>`<blockquote>${t[0]}<cite>${t[1]}</cite></blockquote>`).join('');
$('#faq').innerHTML=faq.map(f=>`<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');
$('#gallery').onclick=e=>{if(e.target.tagName!=='IMG')return;const l=document.createElement('div');l.className='lb';
 l.innerHTML=`<img src="${e.target.src}" alt="">`;l.onclick=()=>l.remove();document.body.appendChild(l)};

/* ===== KATALOG: cari, filter, urut ===== */
let fk='semua';
function renderChips(){$('#chips').innerHTML=[{id:'semua',nama:'Semua'},...kategori].map(k=>`<button class="chip ${k.id===fk?'on':''}" data-k="${k.id}">${k.nama}</button>`).join('')}
function renderGrid(){
 const q=$('#q').value.toLowerCase().trim(),s=$('#sort').value;
 let d=produk.filter(p=>(fk==='semua'||p.kat===fk)&&p.nama.toLowerCase().includes(q));
 if(s==='asc')d.sort((a,b)=>a.harga-b.harga);if(s==='desc')d.sort((a,b)=>b.harga-a.harga);if(s==='az')d.sort((a,b)=>a.nama.localeCompare(b.nama));
 $('#count').textContent=`${d.length} produk ditemukan`;
 $('#grid').innerHTML=d.length?d.map(kartu).join(''):'<p class="note">Tidak ada produk yang cocok. Coba kata kunci atau kategori lain.</p>';
}
$('#chips').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;fk=b.dataset.k;renderChips();renderGrid()};
$('#q').oninput=$('#sort').onchange=renderGrid;

/* ===== ROUTER (hash) ===== */
function route(){
 const [path,qs]=(location.hash||'#/').slice(1).split('?');
 const pg=path.replace('/','')||'home';const ada=$(`[data-page="${pg}"]`)?pg:'home';
 $$('.page').forEach(p=>p.classList.toggle('on',p.dataset.page===ada));
 $$('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.p===ada));
 if(ada==='produk'&&qs){const k=new URLSearchParams(qs).get('k');if(k)fk=k}
 renderChips();renderGrid();$('#nav').classList.remove('on');window.scrollTo(0,0);
}
addEventListener('hashchange',route);$('#burger').onclick=()=>$('#nav').classList.toggle('on');

/* ===== SLIDESHOW ===== */
$('#slides').innerHTML=slides.map(s=>`<figure><img src="images/${s[0]}.jpg" alt="${s[1]}. ${s[2]}">${TEKS_DI_GAMBAR?'':`<figcaption><h2>${s[1]}</h2><p>${s[2]}</p></figcaption>`}${s[3]?`<a class="cta" href="${s[3].href}" aria-label="Pesan sekarang, lihat produk" style="left:${s[3].l};top:${s[3].t};width:${s[3].w};height:${s[3].h}"></a>`:''}</figure>`).join('');
let i=0,t;const n=slides.length;
$('#dots').innerHTML=slides.map((_,x)=>`<button aria-label="Slide ${x+1}"></button>`).join('');
function go(x){i=(x+n)%n;$('#slides').style.transform=`translateX(-${i*100}%)`;$$('#dots button').forEach((d,k)=>d.classList.toggle('on',k===i))}
function play(){clearInterval(t);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)t=setInterval(()=>go(i+1),4000)}
$('#slider').onclick=e=>{const b=e.target.closest('button');if(!b)return;
 if(b.classList.contains('prev'))go(i-1);else if(b.classList.contains('next'))go(i+1);else go($$('#dots button').indexOf(b));play()};
$('#slider').onmouseenter=()=>clearInterval(t);$('#slider').onmouseleave=play;

/* ===== FORM KONTAK ===== */
$('#form').onsubmit=e=>{e.preventDefault();
 const m=`Halo Dapur Adhelia, saya ${$('#fn').value}.\n${$('#fm').value}`;
 window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(m)}`,'_blank')};

go(0);play();renderCart();route();
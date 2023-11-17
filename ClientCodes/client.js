
var socket = new WebSocket('ws://10.100.2.248:5556/');

let kategori_adlari = ['Kahvaltılar', 'Çorbalar', 'İçecekler', 'Tostlar'];
let urun_adlari = [
  ['Serpme Kahvaltı', 'Van Kahvaltısı', 'Menemen'],
  ['Mercimek Çorbası', 'Tarhana Çorbası', 'Domates Çorbası', 'Şehriyeli Çorba'],
  ['Filtre Kahve', 'Latte', 'Kola', 'Fanta', 'Soda'],
  ['Sucuklu Tost', 'Kaşarlı Tost', 'Karışık Tost']
];
let fiyatlar = [
  ['34', '29', '22'],
  ['42', '19', '23', '26'],
  ['10', '50', '30', '49', '18'],
  ['39', '33', '26']
];
let urun_nolari = [
  ['1', '2', '3'],
  ['4', '5', '6', '7'],
  ['8', '9', '10', '11', '12'],
  ['13', '14', '15']
];
let aciklama = [
  ['aciklama1', 'aciklama2', 'aciklama3'],
  ['aciklama4', 'aciklama5', 'aciklama6', 'aciklama7'],
  ['aciklama8', 'aciklama9', 'aciklama10', 'aciklama11', 'aciklama12'],
  ['aciklama13', 'aciklama14', 'aciklama15']
]

let a_masalari = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16', 'A17', 'A18'];

// ------------------------Diziler Son--------------------

var sepet_resmi = document.getElementById('sepet-resmi');
var geri_resmi = document.getElementById('geri-resmi');
var content = document.getElementById('content');
var sepet_icerik = document.getElementById('sepet-icerik');

content.style.display = 'block';
sepet_icerik.style.display = 'none';

sepet_resmi.addEventListener('click', sepete_gir);
geri_resmi.addEventListener('click', sepetten_cik);

sepet_resmi.addEventListener('click', sepete_tasi);

function sepete_gir() {
  sepet_resmi.style.display = 'none';
  geri_resmi.style.display = 'block';
  content.style.display = 'none';
  sepet_icerik.style.display = 'block';
}

function sepetten_cik() {
  sepet_resmi.style.display = 'block';
  geri_resmi.style.display = 'none';
  content.style.display = 'block';
  sepet_icerik.style.display = 'none';
}
let sepetteki_urunler = {};

function sepete_tasi() {
  sepetteki_urunler = {};

  for (let i = 1; i <= urun_nolari.flat(Infinity).length; i++) {
    let urunNo = parseInt(document.getElementById(`urun_no${i}`).innerText);

    if (urunNo !== 0) {
      console.log(`Sepette ürün no ${i} var. Gerekli işlemler yapılıyor...`);
      sepetteki_urunler[i] = urunNo;
    }
  }

  sepete_eklenenler_fonksiyonu();
  console.log("Ürün no: Adet sayısı =>", sepetteki_urunler);
}

function sepete_eklenenler_fonksiyonu() {
  var sepete_eklenenler_div = document.getElementById('sepete_eklenenler_div');
  sepete_eklenenler_div.innerHTML = ""; // İlk önce içeriği temizleyelim

  // sepetteki_urunler, bir nesne olduğu için Object.keys() ile anahtarları alıyoruz.
  var urunlerinAnahtarları = Object.keys(sepetteki_urunler);

  for (let a = 0; a < urunlerinAnahtarları.length; a++) {
    var sepetteki_urunlerin_biri = parseInt(urunlerinAnahtarları[a]);
    let orijinal_urun_id = document.getElementById(`urun_no${sepetteki_urunlerin_biri}`);
    let parent_element = orijinal_urun_id.parentNode;
    let kopyalanan_parent = parent_element.cloneNode(true);

    sepete_eklenenler_div.appendChild(kopyalanan_parent);
  }
}

// ------------------Click Eventleri Son----------------------

let masa_select = document.getElementById("masa-select");
for (let i = 1; i <= a_masalari.length; i++) {
  let option = document.createElement("option");
  option.value = "A" + i;
  option.text = "A" + i;
  masa_select.appendChild(option);
}

//------------------------Sepet Ürünleri------------------
//----------------------Sepet Ürünleri Son----------------

let contentDiv = document.getElementById("content");
// ---------------------------For Döngüleri----------------------
for (let i = 0; i < kategori_adlari.length; i++) {
  let kategoriDiv = document.createElement("div");
  kategoriDiv.className = `kategori kategori${i + 1}`;

  let kategoriBaslik = document.createElement("h2");
  kategoriBaslik.textContent = kategori_adlari[i];
  kategoriDiv.appendChild(kategoriBaslik);

  let urunlerDiv = document.createElement("div");
  urunlerDiv.className = `urunler urunler${i + 1}`;

  kategoriDiv.appendChild(urunlerDiv);
  contentDiv.appendChild(kategoriDiv);

  for (let j = 0; j < urun_adlari[i].length; j++) {
    let urunDiv = document.createElement("div");
    urunDiv.className = `menu-item`;
    urunDiv.innerHTML = `
      <div class="name">${urun_adlari[i][j]}</div>
      <div class="price">${fiyatlar[i][j]}₺</div><span>Sepetteki Ürün Sayısı: </span>
      <div class="quantity" id="urun_no${urun_nolari[i][j]}">0</div>
      <div id="${aciklama[i][j]}">${aciklama[i][j]}</div>
      <button class="add-to-cart" onclick="sepeteEkle(${urun_nolari[i][j]})">+</button>
      <button class="remove-from-cart" onclick="sepettenCikar(${urun_nolari[i][j]})">-</button>
    `;
    urunlerDiv.appendChild(urunDiv);
  }
}

let kategoriler = []; // Boş bir dizi oluşturuyoruz

for (let i = 1; i <= 4; i++) {
  kategoriler.push("kategori" + i);
}

for (let k = 2; k <= 4; k++) { // İlk kategoriyi görüntüledikten sonra diğerlerini gezin (k = 2'den başlıyor)
  let kategoriler_index = kategoriler[k - 1];
  document.getElementsByClassName(`${kategoriler_index}`)[0].style.display = "none";
}

// ---------------------------
let kategoriler_id = ['kategori1', 'kategori2', 'kategori3', 'kategori4'];

for (let m = 0; m < kategoriler_id.length; m++) {
  let kategoriElement_id = document.getElementById(kategoriler_id[m]);
  let kategoriElement_class = document.getElementsByClassName(kategoriler_id[m])[0];
  document.getElementsByClassName(kategoriler_id[0])[0].style.display = "block";

  // Tüm kategori öğelerini başlangıçta "display: none" yapalım
  kategoriElement_class.style.display = "none";

  // Her bir öğeye click olayı ekleyelim
  kategoriElement_id.addEventListener("click", function () {
    // Tüm kategori öğelerini dolaşalım
    for (let i = 0; i < kategoriler_id.length; i++) {
      let kategori = document.getElementsByClassName(kategoriler_id[i])[0];
      // Tıklanan öğe ise "display: block", diğerleri "display: none" yapalım
      if (i === m) {
        kategori.style.display = "block";
      } else {
        kategori.style.display = "none";
      }
    }
  });
}

// ----------------SCRIPT-2-----------------

const sepet = {};

function sepeteEkle(urunId) {
  if (!sepet[urunId]) {
    sepet[urunId] = 0;
  }

  sepet[urunId] += 1;

  const sepetSayisi = sepet[urunId];
  const urunElement = document.getElementById(`urun_no${urunId}`);
  urunElement.innerText = sepetSayisi.toString();

  sepete_eklenenler_fonksiyonu(); // Sepetteki ürünler görselini güncelle
}

function sepettenCikar(urunId) {
  if (!sepet[urunId]) {
    return;
  }

  sepet[urunId] -= 1;

  const sepetSayisi = sepet[urunId];
  const urunElement = document.getElementById(`urun_no${urunId}`);
  urunElement.innerText = sepetSayisi.toString();

  if (sepet[urunId] === 0) {
    delete sepet[urunId];
  }

  sepete_eklenenler_fonksiyonu(); // Sepetteki ürünler görselini güncelle
}


function siparis_onayla_butonu() {
  sepetteki_urunler = {}; // Önceki verileri temizlemeye gerek yok, çünkü nesne kullanacağız.

  for (let i = 1; i <= 15; i++) {
    let urunNo = parseInt(document.getElementById(`urun_no${i}`).innerText);

    if (urunNo !== 0) {
      console.log(`Sepette ürün no ${i} var. Gerekli işlemler yapılıyor...`);
      sepetteki_urunler[i] = urunNo;
    }

  }

  sepete_eklenenler_fonksiyonu();
  console.log(sepetteki_urunler);
  if (masa_select.value == 0) {
    alert("Lütfen bir masa seçiniz!");
  } else {
    var siparisi_onayla_butonu_bildirim = document.createElement('div');
    siparisi_onayla_butonu_bildirim.setAttribute("id", "siparisi_onayla_butonu_bildirim");
    siparisi_onayla_butonu_bildirim.innerText = 'Siparişiniz kasaya iletildi.'

    sepetteki_urunler.table_number = masa_select.value;

    var siparisi_onayla_butonu_divi = document.getElementById('siparisi_onayla_butonu_divi');
    siparisi_onayla_butonu_divi.insertAdjacentElement('afterend', siparisi_onayla_butonu_bildirim);
    setTimeout(function () {
      siparisi_onayla_butonu_bildirim.remove();
    }, 5000);
    console.log('son kez objeyi göster: ', sepetteki_urunler)
  }
  socket.onmessage = function (event) {
    var messageDiv = document.createElement('div');
    messageDiv.textContent = event.data;
  };

  var message = JSON.stringify(sepetteki_urunler)
  socket.send(message);
  sepetteki_urunler = {}
  // ------------------------------------------

}


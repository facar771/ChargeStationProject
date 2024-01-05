const axios = require('axios');
// Kullanıcı adı ve şifre alanlarını seçin
var kullaniciAdiInput = document.getElementById("kullaniciAdi");
var kullaniciSifreInput = document.getElementById("kullaniciSifre");
var girisButon = document.getElementById("girisButon");

// Input olaylarını dinle
kullaniciAdiInput.addEventListener("input", kontrolleriKontrolEt);
kullaniciSifreInput.addEventListener("input", kontrolleriKontrolEt);

// Kontrolleri kontrol eden fonksiyon
function kontrolleriKontrolEt() {
    var kullaniciAdi = kullaniciAdiInput.value;
    var kullaniciSifre = kullaniciSifreInput.value;

    if (kullaniciAdi !== "" && kullaniciSifre !== "") {
        girisButon.disabled = false; // Butonu aktif hale getir
    } else {
        girisButon.disabled = true; // Butonu pasif hale getir
    }
}

// İlk başta butonu pasif yap
girisButon.disabled = true;

// Giriş yap fonksiyonu
function girisYap2() {
    var kullaniciAdi = kullaniciAdiInput.value;
    var kullaniciSifre = kullaniciSifreInput.value;

    // Kullanıcı adı ve şifre doğruysa, yönlendir
    if (kullaniciAdi === "ferhat" && kullaniciSifre === "123") {
        window.location.href = "dashboard.html"; // Yönlendirme
    } else {
        console.log("Hatalı kullanıcı adı veya şifre!"); // Hata mesajı
    }
}

function girisYap() {
    var kullaniciAdi = kullaniciAdiInput.value;
    var kullaniciSifre = kullaniciSifreInput.value;

        axios.post('http://45.141.151.31:5000/api/users/postUserWebSite', {
            kullaniciAdi: kullaniciAdi,
            kullaniciSifre: kullaniciSifre
        })
        .then(response => {
            // İstek başarılı olduğunda burası çalışır
            console.log('İstek başarılı:', response.data);
            window.location.href = "dashboard.html"; // Yönlendirme
        })
        .catch(error => {
            // İstek hata aldığında burası çalışır
            console.error('İstek hatası:', error);
        });

}


// "Giriş Yap" butonuna tıklanınca fonksiyonu çağırma
girisButon.addEventListener("click", girisYap);

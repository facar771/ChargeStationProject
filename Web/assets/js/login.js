

document.getElementById("girisButon").addEventListener("click", async function (event) {
    event.preventDefault(); // Form gönderimini engelle

    var kullaniciAdi = document.getElementById("kullaniciAdi").value;
    var kullaniciSifre = document.getElementById("kullaniciSifre").value;
    var userData = {
        kullaniciAdi: kullaniciAdi,
        kullaniciSifre: kullaniciSifre
    };
    alert(userData);
    try {
        const response = await axios.post('http://45.141.151.31:5000/api/users/postUserWebSite', userData);
        alert(response.data);
    } catch (error) {
        alert(error.message);
    }
});


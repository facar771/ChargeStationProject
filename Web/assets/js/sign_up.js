var userName;
function deneme() {
    userName = document.getElementById("kullaniciAdi").value;
    var password = document.getElementById("kullaniciSifre").value;
    var userData = {
        userName: userName,
        password: password
    };

    // Axios veya başka bir yöntemle sunucuya isteği gönderin ve cevabı alın
    axios.post('http://45.141.151.31:5000/api/users/postUserWebSite', userData)
        .then(response => {
            // Sunucudan gelen cevap true ise dashboard.html sayfasına yönlendir
            if (response.data === true) {
		localStorage.setItem("name", userName);
                window.location.href = 'dashboard.html';
            } else {
                // Cevap true değilse hata mesajını gösterebilirsiniz
                alert('Giriş başarısız!');
            }
        })
        .catch(error => {
            console.log(error);
            // Hata durumunda işlem yapabilirsiniz
        });
}
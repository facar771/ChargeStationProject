function pushprice() {
    // Kullanıcı adını al
    var userName = localStorage.getItem("name");
    var price = document.getElementById("chargePrice").value;
    // Şimdi bu kullanıcı adını kullanarak bir POST isteği gönderelim
    const userData = {
      userName: userName
    };

    axios.post('http://45.141.151.31:5000/api/users/postPriceWebSite?price='+price, userData)
      .then((response) => {
        // Sunucudan gelen cevabı işleyin
        if (response.data > 0) {
          alert('Fiyat başarıyla gönderildi.');
          // İşlem başarılı olduysa başka bir şey yapabilirsiniz.
        } else {
          alert('Fiyat gönderilirken bir hata oluştu.');
          // İşlem başarısızsa kullanıcıya bir hata mesajı gösterebilirsiniz.
        }
      })
      .catch((error) => {
        console.error('İstek hatası:', error);
        // Hata durumunda kullanıcıya bir hata mesajı gösterebilirsiniz.
      });
  }
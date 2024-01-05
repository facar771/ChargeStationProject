function clickMap(){
  const bilgiInput = document.getElementById('bilgiInput');

  let receivedLocation = ''; 

  function receiveLocation(location) {
    receivedLocation = location;
  }

  if (bilgiInput.value.trim() === '') {
    alert('Bilgi girişi alanını doldurun.');
  } else {
    // ChargeStation nesnesini hazırlayın
    const chargeStationData = {
      location: receivedLocation
    };

    // Sunucuya POST isteği gönderin
    axios.post('http://45.141.151.31:5000/api/chargestation/postaddchargestation', chargeStationData)
      .then((response) => {
        // Sunucudan gelen cevabı işleyin
        if (response.data === 1) {
          alert('Şarj istasyonu başarıyla eklenmiştir.');
          // İşlem başarılı olduysa başka bir şey yapabilirsiniz.
        } else {
          alert('Şarj istasyonu eklenirken bir hata oluştu.');
          // İşlem başarısızsa kullanıcıya bir hata mesajı gösterebilirsiniz.
        }
      })
      .catch((error) => {
        console.error('İstek hatası:', error);
        // Hata durumunda kullanıcıya bir hata mesajı gösterebilirsiniz.
      });
  }
}

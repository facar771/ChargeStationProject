document.getElementById('bilgiForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const bilgiInput = document.getElementById('bilgiInput');
  
    if (bilgiInput.value.trim() === '') {
      alert('Bilgi girişi alanını doldurun.');
    } else {
      // ChargeStation nesnesini hazırlayın
      const chargeStationData = {
        location: ""
      };
  
      // Sunucuya POST isteği gönderin
      fetch('http://45.141.151.31:5000/api/postaddchargestation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chargeStationData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Sunucudan gelen cevabı işleyin
          if (data === 1) {
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
  });
  
let marker; // Önceki işaretçiyi saklamak için bir değişken

// Bu işlev, haritayı belirtilen konuma götürmek için kullanılır.
function goToLocation(lat, lng) {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng }, // Belirtilen konuma git
    zoom: 20 // Yakınlaştırma seviyesi (istediğiniz değeri ayarlayabilirsiniz)
  });

  // Önceki işaretçiyi kaldır
  if (marker) {
    marker.setMap(null);
  }

  // Yeni işaretçiyi oluştur ve haritaya ekle
  marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
    title: 'Tıklanan Konum'
  });

  // Tıklanan koordinatları metin kutularına yerleştir
  document.getElementById('latitude').value = lat.toFixed(15);
  document.getElementById('longitude').value = lng.toFixed(15);

  const location = lat.toFixed(15) + ',' + lng.toFixed(15);
}

// Harita işlemleri için bir işlev oluşturun
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 39.134697724304466, lng: 35.35640395026079 }, // Varsayılan başlangıç konumu
    zoom: 6 // Yakınlaştırma seviyesi
  });

  // Haritada tıklama olayını dinleyin
  google.maps.event.addListener(map, 'click', function(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log(`Tıklanan Konum: ${lat}, ${lng}`);

    // Tıklanan konuma gitmek için goToLocation işlemini çağırın
    goToLocation(lat, lng);

    // Burada sunucuya verileri gönderme işlemini yapabilirsiniz.
    // Örneğin, bir AJAX isteği kullanarak verileri sunucuya iletebilirsiniz.
  });
}

var map;

function init() {
  map = new L.Map("map");

  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 22,
  }).addTo(map);
  map.attributionControl.setPrefix(""); // Don't show the 'Powered by Leaflet' text.

  var london = new L.LatLng(55.751244, 37.618423);
  map.setView(london, 12);
  $("form").on("submit", function(event) {
    event.preventDefault();
  })

}

// function popupWithText(pos, txt) {
//   var popupWithText = L.popup().setLatLng(pos).setContent(txt).openOn(map);
//   map.panTo(new L.LatLng(pos[0], pos[1]));
// }

function markerWithText(pos, txt) {
  var markerWithText = L.marker(pos).addTo(map).on('click', function(e) {
      $('#label-lon').val(e.latlng.lng)
      $('#label-lat').val(e.latlng.lat)
  })

  if(txt) {
    markerWithText.bindPopup(txt);
    markerWithText.openPopup();    
  }
  map.panTo(new L.LatLng(pos[0], pos[1]));
}
const isFloat = n => Number(n) === n && n % 1 !== 0;
const addMarker = (input = { lon : null, lat : null }) => {
  if(!(input.lon && input.lat)) {
    input.lon = $('#input-lon').val()
    input.lat = $('#input-lat').val()
  }
  //
  let isOk = true
  //
  for (const [key, value] of Object.entries(input)) {
    if(isFloat((1 * value))) {
      $(`#input-${key}`).removeClass('uk-form-danger')
      $('#text-danger').text(``)
    } else {
      isOk = false
      $('#text-danger').html(`Неправильный формат поля <b>${key}</b>. Пример заполнения: lon: 37.618423, lat:55.751244 (Moscow)`)
      $(`#input-${key}`).addClass('uk-form-danger')
    }
  }
  //
  const msg = $('#input-msg').val()
  //
  if(isOk) markerWithText([input.lat, input.lon], msg)
}


jQuery(function () {
  init();
});
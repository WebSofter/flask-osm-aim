var map;

/**
 * 
 */
const crossAimImg = `<div class="cross-aim"><img src="/static/img/cross-aim.svg"></img></div>`
// const crossAimBtn = `<button onclick="getMapCenter()" class="uk-icon-button uk-button-primary uk-margin-small-right" uk-icon="location" title="Получить центр"></button>`
// const crossAim = L.control({
//   position : 'topleft'
// });
// crossAim.onAdd = function(map) {
//   this._div = L.DomUtil.create('div', 'cross-aim-control');
//   this._div.innerHTML = crossAimBtn;
//   return this._div;
// }
/** */

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

  // crossAim.addTo(map);
  $("#map").append(crossAimImg);
}

// function popupWithText(pos, txt) {
//   var popupWithText = L.popup().setLatLng(pos).setContent(txt).openOn(map);
//   map.panTo(new L.LatLng(pos[0], pos[1]));
// }
const setInfo = (lng, lat) => {
  $('#label-lon').val(lng)
  $('#label-lat').val(lat)
}
const getMapCenter = e => {
  const pos = map.getCenter()
  addMarker({lng: pos.lng, lat: pos.lat})
  setInfo(pos.lng, pos.lat)
}
function markerWithText(pos, txt) {
  var markerWithText = L.marker(pos).addTo(map).on('click', e => setInfo(e.latlng.lng, e.latlng.lat))
  if(txt) {
    markerWithText.bindPopup(txt);
    markerWithText.openPopup();    
  }
  map.panTo(new L.LatLng(pos[0], pos[1]));
}
const isFloat = n => Number(n) === n && n % 1 !== 0;
const addMarker = (input = { lng : null, lat : null }) => {
  if(!(input.lng && input.lat)) {
    input.lng = $('#input-lon').val()
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
      $('#text-danger').html(`Неправильный формат поля <b>${key}</b>. Пример заполнения: lng: 37.618423, lat:55.751244 (Moscow)`)
      $(`#input-${key}`).addClass('uk-form-danger')
    }
  }
  //
  const msg = $('#input-msg').val()
  //
  if(isOk) markerWithText([input.lat, input.lng], msg)
}


jQuery(function () {
  init();
});
var map;

function init() {
  map = new L.Map("map");

  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  map.attributionControl.setPrefix(""); // Don't show the 'Powered by Leaflet' text.

  var london = new L.LatLng(51.5, 0);
  map.setView(london, 10);
}

function popupMitText(pos, txt) {
  var popupMitText = L.popup().setLatLng(pos).setContent(txt).openOn(map);
  map.panTo(new L.LatLng(pos[0], pos[1]));
}

function markerMitText(pos, txt) {
  var markerMitText = L.marker(pos).addTo(map);
  markerMitText.bindPopup(txt);
  markerMitText.openPopup();
  map.panTo(new L.LatLng(pos[0], pos[1]));
}

jQuery(function () {
  init();
});
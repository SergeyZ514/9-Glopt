// GOOGLE MAP

let script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=KEY&callback=initMap';
script.async = true;

let map;
window.initMap = function () {
   map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.89091258262199, lng: 17.393847161373518 },
      zoom: 3,
      styles: [
         {
            stylers: [
               {
                  hue: '#2c3e50',
               },
               {
                  saturation: 250,
               },
            ],
         },
         {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
               {
                  lightness: 50,
               },
               {
                  visibility: 'simplified',
               },
            ],
         },
         {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
               {
                  visibility: 'off',
               },
            ],
         },
      ],
   });
   let marker_sw = new google.maps.Marker({
      position: { lat: 64.15211521325051, lng: 16.285190354510817 },
      map: map,
      title: 'We are in Sweden',
      icon: 'img/about/marker.svg',
   });
   let marker_nw = new google.maps.Marker({
      position: { lat: 61.76563466771849, lng: 9.394989860038887 },
      map: map,
      title: 'We are in Norway',
      icon: 'img/about/marker.svg',
   });
   let marker_de = new google.maps.Marker({
      position: { lat: 50.67945341940586, lng: 9.581223581709363 },
      map: map,
      title: 'We are in Germany',
      icon: 'img/about/marker.svg',
   });
   let marker_sp = new google.maps.Marker({
      position: { lat: 39.27508272963089, lng: -4.200071821905046 },
      map: map,
      title: 'We are in Spain',
      icon: 'img/about/marker.svg',
   });
   let marker_it = new google.maps.Marker({
      position: { lat: 42.44325078351154, lng: 12.374729406766338 },
      map: map,
      title: 'We are in Italy',
      icon: 'img/about/marker.svg',
   });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

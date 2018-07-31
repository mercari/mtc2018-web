$(function ($) {
  $(window).load(function () {
    loaded();
  });
  $(window).scroll(function () { //スクロールイベント
    var y = jQuery(this).scrollTop();
    if (y > $(".message_area").offset().top) {
      $("body").addClass("scrolled");
    } else {
      $("body").removeClass("scrolled");
    }
  });
  $(".popup").fadeOut(0);
  $(".popup_closer").click(function () {
    $(".popup").fadeOut("slow");
    $("body").removeClass("noscroll");
  });
  $(".tt_set_right_min a").click(function () {
    $(".popup .speaker_set *").remove();
    $(".popup .speaker_set").prepend($($(this).attr("href")).html());
    $(".popup").fadeIn("slow");
    $("body").addClass("noscroll");
    return false;
  });
  $("[href='#top']").click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 1000, 'swing');
  });
  if (0) {
    // #で始まるアンカーをクリックした場合に処理
    $('a[href^=#]').click(function () {
      // スクロールの速度
      var speed = 1000; // ミリ秒
      // アンカーの値取得
      var href = $(this).attr("href");
      // 移動先を取得
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を数値で取得
      var position = target.offset().top;
      // スムーススクロール
      if (position == 0) {} else {
        position -= 60;
      }
      $('body,html').animate({
        scrollTop: position
      }, speed, 'swing');
      return false;
    });
  }
});

function loaded() {
  initialize();
  part();
}

function initialize() {
  var latlng = new google.maps.LatLng(35.662011, 139.728459);
  var myOptions = {
    mapTypeControl: false,
    zoom: 16,
    /*拡大比率*/
    center: latlng,
    /*表示枠内の中心点*/
    mapTypeControlOptions: {
      mapTypeIds: ['sample', google.maps.MapTypeId.ROADMAP]
    } /*表示タイプの指定*/
  };
  var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map
  });
  var styledMapOptions = {
    name: 'MTC'
  }
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('sample', sampleType);
  map.setMapTypeId('sample');
}
google.maps.event.addDomListener(window, 'load', initialize);
/*取得スタイルの貼り付け*/
var styleOptions = [{
  "featureType": "all",
  "elementType": "labels.text",
  "stylers": [{
    "color": "#f8f8f8"
  }, {
    "visibility": "on"
  }, {
    "lightness": "67"
  }]
}, {
  "featureType": "all",
  "elementType": "labels.text.fill",
  "stylers": [{
    "saturation": "100"
  }, {
    "color": "#ffffff"
  }, {
    "lightness": "-41"
  }, {
    "weight": "0.01"
  }, {
    "gamma": "4.10"
  }]
}, {
  "featureType": "all",
  "elementType": "labels.text.stroke",
  "stylers": [{
    "visibility": "off"
  }, {
    "color": "#000000"
  }, {
    "lightness": 16
  }, {
    "gamma": "0.00"
  }]
}, {
  "featureType": "all",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "off"
  }]
}, {
  "featureType": "administrative",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 20
  }]
}, {
  "featureType": "administrative",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 17
  }, {
    "weight": 1.2
  }]
}, {
  "featureType": "landscape",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 20
  }]
}, {
  "featureType": "poi",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 21
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry.fill",
  "stylers": [{
    "color": "#131313"
  }, {
    "lightness": 17
  }, {
    "visibility": "on"
  }]
}, {
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [{
    "color": "#252525"
  }, {
    "lightness": 29
  }, {
    "weight": 0.2
  }, {
    "visibility": "on"
  }]
}, {
  "featureType": "road.arterial",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": "17"
  }]
}, {
  "featureType": "road.local",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": "16"
  }]
}, {
  "featureType": "transit",
  "elementType": "geometry",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit.line",
  "elementType": "geometry.fill",
  "stylers": [{
    "visibility": "on"
  }]
}, {
  "featureType": "transit.station.rail",
  "elementType": "labels.icon",
  "stylers": [{
    "visibility": "on"
  }, {
    "lightness": "22"
  }, {
    "saturation": "5"
  }, {
    "gamma": "0.00"
  }]
}, {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [{
    "color": "#000000"
  }, {
    "lightness": 17
  }]
}];

function part() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 10,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 0,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 300,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 900,
        "color": "#f00",
        "opacity": 0.1,
        "width": 3
      },
      "move": {
        "enable": true,
        "speed": 4,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "bounce",
        "bounce": true,
        "attract": {
          "enable": true,
          "rotateX": 10000,
          "rotateY": 10000
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}
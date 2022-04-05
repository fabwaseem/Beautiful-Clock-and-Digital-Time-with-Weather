$(document).ready(function () {
  let hour = $("#hour");
  let min = $("#min");
  let sec = $("#sec");

  let hr = $("#hr");
  let mn = $("#mn");
  let sc = $("#sc");
  let ampm = $("#ampm");

  setInterval(() => {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let am = hh >= 12 ? "pm" : "am";
    if (hh > 12) {
      hh = hh - 12;
    }
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    hr.text(hh);
    mn.text(mm);
    sc.text(ss);
    ampm.text(am);

    let hhh = hh * 30;
    let mmm = mm * 6;
    let sss = ss * 6;

    hour.css("transform", `rotateZ(${hhh + mmm / 12}deg)`);
    min.css("transform", `rotateZ(${mmm}deg)`);
    sec.css("transform", `rotateZ(${sss}deg)`);
  }, 1000);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      $("#weather").html(
        "Unable to get your location automatically, <br> Click here to type yourself."
      );
    }
  }

  function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    getWeather(lat, lon);
    setInterval(() => {
      getWeather(lat, lon);
    }, 60000);
  }

  function getWeather(latitude, longitude) {
    if (!latitude || !longitude) {
      $("#weather").html(
        "Unable to get your location automatically, <br> Click here to type yourself."
      );
    } else {
      $.ajax(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=d3f4797a89628a0048c18a10e65af3a0`,
        {
          dataType: "jsonp",
          success: function (json) {
            $("#weather").text(json.main.temp + " °C");
          },
        }
      );
    }
  }

  getLocation();

  $("#credits").click(function () {
    $(".credits-container").toggleClass("hidden");
  });
  $(".close-btn").click(function () {
    $(".weather-container").toggleClass("hidden");
  });
  $("#weather").click(function () {
    $(".weather-container").toggleClass("hidden");
  });

  $("#location-form").submit(function (e) {
    e.preventDefault();
    lat = $("#lat").val();
    lon = $("#lon").val();
    $(".weather-container").addClass("hidden");
    getWeather(lat, lon);
    setInterval(() => {
      getWeather(lat, lon);
    }, 60000);
  });

  
});

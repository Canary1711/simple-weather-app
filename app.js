window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-section");
  const temperatureSpan = document.querySelector(".degree-section span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/9950fe8d92788f03111e5b2f3934ab49/${lat},${long}`;

      fetch(api)
        .then(response => response.json())
        .then(data => {
          //   console.log(data);
          const { temperature, summary, icon } = data.currently;
          //   set Dom Elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //   FORMULA FOR CELCIUS
          let celcius = (temperature - 32) * (5 / 9);
          //   set icon
          setIcons(icon, document.querySelector(".icon"));

          //   change temperature
          degreeSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});

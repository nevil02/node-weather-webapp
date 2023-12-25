const weatherForm = document.querySelector("form");
const userLocationInput = document.querySelector("input");

// select element by id via below both the ways
const msgOneHolder = document.getElementById("msg-1");
const msgTwoHolder = document.querySelector("#msg-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userLocation = userLocationInput.value;

  msgOneHolder.textContent = "Loading weather for " + userLocation;
  msgTwoHolder.textContent = "";

  fetch("/weather?address=" + userLocation).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msgOneHolder.textContent = data.error;
          msgTwoHolder.textContent = "";
          return;
        }

        msgOneHolder.textContent = data.location;
        msgTwoHolder.textContent = data.forecast;
      });
    }
  );
});

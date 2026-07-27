const apiKey = "51aaf56f1d514769eb01567747f6c311";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) return;

  try {
    const res = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
    const data = await res.json();

    if (data.cod !== 200) {
      document.getElementById("weatherBox").innerHTML =
        `<p style='color:red;'>${data.message || 'City not found!'}</p>`;
      return;
    }

    document.getElementById("weatherBox").innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <h1>${Math.round(data.main.temp)}°C</h1>
      <p>${data.weather[0].description}</p>
      <p>💧 Humidity : ${data.main.humidity}%</p>
      <p>💨 Wind Speed : ${data.wind.speed} km/h</p>
      <p>📍 Pressure : ${data.main.pressure} hPa</p>`;
  } catch (err) {
    console.error(err);
    document.getElementById("weatherBox").innerHTML =
      "<p style='color:red;'>Failed to fetch data. Check your connection or API key.</p>";
  }
}
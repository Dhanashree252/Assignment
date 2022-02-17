window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")
    let para = document.querySelector(".location img")
    let temperatureSection = document.querySelector(".degree-section")
    let temperatureSpan = document.querySelector(".temperature span")
    console.log(temperatureSection)
    console.log(temperatureSpan)
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const api = `http://api.weatherapi.com/v1/current.json?key=3fd124567cfa4ae1ada115123221602&q=${lat},${long}&aqi=yes`
            
            fetch(api)
            .then(Response => {
                return Response.json()
            })
            .then(data => {
                console.log(data)
                const temperature = data["current"]["temp_c"]
                const temperatureF = data["current"]["temp_f"]
                const summary = data["current"]["condition"]["text"]
                const icon = data["current"]["condition"]["icon"]
                para.src = icon
                const location = data["location"]["name"]
                const region = data["location"]["region"]
                const country = data["location"]["country"]

                temperatureDegree.textContent = temperature
                locationTimezone.textContent = `${location}, ${region}, ${country}`
                temperatureDescription.textContent = summary

                // change temperature to celsius/ Farenheit
                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "°C"){
                        temperatureSpan.textContent ="F"
                        temperatureDegree.textContent = temperatureF
                    }else{
                        temperatureSpan.textContent = "°C"
                        temperatureDegree.textContent = temperature
                    }
                })
            })
            })
    }else{
        h1.textContent = "Hey! this is not working"
    }
})

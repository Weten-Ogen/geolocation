const btn = document.querySelector('button');

btn.addEventListener('click', ()=>{
    if(navigator.geolocation){

        button.innerText = 'Allow to detect location';
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }
        button.innerText = "Your browser do not support";
});

function onSuccess(position){
    let { latitude, longitude } = position.coords;
    
    button.innerText = "Detecting your location ...";
    //http://i.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY
    fetch('http://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY')
    .then(response => response.json())
    .then(result => {
        let allDetails = result.results[0].components;
        let { county, postcode, country } = allDetails ;
        button.innerText = `${county} ${postcode}, ${country}`;
    })
}

function onError(error){
    if(error.code == 1){
        button.innerText = 'You denied the request';}
    else if(error.code == 2){
        button.innerText = " Location not available"
    }
    else{
        button.innerText = 'Something went wrong';
    }
    button.setAttribute('disabled','true');
}
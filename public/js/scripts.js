console.log('Client side script loaded!');

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');

if(weatherForm) {
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/weather?address=' + address.value)
        .then((response) => {
            response.json().then(data => {
                document.querySelector('h3').innerText = data.placeName;
                document.querySelector('p').innerText = 'The temperature is currently ' + data.temperature;
            });
        })
        .catch(err => console.log(err));
    });
}

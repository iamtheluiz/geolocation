const { connect } = require('socket.io-client');
const getDistanceFromLatLonInKm = require('./utils/getDistanceFromLatLonInKm')

const marks = [
  {
    latitude: -24.174888,
    longitude: -46.779945,
  },
  {
    latitude: -24.177427,
    longitude: -46.776472,
  },
  {
    latitude: -24.181536, 
    longitude: -46.784764,
  },
  {
    latitude: -24.178365,
    longitude: -46.786824,
  }
]
let counter = 0;
let previous = 0;
let speed = 20; // km/h
let currentPosition = {
  latitude: '',
  longitude: ''
}
let previousPosition = {
  latitude: '',
  longitude: ''
}

const socket = connect('http://127.0.0.1:3333', {
  query: {
    "name": "BUS-001",
    "type": "bus"
  }
})

currentPosition = marks[0]
previousPosition = marks[0]

setInterval(() => {
  const latitudeA = currentPosition.latitude
  const longitudeA = currentPosition.longitude

  const latitudeB = marks[1].latitude
  const longitudeB = marks[1].longitude

  let sideA = 0;
  let sideB = 0;

  if (latitudeB > latitudeA) {
    sideA = latitudeA - latitudeB;
  } else {
    sideA = latitudeB - latitudeA;
  }

  const hip = getDistanceFromLatLonInKm(latitudeA, longitudeA, latitudeB, longitudeB);
  const coeficienteAngular = (longitudeA - longitudeB) / (latitudeA - longitudeB)
  const n = longitudeA - (coeficienteAngular*latitudeA)

  const angulo = Math.atan(coeficienteAngular)

  var earth = 6378.137,  //radius of the earth in kilometer
    pi = Math.PI,
    m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree
    
  const CA = Math.cos(angulo) * 0.0001
  const CO = coeficienteAngular * CA + n

  var newLatitude = latitudeA + (CA);
  var newLongitude = longitudeA + (CO) / Math.cos(latitudeA * (pi / 180));

  currentPosition = { latitude: newLatitude, longitude: newLongitude }

  socket.emit('location', { latitude: newLatitude, longitude: newLongitude })
  counter++
  console.log('send!')
}, 500)
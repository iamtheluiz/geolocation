const { connect } = require('socket.io-client');

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

const socket = connect('http://127.0.0.1:3333', {
  query: {
    "name": "BUS-001",
    "type": "bus"
  }
})

setInterval(() => {
  console.log(marks[counter % marks.length])

  socket.emit('location', marks[counter % marks.length])
  counter++;
  console.log('send!')
}, 500)
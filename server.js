'use strict' ;


const express = require('express') ;
const server = express();
const cors = require('cors');

server.use(cors());
require('dotenv').config();


const PORT = process.env.PORT || 3000 ;


server.listen(PORT,() => console.log('i am listening ^^') ) ;

server.get('/', (request , response) => {
  response.status(200).send('works!!');
});

function Display(data){
  this.formatted_query = data.display_name ;
  this.latitude = data.lat ;
  this.longitude = data.lon ;
}
server.get('/location',(request,response)=> {
  const location_data = require('./data/geo.json')[0] ;
  let newObj = new Display(location_data) ;
  response.status(200).send(newObj) ;

})

// constructor for the weather feature . . .
function Deploy(data_1,data_2){
  this.forecast = data_2
  this.time = data_1
  Deploy.all.push(this)
}
Deploy.all = [] ;


server.get('/weather',(request,response)=> {
  // response.status(200).send('still works!') ;
  const data_prep = require('./data/darksky.json') ;
  let information = data_prep.daily
  let daily_info = information.data;
  // console.log(date1.toString())
  // console.log(date.data.length)
  for(let i=0;i<daily_info.length;i++){
    let output_1 = new Date(daily_info[i].time * 1000).toString();
    let output_2 = daily_info[i].summary ;
    new Deploy(output_1,output_2);


  }
  response.send(Deploy.all)

})


// for checking the errors . . .
server.use((error, request , response) => {
  response.status(500).send(error);
});
server.use('*',(request , response) => {
  response.status(404).send('Ooops Not Found !!');
});



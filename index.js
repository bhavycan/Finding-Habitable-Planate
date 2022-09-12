const { parse } = require('csv-parse');
const fs = require('fs');

const result = [];
const isheabitableplanet_array = [];

function isheabitableplanet(data){
  if( data['koi_disposition'] === 'CONFIRMED'
  && data['koi_insol'] > 0.36 && data['koi_insol'] < 1.11
  && data['koi_prad'] < 1.6){
    return true;
  }
  else{
    return false;
  }
}

fs.createReadStream('kepler_data.csv')
.pipe(parse({
    comment : '#',
    columns : true,
}))
.on('data', function(data){
    if(isheabitableplanet(data) === true){
        isheabitableplanet_array.push(data);
    }
    result.push(data);

})
.on('error',function(err) {
    console.log(err);
})
.on('end',function(){
    console.log(isheabitableplanet_array.map(function(data){
        return data['kepler_name'];
    }))
    // console.log(isheabitableplanet_array);
    console.log(`You find the total: ${isheabitableplanet_array.length}`);
});

const { parse } = require('csv-parse');
const fs = require('fs');

const result = [];
const isheabitableplanate_array = [];

function isheabitableplanate(data){
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
    if(isheabitableplanate(data) === true){
        isheabitableplanate_array.push(data);
    }
    result.push(data);

})
.on('error',function(err) {
    console.log(err);
})
.on('end',function(){
    console.log(isheabitableplanate_array.map(function(data){
        return data['kepler_name'];
    }))
    // console.log(isheabitableplanate_array);
    console.log(`You find the total: ${isheabitableplanate_array.length}`);
});

const file = require('fs');

file.readFile('./teste.txt', {encoding: 'utf-8', flag: 'r'}, 
    function(err, data){
        if(!err){
            console.log(data);
        }
});
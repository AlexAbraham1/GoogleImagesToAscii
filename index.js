/* Example usage script.
 *
 * Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ 
 */

var ImageToAscii = require ("./lib/image-to-ascii");
var readline = require('readline');
var request = require('request');

myImage = new ImageToAscii ({
    resize: {
        height: "75%"
      , width:  "75%"
    }
  , multiplyWidth: 1
  , colored: true
});

var rl = readline.createInterface({

  input: process.stdin,
  output: process.stdout

});

function start() {

    rl.question("What would you like to search for? ", function(query) {

        searchImage(query);
        rl.close();

    });
    
};


function searchImage(query) {

    var url = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + (query.replace(/\s/g, '+'));

    request({

        url: url,
        json: true

    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            image = body.responseData.results.shift();


            myImage.convert(image.url, function(err, converted) {
                console.log(err || converted);
            });
            

        }

    });

}

start();

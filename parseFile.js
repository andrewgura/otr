var parseFile = async function(txtFile, sortStyle, res){

  var fileName = txtFile ? txtFile : process.argv.slice(2)[0];
  var sortType = sortStyle ? sortStyle : process.argv.slice(2)[1];

  var data = [];

  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fileName)
  });


  lineReader.on('line', await function (line) { //Checking to see which way the each detail has been seperated, read line by line of txt file
      if(line.indexOf("|") > 0){
      line = line.split(" |");
    } else if(line.indexOf(",") > 0){
      line = line.split(",");
    } else {
      line = line.split(" ");
    }

    var person = {lastName: line[0].trim(), firstName: line[1].trim(), gender: line[2].trim(), color: line[3].trim(), dob: line[4].trim()}; //Trimming all white space that may have been missesd
    data.push(person)
  }).on('close', await function () {
    switch(sortType) {
    case "gender":
      data.sort((a, b) => b.lastName < a.lastName); //Sort last names first, A-Z
      data.sort((a, b) => b.gender < a.gender); //Sort by gender Female to Male
      break;
    case "birthdate":
      data.sort((a, b) => new Date(b.dob) < new Date(a.dob)); //Sort Oldest to Youngest
      break;
    case "name":
      data.sort((a, b) => b.lastName > a.lastName); //Sort by last name Z-A
      break;
    default:
  }
    console.table(data)
    txtFile ? res.json(data) : null;
  })
}

  module.exports = parseFile;

/*
If you just want to run from command line, call function this way to avoid error when running with server
To run parseFile from command line, navigate to this folder and:
node parseFile.js textfile.txt gender
node parseFile.js textfile.txt birthdate
node parseFile.js textfile.txt name
textfile.txt can be changed to another text file assuming its in the same directory as the js file
*/

if(process.argv.length == 4) parseFile();

var fs = require('fs'),
    path = require('path'),
    https = require('https'),
    ignorePath = path.join(process.cwd(), '.gitignore');

function download(){
  https.get('https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore', function(res){
    var ws = fs.createWriteStream(ignorePath);
    res.pipe(ws);
  }).on('error', function(err){
    throw err;
  });
}

function copy(){
  var rs = fs.createReadStream(path.join(__dirname, 'gitignore')),
      ws = fs.createWriteStream(ignorePath);
  rs.pipe(ws).on('error', function(err){
    throw err;
  });
}

module.exports = function(isDownload){
  if (isDownload) {
    download();
  } else {
    copy();
  }
}

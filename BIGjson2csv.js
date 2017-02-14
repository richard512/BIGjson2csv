var json2csv = require('json2csv');
var fs = require('fs');

filePath = 'inputfile.json'

var fs = require('fs'),
    JSONStream = require('JSONStream'),
    es = require('event-stream');

var getStream = function() {
    var stream = fs.createReadStream(filePath, { encoding: 'utf8' }),
        parser = JSONStream.parse('*');
    return stream.pipe(parser);
};

linenum = 0
getStream()
    .pipe(es.mapSync(function(data) {
        linenum++
        isFirstLine = linenum == 1 ? true : false;
        json2csv({ data: data, hasCSVColumnTitle: isFirstLine }, function(err, csv) {
            if (err) console.log(err);
            console.log(csv);
        });
    }));

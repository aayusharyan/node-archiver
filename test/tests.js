var crypto = require('crypto');

var archive = require('../lib/archive');

module.exports = {
  buffer: function(test) {
    test.expect(1);

    var hash = crypto.createHash('sha1');
    var zip = archive.createZip({level: 1});

    // create a buffer and fill it
    var buf = new Buffer(20000);

    for (var i = 0; i < 20000; i++) {
      buf.writeUInt8(i&255, i);
    }

    zip.addFile(buf, {name: 'buffer.out', date: new Date('April 13, 2011 CET')}, function() {
      zip.finalize();
    });

    zip.on('data', function(data) {
      hash.update(data);
    });

    zip.on('end', function() {
      var digest = hash.digest('hex');
      test.equals(digest, '5641d2b95f2cadaabcc22a7d646bfd41036c347d', 'data hex values should match.');
      test.done();
    });
  },

  store: function(test) {
    test.expect(1);

    var hash = crypto.createHash('sha1');
    var zip = archive.createZip({level: 1});

    // create a buffer and fill it
    var buf = new Buffer(20000);

    for (var i = 0; i < 20000; i++) {
      buf.writeUInt8(i&255, i);
    }

    zip.addFile(buf, {name: 'buffer.out', date: new Date('April 13, 2011 CET'), store: true}, function() {
      zip.finalize();
    });

    zip.on('data', function(data) {
      hash.update(data);
    });

    zip.on('end', function() {
      var digest = hash.digest('hex');
      test.equals(digest, 'a777c51ca558e9a2ff36f1f9b7fc70b95560df28', 'data hex values should match.');
      test.done();
    });
  }
};
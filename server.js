let connect = require('connect');
let serveStatic = require('serve-static');

connect().use(
    serveStatic('../sportstore_es6')
).listen(5000);
const config = require('./config.json');
const server = require('./server');

const port = config.application.port || 80;

(async ()=>{

    await server.listen(port);
    console.log('Server starting on port '+port);

})()

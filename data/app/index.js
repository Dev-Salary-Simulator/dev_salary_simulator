const { app : server, PORT } = require('./server');

server.listen(PORT, () => console.log(`Listening on port ${PORT}`) );
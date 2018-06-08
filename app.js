const Hapi = require("hapi");
const Joi = require("joi");

// Nic Raboy code from YouTube Video wasn't working for me

// const server = new Hapi.Server();
//
// server.connection({
//     "host": "localhost",
//     "port": 3000
// });

// My code to get server started

const server = Hapi.server({
    port: 4000,
    host: 'localhost'
});

server.route({
    method: "GET",
    path: "/",
    handler: (request, response) => {
        return 'Hello World, welcome to my Hapi page tutorial from Nic Raboy with updated code ' +
            'Check it out <a href="https://www.youtube.com/watch?v=AW3IAVOUFMg">here</a>';
    }
});

server.route({
    method: "GET",
    path: "/account/{username}",
    handler: (request, reply) => {
        var accountMock = {};
        if (request.params.username === 'nraboy') {
            accountMock = {
                "username": "nraboy",
                "password": "1234",
                "twitter": "@nraboy",
                "website": "https://www.thepolyglotdeveloper.com"
            }
        }
        return accountMock;
    }
});

// Nic Raboy code from YouTube Video wasn't working for me
// server.route({
//     method: "POST",
//     path: '/account',
//     handler: (request, response) => {
//         response(request.payload);
//     }
// });

// My updated code after researching documentation/other resources

server.route({
    method: "POST",
    path: "/account",
    config: {
        validate: {
            payload: {
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            },
            query: {
                alert: Joi.boolean().default(false)
            }
        }
    },
    handler: (request, response) => {
        console.dir(request.query);
        let payload = request.payload
        return payload
    }
});

server.start(error => {
    if (error) {
        throw error;
    }
    console.log("Listening at " + server.info.uri);
});
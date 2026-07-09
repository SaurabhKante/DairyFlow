const swaggerdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Dairy API",
            version: "1.0.0",
            description: "Dairy application Express Swagger Documentation"
        },

        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
                }
            }
        }
    },

    apis: ["./routes/**/*.js"]
};

const swaggerSpec = swaggerdoc(options);

module.exports = swaggerSpec;
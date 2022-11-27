const Joi = require("joi");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const config = {
  client_id: '981f7cc6e29083d7a88f',
  redirect_uri: 'http://localhost:3000/login',
  client_secret: 'fbc97754b976a1c0a9fe3986340c9fd5ea5000ee',
  proxy_url: 'http://localhost:5000/authenticate'
};

const envVarsSchema = Joi.object({
  client_id: Joi.string().required(),
  redirect_uri: Joi.string().required(),
  client_secret: Joi.string().required(),
  proxy_url: Joi.string().required()
});

const { error } = envVarsSchema.validate(config);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = config;

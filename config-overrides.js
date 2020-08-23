const rewireYAML = require('react-app-rewire-yaml');

module.exports = function override(config, env) {
    return rewireYAML(config, env);
}

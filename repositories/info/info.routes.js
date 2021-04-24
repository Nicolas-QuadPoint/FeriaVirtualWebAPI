const _infoRepository = require('./info.repository');

module.exports = function(objetoRouter){

    const infoRepository = _infoRepository();

    objetoRouter.route('/info/api-objects/:objectid')
        .get(infoRepository.getAPIObjects);

}
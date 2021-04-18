const _authRepository = require('./auth.repository');

module.exports = function(objetoRouter){

    const authRepository = _authRepository();

    objetoRouter.route('/auth/login')
        .post(authRepository.login);
    
    objetoRouter.route('/auth/logout')
        .get(authRepository.logout);

}
import _authRepository from './auth.repository.js';

export default function(objetoRouter){

    const authRepository = _authRepository();

    objetoRouter.route('/login')
        .post(authRepository.login);
    
    objetoRouter.route('/logout')
        .post(authRepository.logout);

}
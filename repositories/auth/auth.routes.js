import _authRepository from './auth.repository';

export default function(objetoRouter){

    const authRepository = _authRepository();

    objetoRouter.route('/auth/login')
        .post(authRepository.login);
    
    objetoRouter.route('/auth/logout')
        .post(authRepository.logout);

}
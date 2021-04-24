import _infoRepository from './info.repository';

export default function(objetoRouter){

    const infoRepository = _infoRepository();

    objetoRouter.route('/info/api-objects/:objectid')
        .get(infoRepository.getAPIObjects);

}
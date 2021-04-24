class Entity {

    constructor(){
    }

    //https://stackoverflow.com/a/52315304
/*
    constructor(props = {}){
        Object.assign(this,props);
    }
*/

    buildFromObject(obj = {}){
        Object.assign(this,props);
    }

    buildFromArray(arr = []){

        for(var i = 0; i < arr.length; i++){
            //Do nothing
        }
    }

    validate(){
        return false;
    }


}

module.exports = Entity;
import { API } from './link'

export const getImg = (path, fileName) => {
    return require(`../Assets/Image/${path}/${fileName}`);
}

export const renameImg = (path) => {
    return API + path.replace('\\', '/')
}
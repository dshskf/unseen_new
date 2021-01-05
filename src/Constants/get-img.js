import { API } from './link'

export const getImg = (path, fileName) => {
    return require(`../Assets/Image/${path}/${fileName}`);
}

export const renameImg = (path) => {
    if (!path) {
        return getImg("Account", "guest.png")
    } else if (path.includes('http:')) {
        return (path)
    }
    return API + path.replace('\\', '/')
}

export const defaultProfile = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
import * as cryptr from 'cryptr'

const aes = new cryptr('UNSEEn')

export const encrypt = (text) => {
    return aes.encrypt(text)
}

export const decrypt = (text) => {
    return aes.decrypt(text)
}
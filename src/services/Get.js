import Axios from "axios"

import { OfflineRoot, OnlineRoot} from './Config'

const Get = (path, root) => {
    const promise = new Promise((resolve, reject) => {
        Axios.get(`${root ? OnlineRoot : OfflineRoot}/${path}`)
        .then(result => {
            resolve(result)
        }, err => {
            reject(err)
        })
    })
    return promise
}

export default Get
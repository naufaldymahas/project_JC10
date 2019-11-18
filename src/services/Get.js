import Axios from 'axios'
import { OfflineRoot, OnlineRoot} from './Config'

const Get = (path, root, params) => {
    const promise = new Promise((resolve, reject) => {
        Axios.get(`${root ? OnlineRoot : OfflineRoot}/${path}`, {
            params
        })
        .then(result => {
            resolve(result)
        }, err => {
            reject(err)
        })
    })
    return promise
}

export default Get
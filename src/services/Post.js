import Axios from "axios"

import { OfflineRoot, OnlineRoot} from './Config'

const Post = (path, root, data) => {
    const promise = new Promise((resolve, reject) => {
        Axios.post(`${root ? OnlineRoot : OfflineRoot}/${path}`,data)
        .then(result => {
            resolve(result)
        }, err => {
            reject(err)
        })
    })
    return promise
}

export default Post
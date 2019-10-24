import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Edit from '../../components/Profile/Edit'
import API from '../../services'

const Profile = () => {

    const user = useSelector(state => state.authReducer)

    const [ data, setData ] = useState([])

    useEffect(() => {
        if (user.email) {
            const { id } = user
            API.getAddress({id: id})
            .then(res => setData(res.data))
            .catch(err => console.log(err))
        }
    }, [user])

    return (
        <Fragment>
            <div className="text-center">
                <h4 className="mt-3"><a href="/">Home</a></h4>
            </div>
            <div className="container">
                <Edit user={user} dataAddress={data}/>
            </div>
        </Fragment>
    )
}

export default Profile

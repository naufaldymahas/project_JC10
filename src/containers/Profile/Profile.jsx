import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Edit from '../../components/Profile/Edit'
import API from '../../services'

const Profile = () => {

    const user = useSelector(state => state.authReducer)

    const [ data, setData ] = useState([])

    const [ render, setRender ] = useState()

    useEffect(() => {
        if (user.email) {
            const { id } = user
            API.getAddress({id: id})
            .then(res => setData(res.data))
            .catch(err => console.log(err))
        }
    }, [user, render])

    return (
        <Fragment>
            <div className="text-center">
                <h4 className="mt-3" style={{ height: "45px" }}>
                    <a href="/">
                        <img className="h-100" src={require('../../assets/logo-02.png')} alt="Home"/>
                    </a>
                </h4>
            </div>
            <div className="container">
                <Edit render={ render } setRender={ setRender } user={user} dataAddress={data}/>
            </div>
        </Fragment>
    )
}

export default Profile

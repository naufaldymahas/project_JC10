import React, { useState, Fragment, useEffect } from 'react'
import API from '../../services'
import moment from '../../../../my-api/node_modules/moment/moment'

const Customers = () => {

    const [ users, setUsers ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const getUsersAPI = () => {
        API.getAllCustomers()
        .then(res => setUsers(res.data))
    }

    useEffect(() => {
        getUsersAPI()
        setTimeout(() => {
            setLoading(false)
        }, 800);
    }, [])

    const renderList = () => {
        let render = users.map( (user, index) => {
            return (
                <tr key={ user.id }>
                    <td>{ index + 1 }</td>
                    <td>{ user.fullName }</td>
                    <td>{ user.email }</td>
                    <td>{ user.totalTransaction }</td>
                    <td>{ moment(user.lastLogin).format('YYYY-MM-DD kk:mm:ss') }</td>
                </tr>
            )
        } )
        return render
    }

    console.log(users)

    return (
       <Fragment>
            <div>
                <span style={{fontSize: "30px"}}>Customers</span>
            </div>
            <div className="mt-3">
                {loading ? 
                <div className="text-center my-5">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
                
                : 

                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total Transaction</th>
                            <th>Last Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderList()}
                    </tbody>
                </table>
                }
                
            </div>
        </Fragment>
    )
}

export default Customers

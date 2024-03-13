import React from 'react'
import { MdDelete } from 'react-icons/md'
import { db } from '../firebase.confing'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from '../custom-hooks/useGetData'
import { toast } from 'react-toastify'

const Users = () => {

    const { data: usersData, loading } = useGetData("users")
    const deleteUsers = async (id) => {
        deleteDoc(doc(db, 'users', id))
        toast.success('User deleted!')
    }

    return (
        <section>
            <div className='container'>
                <h4>Users</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr><td colSpan={4}><h5 className='py-5'>Loading...</h5></td></tr> :
                                usersData.map(userItem => (
                                    <tr key={userItem.uid}>
                                        <td><img src={userItem.photoURL} alt="" className='ec-img-cart-product' /></td>
                                        <td>{userItem.displayName}</td>
                                        <td>{userItem.email}</td>
                                        <td>
                                            <button onClick={() => deleteUsers(userItem.uid)} className='btn'><MdDelete color='red' fontSize={20} /></button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Users
import React, {useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux';
import * as usersActions from '../actions/users.action';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
const UploadForm = () => {
    const [loadingUsers, setLoadingUsers] = useState(true)
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        const users = state.users
        const fetchUsers = async () => {
            await dispatch(usersActions.fetchUsers())
        }
        if (loadingUsers) {
            fetchUsers()
            if(users && users!==null){
                setLoadingUsers(false)
            }
        }
    }, [state.users]);
    if (loadingUsers) {
        return   <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
        />
    }else{
        // called every time a file's `status` changes
        const handleChangeStatus = ({ meta, file }, status) => {
        }

        // receives array of files that are done uploading when submit button is clicked
        const handleSubmit = async (files) => {
            setLoadingUsers(true)
            await dispatch(usersActions.createUsers(files))
        }
        return (
            <div className="container">
                <Dropzone
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    accept=".json"
                />
                <div>
                    <h1>Uploaded users</h1>
                    <ul>
                        {state.users.map((item, index) => (
                            <li key={item._id}>{item.email} {item.password}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
export default UploadForm;

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/Auth/AuthSlice';

function LogoutPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        const LogOut = () => {
            dispatch(logout());
        }
        LogOut();
    })
    return (
        <div>
            Cikis Yapiliyor
        </div>
    )
}

export default LogoutPage
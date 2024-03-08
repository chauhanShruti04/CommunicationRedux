import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Redux/Slice";

export const LogOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setLoggedInUser([]));
        navigate("/");
    }, [])

    return (
        <>

        </>
    )
}
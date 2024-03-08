import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const Welcome = () => {

    const loggedInUser = useSelector((state) => state.user.loggedInUser);

    const [userName, setUserName] = useState("");


    useEffect(() => {
        if (loggedInUser && loggedInUser.length > 0) {
            setUserName(loggedInUser[0]?.username);
        }
    }, [loggedInUser]);


    return (
        <div >
            <div className='welcome'>
                <h1>Login Successful!!   Welcome!</h1>
            </div>
            <div className='username'>
                <p>{userName}</p>
            </div>
        </div>
    );
};

export default Welcome;




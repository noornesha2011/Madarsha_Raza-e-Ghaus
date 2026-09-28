import { useEffect } from "react";
import { getTokenExpiry, logout } from "../../utills/authUtills";
const AuthExpiryHandler = () => { 
    useEffect(() => { const expiry = getTokenExpiry(); 
        if (!expiry) return;
        const remainingTime = expiry - Date.now();
        if (remainingTime <= 0) {
            logout();
            return;

        } const timer = setTimeout(() => { 
            logout();
        }, remainingTime);
        return () => clearTimeout(timer);
    }, []);
    return null;
};

export default AuthExpiryHandler;
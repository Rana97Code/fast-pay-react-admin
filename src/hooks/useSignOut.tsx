import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");


        navigate("/signin");
    };

    return signOut;
};

export default useSignOut;

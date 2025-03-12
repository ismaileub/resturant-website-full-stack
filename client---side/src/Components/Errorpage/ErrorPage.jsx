import React from 'react';
import img from '../../assets/icon/404.gif'

import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }
    return (
        <div className='  flex justify-center items-center'>
            <div>
                <img src={img} alt="" />

                <button
                    onClick={goToHome}
                    type="submit"
                    className="mx-auto px-6 py-3 bg-gradient-to-r from-[#835D23] to-[#B58130]   text-white font-semibold rounded hover:bg-yellow-700 transition flex items-center justify-center gap-2"
                >
                    Back To Home{" "}
                    <span role="img" aria-label="send-icon">
                        <FaHome size={25} />
                    </span>
                </button>
            </div>

        </div>
    );
};

export default ErrorPage;
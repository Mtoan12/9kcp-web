import axios from 'axios';
import { API_URL } from 'constants/constance';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeliveryModal } from './DeliveryModal';
import { setAddress } from 'redux/slices/address';

const Delivery = ({ deliveryAddress, setDeliveryAddress }) => {
    const [isShow, setIsShow] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/login');
        }

        const fetchAddress = async () => {
            try {
                const rs = await axios.get(`${API_URL}/delivery`);
                rs.data &&
                    rs.data.delivery &&
                    setDeliveryAddress({
                        ...deliveryAddress,
                        ...rs.data.delivery,
                        isSubmit: true,
                    });
            } catch (error) {
                console.log(error);
            }
        };

        fetchAddress();
    }, [user, navigate]);

    useEffect(() => {
        dispatch(setAddress(deliveryAddress));
    }, [dispatch, deliveryAddress]);
    return (
        <div className="flex items-center gap-1">
            <span className="font-semibold">Địa chỉ giao hàng:</span>
            <span>
                {deliveryAddress.isSubmit &&
                    `${deliveryAddress.address}, ${deliveryAddress.district}, ${deliveryAddress.province}`}
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer hover:opacity-50 hover-effect pointer-events-auto"
                onClick={() => {
                    setIsShow((prevIsShow) => !prevIsShow);
                }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
            </svg>
            <DeliveryModal
                isShow={isShow}
                setIsShow={setIsShow}
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
            />
        </div>
    );
};
export default Delivery;

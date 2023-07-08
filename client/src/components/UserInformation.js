import UserMenu from './UserMenu';
import Delivery from './Delivery';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserInformation = () => {
    useEffect(() => {
        document.title = 'Thông tin tài khoản';
    }, []);

    const [deliveryAddress, setDeliveryAddress] = useState({
        isSubmit: false,
        province: '',
        district: '',
        address: '',
    });
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col justify-center gap-5">
            <UserMenu />
            <span className="uppercase">Thông tin tài khoản</span>
            {user && (
                <div className="flex flex-col">
                    <p>
                        <span className="font-semibold"> Họ tên:</span> {user.name}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <Delivery
                        deliveryAddress={deliveryAddress}
                        setDeliveryAddress={setDeliveryAddress}
                    />
                </div>
            )}
        </div>
    );
};
export default UserInformation;

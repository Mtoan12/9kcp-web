import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Delivery from './Delivery';
import UserMenu from './UserMenu';

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

    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <div className="flex flex-col justify-center gap-5">
            <UserMenu />
            <span className="uppercase">Thông tin tài khoản</span>
            {isAuthenticated && (
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

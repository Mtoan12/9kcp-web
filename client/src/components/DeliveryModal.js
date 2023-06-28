import { Button, Input, Modal, Select, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/constance';

export const DeliveryModal = ({ isShow, setIsShow, deliveryAddress, setDeliveryAddress }) => {
    const area = window;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [address, setAddress] = useState('');

    useEffect(() => {
        setProvinces(area.c);
        setAddress(deliveryAddress.address);
        setProvince(deliveryAddress.province);
        setDistrict(deliveryAddress.district);
    }, []);
    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            const data = {
                province,
                district,
                address,
            };
            console.log(data);
            const rs = deliveryAddress.isSubmit
                ? await axios.put(`${API_URL}/delivery`, data)
                : await axios.post(`${API_URL}/delivery`, data);

            message.success('Cập nhật địa chỉ thành công');
            setDeliveryAddress({ ...deliveryAddress, ...data, isSubmit: true });
            setIsShow(false);
        } catch (error) {
            message.error('Cập nhật địa chỉ thất bại');
        } finally {
            setConfirmLoading(false);
        }
    };
    const handleCancel = () => {
        setIsShow(false);
    };

    const onProvinceChange = (value) => {
        setProvince(area.c[value]);
        setDistricts(area.arr[value]);
    };

    const onDistrictChange = (value) => {
        setDistrict(districts[value]);
    };

    const onSearch = (value) => {};
    return (
        <Modal
            title="Địa chỉ giao hàng"
            open={isShow}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button key={'ok'} onClick={handleOk}>
                    Xác nhận
                </Button>,
            ]}
        >
            <div className="grid grid-cols-2 my-5 gap-x-2 gap-y-4">
                <div>
                    <Select
                        showSearch
                        placeholder="Tỉnh/Thành"
                        optionFilterProp="children"
                        onChange={onProvinceChange}
                        onSearch={onSearch}
                        className="w-full"
                        value={province}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={provinces.map((province, index) => {
                            return {
                                value: index,
                                label: province,
                            };
                        })}
                    />
                </div>
                <div>
                    <Select
                        showSearch
                        placeholder="Quận/Huyện"
                        optionFilterProp="children"
                        onChange={onDistrictChange}
                        onSearch={onSearch}
                        className="w-full"
                        value={district}
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={districts.map((province, index) => {
                            return {
                                value: index,
                                label: province,
                            };
                        })}
                    />
                </div>
                <div className="col-span-2">
                    <span className="text-gray-400">Địa chỉ:</span>

                    <Input
                        size="small"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
};

import { Button, Modal, Select, message } from 'antd';
import UploadImage from './UploadImage';
import { useEffect, useRef, useState } from 'react';
import { API_UPLOADS, API_URL } from './../constants/constance';
import axios from 'axios';
import { sortByCreateAt } from '../utils/sortByCreate';
import { useNavigate } from 'react-router-dom';

const AdminProductModal = ({ isShow, setIsShow, method, products, setProducts, productEdit }) => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [inStock, setInStock] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (method === 'put' && productEdit) {
            const { _id, title, brand, category, inStock, price, imageName } = productEdit;
            setTitle(title);
            setBrand(brand);
            setCategory(category);
            setInStock(inStock);
            setPrice(price);
            setImage(imageName || `${_id}.webp`);
        } else {
            setTitle('');
            setBrand('');
            setCategory('');
            setInStock(0);
            setPrice(0);
        }
    }, [productEdit]);

    const handleOk = () => {
        setIsShow(false);
    };
    const handleCancel = () => {
        setIsShow(false);
    };

    const navigate = useNavigate();

    const handleSubmitForm = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            console.log(image);
            formData.append('image', image);
            formData.append('info', JSON.stringify({ title, brand, price, inStock, category }));
            if (method === 'post') {
                const rs = await axios.post(`${API_URL}/product/add-product`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (rs.data.success) {
                    message.success('Thêm thành công');
                    setProducts(sortByCreateAt([...products, rs.data.newProduct]));
                }
            }

            if (method === 'put') {
                const rs = await axios.put(
                    `${API_URL}/product/detail/${productEdit?._id}`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );

                if (rs.data.success) {
                    message.success('Cập nhât thành công');
                    setProducts(sortByCreateAt([...products, rs.data.newProduct]));
                }
            }

            navigate(0);
        } catch (error) {
            console.log(error);
            message.error('Tạo thất bại');
        }
    };

    const imageRef = useRef();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
        setShow(false);
        const files = e.target.files;
        if (FileReader && files && files.length) {
            const fr = new FileReader();
            fr.onload = function () {
                imageRef.current.src = fr.result;
            };
            fr.readAsDataURL(files[0]);
        }
        imageRef.current.classList.remove('hidden');
    };
    return (
        <div>
            <Modal
                title={`${method === 'post' ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}`}
                open={isShow}
                onCancel={handleCancel}
                footer={[]}
            >
                <form onSubmit={handleSubmitForm}>
                    <div className="grid grid-cols-12 gap-y-4">
                        <div className="col-span-12 flex flex-col gap-1">
                            <label htmlFor="image">Hình ảnh: </label>
                            <div>
                                <img
                                    className={`w-full ${!show && 'hidden'}`}
                                    src={`${API_UPLOADS}/${image}`}
                                    alt=""
                                />
                                <img ref={imageRef} className="w-full hidden" src={''} alt="" />
                            </div>
                            <input
                                type="file"
                                name="image"
                                className="input-group input-file"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="col-span-12">
                            <label htmlFor="title">Tên sản phẩm: </label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col mr-7">
                            <label htmlFor="brand">Danh mục: </label>
                            <Select
                                showSearch
                                placeholder="Chọn danh mục"
                                optionFilterProp="children"
                                value={category}
                                onChange={(value) => setCategory(value)}
                                filterOption={(input, option) =>
                                    (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={[
                                    {
                                        value: 'BÀN PHÍM CƠ',
                                        label: 'Bàn phím cơ',
                                    },
                                    {
                                        value: 'KEYCAP',
                                        label: 'Keycap',
                                    },
                                    {
                                        value: 'KIT',
                                        label: 'Kit',
                                    },
                                ]}
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="brand">Thương hiệu: </label>
                            <input
                                type="text"
                                name="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="price">Giá tiền: </label>
                            <input
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="inStock">Số lượng: </label>
                            <input
                                type="number"
                                name="inStock"
                                value={inStock}
                                onChange={(e) => setInStock(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleOk}
                        type="submit"
                        className="border-2 border-black bg-black text-white px-2 py-1 mt-5 hover:opacity-50 hover-effect"
                    >
                        Xác nhận
                    </button>
                </form>
            </Modal>
        </div>
    );
};
export default AdminProductModal;

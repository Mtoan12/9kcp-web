import { Button, Space, Table, message } from 'antd';
import AdminProductModal from './AdminProductModal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from 'constants/constance';

const AdminProductTable = ({ products, setProducts }) => {
    const [isShow, setIsShow] = useState(false);
    const [method, setMethod] = useState('');
    const [product, setProduct] = useState('');
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    const handleAddClick = () => {
        setProduct(null);
        setIsShow(true);
        setMethod('post');
    };

    const handleEditClick = (e) => {
        setIsShow(true);
        const findProduct = products.find((product) => {
            return product._id === e.target.value;
        });
        setProduct({ ...findProduct });
        setMethod('put');
    };
    const handleDeleteClick = async (e) => {
        const productId = e.target.value;
        try {
            const rs = await axios.delete(`${API_URL}/product/detail/${productId}`);

            if (rs.data.success) {
                const index = products.findIndex((product) => product._id === productId);
                products.splice(index, 1);
                setProducts([...products]);
                message.success('Xóa thành công');
            }
        } catch (error) {
            console.log(error);
            message.error('Xoá sản phẩm thất bại');
        }
    };

    useEffect(() => {
        setColumns([
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Thương hiệu',
                dataIndex: 'brand',
                key: 'brand',
            },
            {
                title: 'Giá',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Số còn lại',
                dataIndex: 'inStock',
                key: 'inStock',
            },
            {
                title: 'Danh mục',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <Space size="middle">
                        <Button onClick={handleEditClick} value={record.id}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </Button>
                        <Button type="primary" danger onClick={handleDeleteClick} value={record.id}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </Button>
                    </Space>
                ),
            },
            {
                title: (
                    <Button onClick={handleAddClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </Button>
                ),
                dataIndex: 'add',
                key: 'add',
            },
        ]);
        setData(
            products.map((product) => {
                return {
                    key: product?._id,
                    id: product?._id,
                    title: product?.title,
                    brand: product?.brand,
                    price: product?.price,
                    inStock: product?.inStock,
                    category: product?.category,
                };
            })
        );
    }, [products]);

    return (
        <div className="flex">
            <Table columns={columns} dataSource={data} />
            <AdminProductModal
                isShow={isShow}
                setIsShow={setIsShow}
                method={method}
                products={products}
                setProducts={setProducts}
                productEdit={product}
            />
        </div>
    );
};
export default AdminProductTable;

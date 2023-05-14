import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    
    return <div>{id}</div>;
};

export default ProductDetailPage;

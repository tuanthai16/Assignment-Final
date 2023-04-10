import { Col, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../../types/product';
import { useEffect, useState } from 'react';
import axios from "axios";
const { Title, Text } = Typography;

const ProductDetail: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
  const { id } = useParams<{ id: string }>();
  const product: IProduct | undefined = products.find((p) => p.id == String(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const { name, price, image, categoryId, description } = product;

  return (
    <div style={{maxWidth: "60%", margin :"0 auto" , padding: "30px 0 50px"} }>
        <h3>Chi tiết sản phẩm</h3>
    <Row gutter={[16, 16]}>
      <Col xs={24} md={16}>
        <img src={image} alt={name} width={"100%"} style={{ maxWidth: '100%' }} />
      </Col>
      <Col xs={24} md={8}>
        <div style={{border: "1px solid #6666" ,padding: "10px", minHeight:"100%"}}>
        <Title level={3}>{name}</Title>
        <Text type="success">${price}</Text>
        <p>Category: {categoryId}</p>
        <p><span style={{fontWeight: '500'}}>Mô tả: </span> {description}</p>
        </div>
      </Col>
    </Row>
    </div>
  );
};

export default ProductDetail;
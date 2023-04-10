import { Card, Col, Rate, Row, Typography } from 'antd';
const { Title, Text } = Typography;
import { IProduct } from '../../../types/product';
import { Link } from "react-router-dom";
interface IProps {
    product: IProduct
}
const CardPage = (props: IProps) => {
    const { id, name, price, image, categoryId } = props.product;
    return (
        <Col key={id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/productDetails/${id}`} >
                <Card hoverable cover={<img src={image} alt={name} />}>
                    <Title level={5}>{name}</Title>
                    <Text type="success">${price}</Text>
                    {/* <Rate disabled defaultValue={rating} /> */}
                </Card>
            </Link>

        </Col>
    );

};

export default CardPage;
import { Row, Typography, Col, message, Form, Input } from 'antd';
import { IProduct } from '../../../types/product';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardPage from './Card';

const { Title, Text } = Typography;

const ProductList = () => {
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
    const [form] = Form.useForm();

    const handleSearch = (values: any) => {
        function searchKeyword(keyword: string, array: any) {
            const result = array.filter((item: any) => item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
            return result;
        }
        const filteredData = searchKeyword(values.searchText, products);
        if (filteredData.length > 0) {
            setProducts(filteredData);
            
        } else {
            axios.get('http://localhost:3000/products')
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            message.warning("Không tìm thấy sản phẩm");
        }
    };

    return (
        <div style={{ maxWidth: "60%", margin: "0 auto", padding: "30px 0 50px" }}>
            <div style={{ width: "100%", margin: "20px 0", padding: "5px 0", borderBottom: "1px solid #6666" }}><h3 style={{ fontWeight: "600" }}>Tất cả sản phẩm</h3></div>
            <Row>
                <Col md={8}></Col>
                <Col md={8}></Col>
                <Col md={8}>
                    <Form form={form} onFinish={handleSearch}>
                        <Form.Item name="searchText">
                            <Input.Search placeholder="Search" enterButton />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {products?.map(item => <CardPage key={item.id} product={item} />)}
            </Row>
        </div>
    );
};

export default ProductList;
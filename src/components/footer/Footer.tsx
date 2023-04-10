import { Layout, Row, Col, Typography, Divider } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const footer = () => {
    return (
        <div>
            <Footer style={{ backgroundColor: '#001529' }}>
                <Row gutter={[16, 16]} justify="space-between">
                    <Col xs={24} sm={24} md={8}>
                        <Title level={4} style={{ color: '#fff' }}>FPT POLYTECHNIC</Title>
                        <Text type="secondary" style={{ color: '#fff' }}>Địa chỉ: Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</Text>
                        <br />
                        <Text type="secondary" style={{ color: '#fff' }}>Email: tuantqph28635@fpt.edu.vn</Text>
                        <br />
                        <Text type="secondary" style={{ color: '#fff' }}>Điện thoại: 0385557883</Text>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Title level={4} style={{ color: '#fff' }}>ADMIN</Title>
                        <Link to={"/admin"}>Truy cập Admin</Link>
                        <br />
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <Title level={4} style={{ color: '#fff' }}>Mạng xã hội</Title>
                        <a href="https://facebook.com"><i className="fab fa-facebook fa-2x" style={{ color: 'white', marginRight: '16px' }}></i></a>
                        <a href="https://twitter.com"><i className="fab fa-twitter fa-2x" style={{ color: 'white', marginRight: '16px' }}></i></a>
                        <a href="https://instagram.com"><i className="fab fa-instagram fa-2x" style={{ color: 'white', marginRight: '16px' }}></i></a>
                    </Col>
                </Row>
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center' }}>© 2023 Công ty FPT. Tất cả các quyền được bảo lưu.</Text>
            </Footer>
        </div>
    );
};

export default footer;
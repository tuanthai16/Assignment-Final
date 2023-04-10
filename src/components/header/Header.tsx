import React, { useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
import {
    HomeOutlined,
    LogoutOutlined,
    ShoppingCartOutlined ,
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
    YoutubeOutlined,
    LoginOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const Header = () => {
    const [showChild, setShowChild] = useState<boolean>(false);

    function handleClick() {
        setShowChild(!showChild);
    }
    const menuItems = [
        {
            key: "home",
            icon: <HomeOutlined />,
            label: (
                <Link to={"/"} style={{ fontWeight: "500" , color: "black"}}>
                    Trang chủ
                </Link>
            ),
        },
        {
            key: "shop",
            icon: <ShopOutlined />,
            label: (
                <Link to={"/products"} style={{ fontWeight: "500", color: "black" }}>
                   Sản phẩm
                </Link>
            ),
        },
        {
            key: "login",
            icon: <LoginOutlined />,
            label: (
                <Link to={"/login"} style={{ fontWeight: "500", color: "black" }}>
                    Đăng nhập
                </Link>
            ),
        },
        {
            key: "reg",
            icon: <LogoutOutlined />,
            label: (
                <Link to={"/reg"} style={{ fontWeight: "500" }}>
                    Đăng ký
                </Link>
            ),
        }
    ];

    return (
        <section
            style={{
                backgroundColor: "white",
                position: "sticky",
                top: "0",
                left: "0",
                zIndex: "91",
            }}
        >
            <Row style={{ padding: "10px 20px" }}>
                <Col span={8} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex" }}>
                        <Link to={"/"}>
                            <FacebookOutlined style={{ fontSize: "25px", margin: "0 5px", color: "black" }} />
                        </Link>
                        <Link to={"/"}>
                            <InstagramOutlined style={{ fontSize: "25px", margin: "0 5px", color: "black" }} />
                        </Link>
                        <Link to={"/"}>
                            <TwitterOutlined style={{ fontSize: "25px", margin: "0 5px", color: "black" }} />
                        </Link>
                        <Link to={"/"}>
                            <YoutubeOutlined style={{ fontSize: "25px", margin: "0 5px", color: "black" }} />
                        </Link>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="logo" style={{ textAlign: "center", color: "white" }}>
                        <Link style={{ fontWeight: "500" }} to={"/"}>
                            <img
                                height={"30px"}
                                style={{ margin: "18px 0" }}
                                src="https://i.ibb.co/6Y586wf/logo.png"
                                alt=""
                            />
                        </Link>
                    </div>
                </Col>
                <Col span={8} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <div style={{ display: "flex" }}>
                        <Link to={"/"}>
                            <ShopOutlined style={{ fontSize: "25px", margin: "0 5px", color: "black" }} />
                        </Link>
                        <Link to={"/"}>
                            <ShoppingCartOutlined style={{ fontSize: "25px", margin: "0 5px", color: "black" }} />
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={6}></Col>
                <Col md={12} style={{textAlign : "center"}}>
                <Menu
                        style={{
                            justifyContent: "center",
                            border: "none",
                        }}
                        mode="horizontal"
                        items={menuItems}
                    />
                </Col>
                <Col md={6}></Col>

            </Row>
        </section>
    );
};

export default Header;

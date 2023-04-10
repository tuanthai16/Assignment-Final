import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
const Home = () => {
    return (
        <section>
            <Header />
            <Outlet />
            <Footer />
        </section>
    );
}

export default Home;
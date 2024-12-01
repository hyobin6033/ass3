import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
    <div>
        <h1>에너지 대시보드</h1>
        <Link to="/dashboard">대시보드로 이동</Link>
    </div>
);

export default Home;

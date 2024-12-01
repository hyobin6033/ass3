import React, { useEffect, useState } from 'react';
import PieChart from '../components/PieChart';  // 이미 만들어둔 PieChart 컴포넌트
import LineChart from './LineChart';  // 이미 만들어둔 LineChart 컴포넌트
import BarChart from './BarChart';  // 이미 만들어둔 BarChart 컴포넌트
import axios from 'axios';

function Dashboard() {
    const [data, setData] = useState([]);
    
    const apiKey = '7572444268616e733637534e6b6349';
    const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/xml/airPolutionMeasuring1Hour/1/5/`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                const airData = response.data;
                const users = airData['airQuality'][0]['row']; // 데이터 구조에 맞게 변경
                setData(users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>대시보드</h1>
            {/* PieChart, LineChart, BarChart에 데이터를 넘겨서 표시 */}
            <h2>미세먼지 관련 데이터</h2>
            <PieChart data={data} />
            <LineChart data={data} />
            <BarChart data={data} />
        </div>
    );
}

export default Dashboard;

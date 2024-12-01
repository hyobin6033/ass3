import { useEffect, useState } from "react";
import axios from "axios";
import Users from './Users';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // API 호출 함수
    const fetchBikeData = async () => {
      try {
        const response = await axios.get(
          "http://openapi.seoul.go.kr:8088/4f42664b6b616e7338316346475466/json/bikeList/1/1000"
        );
        setData(response.data);
      } catch (error) {
        console.error("API 호출에 실패했습니다:", error);
      }
    };

    // 데이터 호출
    fetchBikeData();
  }, []);

  return (
    <div>
      <h1>공공자전거 실시간 대여정보</h1>
      <Users />  {/* Users 컴포넌트 사용 */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
}

export default App;


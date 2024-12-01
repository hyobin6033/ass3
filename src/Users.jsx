import { useReducer, useEffect } from 'react';
import axios from 'axios';

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Users() {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null,
    });
    const apiUrl = `http://openapi.seoul.go.kr:8088/4f42664b6b616e7338316346475466/xml/airPolutionMeasuring1Hour/1/5/`;

    const fetchUsers = async () => {
        dispatch({ type: 'LOADING' });
        try {
            const response = await axios.get(apiUrl);
            console.log(response.data);  // 데이터 확인
            const bikeData = response.data;
    
            if (bikeData && bikeData.rentBikeStatus && bikeData.rentBikeStatus.row) {
                const bikes = bikeData.rentBikeStatus.row;
                dispatch({ type: 'SUCCESS', data: bikes });
            } else {
                throw new Error("자전거 데이터가 없습니다.");
            }
        } catch (e) {
            dispatch({ type: 'ERROR', error: e.message || e });
        }
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const { loading, data: users, error } = state;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return null;

    return (
        <>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {/* 데이터에 맞게 출력할 필드를 수정하세요 */}
                        {user.stationName} - PM10: {user.pm10}, PM2.5: {user.pm25}
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
    );
}

export default Users;

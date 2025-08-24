import React, { useState, useEffect } from 'react';
import SaleTable from "../components/SalesSettlementPage/SaleTable";
import axios from 'axios';

const dataStatusMap = {
  0: 'ALL',
  1: 'RECENT_1WEEK',
  2: 'RECENT_1MONTH',
  3: 'RECENT_3MONTH',
  4: 'RECENT_6MONTH',
};

function SalesSettlement() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [value] = useState(0);
     // Default to '전체 기한'

    useEffect(() => {
        const fetchSalesData = async () => {
            const dataStatus = dataStatusMap[value];
            if (!dataStatus) {
                console.error('Invalid DataStatus key:', value);
                return;
            }
            try {
                const response = await axios.get(`https://likelion.info/post/get/sell/list/${dataStatus}`, { withCredentials: true });
                setData(response.data);
            } catch (err) {
                setError(err);
                setData([]); // Ensure data is empty on error so table renders empty
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, [value]); // Re-fetch data when 'value' changes

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
            <SaleTable data={data} />
        </>
    );
}

export default SalesSettlement;
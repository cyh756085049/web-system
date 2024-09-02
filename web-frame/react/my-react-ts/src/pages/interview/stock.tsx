import React, {useEffect, useRef, useState} from "react";

const getStock = (id: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: id,
            });
        }, 3000);
    })
}

/**
 * 实现一个股票组件，每隔 5s 刷新一次价格，给定一个 promise 接口数据 getStock。
 * @param props
 * @constructor
 */
const StockComponent = (props: any) => {
    const { id } = props;
    const priceRef = useRef(10);
    const [price, setPrice] = useState(null);

    const fetchStockPrice = async () => {
        try {
            const res: any = await getStock(priceRef.current + 1);
            const { success, data } = res;

            if (success) {
                priceRef.current = data;
                setPrice(data);
            }
        } catch (error) {
            throw Error(`Error fetching stock price: ${error}`);
        }
    }

    useEffect(() => {
        fetchStockPrice();

        const interval = setInterval(() => {
            fetchStockPrice();
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, [id]);


    return (
        <div>
            <h1>股票组件，每隔 5s 刷新一次价格</h1>
            <h3>股票价格：{price}</h3>
        </div>
    )
}

export default StockComponent;
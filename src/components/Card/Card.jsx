import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Card.module.css';

export const URL = "https://xcountries-backend.azurewebsites.net/all";

export const fetchApiData = async () => {
    try {
        const response = await axios.get(URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }
}

export default function Card() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchApiData();
            setData(result);
        };
        getData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            {data.map((item, index) => (
                <div key={index} className={styles.content}>
                    <img src={item.flag} alt={item.abbr} className={styles.image}/>
                    <p className={styles.title}>{item.name}</p>
                </div>
            ))}
        </div>
    );
}

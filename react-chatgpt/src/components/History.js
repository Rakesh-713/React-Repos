import React from "react";
import styles from '../components/History.module.css'

const History=({question,onClick})=> {
    return (  
        <div className={styles.wrapper} onClick={onClick}>
            <p>{question.substring(0,15)}...</p>
        </div>
    );
}

export default History;
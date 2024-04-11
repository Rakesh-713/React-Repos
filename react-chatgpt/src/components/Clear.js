import React from "react";
import styles from '../components/Clear.module.css'

const Clear=({onClick})=> {
    return ( 
        <button className={styles.wrapper} onClick={onClick}>Clear</button>
     );
}

export default Clear;
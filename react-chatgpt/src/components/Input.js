import React from "react";
import styles from '../components/Input.module.css'

const Input=({value,onChange,onClick})=> {
    return ( 
            <div className={styles.wrapper}>
                <input 
                value={value}
                className={styles.text}
                type="text"
                onChange={onChange}
                placeholder="Type your prompt here..."
                />
                <button className={styles.btn} onClick={onClick}>Go</button>
            </div>
     );
}

export default Input;
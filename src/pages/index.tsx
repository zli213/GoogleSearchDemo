import React from "react";
import styles from "./index.module.css"



export default function Home() {
    const NavBar: React.FC = () => {
        return (
            <div className={styles.navbar}>
                <span className={styles.navItem}>About</span>
                <span className={styles.navItem}>Store</span>
                <div className={styles.spacer}></div>
                <span className={styles.navItem}>Gmail</span>
                <span className={styles.navItem}>Images</span>
                <div className={styles.icon}></div>
                <div className={styles.icon}></div>
            </div>
        );
    };

    return (
        // <div>
        //     {
        //         // TODO: HOME PAGE
        //     }

        //     Hello, World!
        // </div>

        <div className={styles.container}>
            <NavBar />
            <img className={styles.googleLogo} src="/images/googlelogo_color.png" alt="Google Logo" />
            <input className={styles.searchInput} type="text" placeholder="Search..." />
            <div className={styles.buttons}>
                <button className={styles.button}>Google Search</button>
                <button className={styles.button}>I'm Feeling Lucky</button>
            </div>
        </div>
    )
}

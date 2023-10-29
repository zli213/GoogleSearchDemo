import React, { useState } from "react";
import styles from "./index.module.css";
import router, { useRouter } from "next/router";



export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    function handleInputChange(event: { target: { value: React.SetStateAction<string>; }; }) {
        setSearchTerm(event.target.value);
    }

    function handleSearch() {
        router.push(`/search?q=${searchTerm}`);
    }

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
        <div className={styles.container}>
            <NavBar />
            <img className={styles.googleLogo} src="/images/googlelogo_color.png" alt="Google Logo" />
            <input className={styles.searchInput} type="text" placeholder="Search..."
                onChange={handleInputChange}
                onKeyUp={event => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleSearch}>Google Search</button>
                <button className={styles.button}>I'm Feeling Lucky</button>
            </div>
        </div>
    )
}

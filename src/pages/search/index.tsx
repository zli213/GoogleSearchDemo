import React, { useEffect, useState } from "react";
import styles from "./search.module.css";

import { useRouter } from "next/router";
import { containerClasses } from "@mui/material";


const SearchPage: React.FunctionComponent = () => {
    const router = useRouter();
    const { q } = router.query;

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
    useEffect(() => {
        const fetchData = async () => {
            if (!q) return;
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/query?q=${q}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setResults(data.items);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch results");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [q]);

    return (
        <div className={styles.searchContainer}>
            <NavBar />
            <div className={styles.searchContainer}>
                <img className={styles.googleLogo} src="/images/googlelogo_color.png" alt="Google Logo" />
                <input
                    className={styles.searchInput}
                    type="text"
                    value={q}
                    placeholder="Search..."
                    onChange={(e) => {
                        // 设置新的查询参数并重新进行搜索
                        router.push(`/search?q=${e.target.value}`);
                    }}
                />

                {/* <input className={styles.searchInput} type="text" placeholder="Search..."
                    onChange={handleInputChange}
                    onKeyUp={event => {
                        if (event.key === "Enter") {
                            handleSearch();
                        }
                    }}
                /> */}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {results && results.length > 0 ? (
                <ul className="searchResult">
                    {results.map((result, index) => (
                        <li className={styles.searchResultElement} key={index}>
                            <a href={result.link} className={styles.titleLink} target="_blank" rel="noopener noreferrer">
                                <h3 className={styles.resultTitle}>{result.title}</h3>
                            </a>
                            <a href={result.link} className={styles.displayLink} target="_blank" rel="noopener noreferrer">
                                {result.displayLink}
                            </a>
                            <p className={styles.resultParagraph}>{result.snippet}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found</p>
            )}
            Search Page: {q}
        </div>
    )
}

export default SearchPage;
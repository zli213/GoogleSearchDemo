import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";


const SearchPage: React.FunctionComponent = () => {
    const router = useRouter();
    const { q } = router.query;

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
        <div>
            {/* {
                // TODO: Search Page
            } */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {results && results.length > 0 ? (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>
                            <h3>{result.title}</h3>
                            <p>{result.snippet}</p>
                            <a href={result.link} target="_blank" rel="noopener noreferrer">
                                {result.displayLink}
                            </a>
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
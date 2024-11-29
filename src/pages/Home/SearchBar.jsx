import React from "react";
import styles from "./HomeUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ query, setQuery, onSearchResults }) {
    const handleSearch = async () => {
        const url = `http://localhost:8080/api/v1/sanpham/${query}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            onSearchResults(data);
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            onSearchResults([]);
        }
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Tìm kiếm sản phẩm..."
                style={{fontSize: '16px'}}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

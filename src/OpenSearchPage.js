import React from 'react'
import { Link } from 'react-router-dom';

const OpenSearchButton = () => {
    return (
        <div className="open-search">
            <Link to='/search'>
                <button>Search Books</button>
            </Link>
        </div>
    )
}

export default OpenSearchButton;
import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return(
        <main>
            <div className="not_found">
                <h1>404</h1>
                <p>Not Found</p>
                <Link to="/">Go home page</Link>
            </div>
        </main>
    );
}

export default NotFound;
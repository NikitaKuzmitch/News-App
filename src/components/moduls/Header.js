import React from 'react';
import {Link} from "react-router-dom";


class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="logo">
                    <h1>News</h1>
                </div>
                <div className="menu">
                    <ul>
                        <li>
                            <Link to="/">Новостная лента</Link>
                        </li>
                        <li>
                            <Link to="/archive">Архив</Link>
                        </li>
                        <li>
                            <Link to="/like">Избранные</Link>
                        </li>
                    </ul> 
                </div>
            </header>
        );
    }
}

export default Header;

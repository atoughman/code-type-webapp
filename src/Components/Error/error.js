import React from 'react';
import {Link} from 'react-router-dom'

import './error.css'

function Error() {
    return (
        <>
        <div className="main">
        	<div className="header">
            <h2 className="head">Page Not Found</h2>
            <div className="hr"></div></div>
        <div className="body-1">
            <div>Looks like you've followed broken link or entered a URL that doesn\'t exist on this site</div>
            <Link to="/"> Get Back to Our Site</Link>
            <div className="hr-2"></div>
        </div>
        <div className="body-2">
            <h6>Developer's note:</h6>
            <p>If you are developer of this site, and you weren't expecting a 404 error for this path, please visit Netlify's <span>"page not found" support guide</span> for troubleshooting tips.</p>
        </div>
        </div>
        </>
    );
}

export default Error;
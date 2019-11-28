import React from 'react';

const Entry = ({ entry }) =>
    <div>
        <p>{entry.severity}</p>
        {/* <p>{entry.date}</p> */}
    </div>;

export default Entry;
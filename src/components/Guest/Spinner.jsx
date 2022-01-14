import React from 'react';
import Loader from 'react-loader-spinner';

function Spinner() {
    return (
        <Loader
            type="Circles"
            color="#00BFFF"
            height={50}
            width={200}
            className="m-5"
        />

    );
}

export default Spinner;

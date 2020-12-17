import React, { useEffect, useState } from 'react';
import { loadMapApi } from '../../Hooks/MapHelper';
import FindAddressPresenter from './FindAddressPresenter'
import { Loader } from '@googlemaps/js-api-loader'
import { mapAPI } from '../../key';



const FindAddressContainer = () => {
    // const [scriptLoaded, setScriptLoaded] = useState(false)

    // useEffect(() => {
    //     const googleMapScript = loadMapApi();
    //     googleMapScript.addEventListener('load', function () {
    //         setScriptLoaded(true);
    //     })
    // }, [])

    return (
        <div>
            {/* {scriptLoaded &&
                <FindAddressPresenter />
            } */}
        </div>
    )
}
export default FindAddressContainer
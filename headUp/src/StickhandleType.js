import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { StickhandleTypeH3 } from './StyledComponents.js';

function StickhandleType({isActive, type, types, setType}) {

    useEffect(() => {
        let timeoutId;
        if (isActive) {
            timeoutId = setTimeout(() => {
                let newType;
                do {
                    newType = types[Math.floor(Math.random() * types.length)];
                } while (newType === type);
                setType(newType);
            }, 8000);
        }
        return () => clearTimeout(timeoutId);
    }, [isActive, type, setType]);

    return <StickhandleTypeH3 key={type}><FormattedMessage id={type} /></StickhandleTypeH3>;}

export default StickhandleType;
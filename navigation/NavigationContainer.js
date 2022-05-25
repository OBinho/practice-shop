import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createNavigationContainerRef } from '@react-navigation/native';

import MainNavigator from './ShopNavigator';

const navigationRef = createNavigationContainerRef();
function navigate(name) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name);
    }
};

const NavigationContainer = props => {
    const isAuth = useSelector(state => !!state.auth.token);

    useEffect(() => {
        if (!isAuth) {
            navigate('Auth');
        }
    }, [isAuth]);

    return (
        <MainNavigator />
    );
};

export default NavigationContainer;
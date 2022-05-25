import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/order';
import Colors from '../../constants/Colors';

const OrdersScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Menu' iconName={Platform.OS === 'android'
                        ? 'md-menu'
                        : 'ios-menu'}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        })
    });

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    if (isLoading) {
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }

    if (orders.length === 0) {
        return (
            <LinearGradient colors={['white', '#ccc']} style={styles.centered}>
                <Text style={styles.oopsMsg}>You don't have any previous orders.</Text>
            </LinearGradient>
        );
    }

    return <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <OrderItem 
                amount={itemData.item.totalAmount}  
                date={itemData.item.readableDate} 
                items={itemData.item.items} 
            />
        )}
    />
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    oopsMsg: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: 'gray'
    }
});

export default OrdersScreen;
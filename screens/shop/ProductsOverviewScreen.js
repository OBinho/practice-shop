import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Platform, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from "../../constants/Colors";
import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";

const ProductsOverviewScreen = ({ navigation }) => {
    //Lógica para edição de propriedades de navegação:
    //setOptions precisa ser usado através de um useEffect/componentDidMount etc, meu curso estava desatualizado mesmo lançado ao final de 2021 e após 2 dias de suor e lágrimas este foi o
    //único jeito que achei de fazer o navigation funcionar dentro do header...
    //Sinceramente eu to aprendendo mais resolvendo esses BO do que assistindo as aulas... n sei se rio ou se choro.
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
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                    <Item title='cart' iconName={Platform.OS === 'android'
                        ? 'md-cart'
                        : 'ios-cart'}
                        onPress={() => { navigation.navigate('Cart') }}
                    />
                </HeaderButtons>
            )
        })
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = navigation.addListener(
            'willFocus', 
            loadProducts
        );

        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);

    useEffect(() => {  
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred. Please contact Binho.</Text>
                <Button title="Reload app" onPress={loadProducts} color={Colors.primary} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size= 'large'
                    color={Colors.primary}
                />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Products found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        navigation.navigate('ProductDetail', {
                            productId: itemData.item.id,
                            title: itemData.item.title
                        });
                    }}
                >
                    <Button
                        title='View Details'
                        color={Colors.primary}
                        onPress={() => {
                            navigation.navigate('ProductDetail', {
                                productId: itemData.item.id,
                                title: itemData.item.title
                            });
                        }}
                    />
                    <Button
                        title='To Cart'
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }}
                    />
                </ProductItem>
            )}
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;
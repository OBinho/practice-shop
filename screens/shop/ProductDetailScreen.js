import React from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = ({ route, navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
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

    const { productId } = route.params;
    const dispatch = useDispatch();
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
    );

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.actions}>
                <Button title='Add to Cart' color={Colors.primary} onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));
                }} 
            />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: 300,
        width: '100%',
        borderWidth: 0,
        elevation: 8,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { widht: 0, height: 2 },
        shadowRadius: 8,
        overflow: 'hidden',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    image: {
        height: '100%',
        width: '100%'
    },
    actions: {
        marginVertical: 20,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 10
    },
    description: {
        fontFamily: 'open-sans',
        marginHorizontal: 20,
        fontSize: 14,
        textAlign: 'center'
    }
});

export default ProductDetailScreen;
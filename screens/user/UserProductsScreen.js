import React from 'react';
import { FlatList, Text, View, StyleSheet, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';

import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = ({ navigation }) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const deleteHandler = id => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'descructive', onPress: () => {
                    dispatch(productsActions.deleteProduct(id));
                }
            }
        ]);
    };

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
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Add' iconName={Platform.OS === 'android'
                        ? 'md-create'
                        : 'ios-create'}
                        onPress={() => {
                            navigation.navigate('EditProduct', { prodId: 0 })
                        }}
                    />
                </HeaderButtons>
            )
        })
    });

    if (userProducts.length === 0) {
        return (
            <View style={styles.screen}>
                <LinearGradient colors={['white', '#ccc']} style={styles.gradient}>
                    <Text style={styles.oopsMsg}>You don't have any products yet...</Text>
                    <Text style={styles.oopsMsg}>Start adding some!</Text>
                </LinearGradient>
            </View>
        );
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => { navigation.navigate('EditProduct', { prodId: itemData.item.id, headerTitle: itemData.item.title }) }}
                >
                    <Button
                        title='Edit'
                        color={Colors.primary}
                        onPress={() => { navigation.navigate('EditProduct', { prodId: itemData.item.id, headerTitle: itemData.item.title }) }}
                    />
                    <Button
                        title='Delete'
                        color={Colors.accent}
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />
                </ProductItem>
            )}
        />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
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

export default UserProductsScreen;
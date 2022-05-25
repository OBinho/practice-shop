import React from 'react';
import { Platform, View, Button, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import StartupScreen from '../screens/StartupScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProductsNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'ProductsOverview'}>
            <Stack.Screen
                name='ProductsOverview'
                component={ProductsOverviewScreen}
                options={{
                    headerTitle: 'All Products',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerMode: 'float',
                    headerTitleStyle: {
                        fontFamily: 'open-sans-bold',
                        textShadowColor: 'gray',
                        textShadowRadius: 8,
                        textShadowOffset: { width: 0, height: 2 }
                    }
                }}
            />
            <Stack.Screen
                name='ProductDetail'
                component={ProductDetailScreen}
                options={
                    ({ route }) => ({
                        title: route.params.title,
                        headerStyle: {
                            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
                        },
                        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
                        headerMode: 'float',
                        headerTitleStyle: {
                            fontFamily: 'open-sans-bold',
                            textShadowColor: 'gray',
                            textShadowRadius: 8,
                            textShadowOffset: { width: 0, height: 2 }
                        }
                    })
                }
            />
            <Stack.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    title: 'Your Cart',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
                    headerMode: 'float',
                    headerTitleStyle: {
                        fontFamily: 'open-sans-bold',
                        textShadowColor: 'gray',
                        textShadowRadius: 8,
                        textShadowOffset: { width: 0, height: 2 }
                    }
                }}
            />
        </Stack.Navigator>
    );
};

const OrdersNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'Orders'}>
            <Stack.Screen
                name='Orders'
                component={OrdersScreen}
                options={{
                    headerTitle: 'Your Orders',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerMode: 'float',
                    headerTitleStyle: {
                        fontFamily: 'open-sans-bold',
                        textShadowColor: 'gray',
                        textShadowRadius: 8,
                        textShadowOffset: { width: 0, height: 2 }
                    }
                }}
            />
        </Stack.Navigator>
    );
};

const AdminNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={'UserProducts'}>
            <Stack.Screen
                name='AdminNav'
                component={UserProductsScreen}
                options={{
                    headerTitle: 'Your Products',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerMode: 'float',
                    headerTitleStyle: {
                        fontFamily: 'open-sans-bold',
                        textShadowColor: 'gray',
                        textShadowRadius: 8,
                        textShadowOffset: { width: 0, height: 2 }
                    }
                }}
            />
            <Stack.Screen
                name='EditProduct'
                component={EditProductScreen}
                options={{
                    headerTitle: 'Edit Product',
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                    },
                    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                    headerMode: 'float',
                    headerTitleStyle: {
                        fontFamily: 'open-sans-bold',
                        textShadowColor: 'gray',
                        textShadowRadius: 8,
                        textShadowOffset: { width: 0, height: 2 }
                    }
                }}
            />
        </Stack.Navigator>
    );
};

const ShopNavigator = props => {
    const dispatch = useDispatch();

    return (
        <Drawer.Navigator
            initialRouteName='Products'
            screenOptions={{
                drawerActiveTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                drawerInactiveTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
                drawerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
                },
                drawerLabelStyle: {
                    fontFamily: 'open-sans-bold',
                    fontSize: 18
                },
                headerShown: false,
            }}
            drawerContent={(props) => {
                return (
                    <DrawerContentScrollView contentContainerStyle={{ flex: 1, paddingBottom: '5%', justifyContent: 'space-between' }}>
                        <View>
                            <DrawerItemList {...props} />
                        </View>
                        <Button 
                            title='logout' 
                            color={Colors.primary} 
                            onPress={() => {
                                dispatch(authActions.logout());
                                props.navigation.navigate('Auth');
                            }} 
                        />
                    </DrawerContentScrollView>
                );
            }}
        >
            <Drawer.Screen
                name='Products'
                component={ProductsNavigator}
                options={{
                    drawerIcon: () => <Ionicons
                        name={Platform.OS === 'android'
                            ? 'md-cart'
                            : 'ios-cart'
                        }
                        size={23}
                        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
                    />
                }}
            />
            <Drawer.Screen
                name='Your Orders'
                component={OrdersNavigator}
                options={{
                    drawerIcon: () => <Ionicons
                        name={Platform.OS === 'android'
                            ? 'md-list'
                            : 'ios-list'
                        }
                        size={23}
                        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
                    />
                }}
            />
            <Drawer.Screen
                name='Your products'
                component={AdminNavigator}
                options={{
                    drawerIcon: () => <Ionicons
                        name={Platform.OS === 'android'
                            ? 'md-create'
                            : 'ios-create'
                        }
                        size={23}
                        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
                    />
                }}
            />
        </Drawer.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Startup'>
                <Stack.Screen
                    name='Startup'
                    component={StartupScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Auth'
                    component={AuthScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Shop'
                    component={ShopNavigator}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default MainNavigator;
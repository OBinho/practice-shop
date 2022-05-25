import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { widht: 0, height: 2 },
        shadowRadius: 8,
        elevation: 6,
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
    }
});

export default Card;
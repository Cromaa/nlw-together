import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type props = {
    title: string;
    subtitle: string;
}

export function ListHeader({title, subtitle}: props){
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>
                {title}
            </Text>
            <Text style = {styles.subtitle}>
                {subtitle}
            </Text>
        </View>
    )
}
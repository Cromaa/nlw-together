import React from "react";
import { View, Text } from "react-native";
import { SvgProps } from 'react-native-svg';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = RectButtonProps & {
    title: string;
    icon: React.FC<SvgProps>;
    hasCheckBox?: boolean;
    checked?: boolean;
}

export function Category({
    title,
    icon: Icon,
    checked = false,
    hasCheckBox = false,
    ...rest
}: Props){
    const {secondary50, secondary70, secondary85, secondary40} = theme.colors;

    return(
        <RectButton {...rest}>
            <LinearGradient
                style = {styles.container}
                colors = {[secondary50, secondary70]}
            >
                <LinearGradient 
                    style = {[styles.content, { opacity: checked ? 1 : 0.4}]}
                    colors = {[checked ? secondary85 : secondary40, secondary50]}
                > 
                    {
                        hasCheckBox && 
                        <View style = {checked ? styles.checked : styles.check}/>
                    }
                    <Icon 
                        width = {48}
                        height = {48}
                    />
                    <Text style = {styles.title}>
                        { title }
                    </Text>
                </LinearGradient>
            </LinearGradient>
        </RectButton>
    );
}
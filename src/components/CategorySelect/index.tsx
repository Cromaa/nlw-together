import React from "react";
import { ScrollView, } from "react-native";

import { styles } from './styles';
import { categories } from "../../utils/categories";

import { Category } from '../Category';

type Props = {
    categorySelected: string;
}

export function CategorySelect({categorySelected}: Props){
    return(
        <ScrollView
            horizontal
            style = {styles.container}
            showsHorizontalScrollIndicator = {false} //Tirar a barra de scroll
            contentContainerStyle = {{paddingRight: 40}} //Quando a lista terminar terá um espaço na borda
        >
            {
                categories.map(category => (
                    <Category 
                        key = {category.id}
                        title = {category.title}
                        icon = {category.icon}
                        checked = {category.id === categorySelected}
                    />
                ))
            }
        </ScrollView>
    );
}
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Profile } from '../../components/Profile';
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from '../../components/Background';

import { styles } from './styles';

export function Home(){
    const [category, setCategory] = useState('');
    const navigation = useNavigation();

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 ás 20:40h',
            description: 'Quem quer um pouco de DRAVEN'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 ás 20:40h',
            description: 'Quem quer um pouco de DRAVEN'
        },
    ]

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate')
    }

    function handleAppointmentDetails(){
        navigation.navigate('AppointmentDetails')
    }

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    //if(categoryId === category){setCategory('')} else {setCategory(categoryId)}
    //Mesma coisa que o de cima WoW

    //Scroll View - Indicada para poucos elementos para serem listados
    //Flat List - Mais performatica, quando se tem muitos elementos em uma lista
    //pois renderiza aos poucos e da prioridade aos elementos visiveis em tela

    return(
        <Background>
            <View style = {styles.header}>
                <Profile />
                <ButtonAdd 
                    onPress = {handleAppointmentCreate}
                />
            </View>

            <CategorySelect 
                categorySelected = {category}
                setCategory = {handleCategorySelect}
            />
 
            <ListHeader
                title = 'Partidas agendadas'
                subtitle = 'Total 0'
            />        

            <FlatList 
                data = {appointments}
                keyExtractor = {item => item.id}
                renderItem = {({ item }) => (
                    <Appointment 
                        data = {item} 
                        onPress = {handleAppointmentDetails}
                    />
                )}
                ItemSeparatorComponent = {() => <ListDivider/>}
                contentContainerStyle = {{paddingBottom: 69}}
                style = {styles.matches}
                showsVerticalScrollIndicator = {false}
            />
        </Background>
    );
}
import React, { useState, useCallback } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Profile } from '../../components/Profile';
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from '../../components/Background';
import { Load } from "../../components/Load";

import { styles } from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOITMENTS } from "../../configs/database";

export function Home(){
    const [category, setCategory] = useState('');
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();


    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate')
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps){
        navigation.navigate('AppointmentDetails', { guildSelected })
    }

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    async function loadAppointments(){
        const response = await AsyncStorage.getItem(COLLECTION_APPOITMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item => item.category === category));
        } else{
            setAppointments(storage);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    },[category]))

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
            {
                loading ? 
                // <Text>
                //     Você ainda não tem nenhuma jogatina agendada 🤔
                // </Text>
                <Load />
                :
                <>
                    <ListHeader
                        title = 'Partidas agendadas'
                        subtitle = {`Total ${appointments.length}`}
                    />        

                    <FlatList 
                        data = {appointments}
                        keyExtractor = {item => item.id}
                        renderItem = {({ item }) => (
                            <Appointment 
                                data = {item} 
                                onPress = {() => handleAppointmentDetails(item)}
                            />
                        )}
                        ItemSeparatorComponent = {() => <ListDivider/>}
                        contentContainerStyle = {{paddingBottom: 69}}
                        style = {styles.matches}
                        showsVerticalScrollIndicator = {false}
                    />
                </>
            }
        </Background>
    );
}
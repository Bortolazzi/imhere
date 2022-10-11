import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from './styles';

export default function Home() {
    const [participants, setParticipants] = useState<string[]>([]);

    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        if(participants.includes(participantName)){
            return Alert.alert('Participante Existente', 'Já existe um participante na lista cadastrado');
        }

        setParticipants(prevState => [...prevState,participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => Alert.alert('Deletado')
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);

    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do Evento</Text>
            <Text style={styles.eventDate}>10 de outubro de 2022</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Participante"
                    placeholderTextColor="#6b6b6b"
                    value={participantName}
                    onChangeText={setParticipantName}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleParticipantAdd}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        name={item}
                        key={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={()=>(
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione os participantes a sua lista
                    </Text>
                )}
            />
        </View>
    );
}
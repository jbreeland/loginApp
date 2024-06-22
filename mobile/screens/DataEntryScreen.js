import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DataEntryScreen = () => {
    const [page, setPage] = useState(1);
    const [score, setScore] = useState('');
    const [fairway, setFairway] = useState('');
    const [gir, setGir] = useState('');
    const [upDown, setUpDown] = useState('');
    const [slope, setSlope] = useState('');
    const [missedPutt, setMissedPutt] = useState('');
    const [goodRead, setGoodRead] = useState(false);
    const [distance, setDistance] = useState('');

    const handleNextPage = () => {
        if (page < 18) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <Button title="Previous" onPress={handlePreviousPage} disabled={page === 1} />
                <Text style={styles.pageText}>Page {page}/18</Text>
                <Button title="Next" onPress={handleNextPage} disabled={page === 18} />
            </View>
            <Text style={styles.label}>Score:</Text>
            <TextInput 
                style={styles.input} 
                value={score} 
                onChangeText={setScore} 
                keyboardType="numeric" 
            />
            <Text style={styles.label}>Fairway:</Text>
            <Picker
                selectedValue={fairway}
                style={styles.picker}
                onValueChange={(itemValue) => setFairway(itemValue)}
            >
                <Picker.Item label="Hit" value="hit" />
                <Picker.Item label="Missed Left" value="missed_left" />
                <Picker.Item label="Missed Right" value="missed_right" />
                <Picker.Item label="Far Left" value="far_left" />
                <Picker.Item label="Far Right" value="far_right" />
            </Picker>
            <Text style={styles.label}>GIR:</Text>
            <Picker
                selectedValue={gir}
                style={styles.picker}
                onValueChange={(itemValue) => setGir(itemValue)}
            >
                <Picker.Item label="Yes" value="yes" />
                <Picker.Item label="No" value="no" />
            </Picker>
            <Text style={styles.label}>Up/Down:</Text>
            <Picker
                selectedValue={upDown}
                style={styles.picker}
                onValueChange={(itemValue) => setUpDown(itemValue)}
            >
                <Picker.Item label="Yes" value="yes" />
                <Picker.Item label="No" value="no" />
            </Picker>
            <Text style={styles.label}>Slope:</Text>
            <Picker
                selectedValue={slope}
                style={styles.picker}
                onValueChange={(itemValue) => setSlope(itemValue)}
            >
                <Picker.Item label="Right to Left" value="right_to_left" />
                <Picker.Item label="Uphill Right to Left" value="uphill_right_to_left" />
                <Picker.Item label="Uphill" value="uphill" />
                <Picker.Item label="Uphill Left to Right" value="uphill_left_to_right" />
                <Picker.Item label="Left to Right" value="left_to_right" />
                <Picker.Item label="Downhill Left to Right" value="downhill_left_to_right" />
                <Picker.Item label="Downhill" value="downhill" />
                <Picker.Item label="Downhill Right to Left" value="downhill_right_to_left" />
            </Picker>
            <Text style={styles.label}>Missed Putt:</Text>
            <Picker
                selectedValue={missedPutt}
                style={styles.picker}
                onValueChange={(itemValue) => setMissedPutt(itemValue)}
            >
                <Picker.Item label="Long" value="long" />
                <Picker.Item label="Long Right" value="long_right" />
                <Picker.Item label="Right" value="right" />
                <Picker.Item label="Short Right" value="short_right" />
                <Picker.Item label="Short" value="short" />
                <Picker.Item label="Short Left" value="short_left" />
                <Picker.Item label="Left" value="left" />
                <Picker.Item label="Long Left" value="long_left" />
                <Picker.Item label="Made" value="made" />
            </Picker>
            <View style={styles.checkboxContainer}>
                <Text style={styles.label}>Good Read:</Text>
                <Switch
                    value={goodRead}
                    onValueChange={setGoodRead}
                />
            </View>
            <Text style={styles.label}>Distance (feet):</Text>
            <TextInput 
                style={styles.input} 
                value={distance} 
                onChangeText={setDistance} 
                keyboardType="numeric" 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pageText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    picker: {
        height: 40,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default DataEntryScreen;
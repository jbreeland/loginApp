import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const holes = Array.from({ length: 18 }, (_, i) => i + 1);
const parValues = [4, 4, 3, 4, 5, 3, 4, 5, 4, 4, 5, 3, 4, 4, 3, 5, 4, 4]; // Example par values, replace with actual values

const DataEntryScreen = ({ navigation }) => {
    const [currentHole, setCurrentHole] = useState(1);
    const [score, setScore] = useState(parValues[0]);
    const [fairway, setFairway] = useState('Hit');
    const [gir, setGir] = useState(false);
    const [upDown, setUpDown] = useState(false);
    const [slope, setSlope] = useState('');
    const [missedPutt, setMissedPutt] = useState('');
    const [goodRead, setGoodRead] = useState(false);
    const [distance, setDistance] = useState('');

    const goToPreviousHole = () => {
        setCurrentHole(prev => {
            const newHole = prev > 1 ? prev - 1 : prev;
            setScore(parValues[newHole - 1]);
            return newHole;
        });
    };

    const goToNextHole = () => {
        setCurrentHole(prev => {
            const newHole = prev < 18 ? prev + 1 : prev;
            setScore(parValues[newHole - 1]);
            return newHole;
        });
    };

    const increaseScore = () => {
        setScore(prev => prev + 1);
    };

    const decreaseScore = () => {
        setScore(prev => (prev > 1 ? prev - 1 : 1));
    };

    const getVisibleHoles = () => {
        if (currentHole <= 3) {
            return holes.slice(0, 5);
        } else if (currentHole >= 16) {
            return holes.slice(13, 18);
        } else {
            return holes.slice(currentHole - 3, currentHole + 2);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.holeContainer}>
                <TouchableOpacity onPress={goToPreviousHole}>
                    <Text style={styles.arrow}>◀</Text>
                </TouchableOpacity>
                <View style={styles.holeNumbers}>
                    {getVisibleHoles().map(hole => (
                        <View
                            key={hole}
                            style={[
                                styles.hole,
                                currentHole === hole && styles.currentHole
                            ]}
                        >
                            <Text style={styles.holeText}>{hole}</Text>
                            <View style={styles.separator} />
                            <Text style={styles.watermark}>Par</Text>
                            <Text style={styles.parText}>{parValues[hole - 1]}</Text>
                            <View style={styles.separator} />
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={goToNextHole}>
                    <Text style={styles.arrow}>▶</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>Score: </Text>
                    <TouchableOpacity style={styles.circleButton} onPress={decreaseScore}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.scoreText}>{score}</Text>
                    <TouchableOpacity style={styles.circleButton} onPress={increaseScore}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Score"
                    keyboardType="numeric"
                    value={String(score)}
                    onChangeText={(value) => setScore(parseInt(value, 10))}
                />
                <Text>Fairway:</Text>
                <Picker selectedValue={fairway} onValueChange={setFairway}>
                    <Picker.Item label="Hit" value="Hit" />
                    <Picker.Item label="Missed Left" value="Missed Left" />
                    <Picker.Item label="Missed Right" value="Missed Right" />
                    <Picker.Item label="Far Left" value="Far Left" />
                    <Picker.Item label="Far Right" value="Far Right" />
                </Picker>
                <Text>GIR:</Text>
                <Switch value={gir} onValueChange={setGir} />
                <Text>Up/Down:</Text>
                <Switch value={upDown} onValueChange={setUpDown} />
                <Text>Slope:</Text>
                <Picker selectedValue={slope} onValueChange={setSlope}>
                    <Picker.Item label="Right to Left" value="Right to Left" />
                    <Picker.Item label="Uphill Right to Left" value="Uphill Right to Left" />
                    <Picker.Item label="Uphill" value="Uphill" />
                    <Picker.Item label="Uphill Left to Right" value="Uphill Left to Right" />
                    <Picker.Item label="Left to Right" value="Left to Right" />
                    <Picker.Item label="Downhill Left to Right" value="Downhill Left to Right" />
                    <Picker.Item label="Downhill" value="Downhill" />
                    <Picker.Item label="Downhill Right to Left" value="Downhill Right to Left" />
                </Picker>
                <Text>Missed Putt:</Text>
                <Picker selectedValue={missedPutt} onValueChange={setMissedPutt}>
                    <Picker.Item label="Long" value="Long" />
                    <Picker.Item label="Long Right" value="Long Right" />
                    <Picker.Item label="Right" value="Right" />
                    <Picker.Item label="Short Right" value="Short Right" />
                    <Picker.Item label="Short" value="Short" />
                    <Picker.Item label="Short Left" value="Short Left" />
                    <Picker.Item label="Left" value="Left" />
                    <Picker.Item label="Long Left" value="Long Left" />
                </Picker>
                <Text>Good Read:</Text>
                <Switch value={goodRead} onValueChange={setGoodRead} />
                <TextInput
                    style={styles.input}
                    placeholder="Distance (feet)"
                    keyboardType="numeric"
                    value={distance}
                    onChangeText={setDistance}
                />
                <Button title="Save" onPress={() => alert('Data saved!')} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    holeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    arrow: {
        fontSize: 24,
        marginHorizontal: 10,
    },
    holeNumbers: {
        flexDirection: 'row',
    },
    hole: {
        width: 50,
        height: 110, // Increased height
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 5,
        position: 'relative',
        transform: [{ scale: 0.8 }],
    },
    currentHole: {
        backgroundColor: '#ddd',
        transform: [{ scale: 1 }],
    },
    holeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 3,
    },
    parText: {
        fontSize: 14,
    },
    scoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderWidth: 1, // Add border for the box
        borderColor: '#ccc', // Set border color
        padding: 10, // Add padding for the box
        borderRadius: 5, // Optional: Add border radius for rounded corners
        transform: [{ scale: 0.75 }],
    },
    scoreLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    circleButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 10,
        width: '100%',
    },
    watermark: {
        fontSize: 12,
        color: '#bbb',
        textAlign: 'center',
    },
});

export default DataEntryScreen;
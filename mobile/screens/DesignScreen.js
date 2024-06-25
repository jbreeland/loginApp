import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

const holes = Array.from({ length: 18 }, (_, i) => i + 1);
const parValues = [4, 4, 3, 4, 5, 3, 4, 5, 4, 4, 5, 3, 4, 4, 3, 5, 4, 4]; // Example par values, replace with actual values
const tempScores = [4, 5, 3, 4, 6, 3, 5, 5, 4, 4, 6, 3, 4, 5, 3, 6, 4, 5]; // Temporary scores, replace with actual user inputs

const DesignScreen = () => {
    const [currentHole, setCurrentHole] = useState(1);
    const [score, setScore] = useState(parValues[0]);
    const [gir, setGir] = useState(false);
    const [upDown, setUpDown] = useState(false);
    const [fairway, setFairway] = useState('Hit'); // Default to 'Hit'

    const fairwayOptions = ['Far Left', 'Left', 'Hit', 'Right', 'Far Right'];

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

    const handleFairwayPress = (option) => {
        setFairway(option);
    };

    return (
        <View style={styles.container}>
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
                            <Text style={styles.watermark}>Score</Text>
                            <Text style={styles.scoreCardText}>{tempScores[hole - 1]}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={goToNextHole}>
                    <Text style={styles.arrow}>▶</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.alignedContainer}>
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
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>GIR: </Text>
                        <Switch style={styles.smallSwitch} value={gir} onValueChange={setGir} />
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Up/Down: </Text>
                        <Switch style={styles.smallSwitch} value={upDown} onValueChange={setUpDown} />
                    </View>
                    <View style={styles.fairwayContainer}>
                        <View style={styles.fairwayRow}>
                            <TouchableOpacity
                                style={[
                                    styles.fairwayButton,
                                    fairway === 'Far Left' && styles.selectedFairwayButton
                                ]}
                                onPress={() => handleFairwayPress('Far Left')}
                            >
                                <Text style={styles.fairwayButtonText}>Far Left</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.fairwayButton,
                                    fairway === 'Left' && styles.selectedFairwayButton
                                ]}
                                onPress={() => handleFairwayPress('Left')}
                            >
                                <Text style={styles.fairwayButtonText}>Left</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.hitButtonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.hitButton,
                                    fairway === 'Hit' && styles.selectedFairwayButton
                                ]}
                                onPress={() => handleFairwayPress('Hit')}
                            >
                                <Text style={styles.fairwayButtonText}>Hit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fairwayRow}>
                            <TouchableOpacity
                                style={[
                                    styles.fairwayButton,
                                    fairway === 'Right' && styles.selectedFairwayButton
                                ]}
                                onPress={() => handleFairwayPress('Right')}
                            >
                                <Text style={styles.fairwayButtonText}>Right</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.fairwayButton,
                                    fairway === 'Far Right' && styles.selectedFairwayButton
                                ]}
                                onPress={() => handleFairwayPress('Far Right')}
                            >
                                <Text style={styles.fairwayButtonText}>Far Right</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
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
    scoreCardText: {
        fontSize: 14, // Font size for the score in the scorecard
    },
    scoreText: {
        fontSize: 16, // Font size for the score in the score container
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
    alignedContainer: {
        marginTop: 10,
        marginLeft: 0,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align to the left
        marginTop: 1,
        //marginBottom: 10,
        //borderWidth: 1, // Add border for the box
        //borderColor: '#ccc', // Set border color
        //padding: 10, // Add padding for the box
        //borderRadius: 5, // Optional: Add border radius for rounded corners
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
    watermark: {
        fontSize: 12,
        color: '#bbb',
        textAlign: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        marginTop: 1,
        transform: [{ scale: 0.75 }],
    },
    switchLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    smallSwitch: {
        transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
    },
    fairwayContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    fairwayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    fairwayButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    selectedFairwayButton: {
        backgroundColor: '#888',
    },
    hitButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    hitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    fairwayButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DesignScreen;
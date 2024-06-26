import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, Image, Alert } from 'react-native';
import styles from './DesignScreenStyles';

const holes = Array.from({ length: 18 }, (_, i) => i + 1);
const parValues = [4, 4, 3, 4, 5, 3, 4, 5, 4, 4, 5, 3, 4, 4, 3, 5, 4, 4]; // Example par values, replace with actual values
const tempScores = [4, 5, 3, 4, 6, 3, 5, 5, 4, 4, 6, 3, 4, 5, 3, 6, 4, 5]; // Temporary scores, replace with actual user inputs
const distances = ["0-5 ft", "5-10 ft", "10-15 ft", "15-20 ft", "20-30 ft", "30-40 ft", "40 ft +"];

const DesignScreen = () => {
    const [currentHole, setCurrentHole] = useState(1);
    const [score, setScore] = useState(parValues[0]);
    const [gir, setGir] = useState(false);
    const [upDown, setUpDown] = useState(false);
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [misread, setMisread] = useState(false);
    const [activeSlopeButton, setActiveSlopeButton] = useState(null); // State for the active button in slope selection
    const [activePuttMissButton, setActivePuttMissButton] = useState(null); // State for the active button in putt miss selection

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

    const handleSlopePress = (section) => {
        Alert.alert(`Slope section pressed: ${section}`);
        setActiveSlopeButton(section); // Set the active button in slope selection
    };

    const handlePuttMissPress = (section) => {
        Alert.alert(`Putt miss section pressed: ${section}`);
        setActivePuttMissButton(section); // Set the active button in putt miss selection
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
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={require('../images/slope.png')} style={styles.image} />
                        <View style={styles.overlayContainer}>
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionTop, activeSlopeButton === 'top' && styles.activeButton]}
                                onPress={() => handleSlopePress('top')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionTopLeft, activeSlopeButton === 'top-left' && styles.activeButton]}
                                onPress={() => handleSlopePress('top-left')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionTopRight, activeSlopeButton === 'top-right' && styles.activeButton]}
                                onPress={() => handleSlopePress('top-right')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionLeft, activeSlopeButton === 'left' && styles.activeButton]}
                                onPress={() => handleSlopePress('left')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionRight, activeSlopeButton === 'right' && styles.activeButton]}
                                onPress={() => handleSlopePress('right')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionBottomLeft, activeSlopeButton === 'bottom-left' && styles.activeButton]}
                                onPress={() => handleSlopePress('bottom-left')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionBottomRight, activeSlopeButton === 'bottom-right' && styles.activeButton]}
                                onPress={() => handleSlopePress('bottom-right')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionBottom, activeSlopeButton === 'bottom' && styles.activeButton]}
                                onPress={() => handleSlopePress('bottom')}
                            />
                        </View>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require('../images/puttmiss.png')} style={styles.image} />
                        <View style={styles.overlayContainer}>
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionTop, activePuttMissButton === 'long' && styles.activeButton]}
                                onPress={() => handlePuttMissPress('long')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionTopLeft, activePuttMissButton === 'long-left' && styles.activeButton]}
                                onPress={() => handlePuttMissPress('long-left')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionTopRight, activePuttMissButton === 'long-right' && styles.activeButton]}
                                onPress={() => handlePuttMissPress('long-right')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionLeft, activePuttMissButton === 'left' && styles.activeButton]}
                                onPress={() => handlePuttMissPress('left')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionRight, activePuttMissButton === 'right' && styles.activeButton]}
                                onPress={() => handlePuttMissPress('right')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionBottomLeft, activePuttMissButton === 'short-left' && styles.activeButton]}
                                onPress={() => handlePuttMissPress('short-left')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionBottomRight, activePuttMissButton === 'short-right' && styles.activeButton]}
                                onPress={() => handlePuttMissPress('short-right')}
                            />
                            <TouchableOpacity
                                style={[styles.overlaySection, styles.sectionBottom, activePuttMissButton === 'short' && styles.activeButton]}
                                onPress={() => handlePuttMissPress('short')}
                            />
                        </View>
                    </View>
                    <View style={styles.verticalContainer}>
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Misread: </Text>
                        <Switch style={styles.smallSwitch} value={misread} onValueChange={setMisread} />
                    </View>
                    <View style={styles.distanceContainer}>
                        <Text style={styles.distanceLabel}>Putt Distance: </Text>
                        <ScrollView style={styles.scrollBox}> 
                            {distances.map((distance, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.distanceOption,
                                        selectedDistance === distance && styles.selectedDistanceOption
                                    ]}
                                    onPress={() => setSelectedDistance(distance)}
                                >
                                    <Text style={styles.distanceOptionText}>{distance}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    </View>
);
};
export default DesignScreen;
    
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, Image } from 'react-native';
import styles from './DesignScreenStyles';

const holes = Array.from({ length: 18 }, (_, i) => i + 1);
const parValues = [4, 4, 3, 4, 5, 3, 4, 5, 4, 4, 5, 3, 4, 4, 3, 5, 4, 4]; // Example par values, replace with actual values
const tempScores = [4, 5, 3, 4, 6, 3, 5, 5, 4, 4, 6, 3, 4, 5, 3, 6, 4, 5]; // Temporary scores, replace with actual user inputs
const distances = ["0-5 ft", "5-10 ft", "10-15 ft", "15-20 ft", "20-30 ft", "30-40 ft", "40 ft +"];

const DesignScreen = () => {
    const [currentHole, setCurrentHole] = useState(1);
    const [score, setScore] = useState(parValues[0]);
    const [scores, setScores] = useState(parValues.map(par => par));
    const [gir, setGir] = useState(false);
    const [upDown, setUpDown] = useState(false);
    const [selectedDistance, setSelectedDistance] = useState(null);
    const [misread, setMisread] = useState(false);
    const [activeSlopeButton, setActiveSlopeButton] = useState(null); // State for the active button in slope selection
    
    const [activePuttMissButton, setActivePuttMissButton] = useState({
        putt1: null,
        putt2: null,
        putt3: null
    }); // State for the active button in putt miss selection
    const [puttMade, setPuttMade] = useState({
        putt1: false,
        putt2: false,
        putt3: false
    });

    const [selectedDistance2, setSelectedDistance2] = useState(null);
    const [misread2, setMisread2] = useState(false);
    const [activeSlopeButton2, setActiveSlopeButton2] = useState(null); // State for the active button in slope selection
    
    const [selectedDistance3, setSelectedDistance3] = useState(null);
    const [misread3, setMisread3] = useState(false);
    const [activeSlopeButton3, setActiveSlopeButton3] = useState(null); // State for the active button in slope selection

    const goToPreviousHole = () => {
        setCurrentHole(prev => {
            const newHole = prev > 1 ? prev - 1 : prev;
            setScores(prevScores => {
                const newScores = [...prevScores];
                newScores[prev - 1] = score;
                setScore(newScores[newHole - 1]);
                return newScores;
            });
            return newHole;
        });
    };

    const goToNextHole = () => {
        setCurrentHole(prev => {
            const newHole = prev < 18 ? prev + 1 : prev;
            setScores(prevScores => {
                const newScores = [...prevScores];
                newScores[prev - 1] = score;
                setScore(newScores[newHole - 1]);
                return newScores;
            });
            return newHole;
        });
    };
    
    const increaseScore = () => {
        setScore(prev => {
            const newScore = prev + 1;
            setScores(prevScores => {
                const newScores = [...prevScores];
                newScores[currentHole - 1] = newScore;
                return newScores;
            });
            return newScore;
        });
    };

    const decreaseScore = () => {
        setScore(prev => {
            const newScore = prev > 1 ? prev - 1 : 1;
            setScores(prevScores => {
                const newScores = [...prevScores];
                newScores[currentHole - 1] = newScore;
                return newScores;
            });
            return newScore;
        });
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

 const handleSlopePress = (section, puttNumber) => {
    //Alert.alert(`Slope section pressed: ${section}`);
    if (puttNumber === 1) {
        setActiveSlopeButton(section); // Set the active button in slope selection for putt 1
    } else if (puttNumber === 2) {
        setActiveSlopeButton2(section); // Set the active button in slope selection for putt 2
    } else if (puttNumber === 3) {
        setActiveSlopeButton3(section); // Set the active button in slope selection for putt 3
    }
};

const handlePuttMissPress = (section, puttNumber) => {
    //Alert.alert(`Putt miss section pressed: ${section}`);
    setActivePuttMissButton(prev => ({ ...prev, [`putt${puttNumber}`]: section }));
    setPuttMade(prev => ({ ...prev, [`putt${puttNumber}`]: false })); // Deselect putt made if a miss is selected
};

const handlePuttMadePress = (puttNumber) => {
    setPuttMade(prev => ({ ...prev, [`putt${puttNumber}`]: !prev[`putt${puttNumber}`] }));
    setActivePuttMissButton(prev => ({ ...prev, [`putt${puttNumber}`]: null })); // Deselect putt miss if putt made is selected
};

const handleHoleSelection = (hole) => {
    setCurrentHole(hole);
    setScore(scores[hole - 1]);
};

return (
    <>
         <View style={styles.container}>
         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={goToPreviousHole}>
                <Text style={styles.arrow}>◀</Text>
            </TouchableOpacity>
            <View style={styles.holeContainer}>
                {getVisibleHoles().map(hole => (
                    <TouchableOpacity key={hole} onPress={() => handleHoleSelection(hole)}>
                        <View style={[
                            styles.hole,
                            currentHole === hole && styles.currentHole
                        ]}>
                            <Text style={styles.holeText}>{hole}</Text>
                            <View style={styles.separator} />
                            <Text style={styles.watermark}>Par</Text>
                            <Text style={styles.parText}>{parValues[hole - 1]}</Text>
                            <View style={styles.separator} />
                            <Text style={styles.watermark}>Score</Text>
                            <Text style={styles.scoreCardText}>{scores[hole - 1]}</Text> 
                        </View>
                    </TouchableOpacity>
                 ))}
            </View>
            <TouchableOpacity onPress={goToNextHole}>
                <Text style={styles.arrow}>▶</Text>
            </TouchableOpacity>
         </View>
    
       
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
            </View>
            </View>
                <View style={styles.girUpDownContainer}>
                <View style={styles.halfWidthContainer}>
                 <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>GIR: </Text>
                    <Switch style={styles.smallSwitch} value={gir} onValueChange={setGir} />
                </View>
            
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Up/Down: </Text>
                    <Switch style={styles.smallSwitch} value={upDown} onValueChange={setUpDown} />
                </View>
                </View>
                </View>
             
            <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.puttText}>Putt 1</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.rowContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('../images/slope.png')} style={styles.image} />
                    <View style={styles.overlayContainer}>
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTop, activeSlopeButton === 'top' && styles.activeButton]}
                            onPress={() => handleSlopePress('top', 1)}
                         />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTopLeft, activeSlopeButton === 'top-left' && styles.activeButton]}
                            onPress={() => handleSlopePress('top-left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTopRight, activeSlopeButton === 'top-right' && styles.activeButton]}
                            onPress={() => handleSlopePress('top-right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionLeft, activeSlopeButton === 'left' && styles.activeButton]}
                            onPress={() => handleSlopePress('left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionRight, activeSlopeButton === 'right' && styles.activeButton]}
                            onPress={() => handleSlopePress('right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottomLeft, activeSlopeButton === 'bottom-left' && styles.activeButton]}
                            onPress={() => handleSlopePress('bottom-left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottomRight, activeSlopeButton === 'bottom-right' && styles.activeButton]}
                            onPress={() => handleSlopePress('bottom-right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottom, activeSlopeButton === 'bottom' && styles.activeButton]}
                            onPress={() => handleSlopePress('bottom', 1)}
                        />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('../images/puttmiss.png')} style={styles.image} />
                    <View style={styles.overlayContainer}>
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTop, activePuttMissButton.putt1 === 'long' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('long', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTopLeft, activePuttMissButton.putt1 === 'long-left' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('long-left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTopRight, activePuttMissButton.putt1 === 'long-right' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('long-right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionLeft, activePuttMissButton.putt1 === 'left' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionRight, activePuttMissButton.putt1 === 'right' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottomLeft, activePuttMissButton.putt1 === 'short-left' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('short-left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottomRight, activePuttMissButton.putt1 === 'short-right' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('short-right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottom, activePuttMissButton.putt1 === 'short' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('short', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.puttMadeButton, puttMade.putt1 && styles.activeButton]}
                            onPress={() => handlePuttMadePress(1)}>
                            {puttMade.putt1 && <View style={styles.overlayCircle} />}
                        </TouchableOpacity>
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
         
        <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.puttText}>Putt 2</Text>
            <View style={styles.line} />
        </View>
        <View style={styles.rowContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../images/slope.png')} style={styles.image} />
                <View style={styles.overlayContainer}>
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTop, activeSlopeButton2 === 'top' && styles.activeButton]}
                        onPress={() => handleSlopePress('top', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopLeft, activeSlopeButton2 === 'top-left' && styles.activeButton]}
                        onPress={() => handleSlopePress('top-left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopRight, activeSlopeButton2 === 'top-right' && styles.activeButton]}
                        onPress={() => handleSlopePress('top-right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionLeft, activeSlopeButton2 === 'left' && styles.activeButton]}
                        onPress={() => handleSlopePress('left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionRight, activeSlopeButton2 === 'right' && styles.activeButton]}
                        onPress={() => handleSlopePress('right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomLeft, activeSlopeButton2 === 'bottom-left' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom-left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection,                         styles.sectionBottomRight, activeSlopeButton2 === 'bottom-right' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom-right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottom, activeSlopeButton2 === 'bottom' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom', 2)}
                    />
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../images/puttmiss.png')} style={styles.image} />
                <View style={styles.overlayContainer}>
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTop, activePuttMissButton.putt2 === 'long' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopLeft, activePuttMissButton.putt2 === 'long-left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long-left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopRight, activePuttMissButton.putt2 === 'long-right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long-right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionLeft, activePuttMissButton.putt2 === 'left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionRight, activePuttMissButton.putt2 === 'right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomLeft, activePuttMissButton.putt2 === 'short-left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short-left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomRight, activePuttMissButton.putt2 === 'short-right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short-right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottom, activePuttMissButton.putt2 === 'short' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.puttMadeButton, puttMade.putt2 && styles.activeButton]}
                        onPress={() => handlePuttMadePress(2)}>
                        {puttMade.putt2 && <View style={styles.overlayCircle} />}
                    </TouchableOpacity>
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
        <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.puttText}>Putt 3</Text>
            <View style={styles.line} />
        </View>
        <View style={styles.rowContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../images/slope.png')} style={styles.image} />
                <View style={styles.overlayContainer}>
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTop, activeSlopeButton3 === 'top' && styles.activeButton]}
                        onPress={() => handleSlopePress('top', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopLeft, activeSlopeButton3 === 'top-left' && styles.activeButton]}
                        onPress={() => handleSlopePress('top-left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopRight, activeSlopeButton3 === 'top-right' && styles.activeButton]}
                        onPress={() => handleSlopePress('top-right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionLeft, activeSlopeButton3 === 'left' && styles.activeButton]}
                        onPress={() => handleSlopePress('left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionRight, activeSlopeButton3 === 'right' && styles.activeButton]}
                        onPress={() => handleSlopePress('right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomLeft, activeSlopeButton3 === 'bottom-left' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom-left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomRight, activeSlopeButton3 === 'bottom-right' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom-right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottom, activeSlopeButton3 === 'bottom' && styles.activeButton]}
                        onPress={() => handleSlopePress3('bottom', 3)}
                    />
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../images/puttmiss.png')} style={styles.image} />
                <View style={styles.overlayContainer}>
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTop, activePuttMissButton.putt3 === 'long' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopLeft, activePuttMissButton.putt3 === 'long-left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long-left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopRight, activePuttMissButton.putt3 === 'long-right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long-right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionLeft, activePuttMissButton.putt3 === 'left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionRight, activePuttMissButton.putt3 === 'right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomLeft, activePuttMissButton.putt3 === 'short-left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short-left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomRight, activePuttMissButton.putt3 === 'short-right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short-right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottom, activePuttMissButton.putt3 === 'short' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.puttMadeButton, puttMade.putt3 && styles.activeButton]}
                        onPress={() => handlePuttMadePress(3)}>
                        {puttMade.putt3 && <View style={styles.overlayCircle} />}
                    </TouchableOpacity>
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
    </>     
); 
}; 

export default DesignScreen;
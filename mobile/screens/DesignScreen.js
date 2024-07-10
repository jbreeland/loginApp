import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, Image, TextInput } from 'react-native';
import styles from './DesignScreenStyles';

const holes = Array.from({ length: 18 }, (_, i) => i + 1);
const parValues = [4, 4, 3, 4, 5, 3, 4, 5, 4, 4, 5, 3, 4, 4, 3, 5, 4, 4]; // Example par values, replace with actual values
const tempScores = [4, 5, 3, 4, 6, 3, 5, 5, 4, 4, 6, 3, 4, 5, 3, 6, 4, 5]; // Temporary scores, replace with actual user inputs
const distances = ["0-5 ft", "5-10 ft", "10-15 ft", "15-20 ft", "20-30 ft", "30-40 ft", "40 ft +"];


const DesignScreen = () => {
    const initialHoleData = {
        score: 0,
        gir: false,
        upDown: false,
        approachDistance: '',
        selectedClub: '',
        slopes: { slope1: null, slope2: null, slope3: null },
        puttMiss: { putt1: null, putt2: null, putt3: null },
        puttMade: { putt1: false, putt2: false, putt3: false },
        misread: { misread1: false, misread2: false, misread3: false },
    };

    const [holeData, setHoleData] = useState(
        holes.reduce((acc, hole) => {
            acc[hole] = { ...initialHoleData, score: parValues[hole - 1] };
            return acc;
        }, {})
    );

    const [currentHole, setCurrentHole] = useState(1);
    const [selectedDistance, setSelectedDistance] = useState(null);

    const goToPreviousHole = () => {
        setCurrentHole(prev => (prev > 1 ? prev - 1 : prev));
    };


    const goToNextHole = () => {
        setCurrentHole(prev => (prev < 18 ? prev + 1 : prev));
    };
    
    const increaseScore = () => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: { ...prevState[currentHole], score: prevState[currentHole].score + 1 }
        }));
    };
    
    const decreaseScore = () => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: { ...prevState[currentHole], score: Math.max(prevState[currentHole].score - 1, 1) }
        }));
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


    const handleGIRChange = (value) => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: { ...prevState[currentHole], gir: value }
        }));
    };
    
    const handleUpDownChange = (value) => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: { ...prevState[currentHole], upDown: value }
        }));
    };
    
    const handleSlopePress = (section, puttNumber) => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: {
                ...prevState[currentHole],
                slopes: { ...prevState[currentHole].slopes, [`slope${puttNumber}`]: section }
            }
        }));
    };
    
    const handlePuttMissPress = (section, puttNumber) => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: {
                ...prevState[currentHole],
                puttMiss: { ...prevState[currentHole].puttMiss, [`putt${puttNumber}`]: section },
                puttMade: { ...prevState[currentHole].puttMade, [`putt${puttNumber}`]: false }
            }
        }));
    };
    
    const handlePuttMadePress = (puttNumber) => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: {
                ...prevState[currentHole],
                puttMade: { ...prevState[currentHole].puttMade, [`putt${puttNumber}`]: !prevState[currentHole].puttMade[`putt${puttNumber}`] },
                puttMiss: { ...prevState[currentHole].puttMiss, [`putt${puttNumber}`]: null }
            }
        }));
    };
    
    const handleMisreadChange = (puttNumber, value) => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: {
                ...prevState[currentHole],
                misread: { ...prevState[currentHole].misread, [`misread${puttNumber}`]: value }
            }
        }));
    };
    
    const handleApproachDistanceChange = (value) => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: { ...prevState[currentHole], approachDistance: value }
        }));
    };
    
    const handleClubSelection = (club) => {
        setHoleData((prevState) => ({
            ...prevState,
            [currentHole]: { ...prevState[currentHole], selectedClub: club }
        }));
    };
    
    const handleHoleSelection = (hole) => {
        setCurrentHole(hole);
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
                            <Text style={styles.scoreCardText}>{holeData[hole].score}</Text> 
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
        <Text style={styles.scoreText}>{holeData[currentHole].score}</Text>
        <TouchableOpacity style={styles.circleButton} onPress={increaseScore}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    </View>
</View>
<View style={styles.girUpDownContainer}>
    <View style={styles.halfWidthContainer}>
        <View style={styles.row}>
            <Text style={styles.switchLabel}>  GIR:               </Text>
            <Switch style={styles.smallSwitch} value={holeData[currentHole].gir} onValueChange={handleGIRChange} />
            <Text style={styles.switchLabel}>     Club:</Text>
            <ScrollView style={styles.clubScrollBox}>
                {['Driver', '3W', '5W', 'Hybrid', 'Iron', 'Wedge', 'Putter'].map((club, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.distanceOption}
                        onPress={() => handleClubSelection(club)}
                    >
                        <Text style={styles.distanceOptionText}>{club}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
        <View style={styles.row}>
            <Text style={styles.switchLabel}>  Up/Down:</Text>
            <Switch style={styles.smallSwitch} value={holeData[currentHole].upDown} onValueChange={handleUpDownChange} />

            <Text style={styles.switchLabel}>Distance: </Text>
            <TextInput
                style={styles.distanceInput}
                keyboardType="numeric"
                value={holeData[currentHole].approachDistance}
                onChangeText={handleApproachDistanceChange}
                placeholder="Enter distance"
            />
        </View>
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
                            style={[styles.overlaySection, styles.sectionTop, holeData[currentHole].slopes.slope1 === 'top' && styles.activeButton]}
                            onPress={() => handleSlopePress('top', 1)}
                         />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTopLeft, holeData[currentHole].slopes.slope1 === 'top-left' && styles.activeButton]}
                            onPress={() => handleSlopePress('top-left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTopRight, holeData[currentHole].slopes.slope1 === 'top-right' && styles.activeButton]}
                            onPress={() => handleSlopePress('top-right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionLeft, holeData[currentHole].slopes.slope1 === 'left' && styles.activeButton]}
                            onPress={() => handleSlopePress('left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionRight, holeData[currentHole].slopes.slope1 === 'right' && styles.activeButton]}
                            onPress={() => handleSlopePress('right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottomLeft, holeData[currentHole].slopes.slope1 === 'bottom-left' && styles.activeButton]}
                            onPress={() => handleSlopePress('bottom-left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottomRight, holeData[currentHole].slopes.slope1 === 'bottom-right' && styles.activeButton]}
                            onPress={() => handleSlopePress('bottom-right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottom, holeData[currentHole].slopes.slope1 === 'bottom' && styles.activeButton]}
                            onPress={() => handleSlopePress('bottom', 1)}
                        />
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require('../images/puttmiss.png')} style={styles.image} />
                    <View style={styles.overlayContainer}>
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTop, holeData[currentHole].puttMiss.putt1 === 'long' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('long', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTopLeft, holeData[currentHole].puttMiss.putt1 === 'long-left' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('long-left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionTopRight, holeData[currentHole].puttMiss.putt1 === 'long-right' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('long-right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionLeft, holeData[currentHole].puttMiss.putt1 === 'left' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionRight, holeData[currentHole].puttMiss.putt1 === 'right' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottomLeft, holeData[currentHole].puttMiss.putt1 === 'short-left' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('short-left', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottomRight, holeData[currentHole].puttMiss.putt1 === 'short-right' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('short-right', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.overlaySection, styles.sectionBottom, holeData[currentHole].puttMiss.putt1 === 'short' && styles.activeButton]}
                            onPress={() => handlePuttMissPress('short', 1)}
                        />
                        <TouchableOpacity
                            style={[styles.puttMadeButton, holeData[currentHole].puttMade.putt1 && styles.activeButton]}
                            onPress={() => handlePuttMadePress(1)}>
                            {holeData[currentHole].puttMade.putt1 && <View style={styles.overlayCircle} />}
                        </TouchableOpacity>
                    </View>
                 </View>
                 <View style={styles.verticalContainer}>
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Misread: </Text>
                        <Switch style={styles.smallSwitch} value={holeData[currentHole].misread.misread1} onValueChange={(value) => handleMisreadChange(1, value)} />
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
                        style={[styles.overlaySection, styles.sectionTop, holeData[currentHole].slopes.slope2 === 'top' && styles.activeButton]}
                        onPress={() => handleSlopePress('top', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopLeft, holeData[currentHole].slopes.slope2 === 'top-left' && styles.activeButton]}
                        onPress={() => handleSlopePress('top-left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopRight, holeData[currentHole].slopes.slope2 === 'top-right' && styles.activeButton]}
                        onPress={() => handleSlopePress('top-right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionLeft, holeData[currentHole].slopes.slope2 === 'left' && styles.activeButton]}
                        onPress={() => handleSlopePress('left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionRight, holeData[currentHole].slopes.slope2 === 'right' && styles.activeButton]}
                        onPress={() => handleSlopePress('right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomLeft, holeData[currentHole].slopes.slope2 === 'bottom-left' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom-left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection,                         styles.sectionBottomRight, holeData[currentHole].slopes.slope2 === 'bottom-right' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom-right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottom, holeData[currentHole].slopes.slope2 === 'bottom' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom', 2)}
                    />
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../images/puttmiss.png')} style={styles.image} />
                <View style={styles.overlayContainer}>
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTop, holeData[currentHole].puttMiss.putt2 === 'long' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopLeft, holeData[currentHole].puttMiss.putt2 === 'long-left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long-left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopRight, holeData[currentHole].puttMiss.putt2 === 'long-right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long-right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionLeft, holeData[currentHole].puttMiss.putt2 === 'left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionRight, holeData[currentHole].puttMiss.putt2 === 'right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomLeft, holeData[currentHole].puttMiss.putt2 === 'short-left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short-left', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomRight, holeData[currentHole].puttMiss.putt2 === 'short-right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short-right', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottom, holeData[currentHole].puttMiss.putt2 === 'short' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short', 2)}
                    />
                    <TouchableOpacity
                        style={[styles.puttMadeButton, holeData[currentHole].puttMade.putt2 && styles.activeButton]}
                        onPress={() => handlePuttMadePress(2)}>
                        {holeData[currentHole].puttMade.putt2 && <View style={styles.overlayCircle} />}
                    </TouchableOpacity>
                </View>
            </View>                    
            <View style={styles.verticalContainer}>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Misread: </Text>
                    <Switch style={styles.smallSwitch} value={holeData[currentHole].misread.misread2} onValueChange={(value) => handleMisreadChange(2, value)} />
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
                        style={[styles.overlaySection, styles.sectionTop, holeData[currentHole].slopes.slope3 === 'top' && styles.activeButton]}
                        onPress={() => handleSlopePress('top', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopLeft, holeData[currentHole].slopes.slope3 === 'top-left' && styles.activeButton]}
                        onPress={() => handleSlopePress('top-left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopRight, holeData[currentHole].slopes.slope3 === 'top-right' && styles.activeButton]}
                        onPress={() => handleSlopePress('top-right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionLeft, holeData[currentHole].slopes.slope3 === 'left' && styles.activeButton]}
                        onPress={() => handleSlopePress('left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionRight, holeData[currentHole].slopes.slope3 === 'right' && styles.activeButton]}
                        onPress={() => handleSlopePress('right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomLeft, holeData[currentHole].slopes.slope3 === 'bottom-left' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom-left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomRight, holeData[currentHole].slopes.slope3 === 'bottom-right' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom-right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottom, holeData[currentHole].slopes.slope3 === 'bottom' && styles.activeButton]}
                        onPress={() => handleSlopePress('bottom', 3)}
                    />
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../images/puttmiss.png')} style={styles.image} />
                <View style={styles.overlayContainer}>
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTop, holeData[currentHole].puttMiss.putt3 === 'long' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopLeft, holeData[currentHole].puttMiss.putt3 === 'long-left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long-left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionTopRight, holeData[currentHole].puttMiss.putt3 === 'long-right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('long-right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionLeft, holeData[currentHole].puttMiss.putt3 === 'left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionRight, holeData[currentHole].puttMiss.putt3 === 'right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomLeft, holeData[currentHole].puttMiss.putt3 === 'short-left' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short-left', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottomRight, holeData[currentHole].puttMiss.putt3 === 'short-right' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short-right', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.overlaySection, styles.sectionBottom, holeData[currentHole].puttMiss.putt3 === 'short' && styles.activeButton]}
                        onPress={() => handlePuttMissPress('short', 3)}
                    />
                    <TouchableOpacity
                        style={[styles.puttMadeButton, holeData[currentHole].puttMade.putt3 && styles.activeButton]}
                        onPress={() => handlePuttMadePress(3)}>
                        {holeData[currentHole].puttMade.putt3 && <View style={styles.overlayCircle} />}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.verticalContainer}>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Misread: </Text>
                    <Switch style={styles.smallSwitch} value={holeData[currentHole].misread.misread3} onValueChange={(value) => handleMisreadChange(3, value)} />
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
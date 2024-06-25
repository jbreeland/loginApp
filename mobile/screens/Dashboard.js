import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const [avgPuttDist, setAvgPuttDist] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetch('http://localhost:3000/api/puttstats')
            .then(response => response.json())
            .then(data => setAvgPuttDist(data.avgPuttDist))
            .catch(error => console.error('Error fetching putt stats:', error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Welcome to the Dashboard!</Text>
            
            <Text style={styles.text2}>Putting Stats</Text>
            <View style={styles.columnContainer}>
                <View style={styles.leftColumn}>
                    <Text style={styles.text3}>Avg Putt Dist: {avgPuttDist !== null ? avgPuttDist : 'Loading...'} </Text>
                    <Text style={styles.text3}>Tot Putt Dist: 71 </ Text>
                    <Text style={styles.text3}>Avg 3 putts: 1.7 </Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.text3}>1st putt make %: 25%</Text>
                    <Text style={styles.text3}>Avg dist GIR: 25</Text>
                    <Text style={styles.text3}>Avg dist mGIR: 14</Text>
                </View>
            </View>

            <Text style={styles.text2}>Game Stats</Text>
            <View style={styles.columnContainer}>
                <View style={styles.leftColumn}>
                    <Text style={styles.text3}>Games Played: 20 </ Text>
                    <Text style={styles.text3}>Wins: 15 </ Text>
                    <Text style={styles.text3}>Losses: 5 </Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.text3}>Avg Score: 70</Text>
                    <Text style={styles.text3}>Best Score: 65</Text>
                    <Text style={styles.text3}>Worst Score: 80</Text>
                </View>
            </View>
            <Button 
                title="Go to Design Screen" 
                onPress={() => navigation.navigate('Design')} 
            />
            <Button 
                title="Go to Test Screen" 
                onPress={() => navigation.navigate('Test')} 
            />
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
    columnContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    leftColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text3: {
        fontSize: 12,
    },
});

export default Dashboard;
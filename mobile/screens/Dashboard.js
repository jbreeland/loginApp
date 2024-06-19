import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Welcome to the Dashboard!</Text>
            
            <Text style={styles.text2}>Putting Stats</Text>
            <View style={styles.columnContainer}>
                <View style={styles.leftColumn}>
                    <Text style={styles.text3}>Avg Putt Dist: 4 </Text>
                    <Text style={styles.text3}>Tot Putt Dist: 71 </Text>
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
                    <Text style={styles.text3}>Games Played: 20 </Text>
                    <Text style={styles.text3}>Wins: 15 </Text>
                    <Text style={styles.text3}>Losses: 5 </Text>
                </View>
                <View style={styles.rightColumn}>
                    <Text style={styles.text3}>Avg Score: 70</Text>
                    <Text style={styles.text3}>Best Score: 65</Text>
                    <Text style={styles.text3}>Worst Score: 80</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
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
        alignItems: 'flex-start',
        marginLeft: 60,
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight: 50,
    },
    text1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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

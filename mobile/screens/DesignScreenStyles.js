import { StyleSheet } from 'react-native';

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
        height: 110,
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
    alignedContainer: {
        marginTop: 10,
        marginLeft: 0,
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 1,
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
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    distanceLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    scrollBox: {
        height: 50,
        width: 100, // Adjust the width as needed
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
    },
    distanceOption: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedDistanceOption: {
        backgroundColor: '#ddd',
    },
    distanceOptionText: {
        fontSize: 14,
    },
});

export default styles;
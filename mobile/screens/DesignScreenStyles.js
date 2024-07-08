import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexshrink: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
    },
    holeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
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
        fontSize: 30, // Font size for the score in the score container
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
        transform: [{ scale: 0.75 }],
    },
    scoreLabel: {
        fontSize: 30,
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
    girUpDownContainer: {
        flexDirection: 'row',
        width: '50%', // Adjust the width as needed
        justifyContent: 'flex-start', // Align to the left
    },
    halfWidthContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
    },    
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        marginTop: 0,
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
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 10,
        marginTop: 10,
        transform: [{ scale: 0.75 }],
    },
    distanceLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    scrollBox: {
        height: 40,
        width: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    distanceOption: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    distanceOptionText: {
        fontSize: 14,
    },
    selectedDistanceOption: {
        backgroundColor: '#hhh',
    },
    puttLabel: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 1,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
        marginHorizontal: 10,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 1,
    },
    puttText: {
        fontSize: 20,
        textAlign: 'center',
    },
    centeredTextContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        width: '100%',
        marginLeft: 20,
    },
    image: {
        width: 125, // Increased width
        height: 125, // Increased height
        resizeMode: 'contain',
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlaySection: {
        position: 'absolute',
        width: '20%',
        height: '20%',
        backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
    },
    sectionTop: {
        top: '0%',
        left: '40%',
    },
    sectionTopLeft: {
        top: '10%',
        left: '10%',
    },
    sectionTopRight: {
        top: '10%',
        right: '10%',
    },
    sectionLeft: {
        top: '40%',
        left: '0%',
    },
    sectionRight: {
        top: '40%',
        right: '0%',
    },
    sectionBottomLeft: {
        bottom: '10%',
        left: '10%',
    },
    sectionBottomRight: {
        bottom: '10%',
        right: '10%',
    },
    sectionBottom: {
        bottom: '0%',
        left: '40%',
    },
    
    puttMadeButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 50,
        height: 50,
        transform: [{ translateX: -25 }, { translateY: -25 }],
        borderRadius: 25,
        backgroundColor: 'transparent', // Initially transparent
    },
    activeButton: {
        backgroundColor: 'rgba(0, 100, 0, 0.5)', // Dark green background for active buttons
    },
    overlayCircle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 25, // Ensures it is a circle
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    verticalContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default styles;
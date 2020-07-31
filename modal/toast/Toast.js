import React, {
    Component,
} from 'react';

import {
    StyleSheet,
    View,
    Easing,
    Text,
    Animated,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import layout from '../../../utils/layout';
import { uri2http } from '../../../utils/Utils';


export default class Toast extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: props.message !== undefined ? props.message : '',
            duration: props.duration ? props.duration : 1500,
            image: props.image ? props.image : '',
            defaultImage: require('../.././../assets/image/default-img-bg.png'),
            opacityAnim: new Animated.Value(0),
        }
    }
    componentDidMount() {
        this._showAn()
    }
    componentDidUpdate(prevProps, prevState) {
        this._showAn();
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { message, duration, image } = nextProps
        if (message != prevState.message) {
            return {
                message: message
            }
        }
        if (duration != prevState.duration) {
            return {
                duration: duration
            }
        }
        if (image != prevState.image) {
            return {
                image: image
            }
        }
        return null
    }
    _showAn = () => {
        Animated.timing(
            this.state.opacityAnim,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => { this.timingDismiss() })
    }
    timingDismiss = () => {
        this.timer = setTimeout(() => {
            this.dismiss()
        }, this.state.duration)
    };
    dismiss = () => {
        Animated.timing(
            this.state.opacityAnim,
            {
                toValue: 0,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            },
        ).start(this.onDismiss);
    };
    onDismiss = () => {
        if (this.props.onDismiss) {
            this.props.onDismiss()
        }
    }
    _showImage = () => {
        if (this.state.image.startsWith('http://') || this.state.image.startsWith('https://')) {
            return { uri: this.state.image }
        } else {
            return this.state.defaultImage;
        }
    }
    render() {
        return (
            <View style={styles.container} pointerEvents='none'>
                <Animated.View style={[styles.textContainer, { opacity: this.state.opacityAnim }]}>
                    <Image style={styles.imageStyle} source={this._showImage()} defaultSource={this.state.defaultImage} />
                    <Text
                        style={styles.defaultText}>
                        {this.state.message}
                    </Text>
                </Animated.View>
            </View>
        )
    }
}
Toast.propTypes = {
    duration: PropTypes.number,
    message: PropTypes.string,
    image: PropTypes.string
}
Toast.defaultProps = {
    duration: 1500,
    message: '',
    image: ''
}
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",

    },
    textContainer: {
        backgroundColor: 'rgba(0,0,0,.6)',
        borderRadius: 8,
        padding: 10,
        maxWidth: layout.screenWidth / 2,
        alignSelf: "center",
        flexDirection: 'row',
        alignItems: 'center',

    },
    defaultText: {
        color: "#FFF",
        fontSize: 15,
        marginLeft: 10
    },
    imageStyle: {
        height: 30,
        width: 30,
        borderRadius: 15
    }
})
import React, { PureComponent, Component } from 'react'
import {
    View,
    StyleSheet,
    ViewPropTypes,
    Text,
    Animated,
    Easing,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-translucent-modal';
import layout from '../../../utils/layout';
import PropTypes from 'prop-types';
import { commonStyle } from '../../../utils/commonStyle';
import _ from 'lodash'
export default class AlerView extends Component {

    static propTypes = {
        ...ViewPropTypes,
        // containerStyle: ViewPropTypes.style,
        visible: PropTypes.bool,
        delay: PropTypes.number,
        opacity: PropTypes.number,
        title: PropTypes.string,
        message: PropTypes.string,
        option: PropTypes.array
    };

    static defaultProps = {
        visible: false,
        delay: 0,
        opacity: 0.7,
        title: '',
        message: '',
        option: []
    };

    constructor(props) {
        super(props)
        this.state = {
            visible: props.visible,
            view: null,
            title: props.title,
            message: props.message,
            option: props.option,
            springValue: new Animated.Value(0.3)
            // opactyAn: new Animated.Value(0)
        }
        this._animating = false;
    }
    componentDidMount = () => {
        if (this.state.visible) {
            this._showTimeout = setTimeout(() => this._show(), this.props.delay);
        }
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        const { title, message, option } = nextProps
        if (title != prevState.title) {
            return {
                title: title
            }
        }
        if (message != prevState.message) {
            return {
                message: message
            }
        }
        if (!_.isEqual(option, prevState.option)) {
            return {
                option: option
            }
        }
        return null
    }
    componentWillUnmount() {
        this._showTimeout && clearTimeout(this._showTimeout)
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.visible !== prevState.visible) {
            if (this.props.visible) {
                this._showTimeout = setTimeout(() => this._show(), this.props.delay);
            } else {
                this._hide();
            }


        }
    }

    _show = () => {
        clearTimeout(this._showTimeout);
        if (!this._animating) {
            this._animating = true;
            // this.opactyAn.setValue(0)
            this.setState({
                visible: true
            }, () => {
                this.state.springValue.setValue(0);
                Animated.spring(
                    this.state.springValue,
                    {
                        toValue: 1,
                        // bounciness:15,
                        // stiffness:200,
                        friction:5,
                        useNativeDriver : true,
                    },
                    
                ).start(()=>{this._animating = false;});
            });

        }
    }
    _hide = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        if (!this.state.visible) return null
        return (
            // pointerEvents='none'
            <View style={[styles.rootView]}>
                <Animated.View
                    style={[styles.centerViewStyle, { transform: [{ scale: this.state.springValue }] }]}>
                    <View style={styles.infoStyle}>
                        {!_.isEmpty(this.state.title) ? <Text style={styles.titleStyle}>{this.state.title}</Text> : null}
                        {!_.isEmpty(this.state.message) ? <Text style={styles.messageStyle}>{this.state.message}</Text> : null}
                    </View>

                    <View style={styles.btnViewStyle}>
                        {
                            this.state.option.map((value, index) => {
                                return (
                                    <View key={'aler_$' + index}>
                                        <TouchableOpacity
                                            hitSlop={{ top: 10, left: 0, bottom: 10, right: 0 }}
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                value.onPress && value.onPress();
                                                this._hide()
                                            }}>
                                            <Text style={[styles.pad, value.style == 'cancel' ? styles.cancelTextStyle : styles.otherTextStyle]}>
                                                {value.text}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>

                </Animated.View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 200,
        width: layout.screenWidth - 80,
        backgroundColor: 'blue'
    },
    rootView: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        // flexDirection: "row",
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    centerViewStyle: {
        backgroundColor: commonStyle.white,
        width: 310,
        paddingTop: 31,
        paddingBottom: 24,
        borderRadius: 5
    },
    infoStyle: {
        paddingHorizontal: 25,
    },
    titleStyle: {
        textAlign: 'center'
    },
    messageStyle: {
        color: '#222222',
        fontSize: 18
    },
    btnViewStyle: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        marginTop: 52
    },
    pad: {
        paddingHorizontal: 25
    },
    cancelTextStyle: {
        color: '#666666',
        fontSize: 16,
        fontWeight: commonStyle.medium
    },
    otherTextStyle: {
        color: '#100D20',
        fontSize: 16,
        fontWeight: commonStyle.medium
    }

})
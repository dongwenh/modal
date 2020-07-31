import React, { PureComponent, Component } from 'react'
import {
    View,
    StyleSheet,
    ViewPropTypes,
    Text,
    AppRegistry
} from 'react-native';
export default class RootModal extends Component {

    constructor(props) {
        super(props)
        viewRoot = this;
        this.state = {
            view: null,
        }
    }
    static setView = (view) => {

        viewRoot.setState({ view: view })
    }
    render() {
        return (
            <View style={styles.rootView} pointerEvents="box-none">
                {this.state.view}
            </View>
        )
    }
}
const originRegister = AppRegistry.registerComponent;

AppRegistry.registerComponent = (appKey, component) => {

    return originRegister(appKey, function () {
        const OriginAppComponent = component();

        return class extends Component {

            render() {
                return (
                    <View style={{
                        flex: 1,
                        position: 'relative',
                    }}>
                        <OriginAppComponent />
                        <RootModal />
                    </View>
                );
            };
        };
    });
};
const styles = StyleSheet.create({
    rootView: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
    }

})
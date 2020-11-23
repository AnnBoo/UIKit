// @flow
import React from 'react';
import { Platform, StyleSheet, View, Text, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { UIColor, UIStyle, UIDevice } from '@tonlabs/uikit.core';

import { uiLocalized } from '@tonlabs/uikit.localization';

import UIComponent from '../UIComponent';

const STATUS_HEIGHT = 24; // Based on Figma design

const styles = StyleSheet.create({
    connectionSnack: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: UIDevice.statusBarHeight(),
        height: UIDevice.statusBarHeight() + STATUS_HEIGHT,
        backgroundColor: UIColor.blackLight(),
    },
});

type NetInfoState = {
    type: string,
    isConnected: boolean,
    isInternetReachable: boolean,
    isWifiEnabled: boolean,
    details: any,
}

type Props = {
    onConnected: (boolean) => void,
}

type State = {
    connected: boolean,
};

export default class UINetworkStatus extends UIComponent<Props, State> {
    static statusHeight() {
        return STATUS_HEIGHT;
    }

    // constructor
    constructor(props: Props) {
        super(props);

        this.state = {
            connected: true,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.startListeningToConnectionInfo();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.stopListeningToConnectionInfo();
    }

    // Setters
    setConnected(connected: boolean) {
        this.setStateSafely({ connected });
    }

    // Getters
    isConnected(): boolean {
        return this.state.connected;
    }

    // Actions
    unsubscribe: ?() => void;
    startListeningToConnectionInfo() {
        this.unsubscribe = NetInfo.addEventListener(this.handleConnectionChange);
    }

    stopListeningToConnectionInfo() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    handleConnectionChange = ({ isConnected }: NetInfoState) => {
        this.setConnected(isConnected);
        // Change status bar color style
        const statusBarStyle = isConnected ? 'dark-content' : 'light-content';
        StatusBar.setBarStyle(statusBarStyle, true);
        const statusBarColor = isConnected ? 'white' : 'black';
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(statusBarColor, true);
        }
        // Pass connection status to props
        this.props.onConnected(isConnected);
    };

    // Render
    renderSnack() {
        const isConnected = this.isConnected();
        if (isConnected) {
            return null;
        }
        return (
            <View style={styles.connectionSnack}>
                <Text style={UIStyle.text.secondaryDarkTinyRegular()}>
                    {uiLocalized.PleaseGoOnline}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={UIStyle.topScreenContainer} pointerEvents="none">
                {this.renderSnack()}
            </View>
        );
    }

    static defaultProps: Props;
}

UINetworkStatus.defaultProps = {
    onConnected: () => {},
};
// @flow
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import UIStyle from '../../../helpers/UIStyle';
import UIAssets from '../../../assets/UIAssets';

import UIComponent from '../../UIComponent';

type Props = {
    testID: string,
    containerStyle: ViewStyleProp,
    icon: any,
    navigation: Object,
};

type State = {};

export default class UINavigationBackButton extends UIComponent<Props, State> {
    static defaultProps = {
        containerStyle: {},
        icon: null,
        navigation: null,
    };

    // Getters
    getNavigation() {
        return this.props.navigation;
    }

    getNavigationParams() {
        return this.props.navigation.state.params;
    }

    getContainerStyle() {
        return this.props.containerStyle;
    }

    getIcon() {
        return this.props.icon;
    }

    // React.Component
    render() {
        const { testID } = this.props;
        const testIDProp = testID ? { testID } : null;
        const params = this.getNavigationParams();
        if (params && params.initialRoute) {
            return (<View />);
        }
        return (
            <TouchableOpacity
                {...testIDProp}
                style={[UIStyle.navigatorButton, this.getContainerStyle()]}
                onPress={() => {
                    this.getNavigation().goBack(null);
                }}
            >
                <Image source={this.getIcon() || UIAssets.icoArrowLeft()} />
            </TouchableOpacity>
        );
    }
}

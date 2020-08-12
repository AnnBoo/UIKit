// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import UIConstant from '../../../helpers/UIConstant';
import UIColor from '../../../helpers/UIColor';

const dotSize = UIConstant.tinyCellHeight();

const styles = StyleSheet.create({
    dotGray: {
        width: dotSize / 2,
        height: dotSize / 2,
        borderRadius: dotSize / 4,
        backgroundColor: UIColor.grey3(),
    },
    dotView: {
        width:
            UIConstant.smallContentOffset() +
            dotSize +
            UIConstant.smallContentOffset(),
        height:
            UIConstant.smallContentOffset() +
            dotSize +
            UIConstant.smallContentOffset(),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: UIConstant.smallContentOffset(),
    },
});

type UIPinCodeDotProps = { valueDefined: boolean, color: string };
type UIPinCodeDotState = {
    show: boolean,
    hide: boolean,
    savedIsValueDefined: boolean,
};

const springConfig = Animated.SpringUtils.makeDefaultConfig();

export default class UIPinCodeDot extends React.Component<
    UIPinCodeDotProps,
    UIPinCodeDotState,
> {
    static getDerivedStateFromProps(
        props: UIPinCodeDotProps,
        state: UIPinCodeDotState,
    ) {
        return {
            hide: state.savedIsValueDefined && !props.valueDefined,
            show: !state.savedIsValueDefined && props.valueDefined,
            savedIsValueDefined: props.valueDefined,
        };
    }

    state = {
        show: false,
        hide: false,
        savedIsValueDefined: false,
    };

    componentDidUpdate() {
        if (this.state.show) {
            Animated.spring(this.animation, {
                ...springConfig,
                toValue: 1,
            }).start();
        } else if (this.state.hide) {
            Animated.spring(this.animation, {
                ...springConfig,
                toValue: 0,
            }).start();
        }
    }

    get animatedBackgroundColor() {
        return Animated.interpolateColors(this.animation, {
            inputRange: [0, 1],
            outputColorRange: [UIColor.grey3(), this.props.color],
        });
    }

    animation = new Animated.Value(0);
    animatedScale = Animated.interpolate(this.animation, {
        inputRange: [0, 1],
        outputRange: [1, 2],
    });

    render() {
        return (
            <View style={styles.dotView}>
                <Animated.View
                    style={[
                        styles.dotGray,
                        {
                            backgroundColor: this.animatedBackgroundColor,
                            transform: [{ scale: this.animatedScale }],
                        },
                    ]}
                />
            </View>
        );
    }
}

// @flow
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import { hideMessage } from 'react-native-flash-message';
import {
    PanGestureHandler,
    State as RNGHState,
} from 'react-native-gesture-handler';

import { UIConstant } from '@tonlabs/uikit.core';
import {
    UIBackgroundView,
    UIBackgroundViewColors,
    UILabel,
    UILabelColors,
    UILabelRoles,
} from '@tonlabs/uikit.hydrogen';

import UINotice from '../UINotice';
import type { MessageObject, NoticeAction } from '../UINotice';

const { width } = Dimensions.get('window');
const pageToastWidth = width - (UIConstant.contentOffset() * 2);

const styles = StyleSheet.create({
    containerStyle: {
        height: 84,
        justifyContent: 'center',
        paddingHorizontal: UIConstant.contentOffset(),
    },
    toastStyle: {
        width: Math.min(UIConstant.toastWidth(), pageToastWidth),
        borderRadius: UIConstant.mediumBorderRadius(),
        padding: UIConstant.contentOffset(),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

type Placement = 'center' | 'flex-start';

type ToastObject = {
    message: string,
    type?: string,
    placement?: Placement,
    autoHide?: boolean,
    action?: NoticeAction,
    duration?: number,
    showOnTop?: boolean,
}

type RNGHEvent<T> = { nativeEvent: T };

export default class UIToastMessage {
    static Type = {
        Default: 'default',
        Alert: 'alert',
    };

    static Place = {
        Center: 'center',
        Left: 'flex-start',
    };

    static Duration = {
        Long: UIConstant.toastDurationLong(),
        Short: UIConstant.toastDurationShort(),
    };

    static showMessage(args: string | ToastObject, duration?: number) {
        if (typeof args === 'string') {
            this.prepareAndShowMessage({ message: args, duration });
        } else {
            this.prepareAndShowMessage(args);
        }
    }

    // Internals
    static message: string;
    static type: string;
    static placement: Placement;
    static action: NoticeAction;
    static touchY = new Animated.Value(0);
    static shouldClose = false;
    static swiping = false;

    // Actions
    static prepareAndShowMessage(args: ToastObject) {
        const {
            message, type, placement,
            autoHide = true, action, duration = this.Duration.Long,
            showOnTop,
        } = args;
        this.message = message || '';
        this.type = type || this.Type.Default;
        this.placement = placement || this.Place.Center;
        this.action = action || { title: '', onPress: () => {} };
        const messageComponent = this.renderMessageComponent();
        const messageObject: MessageObject = {
            message: '', // unused but required param
            animated: true,
            duration,
            autoHide,
        };
        this.touchY.setValue(0);
        UINotice.showToastMessage(messageObject, messageComponent, showOnTop);
    }

    static closeToast() {
        this.action.onPress();
        hideMessage();
    }

    // Events
    static onPanGestureEvent = ({
        nativeEvent: { translationY },
    }: RNGHEvent<{ translationY: number }>) => {
        // Only swipes down:
        if (translationY > 0) {
            this.swiping = true;
            this.touchY.setValue(translationY);
            this.shouldClose = Math.abs(translationY) > UIConstant.mediumContentOffset();
            Animated.event([{ nativeEvent: { y: this.touchY } }], { useNativeDriver: true });
        }
    };

    static onPanHandlerStateChange = ({
        nativeEvent: { state, translationY },
    }: RNGHEvent<{ state: RNGHState, translationY: number }>) => {
        if (this.shouldClose) {
            // Moves toast outside screen and then it "closes" it.
            Animated.spring(this.touchY, {
                speed: 40,
                toValue: UIConstant.enormousContentOffset(),
                useNativeDriver: true,
            }).start(() => {
                hideMessage();
            });
        } else {
            // If the toast wasn't dragged enough distance to close, we want to
            // reset its initial position.
            Animated.spring(this.touchY, {
                toValue: 0,
                useNativeDriver: true, // for smother animation
            }).start();
        }
        this.shouldClose = false;
    };

    // Render
    static renderCloseButton() {
        if (this.type === this.Type.Default && this.action.title) {
            return (
                <TouchableOpacity
                    testID="toast-action-button"
                    onPress={() => this.closeToast()}
                >
                    <UILabel
                        color={UILabelColors.StaticTextPrimaryLight}
                        role={UILabelRoles.ActionCallout}
                    >
                        {this.action.title}
                    </UILabel>
                </TouchableOpacity>
            );
        }
        return null;
    }

    static renderMessageComponent() {
        return (
            <PanGestureHandler
                onGestureEvent={this.onPanGestureEvent}
                onHandlerStateChange={this.onPanHandlerStateChange}
            >
                <Animated.View
                    style={[
                        styles.containerStyle,
                        {
                            transform: [{
                                translateY: Animated.add(this.touchY, new Animated.Value(0)),
                            }],
                        },
                    ]}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            if (!this.swiping) {
                                hideMessage();
                            }
                            this.swiping = false;
                        }}
                    >
                        <UIBackgroundView
                            color={this.type === this.Type.Alert
                                ? UIBackgroundViewColors.BackgroundNegative
                                : UIBackgroundViewColors.StaticBackgroundBlack}
                            style={styles.toastStyle}
                        >
                            <UILabel
                                color={UILabelColors.StaticTextPrimaryLight}
                                role={UILabelRoles.ParagraphFootnote}
                                testID={`message_${this.type}`}
                            >
                                {this.message}
                            </UILabel>
                            {this.renderCloseButton()}
                        </UIBackgroundView>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

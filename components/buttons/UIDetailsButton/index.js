// @flow
import React from 'react';
import { Animated, StyleSheet, Text, View, Image } from 'react-native';

import type AnimatedValue from 'react-native/Libraries/Animated/src/nodes/AnimatedValue';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import type { ActionProps, ActionState } from '../../UIActionComponent';
import UIActionComponent from '../../UIActionComponent';
import UIColor from '../../../helpers/UIColor';
import UIConstant from '../../../helpers/UIConstant';
import UIStyle from '../../../helpers/UIStyle';
import UIFunction from '../../../helpers/UIFunction';
import UIColorPalette from '../../../helpers/UIColor/UIColorPalette';

import icoProgress from '../../../assets/ico-progress/progress.png';

type Props = ActionProps & {
    style: ViewStyleProp,
    containerStyle: ViewStyleProp,
    progress: boolean,
    transparent: boolean,
    index: ?number,
    image: string,
    title: number | string,
    truncTitle: boolean,
    caption: string,
    truncCaption: boolean,
    details: string,
    titleComponent?: React$Node,
    captionComponent?: React$Node,
    customComponent?: React$Node,
};

type State = ActionState & {
    spinValue: AnimatedValue,
};

const styles = StyleSheet.create({
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hoverOffset: {
        left: -UIConstant.contentOffset(),
        right: -UIConstant.contentOffset(),
        top: 0,
        bottom: 0,
    },
    avatar: {
        width: UIConstant.defaultCellHeight(),
        height: UIConstant.defaultCellHeight(),
        borderRadius: UIConstant.defaultCellHeight() / 2.0,
        overflow: 'hidden',
    },
});

export default class UIDetailsButton extends UIActionComponent<Props, State> {
    static defaultProps: Props = {
        ...UIActionComponent.defaultProps,
        narrow: false,
        style: {},
        containerStyle: {},
        progress: false,
        index: null,
        image: '',
        title: '',
        truncTitle: false,
        caption: '',
        truncCaption: false,
        fixedCaption: '',
        details: '',
    };

    static testIds = {
        title: 'title',
        details: 'details',
        secondDetails: 'secondDetails',
        caption: 'caption',
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            ...this.state,
            spinValue: new Animated.Value(0),
        };
    }

    componentDidMount() {
        super.componentDidMount();
        if (this.props.progress) {
            this.animateRotation();
        }
    }

    // Setters
    setSpinValue(spinValue: AnimatedValue) {
        this.setStateSafely({ spinValue });
    }

    // Getters
    getSpinValue() {
        return this.state.spinValue;
    }

    getBackgroundStyle() {
        if (this.props.disabled || this.props.disableHighlight) {
            return null;
        }

        if (this.isHover() || this.isTapped()) {
            const color = UIColor.whiteLight();
            return [
                UIColor.getBackgroundColorStyle(color),
                styles.hoverOffset,
            ];
        }
        return null;
    }

    getTitleColorStyle() {
        if (this.props.disabled || this.props.titleIsText) {
            return UIColor.getColorStyle(UIColorPalette.text.lightSecondary);
        }

        if (this.isHover() || this.isTapped()) {
            const color = UIColor.primary4();
            return UIColor.getColorStyle(color);
        }
        return null;
    }

    getFormattedText(str: string) {
        return UIFunction.truncText(str, this.props.narrow);
    }

    // Actions
    animateRotation() {
        Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            if (this.mounted) {
                this.setSpinValue(new Animated.Value(0));
                this.animateRotation();
            }
        });
    }

    // Render
    renderProgressCard() {
        const spinValue = this.getSpinValue();
        const spin = spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });
        return (
            <View style={UIStyle.common.alignCenter()}>
                <Animated.Image
                    source={icoProgress}
                    style={{
                        transform: [{ rotate: spin }],
                    }}
                />
            </View>
        );
    }

    renderTitleCaption() {
        const {
            title, caption, titleComponent, captionComponent,
        } = this.props;
        const formattedCaption = this.props.truncCaption ? this.getFormattedText(caption) : caption;
        const captionText = caption ? (
            <Text
                ellipsizeMode="middle"
                numberOfLines={1}
                style={UIStyle.text.primarySmallRegular()}
                testID={UIDetailsButton.testIds.caption}
            >
                {formattedCaption}
            </Text>
        ) : null;
        const formattedTitle = this.props.truncTitle ? this.getFormattedText(title) : title;

        return (
            <View style={styles.rowContainer}>
                {!!formattedTitle && (
                    <Text
                        ellipsizeMode="middle"
                        numberOfLines={1}
                        style={[
                            UIStyle.text.smallMedium(),
                            UIStyle.common.flex(),
                            UIStyle.margin.rightDefault(),
                            this.getTitleColorStyle(),
                        ]}
                        testID={UIDetailsButton.testIds.title}
                    >
                        {formattedTitle}
                    </Text>
                )}
                {titleComponent}
                {!formattedTitle && !titleComponent && <View style={UIStyle.common.flex()} />}
                {captionText}
                {captionComponent}
            </View>
        );
    }

    renderDetails() {
        const { secondDetails, details } = this.props;
        return !!(details || secondDetails) && (
            <View style={[styles.rowContainer, UIStyle.margin.topTiny()]}>
                <Text
                    style={[
                        UIStyle.text.secondaryCaptionRegular(),
                        UIStyle.common.flex(),
                    ]}
                    testID={UIDetailsButton.testIds.details}
                >
                    {details}
                </Text>
                <Text
                    style={UIStyle.text.secondaryCaptionRegular()}
                    testID={UIDetailsButton.testIds.secondDetails}
                >
                    {secondDetails}
                </Text>
            </View>
        );
    }

    renderContentCard() {
        const { customComponent } = this.props;
        return (
            <View style={[UIStyle.common.flex(), UIStyle.common.flexColumn()]}>
                {customComponent}
                {this.renderTitleCaption()}
                {this.renderDetails()}
            </View>
        );
    }

    renderCard() {
        const {
            progress, image, narrow, index,
        } = this.props;
        const margin = narrow ? UIStyle.margin.rightSmall() : UIStyle.margin.rightDefault();
        if (progress) {
            return this.renderProgressCard();
        }
        return (
            <View style={UIStyle.container.centerLeft()}>
                {index !== null && (
                    <Text style={[UIStyle.text.primarySmallMedium(), margin]}>
                        {index}.
                    </Text>
                )}
                {!!image && (
                    <Image
                        source={image}
                        style={[styles.avatar, margin]}
                    />
                )}
                {this.renderContentCard()}
            </View>
        );
    }

    renderContent() {
        const { containerStyle, style } = this.props;
        const backgroundStyle = this.getBackgroundStyle();
        return (
            <View style={[
                UIStyle.common.justifyCenter(),
                UIStyle.height.majorCell(),
                containerStyle,
                style,
            ]}
            >
                <View style={[UIStyle.common.positionAbsolute(), backgroundStyle]} />
                {this.renderCard()}
            </View>
        );
    }
}

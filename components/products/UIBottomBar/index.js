// @flow
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import StylePropType from 'react-style-proptype';

import UIComponent from '../../UIComponent';
import UIConstant from '../../../helpers/UIConstant';
import UIStyle from '../../../helpers/UIStyle';
import UITextStyle from '../../../helpers/UITextStyle';
import UIColor from '../../../helpers/UIColor';

import type { ClassNameProp } from '../../../types';

const styles = StyleSheet.create({
    container: {
        height: UIConstant.bigCellHeight(),
        paddingHorizontal: UIConstant.contentOffset(),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const bottomTextStyle = [
    UIStyle.alignJustifyCenter,
    UIStyle.bigCellHeight,
    UIStyle.pageSlimContainer,
];

type Props = {
    text: string,
    textStyle: StylePropType,
    companyName: string,
    address: string,
    location: string,
    postalCode: string,
    phoneNumber: string,
    email: string,
    mobile: boolean,
    screenWidth: number,
};

type State = {
    emailHover: boolean,
    emailTap: boolean,
};

export default class UIBottomBar extends UIComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            emailHover: false,
            emailTap: false,
        };
    }

    // Setters
    setEmailHover(emailHover: boolean = true) {
        this.setStateSafely({ emailHover });
    }

    setEmailTap(emailTap: boolean = true) {
        this.setStateSafely({ emailTap });
    }

    // Getters
    isEmailHover() {
        return this.state.emailHover;
    }

    isEmailTap() {
        return this.state.emailTap;
    }

    isMobile() {
        const { screenWidth, mobile } = this.props;
        if (!screenWidth) {
            return mobile;
        }
        return screenWidth < UIConstant.elasticWidthWide();
    }

    hasNoContacts() {
        const {
            companyName, address, phoneNumber, postalCode, location,
        } = this.props;
        return !companyName && !address && !phoneNumber && !postalCode && !location;
    }

    hasNoLeftPart() {
        const { text, menuItems } = this.props;
        return !text && menuItems.length === 0;
    }

    renderEmail() {
        const { email } = this.props;
        const primatyColorStyle = UIColor.getColorStyle(UIColor.textPrimary());
        const colorStyle = this.isEmailHover() || this.isEmailTap() ? primatyColorStyle : null;
        return (
            <Text
                accessibilityRole="link"
                href={`mailto:${email}`}
                onPressIn={() => this.setEmailTap()}
                onPressOut={() => this.setEmailTap(false)}
                onMouseEnter={() => this.setEmailHover()}
                onMouseLeave={() => this.setEmailHover(false)}
                style={colorStyle}
            >
                {email}
            </Text>
        );
    }

    renderCenterTextComponent(able) {
        const {
            companyName, address, phoneNumber, postalCode, textStyle, location,
        } = this.props;
        if (!able || this.hasNoContacts()) {
            return null;
        }
        const classNameProp: ClassNameProp = { className: 'contacts' };
        return (
            <View
                testID="bottomBar"
                style={bottomTextStyle}
                itemScope
                itemType="http://schema.org/Organization"
                {...classNameProp}
            >
                <Text style={[textStyle, UIStyle.textAlignCenter]}>
                    <Text itemProp="name" className="company">{companyName}</Text>
                    {', '}
                    <Text
                        itemProp="address"
                        itemScope
                        itemType="http://schema.org/PostalAddress"
                        className="address"
                    >
                        <Text itemProp="streetAddress" className="street">
                            {address}
                        </Text>
                        {', '}
                        <Text itemProp="postalCode">
                            {postalCode}
                        </Text>
                        {', '}
                        <Text itemProp="addressLocality">
                            {location}
                        </Text>
                        {' '}
                        {this.renderEmail()}
                        {'  ·  '}
                    </Text>
                    <Text itemProp="telephone">{phoneNumber}</Text>
                </Text>
            </View>
        );
    }

    renderLeft() {
        const { text, textStyle } = this.props;
        if (this.hasNoLeftPart()) {
            return null;
        }
        return (
            <View style={UIStyle.flex} testID="left text >>">
                <Text style={textStyle}>
                    {text}
                </Text>
                {this.renderMenu()}
            </View>
        );
    }

    renderMenu() {
        const { menuItems, textStyle } = this.props;
        if (menuItems.length === 0) {
            return null;
        }
        const dot = (
            <Text style={textStyle}>
                {'  ·  '}
            </Text>
        );
        const menu = menuItems.map((item, index) => (
            <React.Fragment key={`bottom-bar-menu-item-${item.title}`}>
                <TouchableOpacity
                    onPress={item.onPress}
                >
                    <Text style={textStyle}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
                {index === menuItems.length - 1 ? null : dot}
            </React.Fragment>
        ));

        return (
            <View style={UIStyle.flexRow}>
                {menu}
            </View>
        );
    }

    renderDesktopCenterText() {
        if (this.hasNoContacts()) {
            return null;
        }
        const mobile = this.isMobile();
        return (
            <View style={UIStyle.flex} testID="center text >>">
                {this.renderCenterTextComponent(!mobile)}
            </View>
        );
    }

    renderCopyRight() {
        const { textStyle, copyRight } = this.props;
        const isShort = this.hasNoLeftPart() && this.hasNoContacts();
        const copyRightText = this.isMobile() && !isShort ? '©' : copyRight;
        const align = isShort ? UIStyle.alignCenter : UIStyle.alignEnd;
        return (
            <View style={[UIStyle.flex, align]}>
                <Text style={textStyle}>
                    {copyRightText}
                </Text>
            </View>
        );
    }

    render() {
        const mobile = this.isMobile();
        return (
            <View style={UIStyle.bottomScreenContainer}>
                <View style={this.props.containerStyle}>
                    <View style={styles.container}>

                        {this.renderLeft()}
                        {this.renderDesktopCenterText()}
                        {this.renderCopyRight()}

                    </View>
                    {this.renderCenterTextComponent(mobile)}
                </View>
            </View>
        );
    }

    static defaultProps: Props;
}

UIBottomBar.defaultProps = {
    textStyle: UITextStyle.tertiaryTinyRegular,
    containerStyle: {},
    menuItems: [],
    text: '',
    companyName: '',
    address: '',
    location: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    copyRight: '',
    mobile: true,
    screenWidth: 0,
};

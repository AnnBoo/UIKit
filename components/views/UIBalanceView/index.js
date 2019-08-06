// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import type { NativeMethodsMixinType } from 'react-native/Libraries/Renderer/shims/ReactNativeTypes';

import UIConstant from '../../../helpers/UIConstant';
import UIStyle from '../../../helpers/UIStyle';
import UIComponent from '../../UIComponent';
import UILabel from '../../text/UILabel';

type Props = {
    balance: string,
    separator: string,
    description: string,
    tokenSymbol: string,
    testID?: string,
    cacheKey?: string,
    textStyle?: ViewStyleProp,
};

type State = {
    balance: string,
    auxBalance: string,
};

const styles = StyleSheet.create({
    auxBalance: {
        opacity: 0,
        zIndex: -1,
    },
});

const cachedBalance = {};

export default class UIBalanceView extends UIComponent<Props, State> {
    static defaultProps = {
        balance: '',
        description: '',
        tokenSymbol: '',
        textStyle: UIStyle.Text.titleLight(),
    };

    // constructor
    balance: ?string;
    balanceLineHeight: number;
    constructor(props: Props) {
        super(props);

        this.state = {
            balance: this.getCachedBalance(),
            auxBalance: '',
        };

        this.balance = null;
        this.balanceLineHeight = 0;
    }

    componentDidMount() {
        super.componentDidMount();
        this.updateBalance();
    }

    componentDidUpdate() {
        this.updateBalance();
    }

    // Events
    onBalanceLayout = (e: any) => {
        const { height } = e.nativeEvent.layout;
        this.balanceLineHeight = height;
    };

    onAuxBalanceLayout = () => {
        this.updateBalance(true); // force
    };

    // Setters
    setBalance(balance: string) {
        this.setCachedBalance(balance);
        this.setStateSafely({ balance });
    }

    setAuxBalance(auxBalance: string, callback?: () => void) {
        this.setStateSafely({ auxBalance }, callback);
    }

    // Getters
    getSeparator(): string {
        return this.props.separator || '.';
    }

    getBalance(): string {
        return this.state.balance
            || `0${this.getSeparator()}${'0'.repeat(UIConstant.maxDecimalDigits())}`;
    }

    getAuxBalance(): string {
        return this.state.auxBalance || this.getBalance();
    }

    getDescription(): string {
        return this.props.description || '';
    }

    getTokenSymbol(): string {
        return this.props.tokenSymbol || '';
    }

    getTestID(): ?string {
        return this.props.testID;
    }

    getCacheKey(): ?string {
        return this.props.cacheKey;
    }

    getCachedBalance(): string {
        const key = this.getCacheKey();
        return (key && cachedBalance[key]) || '';
    }

    // Processing
    processAuxBalanceHeight(height: number, auxBalance: string) {
        if (this.balanceLineHeight < height) { // make sure we fit the balance into one line
            const truncatedAuxBalance = auxBalance.slice(0, -1); // reduce balance size
            this.setAuxBalance(truncatedAuxBalance, () => {
                this.measureAuxBalanceText();
            });
        } else {
            this.setBalance(auxBalance);
        }
    }

    // Actions
    measuringBalance: ?string;
    measureAuxBalanceText() {
        setTimeout(() => {
            this.measuringBalance = this.getAuxBalance();
            if (!this.auxBalanceText) {
                return;
            }
            this.auxBalanceText.measure((relX, relY, w, h) => {
                if (this.measuringBalance && this.measuringBalance === this.getAuxBalance()) {
                    this.processAuxBalanceHeight(h, this.measuringBalance);
                }
            });
        }, 0);
    }

    setCachedBalance(balance: string) {
        const key = this.getCacheKey();
        if (key) {
            cachedBalance[key] = balance;
        }
    }

    updateBalance(force: boolean = false) {
        const { balance, separator } = this.props;
        if ((balance !== '0' && balance !== this.balance) || force) {
            this.balance = balance;
            const formattedBalance = balance.split(separator).length > 1
                ? balance
                : `${balance}${separator}${'0'.repeat(UIConstant.maxDecimalDigits())}`;
            this.setAuxBalance(formattedBalance, () => { // start component layout and measuring
                this.measureAuxBalanceText();
            });
        }
    }

    // Render
    renderBalance() {
        const balance = this.getBalance();
        const separator = this.getSeparator();
        const stringParts = balance.split(separator);
        const integer = stringParts[0];
        const fractional = stringParts.length > 1
            ? (
                <Text style={UIStyle.Text.tertiary()}>
                    {`${separator}${stringParts[1]} ${this.getTokenSymbol()}`}
                </Text>
            )
            : null;
        return (
            <Text
                style={[UIStyle.Text.primary(), this.props.textStyle]}
                onLayout={this.onBalanceLayout}
                numberOfLines={1}
            >
                {integer}{fractional}
            </Text>
        );
    }

    /* eslint-disable-next-line */
    auxBalanceText: ?(React$Component<*> & NativeMethodsMixinType);
    renderAuxBalance() {
        const auxBalance = this.getAuxBalance();
        return (
            <Text
                ref={(component) => { this.auxBalanceText = component; }}
                style={[
                    UIStyle.topScreenContainer,
                    UIStyle.Text.primaryTitleLight(),
                    styles.auxBalance,
                ]}
                onLayout={this.onAuxBalanceLayout}
                numberOfLines={2}
            >
                {`${auxBalance} ${this.getTokenSymbol()}`}
            </Text>
        );
    }

    renderDescription() {
        return (<UILabel
            style={UIStyle.Margin.topSmall()}
            text={this.getDescription()}
            role={UILabel.Role.CaptionTertiary}
        />);
    }

    render() {
        const testID = this.getTestID();
        const testIDProp = testID ? { testID } : null;
        return (
            <View {...testIDProp} >
                {this.renderBalance()}
                {this.renderAuxBalance()}
                {this.renderDescription()}
            </View>
        );
    }
}

// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import UIColor from '../../../helpers/UIColor';

import UILocalized from '../../../helpers/UILocalized';
import UIStyle from '../../../helpers/UIStyle';
import UITextStyle from '../../../helpers/UITextStyle';
import UIComponent from '../../UIComponent';

import type { ReactNavigation } from '../../navigation/UINavigationBar';

export type Details = {
    caption: ?string,
    value: ?string,
    type?: string,
    screen?: string,
    tag?: any,
};

export type DetailsList = { [string]: Details };

type Props = {
    navigation?: ReactNavigation,
    detailsList: ?DetailsList,
    onPress?: (details: Details) => void,
}

type State = {};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: UIColor.current.background.whiteLight,
    },
    leftCell: {
        flex: 1,
    },
    rightCell: {
        flex: 3,
    },
});

class UIDetailsTable extends UIComponent<Props, State> {
    static CellType = {
        Default: 'Default',
        Success: 'Success',
        Action: 'Action',
        Accent: 'Accent',
        NumberPercent: 'NumberPercent',
        Gram: 'Gram',
    };

    // Events
    onActionPressed(details: Details) {
        if (details.screen) {
            this.navigateTo(details.screen);
        } else if (this.props.onPress) {
            this.props.onPress(details);
        }
    }

    // Actions
    navigateTo(screen: ?string) {
        const { navigation } = this.props;
        if (navigation && screen) {
            navigation.push(screen);
        }
    }

    // Getters
    getTextStyle(type: ?string) {
        const {
            secondarySmallRegular,
            successSmallRegular,
            primarySmallMedium,
        } = UITextStyle;
        if (type === UIDetailsTable.CellType.Success) {
            return successSmallRegular;
        } else if (type === UIDetailsTable.CellType.Accent) {
            return primarySmallMedium;
        } else if (type === UIDetailsTable.CellType.Default || !type) {
            return secondarySmallRegular;
        }
        return null;
    }

    renderTextCell(value: string, details: string) {
        const { secondarySmallRegular, primarySmallRegular } = UITextStyle;
        return (
            <Text>
                <Text style={primarySmallRegular}>
                    {value}
                </Text>
                <Text style={secondarySmallRegular}>
                    {details}
                </Text>
            </Text>
        );
    }

    renderCell(details: Details) {
        const { type, value } = details;
        const textStyle = this.getTextStyle(type);
        if (!value) {
            return null;
        }

        let strValue = value;
        if (typeof value === 'number') {
            strValue = `${value}`;
        }

        if (type === UIDetailsTable.CellType.NumberPercent) {
            const [number, percent] = strValue.split('(');
            return this.renderTextCell(
                number,
                `(${percent}`,
            );
        } else if (type === UIDetailsTable.CellType.Gram) {
            if (!strValue.includes('.')) {
                strValue = `${strValue}.0`;
            }
            const [integer, fractional] = strValue.split('.');
            return this.renderTextCell(
                integer,
                `.${fractional} ${UILocalized.gram}`,
            );
        } else if (type === UIDetailsTable.CellType.Action) {
            // actionSmallMedium;
            return (
                <TouchableOpacity onPress={() => this.onActionPressed(details)}>
                    <Text style={UIStyle.Text.actionSmallMedium()}>
                        {strValue}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <Text style={[textStyle, UIStyle.Common.flex()]}>
                {strValue}
            </Text>
        );
    }

    render() {
        const { detailsList } = this.props;
        if (!detailsList) {
            return null;
        }
        const cells = Object.keys(detailsList)
            .map<React$Node>((name: string) => {
                const details = detailsList[name];
                const {
                    caption, value,
                } = details;
                const { tertiarySmallRegular } = UITextStyle;

                const cell = this.renderCell(details);
                return (
                    <View style={styles.row} key={`details-table-row-${name}-${value || ''}`}>
                        <View style={[styles.leftCell, UIStyle.marginRightDefault]}>
                            <Text
                                numberOfLines={1}
                                style={tertiarySmallRegular}
                            >
                                {caption}
                            </Text>
                        </View>
                        <View style={styles.rightCell}>
                            {cell}
                        </View>
                    </View>
                );
            });
        return cells;
    }

    static defaultProps: Props;
}

export default UIDetailsTable;

UIDetailsTable.defaultProps = {
    detailsList: null,
};

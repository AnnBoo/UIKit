// @flow
import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native';

import { UIColor, UIConstant, UIDevice } from '@tonlabs/uikit.core';
import type { EventProps } from '@tonlabs/uikit.core';

import UIComponent from '../UIComponent';
import UILabel from '../UILabel';

type Props = {
    words: string[],
    width: number,
    yOffset: number,
    onHintSelected: (hint: string) => void,
};

type State = {
    wordThatChanged: string,
    currentHighlight: number,
};

const maxCells = 3;

const styles = StyleSheet.create({
    hintsContainer: {
        flex: 1,
        backgroundColor: UIColor.backgroundPrimary(),
        ...UIConstant.cardShadow(),
        borderBottomLeftRadius: UIConstant.borderRadius(),
        borderBottomRightRadius: UIConstant.borderRadius(),
    },
    cellHint: {
        zIndex: 1,
        justifyContent: 'center',
        paddingHorizontal: UIConstant.contentOffset(),
        minHeight: UIConstant.defaultCellHeight(),
        borderBottomLeftRadius: UIConstant.borderRadius(),
        borderBottomRightRadius: UIConstant.borderRadius(),
    },
    cellHintNormal: {
        backgroundColor: UIColor.backgroundPrimary(),
    },
    cellHintSelected: {
        backgroundColor: UIColor.notWhite(),
    },
});

const HINTS_VIEW = 'hints-view';

export default class UISeedPhraseHintsView extends UIComponent<Props, State> {
    static defaultProps = {
        words: [],
        width: 0,
        yOffset: 0,
        onHintSelected: () => {},
    };

    currentHintsLength: number;
    hintsListRef: ?FlatList<*>;
    wordChanged: (wordThatChanged: string) => void;
    clickListener: ?(e: any) => void;

    constructor(props: Props) {
        super(props);

        this.currentHintsLength = 0;
        this.hintsListRef = null;

        this.state = {
            wordThatChanged: '',
            currentHighlight: -1,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.initClickListenerForWeb();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.deinitClickListenerForWeb();
    }

    initClickListenerForWeb() {
        if (Platform.OS !== 'web') {
            return;
        }

        const listenerType = UIDevice.isDesktopWeb() || UIDevice.isWebkit() ? 'click' : 'touchend';
        this.clickListener = (e: any) => {
            const hints = document.getElementById(HINTS_VIEW);
            if (hints && hints.contains(e.target)) {
                return;
            }

            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        };

        window.addEventListener(listenerType, this.clickListener);
    }

    deinitClickListenerForWeb() {
        if (Platform.OS !== 'web') {
            return;
        }

        const listenerType = UIDevice.isDesktopWeb() || UIDevice.isWebkit() ? 'click' : 'touchend';
        window.removeEventListener(listenerType, this.clickListener);
    }

    // Setters
    setCurrentHighligh(index: number) {
        this.setStateSafely({ currentHighlight: index });
    }

    // Getters
    getPossibleHints(): Array<string> {
        const wtc = this.getWordThatChanged();
        const { words } = this.props;
        // Can't use `word.startsWith(wtc)` as Android requires the `.indexOf(wtc) === 0` polyfill
        let hints = words.filter(word => word.indexOf(wtc) === 0);
        if (hints.length === words.length) { // if nothings is filtered, then display nothing
            hints = [];
        }
        this.currentHintsLength = hints.length;
        return hints;
    }

    getWordThatChanged(): string {
        return this.state.wordThatChanged;
    }

    getWidth() {
        return this.props.width;
    }

    getMarginTop() {
        return this.props.yOffset;
    }

    getCurrentHighligh(): number {
        return this.state.currentHighlight;
    }

    // Events
    onKeyPress = (e: any): void => {
        const event = e.nativeEvent;

        let c = this.getCurrentHighligh();
        if (this.currentHintsLength > 0) {
            if (event.key === 'ArrowUp') {
                c = c - 1 < 0 ? this.currentHintsLength - 1 : c - 1;
            } else if (event.key === 'ArrowDown') {
                c = c + 1 >= this.currentHintsLength ? 0 : c + 1;
            } else if (event.key === 'Enter' && c >= 0) {
                const hints = this.getPossibleHints();
                const word = `${hints[c]}`;
                this.onHintSelected(word);
                c = -1;
            }
        }

        this.setCurrentHighligh(c);
        if (c >= 0 && this.hintsListRef) {
            this.hintsListRef.scrollToIndex({ animated: true, index: c, viewPosition: 1 });
        }
    };

    onHintSelected(hint: string) {
        if (this.props.onHintSelected) {
            this.props.onHintSelected(hint);
        }
    }

    onMouseIn(index: number) {
        this.setCurrentHighligh(index);
    }

    onMouseOut() {
        this.setCurrentHighligh(-1);
    }

    // methods
    splitPhrase(phrase: string): Array<string> {
        const noExtraSpaces = phrase.replace(/\s+/g, ' ');
        const words = noExtraSpaces.split(' ');
        const normalized = [];

        for (let i = 0; i < words.length; i += 1) {
            if (i === 0 && words[0] === '') {
                continue;
            }

            if (words[i] !== UIConstant.dashSymbol() && words[i] !== '-') {
                normalized.push(words[i]);
            }
        }

        return normalized;
    }

    wordChanged = (wordThatChanged: string) => {
        this.setStateSafely({
            wordThatChanged,
            currentHighlight: -1, // deselect
        });
    }

    // Render
    renderHint(index: number, hint: string) {
        const eventProps: EventProps = {
            onMouseEnter: () => this.onMouseIn(index),
            onMouseLeave: () => this.onMouseOut(),
        };

        const ch = this.getCurrentHighligh();
        const cellType = ch === index ? styles.cellHintSelected : styles.cellHintNormal;
        return (
            <TouchableOpacity
                testID={`profile_backup_key_phrase_${hint}`}
                style={[styles.cellHint, cellType]}
                onPress={() => this.onHintSelected(hint)}
                // $FlowFixMe
                {...eventProps}
            >
                <UILabel
                    text={hint}
                    role={UILabel.Role.Note}
                />
            </TouchableOpacity>
        );
    }

    render() {
        const hints = this.getPossibleHints();
        const wtc = this.getWordThatChanged();
        const width = this.getWidth();
        const marginTop = this.getMarginTop();
        if (hints.length === 0 || (hints.length === 1 && hints[0] === wtc) || !width) {
            return <View />;
        }
        const maxHintsToShow = Math.min(hints.length, maxCells);
        const height = UIConstant.defaultCellHeight() * maxHintsToShow;
        // Calculate the padding bottom to view cells even if clipped
        const paddingBottom = UIConstant.defaultCellHeight() * (maxHintsToShow - 1);
        return (
            <View
                nativeID={HINTS_VIEW}
                style={[styles.hintsContainer, { width, height, marginTop }]}
            >
                <FlatList
                    contentContainerStyle={{ paddingBottom }}
                    ref={(ref) => { this.hintsListRef = ref; }}
                    data={hints}
                    style={{ width }}
                    renderItem={({ item, index }) => this.renderHint(index, item)}
                    scrollEnabled
                    showsVerticalScrollIndicator
                    keyExtractor={item => item}
                    keyboardShouldPersistTaps="handled"
                />
            </View>
        );
    }
}
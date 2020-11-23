// @flow
/* eslint-disable class-methods-use-this */
import React from 'react';
import { View } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { UIConstant, UIStyle } from '@tonlabs/uikit.core';
import { UIPureComponent } from '@tonlabs/uikit.components';
import { UIImageView } from '@tonlabs/uikit.navigation';

import type { ChatAdditionalInfo, UIChatImageSize } from '../extras';

type Props = {
    image: ?any,
    imageSize?: UIChatImageSize,
    additionalInfo?: ChatAdditionalInfo,
    style?: ViewStyleProp | ViewStyleProp[],
}

type State = {
    data: any,
}

const IMAGE_SIZE = 1024;

export default class UIChatImageCell extends UIPureComponent<Props, State> {
    // Constructor
    constructor(props: Props) {
        super(props);

        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.loadImage();
    }

    // Getters
    getImage(): any {
        return this.state.data;
    }

    getSize(): UIChatImageSize {
        return this.props.additionalInfo?.imageSize
            || this.props.imageSize
            || { width: IMAGE_SIZE, height: IMAGE_SIZE };
    }

    getID(): string {
        const msg = this.props.additionalInfo?.message;
        return msg?.mid || msg?.info.image || `img${Math.random()}`;
    }

    // Setters

    // Actions
    async loadImage() {
        const { image, additionalInfo } = this.props;
        const { data } = this.state;
        if (image && !data) {
            const msg = additionalInfo?.message;
            try {
                const imgData = msg?.info.sending ? { data: msg?.info.image } : await image(msg);
                this.setStateSafely({ data: imgData.data });
            } catch (error) {
                console.error('Failed to load an image with error:', error);
            }
        }
    }

    renderImage() {
        const image = this.getImage();

        const maxS = (2 * UIConstant.giantCellHeight()) - (2 * UIConstant.contentOffset());
        const minS = UIConstant.chatCellHeight();

        let { width, height } = this.getSize();
        const p = width < height ? width / height : height / width;

        if (width > height) {
            width = Math.max(width > maxS ? maxS : width, minS);
            height = width * p;
        } else {
            height = Math.max(height > maxS ? maxS : height, minS);
            width = height * p;
        }

        return (
            <UIImageView
                resizeMode="contain"
                resizeMethod="auto"
                photoStyle={[
                    {
                        borderRadius: UIConstant.borderRadius(),
                        width,
                        height,
                        maxHeight: maxS,
                        maxWidth: maxS,
                    },
                    this.props.style,
                ]}
                source={image}
                key={`imageContent${this.getID()}`}
            />
        );
    }

    render() {
        const isSending = this.props.additionalInfo?.message?.info?.sending;
        return (
            <View
                style={[
                    UIStyle.Common.flex(),
                    isSending && UIStyle.common.opacity70(),
                ]}
                key={`imageViewContent${this.getID()}`}
            >
                {this.renderImage()}
            </View>
        );
    }
}
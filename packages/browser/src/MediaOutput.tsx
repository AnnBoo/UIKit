import * as React from 'react';
import { View } from 'react-native';

import {
    BubbleSimplePlainText,
    ChatMessageType,
    MessageStatus,
    BubbleMedia,
    MediaMessageError,
} from '@tonlabs/uikit.chats';

import { MediaOutputMessage, MediaOutputMessageStatus } from './types';

const convertMediaMessageErrorToMediaOutputMessageStatus = (
    error: MediaMessageError,
): MediaOutputMessageStatus => {
    switch (error) {
        case MediaMessageError.DataIsEmpty:
            return MediaOutputMessageStatus.DataIsEmpty;
        case MediaMessageError.InvalidData:
            return MediaOutputMessageStatus.InvalidData;
        case MediaMessageError.NotSupportedDataFormat:
        default:
            return MediaOutputMessageStatus.NotSupportedDataFormat;
    }
};

export const MediaOutput = ({
    data,
    status,
    onLayout,
    prompt,
    onOutput,
}: MediaOutputMessage) => {
    const onError = React.useCallback(
        (error: MediaMessageError) => {
            if (onOutput) {
                onOutput(
                    convertMediaMessageErrorToMediaOutputMessageStatus(error),
                );
            }
        },
        [onOutput],
    );
    const onLoad = React.useCallback(() => {
        if (onOutput) {
            onOutput(MediaOutputMessageStatus.Success);
        }
    }, [onOutput]);
    return (
        <View>
            <BubbleMedia
                data={data}
                status={status}
                type={ChatMessageType.Media}
                onLayout={onLayout}
                onError={onError}
                onLoad={onLoad}
                firstFromChain
                key="media-bubble"
            />
            {!!prompt && (
                <BubbleSimplePlainText
                    type={ChatMessageType.PlainText}
                    key="media-bubble-prompt"
                    text={prompt}
                    status={MessageStatus.Received}
                />
            )}
        </View>
    );
};

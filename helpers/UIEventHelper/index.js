// @flow
import { Linking, Platform } from 'react-native';

let prevPath = null;

export default class UIEventHelper {
    static checkEventTarget(e: any, className: string) {
        const triggers = Array.from(document.getElementsByClassName(className));
        if (triggers && triggers.length) {
            return triggers.reduce((contains, trigger) => {
                if (!contains) {
                    return trigger.contains(e.target);
                }
                return contains;
            }, false);
        }
        return false;
    }

    static observePopState() {
        if (Platform.OS !== 'web') {
            return;
        }

        window.onpopstate = (event) => {
            const { target } = event;
            if (!target) {
                return;
            }
            const { location } = target;
            if (!location) {
                return;
            }
            // Normalize path
            const path = `${location.pathname.replace('/', '')}${location.search}`;
            if (prevPath === path) {
                return; // Don't handle the same path twice
            }
            prevPath = path;
            // This will "refresh" the browser, that means that the "lock" screen will appear.
            // TODO: Need to find a way to navigate without "refreshing" the browser.
            Linking.openURL(path);
        };
    }

    static pushHistory(path: string) {
        if (prevPath !== null) {
            window.history.pushState(null, '', `/${path}`);
        }
        prevPath = path; // Path is already normalized
    }
}
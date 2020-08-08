import {AppRegistry, StatusBar} from 'react-native';
import App from './react/App';
import {name} from './react/app.json';
import TrackPlayer from "react-native-track-player";

AppRegistry.registerComponent(name, () => App);

StatusBar.setBarStyle("dark-content", true);
StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor("transparent", true);

global.navigationOptions = {
    headerTitle: null,
    headerShown: false
};

TrackPlayer.registerPlaybackService(() => require("./react/handler"));

TrackPlayer.setupPlayer();
TrackPlayer.updateOptions({
    stopWithApp: true,
    alwaysPauseOnInterruption: true,

    capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO
    ],

    notificationCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO
    ],

    compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT
    ],
});

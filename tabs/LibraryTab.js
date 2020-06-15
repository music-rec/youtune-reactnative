import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {
    Header,
    Playlist
} from '../components/SharedComponents';

import { ScrollView } from 'react-native-gesture-handler';

export default class LibraryTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: 0,
            playlists: [],
            albums: [],
            songs: [],
            artists: [],
            subscriptions: []
        }
    }

    getStyle = (value) => {
        if (value == this.state.selection)
            return styles.headerEntryFocus;
        else
            return styles.headerEntry;
    }

    getTextStyle = (value) => {
        if (value == this.state.selection)
            return styles.headerEntryTextFocus;
        else
            return styles.headerEntryText;
    }

    getAddPlaylist = () => {
        return (
            <View style={styles.playlist}>
                <TouchableOpacity onPress={() => {this.openCreatePlaylist()}} style={styles.playlistCover}>
                    <Text style={styles.newPlaylist}>+</Text>
                </TouchableOpacity>
                <Text style={styles.playlistTitle}>Neue Playlist</Text>
                <Text style={styles.playlistDesc}></Text>
            </View>
        );
    }

    openCreatePlaylist = () => {
        this.props.navigation.navigate("CreatePlaylist", {
            onGoBack: this.createPlaylist
        });
    }

    createPlaylist = (title, description) => {
        let temp = this.state.playlists;
        temp.push({title: title, subtitle: description});

        this.setState({playlists: temp});
    }

    getPlaylist = (playlistJson) => {
        return (
            <View style={styles.playlist}>
                <Playlist playlist={playlistJson} navigation={this.props.navigation}/>
            </View>);
    }

    getPlaylists = () => {
        return this.state.playlists.map(this.getPlaylist);
    }

    render() {
        return (
            <>
                <View style={styles.headerPicture}>
                    <Header text="Bibliothek" source={this.props.passImage}/>
                </View>
            
                <View style={styles.middleView}>
                    <ScrollView style={styles.playlistCollection} contentContainerStyle={styles.playlistCollectionContainer}>
                        {this.getUpdatedView()}
                    </ScrollView>
                </View>

                <ScrollView style={styles.header} horizontal={true}>
                    <TouchableOpacity onPress={() => {this.update(0)}} style={this.getStyle(0)}>
                        <Text style={this.getTextStyle(0)}>PLAYLISTS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.update(1)}} style={this.getStyle(1)}>
                        <Text style={this.getTextStyle(1)}>ALBUMS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.update(2)}} style={this.getStyle(2)}>
                        <Text style={this.getTextStyle(2)}>SONGS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.update(3)}} style={this.getStyle(3)}>
                        <Text style={this.getTextStyle(3)}>ARTISTS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.update(4)}} style={this.getStyle(4)}>
                        <Text style={this.getTextStyle(4)}>SUBSCRIPTIONS</Text>
                    </TouchableOpacity>
                </ScrollView>
            </>
        );
    }

    update = (value) => this.setState({selection: value});

    getUpdatedView = () => {
        switch (this.state.selection) {
            case 0: return this.getPlaylistView();
            case 1: return <Text>Alben</Text>;
            case 2: return <Text>Songs</Text>;
            case 3: return <Text>Künstler</Text>;
            case 4: return <Text>Abos</Text>;
        }
    }

    getPlaylistView = () => {
        return (
            <>
                {this.getAddPlaylist()}
                {this.getPlaylists()}
            </>
        );
    }
};

const styles = StyleSheet.create({
    headerPicture: {
        width: '100%',
        height: 150,
    },

    middleView: {
        width: '100%',
        marginBottom: 190
    },

    header: {
        alignSelf: 'center',
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: -5
    },

    headerEntry: {
        height: 50,
        paddingRight: 15,
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerEntryFocus: {
        height: 50,
        paddingRight: 15,
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerEntryText: {
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },

    headerEntryTextFocus: {
        fontWeight: 'bold',
        borderBottomWidth: 3,
        borderBottomColor: 'gray',
    },

    playlistCollection: {
        width: '100%',
        paddingTop: 20,
    },

    playlistCollectionContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap-reverse'
    },

    playlist: {
        margin: 10,
        width: 100,
        height: 160
    },

    playlistCover: {
        alignItems:'center',
        justifyContent:'center',
        height: 100,
        width: 100,
        backgroundColor: 'gray'
    },

    playlistTitle: {
        paddingTop: 5,
        fontSize: 10,
        fontWeight:'bold'
    },

    playlistDesc: {
        fontSize: 10,
    },

    newPlaylist: {
        color: 'white',
        fontSize: 50,
    },

    addPlaylist: {

    }
});
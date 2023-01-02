import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const ReviewVideo = () => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: '../assets/video/dancing_man.mp4' }}
        style={styles.video}
        fullscreen={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export {ReviewVideo}

import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BrowseCard = () => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://img.icons8.com/cotton/344/like--v3.png", height: 100, width: 100 }}
        style={{ alignSelf: 'center' }}
      />
      <Text style={styles.title}>Favorites</Text>
    </View>
  );
}

export default BrowseCard

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 30,
        backgroundColor: '#fff',
        margin: 20,
        

    },
    title: {
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
    }
})
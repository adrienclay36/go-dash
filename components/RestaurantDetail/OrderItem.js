import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderItem = ({ item }) => {
    const { title, price } = item;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#999',}}>
      <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
      <Text style={{ fontSize: 16, opacity: .7, }}>{price}</Text>
    </View>
  );
}

export default OrderItem

const styles = StyleSheet.create({})
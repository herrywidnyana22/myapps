import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import CustomTabBar from '@/components/CustomTabBar'

const _layout = () => {
  return (
    <Tabs 
      tabBar={CustomTabBar}
      screenOptions={{headerShown: false}}
    >
        <Tabs.Screen name='index'/>
        <Tabs.Screen name='statistic'/>
        <Tabs.Screen name='wallet'/>
        <Tabs.Screen name='profile'/>
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})
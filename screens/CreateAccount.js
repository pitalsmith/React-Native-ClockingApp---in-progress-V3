
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, Button, TextInput } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';

export const CreateAccount = ({ navigation}) => {
  return (
    <TailwindProvider>
   <View className="flex-1 justify-center items-center bg-red-500 font-bold">
    <View className='mt-10 mx-auto flex flex-col space-y-4'>
   
      <View>
        <Text className='font-bold'>Crud</Text>
      </View>
      <View>
      <Button title="Home" onPress={() => navigation.push('HomeScreen')} />
      </View>
      <View>
      <Button title="Go Back" onPress={() => navigation.goBack()}/>
      </View>
      </View>
    </View>
    </TailwindProvider>
  )
}

export default CreateAccount
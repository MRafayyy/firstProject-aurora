import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import UserIdContext from '../UserIdContext'

export default function returnContext() {
    const {userId} = useContext(UserIdContext)
  return userId
}
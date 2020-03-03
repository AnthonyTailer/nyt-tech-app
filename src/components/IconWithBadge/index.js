import React from 'react'
import { View, Text } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { iconStyles } from './styles'

const IconWithBadge = ({ name, badgeCount, color, size }) => (
    <View style={iconStyles.container}>
      <SimpleLineIcons name={name} size={size} color={color} />
      { badgeCount > 0 && (
        <View style={iconStyles.badge}>
          <Text style={iconStyles.badgeText}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  )

export default IconWithBadge
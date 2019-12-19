import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'

interface RotateViewProps {
  rotate: boolean
}

const RotateView: React.FC<RotateViewProps> = ({ rotate, children }) => {
  const [styles, setstyles] = useState(null)

  useEffect(() => {
    if (rotate) {
      const animation = new Animated.Value(rotate ? 0 : 1)

      Animated.timing(animation, {
        toValue: rotate ? 1 : 0,
        duration: 300,
        useNativeDriver: true
      }).start()

      const rotateInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
      const animatedStyles = { transform: [{ rotate: rotateInterpolate }] }

      setstyles(animatedStyles)
    }
  }, [rotate])

  return <Animated.View style={styles}>{children}</Animated.View>
}

export default RotateView

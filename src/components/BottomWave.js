import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Dimensions } from 'react-native'
import colors from '../constant/colors'

const { width } = Dimensions.get('window')

const BottomWave = () => {
  return (
    <Svg
      width={width}
      height={100}
      viewBox={`0 0 ${width} 100`}
      style={{ position: 'absolute', bottom: 0 }}
    >
      <Path
        d={`M0 50 Q ${width / 4} 0 ${width / 2} 30 T ${width} 20 V100 H0 Z`}
        fill={colors.gradientEnd}
      />
    </Svg>
  )
}

export default BottomWave
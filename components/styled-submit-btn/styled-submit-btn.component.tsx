import React from 'react'
import { Button, ActivityIndicator } from 'react-native'

import { StyledSubmitBtnContainer } from './styled-submit-btn.styles'

interface StyledSubmitBtnProps {
  title: string
  loading: boolean
  onPress: () => void
}

const StyledSubmitBtn: React.FC<StyledSubmitBtnProps> = props => {
  const { loading } = props
  return (
    <StyledSubmitBtnContainer>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Button color="white" {...props} />
      )}
    </StyledSubmitBtnContainer>
  )
}

export default StyledSubmitBtn

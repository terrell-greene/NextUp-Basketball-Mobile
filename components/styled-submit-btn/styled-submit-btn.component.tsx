import React from 'react'

import { StyledBtn } from './styled-submit-btn.styles'

interface StyledSubmitBtnProps {
  title: string
  loading: boolean
  onPress: () => void
  color?: string
  disabled?: boolean
}

const StyledSubmitBtn: React.FC<StyledSubmitBtnProps> = props => (
  <StyledBtn {...props} />
)

export default StyledSubmitBtn

import React from 'react'

import { TextTileContainer, TextTileText } from './text-tile.styles'

interface TextTileProps {
  title: string
  value: string
}

const TextTile: React.FC<TextTileProps> = ({ title, value }) => {
  return (
    <TextTileContainer>
      <TextTileText>{title}</TextTileText>
      <TextTileText>{value}</TextTileText>
    </TextTileContainer>
  )
}

export default TextTile

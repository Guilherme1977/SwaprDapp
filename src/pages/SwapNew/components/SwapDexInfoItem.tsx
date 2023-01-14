import styled from 'styled-components'

import { ReactComponent as SushiSVG } from '../../../assets/swapbox/dex-logo-sushi.svg'
import { BorderStyle } from './styles'

export function SwapDexInfoItem() {
  return (
    <Container>
      <SushiSVG />
    </Container>
  )
}

const Container = styled.div`
  padding: 16px;
  ${BorderStyle}
  background: linear-gradient(180deg, rgba(68, 65, 99, 0.1) -16.91%, rgba(68, 65, 99, 0) 116.18%),
    linear-gradient(113.18deg, rgba(255, 255, 255, 0.2) -0.1%, rgba(0, 0, 0, 0) 98.9%), #171621;
  background-blend-mode: normal, overlay, normal;
  opacity: 0.8;
  box-shadow: 0px 4px 42px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(11px);
  margin-bottom: 8px;
`

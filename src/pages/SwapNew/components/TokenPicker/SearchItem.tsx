import { Currency } from '@swapr/sdk'

import styled from 'styled-components'

import { CurrencyLogo } from '../CurrencyLogo'

type SearchItemProps = {
  currency: Currency
  onClick: () => void
}

export function SearchItem({ currency, onClick }: SearchItemProps) {
  console.log()
  return (
    <Container onClick={onClick}>
      <Info>
        <TokenInfo>
          <CurrencyLogo currency={currency} />
          {currency?.symbol}
        </TokenInfo>
      </Info>
      <TokenName>{currency.name}</TokenName>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
`

const Info = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const TokenName = styled.p`
  line-height: 12px;
  font-size: 10px;
  font-family: Inter;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
  color: #dddaf8;
  opacity: 0.8;
`
import React from 'react'
import { AutoRowCleanGap } from '../../components/Row'

import { GovernanceCard } from './Card'

export default function Container() {
  return (
    <AutoRowCleanGap gap={8}>
      <GovernanceCard name="USDC" pairs={15} proposals={1} />
      <GovernanceCard name="DXD" pairs={4} proposals={32} />
      <GovernanceCard name="DMG" pairs={5} proposals={3} />
      <GovernanceCard name="SNT" pairs={1} />
      <GovernanceCard name="RARI" pairs={5} />
      <GovernanceCard name="DAI" pairs={5} />
      <GovernanceCard name="USDT" pairs={22} />
    </AutoRowCleanGap>
  )
}

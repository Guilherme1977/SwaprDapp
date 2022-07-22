import { SWPR, Token } from '@swapr/sdk'

import { useWeb3ReactCore } from 'hooks/useWeb3ReactCore'
import { useMemo } from 'react'

export const useSWPRToken = () => {
  const { chainId } = useWeb3ReactCore()

  return useMemo(() => {
    const SWPRConfig = SWPR[chainId || 0]

    if (!SWPRConfig) return undefined

    return new Token(
      chainId || 1,
      chainId === 4 ? '0x022e292b44b5a146f2e8ee36ff44d3dd863c915c' : SWPRConfig.address,
      SWPRConfig.decimals,
      SWPRConfig.symbol,
      SWPRConfig.name
    )
  }, [chainId])
}

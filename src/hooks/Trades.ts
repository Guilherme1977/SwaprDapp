import { Currency, CurrencyAmount, Pair, SupportedPlatform, Token, Trade } from 'dxswap-sdk'
import flatMap from 'lodash.flatmap'
import { useMemo } from 'react'

import { BASES_TO_CHECK_TRADES_AGAINST } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { sortTradesByExecutionPrice } from '../utils/prices'
import { wrappedCurrency } from '../utils/wrappedCurrency'

import { useActiveWeb3React } from './index'

function useAllCommonPairs(
  currencyA?: Currency,
  currencyB?: Currency,
  platform: SupportedPlatform = SupportedPlatform.SWAPR
): Pair[] {
  const { chainId } = useActiveWeb3React()

  const bases: Token[] = chainId ? BASES_TO_CHECK_TRADES_AGAINST[chainId] : []

  const [tokenA, tokenB] = chainId
    ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
    : [undefined, undefined]

  const basePairs: [Token, Token][] = useMemo(
    () =>
      flatMap(bases, (base): [Token, Token][] => bases.map(otherBase => [base, otherBase])).filter(
        ([t0, t1]) => t0.address !== t1.address
      ),
    [bases]
  )

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
        : [],
    [tokenA, tokenB, bases, basePairs]
  )

  const allPairs = usePairs(allPairCombinations, platform)

  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      Object.values(
        allPairs
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.EXISTS && result[1]))
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
            return memo
          }, {})
      ),
    [allPairs]
  )
}

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export function useTradeExactIn(
  currencyAmountIn?: CurrencyAmount,
  currencyOut?: Currency,
  platform: SupportedPlatform = SupportedPlatform.SWAPR
): Trade | undefined {
  const allowedPairs = useAllCommonPairs(currencyAmountIn?.currency, currencyOut, platform)
  return useMemo(() => {
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      return (
        Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 3, maxNumResults: 1 })[0] ?? null
      )
    }
    return undefined
  }, [allowedPairs, currencyAmountIn, currencyOut])
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(
  currencyIn?: Currency,
  currencyAmountOut?: CurrencyAmount,
  platform: SupportedPlatform = SupportedPlatform.SWAPR
): Trade | undefined {
  const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut?.currency, platform)

  return useMemo(() => {
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      return (
        Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 3, maxNumResults: 1 })[0] ??
        null
      )
    }
    return undefined
  }, [allowedPairs, currencyIn, currencyAmountOut])
}

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 * for each supported platform. Order is by lowest price ascending.
 */
export function useTradeExactInAllPlatforms(currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): (Trade | undefined)[] {
  let bestTrades = [
    useTradeExactIn(currencyAmountIn, currencyOut, SupportedPlatform.SWAPR),
    useTradeExactIn(currencyAmountIn, currencyOut, SupportedPlatform.UNISWAP),
    useTradeExactIn(currencyAmountIn, currencyOut, SupportedPlatform.SUSHISWAP)
  ]
  return sortTradesByExecutionPrice(bestTrades)
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 * for each supported platform. Order is by lowest price ascending.
 */
export function useTradeExactOutAllPlatforms(currencyIn?: Currency, currencyAmountOut?: CurrencyAmount): (Trade | undefined)[] {
  let bestTrades = [
    useTradeExactOut(currencyIn, currencyAmountOut, SupportedPlatform.SWAPR),
    useTradeExactOut(currencyIn, currencyAmountOut, SupportedPlatform.UNISWAP),
    useTradeExactOut(currencyIn, currencyAmountOut, SupportedPlatform.SUSHISWAP)
  ]
  return sortTradesByExecutionPrice(bestTrades)
}

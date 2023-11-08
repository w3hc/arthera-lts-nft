import { ThemingProps } from '@chakra-ui/react'
import { Chain } from '@wagmi/core'
import { arbitrum } from '@wagmi/core/chains'

export const SITE_NAME = 'Arthera Genesis User Power Lifetime Subscription'
export const SITE_DESCRIPTION =
  'Arthera Genesis Power User Lifetime Subscription: Your golden ticket to unlocking the full potential of blockchain and Web3. Advantages include: No More Gas Fees, Curated dApps Access, Subscription Store Benefits, Early Access to Lifetime Deals, Helpdesk Support, and more to come!'
export const SITE_URL = 'tuesday-heartbreak.netlify.app'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'artherachain'
export const SOCIAL_GITHUB = ''

export const artheraTestnet: Chain = {
  id: 10243,
  name: 'Arthera Testnet',
  network: 'artheraTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'AA',
    symbol: 'AA',
  },
  rpcUrls: {
    public: { http: ['https://rpc-test.arthera.net'] },
    default: { http: ['https://rpc-test.arthera.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'Arthera Testnet Explorer', url: 'https://explorer-test.arthera.net' },
    default: { name: 'Arthera Testnet Explorer', url: 'https://explorer-test.arthera.net' },
  },
} as const satisfies Chain

export const ETH_CHAINS = [artheraTestnet, arbitrum]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password: process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

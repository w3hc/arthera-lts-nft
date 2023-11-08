import { Text, Button, useToast, Box } from '@chakra-ui/react'
import Image from 'next/image'

import { Head } from 'components/layout/Head'
import { HeadingComponent } from 'components/layout/HeadingComponent'
import { LinkComponent } from 'components/layout/LinkComponent'
import { useState, useEffect } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { ethers } from 'ethers'
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../utils/nft'
import { useEthersSigner, useEthersProvider } from '../hooks/ethersAdapter'

export default function Home() {
  const { chains, error, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  const provider = useEthersProvider()
  const signer = useEthersSigner()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [txLink, setTxLink] = useState<string>()
  const [txHash, setTxHash] = useState<string>()

  useEffect(() => {
    const init = async () => {
      // if (chain?.id !== 10243) {
      //   switchNetwork?.(10243)
      // }
    }
    init()
    console.log('isConnected:', isConnected)
    console.log('network:', chain?.name)
    console.log('signer:', signer)
    console.log('provider:', provider)
  }, [signer])

  const mint = async () => {
    try {
      if (!signer) {
        toast({
          title: 'No wallet',
          description: 'Please connect your wallet first.',
          status: 'error',
          position: 'bottom',
          variant: 'subtle',
          duration: 9000,
          isClosable: true,
        })
        return
      }
      setIsLoading(true)
      setTxHash('')
      setTxLink('')
      const nft = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer)
      const call = await nft.safeMint(signer.address)
      const receipt = await call.wait()
      console.log('tx:', receipt)
      setTxHash(receipt.hash)
      setTxLink('https://explorer-test.arthera.net/tx/' + receipt.hash)
      setIsLoading(false)
      toast({
        title: 'Successful mint',
        description: 'Congrats, your NFT was minted! 🎉',
        status: 'success',
        position: 'bottom',
        variant: 'subtle',
        duration: 20000,
        isClosable: true,
      })
    } catch (e) {
      setIsLoading(false)
      console.log('error:', e)
      toast({
        title: 'Woops',
        description: 'Something went wrong during the minting process...',
        status: 'error',
        position: 'bottom',
        variant: 'subtle',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Head />

      <main>
        {' '}
        <Box borderRadius="lg" overflow="hidden">
          <video autoPlay controls>
            <source src="/nft-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <br />
        </Box>
        <HeadingComponent as="h2">Unlock the Future with Arthera Genesis User Power Lifetime Subscription</HeadingComponent>
        <Text mt={5} fontSize={24}>
          Welcome to the Arthera Club: Where Blockchain Transforms
        </Text>
        <Text mt={5}>
          Embark on a journey through the boundless world of blockchain with the Arthera Genesis Power User Lifetime Subscription. This isn&apos;t
          just a subscription, it&apos;s your golden ticket to unlocking the full potential of blockchain.
        </Text>
        <Text mt={5}>Welcome to Arthera, where every interaction is enriched with value and innovation.</Text>
        <Text mt={5}>
          <strong>Why Choose the Arthera Genesis Power User Lifetime Subscription?</strong>
        </Text>
        <Text mt={5}>
          Dive into a vibrant community of blockchain enthusiasts, surrounded by brilliance, passion, and innovation. Experience easy access to
          Arthera&apos;s ecosystem, free from the burden of gas fees, and enjoy entry to curated dApps that elevate your blockchain journey.
        </Text>
        <Text mt={5}>Premium Benefits Tailored for You:</Text>
        <Text mt={5}>
          <ul>
            <li>No More Gas Fees: Say goodbye to gas fee worries.</li>
            <li>Engage with the blockchain freely, with up to 30 daily transactions at no additional cost.</li>
            <li>Curated dApps Access: Enjoy exclusive access to premium dApps, offering cutting-edge opportunities. </li>
            <li>Community Engagement: Connect, share, learn, and grow within a welcoming community of fellow explorers. </li>
            <li>Explore: Unleashing unprecedented value over a lifetime Subscription Store</li>
            <li>Benefits: Access discounts on various subscriptions, adding value to your blockchain journey. </li>
            <li>Early Access to Lifetime Deals: Stay ahead with whitelisted early access to exclusive opportunities. </li>
            <li>Helpdesk Support: Enjoy constant support, ensuring your journey is always smooth and exceptional. </li>
          </ul>
        </Text>
        <Text mt={5}>Don&apos;t Miss This Unparalleled Opportunity!</Text>
        <Text mt={5}>
          The Arthera Genesis Power User Lifetime Subscription is more than an offer, it&apos;s your gateway to a transformative blockchain
          experience.{' '}
        </Text>
        <Text mt={5}>Join the Arthera Club and awaken a new blockchain reality. </Text>
        <strong>Key Details</strong>:
        <ul>
          <li>Limited edition Special pre-launch price of $33 (usual price $99) </li>
          <li>Available on 20+ blockchains Affiliate/Referral </li>
          <li>Program: 10% referral bonus for up to 33 licenses 15% referral bonus for 34-66 licenses </li>
          <li>20% referral bonus for 67+ licenses </li>
        </ul>
        <Text mt={5}>
          <strong>EOA Subscriptions:</strong>{' '}
        </Text>
        <Text mt={5}>Say goodbye to gas fee worries with Arthera Genesis User Power Subscription. </Text>
        <Text mt={5}>Enjoy 30 daily transactions across multiple token types for an incredible value. </Text>
        <Text mt={5}>
          Currently, the starting point provides you enough gas fees on a monthly basis for whole life to: Make 30 AA transfers Perform 30 ERC20 token
          transfers Execute 30 ERC721 token transfers Conduct 30 ERC1155 token transfers Join Arthera and embrace a future of seamless, secure, and
          cost-effective blockchain interactions.
        </Text>
        <Button
          mt={4}
          colorScheme="blue"
          variant="outline"
          type="submit"
          onClick={mint}
          isLoading={isLoading}
          loadingText="Buying..."
          spinnerPlacement="end">
          Buy
        </Button>
        {txHash && (
          <Text py={4} fontSize="14px" color="#45a2f8">
            <LinkComponent href={txLink ? txLink : ''}>{txHash}</LinkComponent>
          </Text>
        )}
      </main>
    </>
  )
}

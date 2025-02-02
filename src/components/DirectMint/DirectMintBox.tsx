import React from 'react';
import DirectMint from './DirectMint';
import Logo from '../../components/Logo';
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import {
  DEVELOPER_DAO_CONTRACT_NETWORK,
  TOKEN_FINDER_URL,
} from '../../utils/DeveloperDaoConstants';
import { useDevNFTSupply } from '../../hooks/useDevNFTSupply';

// Layout for the Direct Mint Box
// used on the minting page
const DirectMintBox = () => {
  const { t } = useTranslation();
  const { isLoading, remainingPublicSupply, uniqueTokenHolders } =
    useDevNFTSupply();

  return (
    <>
      <Container maxW="container.md" centerContent>
        <Box
          borderWidth="4px"
          borderRadius="lg"
          w={{ base: '75%', s: '90%' }}
          padding="20"
        >
          <Stack spacing={6} align="center">
            <Logo w={52} h={52} />
            {DEVELOPER_DAO_CONTRACT_NETWORK === 'rinkeby' && (
              <Badge colorScheme="orange">{t('testnet')}</Badge>
            )}
            <Heading fontSize={{ base: '1.25rem', sm: '2rem' }}>
              {t('mintPageHeader')}
            </Heading>
            <Text fontSize={{ base: 'xs', sm: 'xl' }}>
              {t('availableTokensText')}{' '}
              <Link color="#3182ce" href={TOKEN_FINDER_URL} isExternal>
                {t('here')}
              </Link>
            </Text>
            <Text fontSize={{ base: 'xs', sm: 'xl' }}>
              {t('remainingTokensText', {
                remainingTokens: isLoading
                  ? '...'
                  : remainingPublicSupply.toLocaleString(),
                uniqueAddressCount: isLoading
                  ? '...'
                  : uniqueTokenHolders?.toLocaleString(),
              })}
            </Text>
            <DirectMint />
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default DirectMintBox;

import { ChakraProvider } from '@chakra-ui/react'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
			<Analytics />
		</ChakraProvider>
	)
}

export default MyApp
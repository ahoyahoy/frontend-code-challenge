import type { AppProps } from 'next/app'
import {ApolloProvider} from '@apollo/client'

import {getApolloClient} from '../apollo-client'

import '../styles/globals.css'
import '../styles/styles.scss'

function PokemonsApp({ Component, pageProps }: AppProps) {
  const apolloClient = getApolloClient()

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default PokemonsApp

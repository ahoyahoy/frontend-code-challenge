import MainFragment from 'fragments/Main'
import Head from 'next/head'

const AppFragment = (): JSX.Element => {
    return <>
        <Head>
            <title>Pokemons App</title>
            <meta name="description" content="Example Pokemons App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <MainFragment />
    </>
}

export default AppFragment

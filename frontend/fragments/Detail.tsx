import { Flipped, spring } from 'react-flip-toolkit'
import classNames from 'classnames/bind'
import { useRouter } from 'next/router'

import { Use as PokemonDetailData, V as PokemonQueryType } from 'data/pokemons/byName'
import { favoritePokemon } from 'data/pokemons/fav'
import List from 'components/List'

import Modal from 'components/Modal'
import Info from 'components/Info'

import styles from '../components/Info.module.scss'

const cx = classNames.bind(styles)

const DetailFragment = (): JSX.Element => {
    const router = useRouter()
    const pokemonName = router.asPath.slice(1)
    const { loading, error, data } = PokemonDetailData({ name: pokemonName })

    return <>
        <Modal>
            <Flipped flipId={`pokemon-${pokemonName}`}>
                <div>
                    <Info data={data} />
                </div>
            </Flipped>

            {data?.evolutions.length 
                ? <div className={cx('evolutions')}>
                    <h4>Evolutions</h4>
                    <List
                        data={data?.evolutions || []}
                        onFav={(id, state) => favoritePokemon({ id, state })}
                        showRows={false}
                    />
                </div>
                : <div></div>
            }
        </Modal>
    </>
}

export default DetailFragment

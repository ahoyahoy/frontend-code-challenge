import React, { useEffect, useState } from 'react'
import { Flipper } from 'react-flip-toolkit'
import { useRouter } from 'next/router'
import { useInView } from 'react-hook-inview'
import classNames from 'classnames/bind'

import { Use as PokemonTypesData } from 'data/pokemons/types'
import { Use as PokemonsListData, V as PokemonsQueryType, R as PokemosResultsType } from 'data/pokemons/list'
import { favoritePokemon } from 'data/pokemons/fav'

import List from 'components/List'
import Filter from 'components/Filter'
import DetailFragment from './Detail'
import styles from 'components/List.module.scss'

const PAGE_SIZE = 12

const MainFragment = (): JSX.Element => {
    const router = useRouter()
    const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)
    const [lastLoadedItems, setLastLoadedItems] = useState<PokemosResultsType>([])
    const [showRows, setShowRows] = useState(false)
    const [filterValues, setFilterValues] = useState<Omit<PokemonsQueryType, 'limit' | 'offset'>>({
        search: '',
        type: '',
        favorite: true,
    })

    const [ref, isVisible] = useInView({
        threshold: 1,
      })

    const filter: PokemonsQueryType = {
        ...filterValues,
        ...{ limit: PAGE_SIZE, offset: 0 }
    }

    const { loading, error, data: items, more, loadingMore } = PokemonsListData(filter)
    const { loading: typesLoading, data: types } = PokemonTypesData()

    useEffect(() => {
        (!loading && !loadingMore) && setLastLoadedItems(items)
    }, [items])

    useEffect(() => {
        setSelectedPokemon(
            router.asPath.length > 1
                ? router.asPath.slice(1)
                : null
        )
    })

    useEffect(() => {
        if (items?.length && !loading && !loadingMore) {
            more({ limit: 12 })
        }
    }, [isVisible])

    const cx = classNames.bind(styles)

    return <>
        <Flipper
            flipKey={selectedPokemon}
            className={cx('flipper')}
        >
            <div className={cx('content')}>
                <Filter
                    onChangeFilter={setFilterValues}
                    onChangeShowRows={setShowRows}
                    types={types || []}
                    typesLoading={typesLoading}
                />

                <List
                    data={
                        filter.favorite
                            ? lastLoadedItems.filter(i => i.isFavorite)
                            : lastLoadedItems
                    }
                    showRows={showRows}
                    onFav={(id, state) => favoritePokemon({ id, state })}
                />

                
                { loading 
                    ? <div>Loading...</div>
                    : <></>
                }
                { error 
                    ? <div>Error...</div>
                    : <></>
                }

                {lastLoadedItems && !(lastLoadedItems.length % 12)
                    && <div ref={ref} style={{ height: '200px', marginBottom: '200px' }}></div>}

                {selectedPokemon && <DetailFragment />}
            </div>
        </Flipper>
    </>
}

export default MainFragment

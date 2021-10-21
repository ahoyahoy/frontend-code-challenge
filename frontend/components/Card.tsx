import Image from 'next/image'
import { Flipped, spring } from 'react-flip-toolkit'
import classNames from 'classnames/bind'
import c from 'classnames'
import { Favorite20, FavoriteFilled20 } from '@carbon/icons-react'

import { PokemonsList_pokemons_edges } from 'data/_generated/PokemonsList'
import styles from './Card.module.scss'

const cx = classNames.bind(styles)

interface CardProps {
    data: PokemonsList_pokemons_edges
    onFavClick: () => void
    showRows: boolean
}

export default function Card({ data, onFavClick, showRows }: CardProps) {
    return (
        <Flipped flipId={`pokemon-${data.name.toLowerCase()}`}>
            <div className={c(cx('container'), { [cx('show-rows')]: showRows })}>
                <div className={cx('img')}>
                    <Image loader={() => data.image} src={data.image} width={500} height={500} />
                </div>
                <div className={cx('details')}>
                    <div className={cx('name')}>
                        {data.name}
                    </div>
                    {data.types?.length && <div className={cx('types')}>
                        {data.types.join(', ')}
                    </div>}
                    <div onClick={(e) => { e.preventDefault(); onFavClick() }} className={cx('fav-icon')}>
                        {data.isFavorite
                            ? <FavoriteFilled20 aria-label="Remove from Favorites" />
                            : <Favorite20 aria-label="Add to Favorites" />
                        }
                    </div>
                </div>
            </div>
        </Flipped>
    )
}

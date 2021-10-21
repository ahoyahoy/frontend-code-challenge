import Link from 'next/link'
import classNames from 'classnames/bind'
import c from 'classnames'

import { R } from 'data/pokemons/list'
import Card from './Card'
import styles from './List.module.scss'

interface ListProps {
    data: R
    onFav: (id: string, state: boolean) => void
    showRows: boolean
}

const cx = classNames.bind(styles)

const List = ({ data, onFav, showRows }: ListProps): JSX.Element => {

    return (
        <div className={c(cx('list'), { [cx('show-rows')]: showRows })}>
            {data.map((p) => (
                <Link href={'/' + p.name.toLocaleLowerCase()} scroll={false} key={p.id}><a>
                    <Card
                        data={p}
                        showRows={showRows}
                        onFavClick={() => { onFav(p.id, !p.isFavorite) }}
                    />
                </a></Link>
            ))}
        </div>

    )
}

export default List

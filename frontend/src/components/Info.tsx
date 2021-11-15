import { Flipped, spring } from 'react-flip-toolkit'
import classNames from 'classnames/bind'
import c from 'classnames'
import { useRouter } from 'next/router'

import { R } from 'data/pokemons/byName'
import AudioPlayer from 'components/AudioPlayer'
import styles from './Info.module.scss'

interface InfoProps {
    data: R
}

const cx = classNames.bind(styles)

const Info = ({ data }: InfoProps): JSX.Element => {
    const router = useRouter()

    return (
        <div className={cx('detail-card')}>
            {!data
                ? <div></div>
                : <div>
                    <div className={cx('img')}>
                        <img src={data.image} />
                        {data?.sound && <AudioPlayer url={data!.sound} key={data!.sound} />}
                    </div>
                    <div className={cx('header')}>
                        <h1>{data.name}</h1>
                        {data.types?.length && <div className={cx('types')}>
                            {data.types.join(', ')}
                        </div>}

                        <div className={cx('stat')}>
                            <div className={cx('lines')}>
                                <div className={c(cx('line'), cx('cp'))}>
                                    <div className={cx('fill')} style={{ width: 100 / (3904 / data.maxCP) + '%' }}></div>
                                </div>
                                <div className={c(cx('line'), cx('hp'))}>
                                    <div className={cx('fill')} style={{ width: 100 / (4144 / data.maxHP) + '%' }}></div>
                                </div>
                            </div>

                            <div className={cx('nums')}>
                                <div>CP: {data.maxCP}</div>
                                <div>HP: {data.maxHP}</div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('stat2')}>
                        <div>
                            <strong>Weight</strong>
                            <div>{data.weight.minimum} - {data.weight.maximum}</div>
                        </div>
                        <div>
                            <strong>Height</strong>
                            <div>{data.height.minimum} - {data.height.maximum}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Info

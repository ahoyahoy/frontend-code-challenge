import React, { useState, useEffect } from 'react'
import { VolumeUpFilled32 } from '@carbon/icons-react'
import classNames from 'classnames/bind'

import styles from './AudioPlayer.module.scss'

const cx = classNames.bind(styles)

const AudioPlayer = ({ url }: { url: string }): JSX.Element => {
    const [audio] = useState(new Audio(url))
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing])

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false))
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false))
        }
    }, [])

    return (
        <div onClick={() => setPlaying(!playing)} className={cx('speaker')}>
            <VolumeUpFilled32 />
        </div>
    )
}

export default AudioPlayer

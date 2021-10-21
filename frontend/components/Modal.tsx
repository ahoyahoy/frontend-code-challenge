import classNames from 'classnames/bind'
import { useRouter } from 'next/router'

import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

type Props = {
}

const Modal: React.FC<Props> = ({ children }) => {
    const router = useRouter()

    return (
        <div className={cx('modal')} onClick={() => {router.back()}}>
            <div className={cx('container')} onClick={(e) => {e.stopPropagation()}}>
                {children}
            </div>
        </div>
    )
}

export default Modal

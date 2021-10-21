import { useEffect, useState } from 'react'
import { ContentSwitcher, Switch, ContentSwitcherOnChangeData, TextInput, Dropdown } from 'carbon-components-react'
import { useRouter } from 'next/router'
import { useDebounce } from 'use-debounce'
import classNames from 'classnames/bind'

import styles from './Filter.module.scss'

interface FilterProps {
    types: string[],
    onChangeFilter: any,
    onChangeShowRows: (v: boolean) => void
}

const cx = classNames.bind(styles)

export default function Filter({ types, onChangeFilter, onChangeShowRows }: FilterProps) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [showRows, setShowRows] = useState(false)
    const [type, setType] = useState<string>('')
    const [search, setSearch] = useState('')
    const [debouncedSearch] = useDebounce(search, 300)
    const router = useRouter()

    const handleIsFavorite = (selectedItem: ContentSwitcherOnChangeData) => {
        const isFavorite = selectedItem.name === 'favorites'
        setIsFavorite(isFavorite)
    }

    useEffect(() => {
        onChangeFilter({
            favorite: isFavorite,
            search: debouncedSearch,
            type,
        })
    }, [isFavorite, debouncedSearch, type])

    useEffect(() => {
        onChangeShowRows(showRows)
    }, [showRows])

    return (
        <div className={cx('filter')}>
            <ContentSwitcher onChange={handleIsFavorite} selectedIndex={isFavorite ? 1 : 0} className={cx('switch')}>
                <Switch name={'all'} text='All' className={cx('switch-button')} />
                <Switch name={'favorites'} text='Favorites' />
            </ContentSwitcher>
            <div className={cx('filter-controls')}>
                <TextInput labelText="" id="" onChange={(e) => setSearch(e.target.value)} value={search} className={cx('search-text')} />
                <Dropdown
                    id="t"
                    titleText=""
                    label=""
                    placeholder="Search"
                    items={['', ...types].sort().map(i => ({ id: i.toLowerCase(), text: i }))}
                    itemToString={(item) => (item ? item.text : '')}
                    onChange={(i) => setType(i.selectedItem?.id || '')}
                    className={cx('types-select')}
                />
                <div className={cx('layout-switch')}>
                    <div className={cx('icon-rows')} onClick={() => { setShowRows(true) }}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={cx('icon-cards')} onClick={() => { setShowRows(false) }}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

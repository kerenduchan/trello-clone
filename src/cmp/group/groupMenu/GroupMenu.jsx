import { useState } from 'react'
import { PopoverMenu } from '../../general/PopoverMenu'
import { GroupMenuMain } from './GroupMenuMain'

export function GroupMenu({ hierarchy, popoverState, onTaskCreate }) {
    // current page in the group menu popover: main/archive
    const [page, setPage] = useState('main')

    const contents = {
        main: (
            <PopoverMenu title="Labels" {...popoverState.popover}>
                <GroupMenuMain
                    hierarchy={hierarchy}
                    onClose={popoverState.onClose}
                    onTaskCreate={() => onTaskCreate(0)}
                />
            </PopoverMenu>
        ),
    }

    return contents[page]
}

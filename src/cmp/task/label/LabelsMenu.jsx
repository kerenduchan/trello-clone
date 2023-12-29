import { useState } from 'react'
import { PopoverMenu } from '../../general/PopoverMenu'
import { LabelsMenuEdit } from './LabelsMenuEdit'
import { LabelsMenuMain } from './LabelsMenuMain'
import { LabelsMenuDelete } from './LabelsMenuDelete'

export function LabelsMenu({ hierarchy, labelsMenu }) {
    // current page in the labels menu popover: main or edit
    const [page, setPage] = useState('main')
    const [labelToEdit, setLabelToEdit] = useState(null)

    function onEditClick(label) {
        setLabelToEdit(label)
        setPage('edit')
    }

    function onBackClick() {
        setPage('main')
    }

    function onCreateClick() {
        setPage('create')
    }

    function onDelete() {
        setPage('delete')
    }

    function onDeleteConfirm() {
        console.log('on delete confirm')
        onBackClick()
    }

    const contents = {
        main: (
            <PopoverMenu title="Labels" {...labelsMenu.popover}>
                <LabelsMenuMain
                    hierarchy={hierarchy}
                    onClose={labelsMenu.onClose}
                    onEditClick={onEditClick}
                    onCreateClick={onCreateClick}
                />
            </PopoverMenu>
        ),
        edit: (
            <PopoverMenu
                title="Edit Label"
                {...labelsMenu.popover}
                onBack={onBackClick}
            >
                <LabelsMenuEdit
                    hierarchy={hierarchy}
                    label={labelToEdit}
                    onClose={labelsMenu.onClose}
                    onBack={onBackClick}
                    onDelete={onDelete}
                />
            </PopoverMenu>
        ),
        create: (
            <PopoverMenu
                title="Create Label"
                {...labelsMenu.popover}
                onBack={onBackClick}
            >
                <LabelsMenuEdit
                    hierarchy={hierarchy}
                    label={null}
                    onClose={labelsMenu.onClose}
                    onBack={onBackClick}
                />
            </PopoverMenu>
        ),
        delete: (
            <PopoverMenu
                title="Delete Label"
                {...labelsMenu.popover}
                onBack={() => setPage('edit')}
            >
                <LabelsMenuDelete onDelete={onDeleteConfirm} />
            </PopoverMenu>
        ),
    }

    return contents[page]
}

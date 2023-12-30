import { useState } from 'react'
import {
    addTaskLabel,
    createBoardLabel,
    updateBoardLabel,
} from '../../store/actions/board.actions'
import { PopoverMenu } from '../general/PopoverMenu'
import { LabelsMenuEdit } from './LabelsMenuEdit'
import { LabelsMenuMain } from './LabelsMenuMain'
import { LabelsMenuDelete } from './LabelsMenuDelete'

export function LabelsMenu({ hierarchy, labelsMenu }) {
    // current page in the labels menu popover: main/edit/create/delete
    const [page, setPage] = useState('main')

    const [labelToEdit, setLabelToEdit] = useState(null)

    function onNavToEdit(label) {
        setLabelToEdit(label)
        setPage('edit')
    }

    function onNavToMain() {
        setPage('main')
    }

    function onNavToCreate() {
        setLabelToEdit(null)
        setPage('create')
    }

    function onDelete() {
        setPage('delete')
    }

    function onDeleteConfirm() {
        onNavToMain()
    }

    function onSaveAfterEdit(updatedLabel) {
        try {
            updateBoardLabel(hierarchy.board, updatedLabel)
            onNavToMain()
        } catch (err) {
            console.error(err)
        }
    }

    async function onSaveAfterCreate(newLabel) {
        try {
            const updatedBoard = await createBoardLabel(
                hierarchy.board,
                newLabel
            )
            const updatedHierarchy = { ...hierarchy, board: updatedBoard }

            addTaskLabel(updatedHierarchy, newLabel)
            onNavToMain()
        } catch (err) {
            console.error(err)
        }
    }

    const contents = {
        main: (
            <PopoverMenu title="Labels" {...labelsMenu.popover}>
                <LabelsMenuMain
                    hierarchy={hierarchy}
                    onClose={labelsMenu.onClose}
                    onEdit={onNavToEdit}
                    onCreate={onNavToCreate}
                />
            </PopoverMenu>
        ),
        edit: (
            <PopoverMenu
                title="Edit Label"
                {...labelsMenu.popover}
                onBack={onNavToMain}
            >
                <LabelsMenuEdit
                    label={labelToEdit}
                    onSave={onSaveAfterEdit}
                    onDelete={onDelete}
                />
            </PopoverMenu>
        ),
        create: (
            <PopoverMenu
                title="Create Label"
                {...labelsMenu.popover}
                onBack={onNavToMain}
            >
                <LabelsMenuEdit label={null} onSave={onSaveAfterCreate} />
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

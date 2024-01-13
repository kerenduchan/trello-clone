import { useState } from 'react'
import {
    addTaskLabel,
    deleteBoardLabel,
    updateBoard,
} from '../../store/actions/board.actions'
import { PopoverMenu } from '../general/PopoverMenu'
import { LabelsMenuEdit } from './LabelsMenuEdit'
import { LabelsMenuMain } from './LabelsMenuMain'
import { LabelsMenuDelete } from './LabelsMenuDelete'

export function LabelsMenu({ hierarchy, labelsMenu }) {
    const { board } = hierarchy

    // current page in the labels menu popover: main/edit/create/delete
    const [page, setPage] = useState('main')

    // the label currently being edited / deleted
    const [curLabel, setCurLabel] = useState(null)

    function onNavToEdit(label) {
        setCurLabel(label)
        setPage('edit')
    }

    function onNavToMain() {
        setCurLabel(null)
        setPage('main')
    }

    function onNavToCreate() {
        setPage('create')
    }

    function onNavToDelete() {
        setPage('delete')
    }

    function onDelete() {
        deleteBoardLabel(board, curLabel)
        onNavToMain()
    }

    function onUpdate(label) {
        try {
            const labels = board.labels.map((l) =>
                l._id === label._id ? label : l
            )
            updateBoard(board, { labels })
            onNavToMain()
        } catch (err) {
            console.error(err)
        }
    }

    async function onCreate(newLabel) {
        try {
            const updatedBoard = await updateBoard(board, {
                labels: [...board.labels, newLabel],
            })
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
                    label={curLabel}
                    onSave={onUpdate}
                    onDelete={onNavToDelete}
                />
            </PopoverMenu>
        ),
        create: (
            <PopoverMenu
                title="Create Label"
                {...labelsMenu.popover}
                onBack={onNavToMain}
            >
                <LabelsMenuEdit label={null} onSave={onCreate} />
            </PopoverMenu>
        ),
        delete: (
            <PopoverMenu
                title="Delete Label"
                {...labelsMenu.popover}
                onBack={() => setPage('edit')}
            >
                <LabelsMenuDelete onDelete={onDelete} />
            </PopoverMenu>
        ),
    }

    return contents[page]
}

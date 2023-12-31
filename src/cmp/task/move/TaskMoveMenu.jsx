import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { store } from '../../../store/store'
import { PopoverMenu } from '../../general/PopoverMenu'
import { CustomSelect } from '../../general/CustomSelect'
import { boardService } from '../../../services/board.service'
import { SET_BOARDS } from '../../../store/reducers/board.reducer'

export function TaskMoveMenu({ hierarchy, popoverState }) {
    const { board, group, task } = hierarchy

    const allBoards = useSelector((storeState) => storeState.boardModule.boards)
    const [boardOptions, setBoardOptions] = useState([])
    const [groupOptions, setGroupOptions] = useState([])
    const [positionOptions, setPositionOptions] = useState([])

    const [selectedBoardId, setSelectedBoardId] = useState(board._id)
    const [selectedGroupId, setSelectedGroupId] = useState(group._id)
    const [selectedPositionId, setSelectedPositionId] = useState(1)

    useEffect(() => {
        loadBoards()
    }, [])

    useEffect(() => {
        if (!allBoards?.length) {
            return
        }
        setBoardOptions(allBoards.map((b) => ({ _id: b._id, label: b.title })))
    }, [allBoards])

    // handle a change in the selected board ID / board options
    useEffect(() => {
        if (!allBoards?.length) {
            return
        }
        const selectedBoard = allBoards.find((b) => b._id === selectedBoardId)
        const groups = selectedBoard.groups.map((g) => ({
            _id: g._id,
            label: g.title,
        }))

        setGroupOptions(groups)

        let groupId
        if (selectedBoardId === board._id) {
            groupId = group._id
        } else {
            groupId = groupOptions.length ? groupOptions[0]._id : null
        }

        setSelectedGroupId(groupId)
    }, [boardOptions, selectedBoardId])

    // handle a change in the selected group ID / group options
    useEffect(() => {
        if (!allBoards?.length) {
            return
        }
        const selectedBoard = allBoards.find((b) => b._id === selectedBoardId)
        const selectedGroup = selectedBoard.groups.find(
            (g) => g._id === selectedGroupId
        )

        if (!selectedGroup) {
            return
        }

        const posOpts = [...Array(selectedGroup.tasks.length).keys()].map(
            (idx) => ({
                _id: `${idx + 1}`,
                label: `${idx + 1}`,
            })
        )

        setPositionOptions(posOpts)

        let positionId = '1'
        if (selectedGroupId === group._id) {
            const taskIdx = getIdxById(group.tasks, task._id)
            positionId = `${taskIdx + 1}`
        }

        setSelectedPositionId(positionId)
    }, [groupOptions, selectedGroupId])

    async function loadBoards() {
        try {
            const boards = await boardService.query()
            store.dispatch({ type: SET_BOARDS, boards })
        } catch (err) {
            console.error('Failed to load boards:', err)
            throw err
        }
    }

    function getIdxById(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]._id === id) {
                return i
            }
        }
        return null
    }

    return (
        <PopoverMenu
            className="task-move-menu"
            title="Move card"
            {...popoverState.popover}
        >
            <h4>Select destination</h4>

            <div className="destination">
                <CustomSelect
                    className="board-select"
                    label="Board"
                    options={boardOptions}
                    selectedId={selectedBoardId}
                    onSelect={setSelectedBoardId}
                />

                <CustomSelect
                    className="group-select"
                    label="List"
                    options={groupOptions}
                    selectedId={selectedGroupId}
                    onSelect={setSelectedGroupId}
                />

                <CustomSelect
                    className="position-select"
                    label="Position"
                    options={positionOptions}
                    selectedId={selectedPositionId}
                    onSelect={setSelectedPositionId}
                />
            </div>

            <button className="btn-primary">Move</button>
        </PopoverMenu>
    )
}

import { useEffect, useState } from 'react'
import { selectAllBoards } from '../../../store/reducers/board.reducer'
import { loadBoards } from '../../../store/actions/board/board.actions'
import { CustomSelect } from '../../general/CustomSelect'
import { utilService } from '../../../services/util.service'
import { useSelector } from 'react-redux'

export function GroupMenuMoveGroup({ board, group, onMoveGroup }) {
    const allBoards = useSelector(selectAllBoards)

    const [boardOptions, setBoardOptions] = useState([])
    const [positionOptions, setPositionOptions] = useState([])

    const [selectedBoardId, setSelectedBoardId] = useState(board._id)
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
        const unarchivedGroups = selectedBoard.groups.filter(
            (g) => !g.archivedAt
        )

        let count = unarchivedGroups.length
        if (selectedBoard._id !== board._id) {
            // moving to a different board means there's one more option
            count++
        }

        const posOpts = [...Array(count).keys()].map((idx) => ({
            _id: `${idx + 1}`,
            label: `${idx + 1}`,
        }))

        setPositionOptions(posOpts)

        let positionId = '1'
        if (selectedBoardId === board._id) {
            const groupIdx = utilService.getIdxById(unarchivedGroups, group._id)
            positionId = `${groupIdx + 1}`
        }

        setSelectedPositionId(positionId)
    }, [boardOptions, selectedBoardId])

    function onMove() {
        onMoveGroup(selectedBoardId, +selectedPositionId - 1)
    }

    function getOrigSelectedPositionId() {
        if (selectedBoardId !== board._id) {
            return null
        }
        return `${
            utilService.getIdxById(
                board.groups.filter((g) => !g.archivedAt),
                group._id
            ) + 1
        }`
    }

    return (
        <div className="group-menu-move-group">
            <div className="destination">
                <CustomSelect
                    className="board-select"
                    label="Board"
                    options={boardOptions}
                    selectedId={selectedBoardId}
                    origSelectedId={board._id}
                    onSelect={setSelectedBoardId}
                />

                <CustomSelect
                    className="position-select"
                    label="Position"
                    options={positionOptions}
                    selectedId={selectedPositionId}
                    origSelectedId={getOrigSelectedPositionId()}
                    onSelect={setSelectedPositionId}
                />
            </div>

            <button className="btn-primary btn-move" onClick={onMove}>
                Move
            </button>
        </div>
    )
}

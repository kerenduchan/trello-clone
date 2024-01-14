import { updateTask } from './task.actions'

export { removeTaskLabel, addTaskLabel }

// TASK LABEL

async function addTaskLabel(hierarchy, label) {
    const { board, task } = hierarchy
    const taskLabelIds = [...task.labelIds, label._id]

    // keep the same order of labels as in the board labels
    const labelIds = board.labels
        .filter((l) => taskLabelIds.includes(l._id))
        .map((l) => l._id)

    return updateTask(hierarchy, { labelIds })
}

async function removeTaskLabel(hierarchy, label) {
    const { task } = hierarchy
    const labelIds = task.labelIds.filter((id) => id !== label._id)
    return updateTask(hierarchy, { labelIds })
}

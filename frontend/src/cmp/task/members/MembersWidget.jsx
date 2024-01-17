import { usePopoverState } from '../../../customHooks/usePopoverState'
import { boardService } from '../../../services/board/board.service'
import { Icon } from '../../general/Icon'
import { MembersMenu } from './MembersMenu'
import { MembersWidgetItem } from './MembersWidgetItem'

export function MembersWidget({ hierarchy }) {
    const members = boardService.getTaskMembers(hierarchy)
    const membersMenu = usePopoverState()

    return (
        <>
            {!!members?.length && (
                <section className="members-widget">
                    <h3>Members</h3>
                    <ul>
                        {members.map((member) => (
                            <li key={member._id}>
                                <MembersWidgetItem
                                    hierarchy={hierarchy}
                                    member={member}
                                />
                            </li>
                        ))}
                        <li key="add">
                            <button
                                className="btn-circle btn-add"
                                {...membersMenu.triggerAndTarget}
                            >
                                <Icon type="add" />
                            </button>
                        </li>
                    </ul>
                </section>
            )}

            {/* Members menu */}
            {membersMenu.show && (
                <MembersMenu hierarchy={hierarchy} popoverState={membersMenu} />
            )}
        </>
    )
}

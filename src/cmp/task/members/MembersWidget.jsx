import { usePopoverState } from '../../../customHooks/usePopoverState'
import { boardService } from '../../../services/board.service'
import { MembersMenu } from './MembersMenu'
import { MembersWidgetItem } from './MembersWidgetItem'

export function MembersWidget({ hierarchy }) {
    const members = boardService.getTaskMembers(hierarchy)
    const membersMenu = usePopoverState()

    return (
        <>
            <section className="members-widget">
                {!!members?.length && (
                    <>
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
                        </ul>
                    </>
                )}
            </section>

            {/* Members menu */}
            {membersMenu.show && (
                <MembersMenu hierarchy={hierarchy} popoverState={membersMenu} />
            )}
        </>
    )
}

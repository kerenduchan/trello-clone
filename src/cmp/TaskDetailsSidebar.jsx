import { SecondaryIconBtn } from './SecondaryIconBtn'

export function TaskDetailsSidebar() {
    return (
        <div className="task-details-sidebar">
            <section>
                <h3>Suggested</h3>
                <div className="content">
                    <SecondaryIconBtn type="person" text="Join" />
                </div>
            </section>

            <section>
                <h3>Add to card</h3>
                <div className="content">
                    <SecondaryIconBtn type="person" text="Members" />
                    <SecondaryIconBtn type="sell" text="Labels" />
                    <SecondaryIconBtn type="checklist" text="Checklist" />
                    <SecondaryIconBtn type="schedule" text="Dates" />
                    <SecondaryIconBtn type="attachment" text="Attachment" />
                    <SecondaryIconBtn type="keyboard_full" text="Cover" />
                    <SecondaryIconBtn type="variables" text="Custom Fields" />
                </div>
            </section>

            <section>
                <h3>Actions</h3>
                <div className="content">
                    <SecondaryIconBtn type="arrow_right_alt" text="Move" />
                    <SecondaryIconBtn type="content_copy" text="Copy" />
                    <SecondaryIconBtn type="copy_all" text="Make Template" />
                    <SecondaryIconBtn type="archive" text="Archive" />
                    <SecondaryIconBtn type="share" text="Share" />
                </div>
            </section>
        </div>
    )
}

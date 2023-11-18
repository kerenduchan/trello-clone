import { SecondaryIconBtn } from './SecondaryIconBtn'

export function TaskDetailsSidebar() {
    return (
        <div className="task-details-sidebar">
            <section>
                <h3>Suggested</h3>
                <div className="content">
                    <SecondaryIconBtn type="member" text="Join" />
                </div>
            </section>

            <section>
                <h3>Add to card</h3>
                <div className="content">
                    <SecondaryIconBtn type="member" text="Members" />
                    <SecondaryIconBtn type="label" text="Labels" />
                    <SecondaryIconBtn type="checklist" text="Checklist" />
                    <SecondaryIconBtn type="date" text="Dates" />
                    <SecondaryIconBtn type="attachment" text="Attachment" />
                    <SecondaryIconBtn type="cover" text="Cover" />
                    <SecondaryIconBtn type="customField" text="Custom Fields" />
                </div>
            </section>

            <section>
                <h3>Actions</h3>
                <div className="content">
                    <SecondaryIconBtn type="move" text="Move" />
                    <SecondaryIconBtn type="copy" text="Copy" />
                    <SecondaryIconBtn type="template" text="Make Template" />
                    <SecondaryIconBtn type="archive" text="Archive" />
                    <SecondaryIconBtn type="share" text="Share" />
                </div>
            </section>
        </div>
    )
}

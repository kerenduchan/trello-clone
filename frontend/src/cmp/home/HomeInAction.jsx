import { HomeInActionCard } from './HomeInActionCard'

export function HomeInAction() {
    const cards = [
        {
            backgroundColor: '#ff7452',
            img: 'images/in-action-card-project-management.png',
            title: 'Project management',
            text: 'Keep tasks in order, deadlines on track, and team members aligned with Krello.',
        },
        {
            backgroundColor: '#2684ff',
            img: 'images/in-action-card-meetings.png',
            title: 'Meetings',
            text: 'Empower your team meetings to be more productive, empowering, and dare we say—fun.',
        },
        {
            backgroundColor: '#57d9a3',
            img: 'images/in-action-card-onboarding.png',
            title: 'Onboarding',
            text: 'Onboarding to a new company or project is a snap with Krello’s visual layout of to-do’s, resources, and progress tracking.',
        },
        {
            backgroundColor: '#ffc400',
            img: 'images/in-action-card-task-management.png',
            title: 'Task Management',
            text: 'Use Krello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.',
        },
        {
            backgroundColor: '#00c7e5',
            img: 'images/in-action-card-brainstorming.svg',
            title: 'Brainstorming',
            text: 'Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.',
        },
        {
            backgroundColor: '#f99cdb',
            img: 'images/in-action-card-resource-hub.png',
            title: 'Resource hub',
            text: 'Save time with a well-designed hub that helps teams find information easily and quickly.',
        },
    ]

    return (
        <section className="home-in-action">
            <div className="intro">
                <p className="home-section-title">Krello in action</p>
                <h2>Workflows for any project, big or small</h2>
            </div>

            <div className="cards">
                {cards.map((card, idx) => (
                    <HomeInActionCard key={idx} card={card} />
                ))}
            </div>
            <p className="bottom-text">
                No need to start from scratch. Jump-start your workflow with a
                proven playbook designed for different teams. Customize it to
                make it yours.
            </p>
        </section>
    )
}

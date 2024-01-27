# Trello Clone

A [Trello](https://trello.com/) clone implementation in React + Redux + NodeJs + MongoDB.

Hosted live here: https://dashboard.render.com/

_Note that it may take a minute or two for the live server to start back up, as it is hosted on a free Render account._

## Features

### Homepage

Styled homepage, similar to Trello, with carousel implementation.

### User Accounts

Login, Signup, Logout

### Board

-   Board index - lists all of the boards that the logged in user is a member of
-   Create board with a chosen background image and title
-   Delete board
-   Rename board
-   Add / remove star from board - from the board index and from the board details page.
-   Board menu: Activities, archived groups / tasks, change cover (Unsplash integration). Can unarchive groups/tasks from this menu.

### Group (AKA List)

-   Create a group in a board. Pressing Enter allows quickly adding groups one after the other
-   Rename group
-   Drag/drop group (reorder groups in board)
-   Group menu: Copy group, move group, archive group, move all tasks in group, archive all tasks in group

### Task (AKA Card)

-   Add a task to a group in a board. Pressing Enter allows quickly adding groups one after the other
-   Rename task
-   Drag/drop task to a different group / in the same group
-   Move task, copy task
-   Robust task details, containing labels, description, checklist etc - listed below.
-   Archive/unarchive task, delete task

### Labels

-   Show labels in task details
-   Add/remove a label to/from a task
-   Edit label: change label color or text
-   Create a new label
-   Delete a label (deletes the label from all tasks that use it)
-   Show labels in task preview - narrow and expanded on click, at the board level

### Description

-   Show description in task details
-   Edit description
-   Show description badge in task preview

### Checklists

-   Show checklists in task details, including progress bar
-   Add checklist to task (can add several)
-   Rename checklist
-   Delete checklist
-   Drag/drop checklist to reorder checklists in task
-   Add item to checklist
-   Check/uncheck an item in a checklist
-   Drag/drop checklist item in same checklist / to a different checklist
-   Delete item from checklist
-   Convert checklist item to task
-   Show checklists badge in task preview

### Members

-   Add/remove members to/from task
-   Show members badge in task preview
-   Add members to the board (Share button)

### Comments

-   Add a comment to a task
-   Edit/delete comment
-   Show all comments in board menu under Activity, and in the task.
-   Show comments badge in task preview

### Dates

-   Add a start date / due date to a task
-   Edit/remove task dates
-   Show dates widget in task details, including Overdue, Due soon indicators
-   Mark task as complete
-   Show dates badge in task preview
-   Dates menu has a date picker with date range picking abilities.

### Cover

-   Add cover to task - color/image, large/small
-   Remove cover from task
-   Dynamic text color depending on the cover.

### Activity

-   Record an activity at various events (task created, archived, unarchived, deleted, etc)
-   View the activities in the task details and in the board menu, including links to the tasks.

### General

-   Reusable popover menu component
-   Some popover menus have multiple pages (navigation). See for example the labels menu in the task details.
-   Page title changes according to page
-   Correct scrolling when many there are groups, many tasks in a group, and when the task details is long.
-   Editable titles behave correctly, including undo upon ESC.
-   Optimistic updates in the frontend for a more responsive UI.
-   Uses react-beautiful-dnd for smooth drag/drop.

# Changelog

## [Unreleased]

### Added

- **Validation** for all Dialogs
- **Error messages** for all text fields that are invalid
- **ESLint** for `backend`
- **Roles**
  - Users are now divided into roles: **1 moderator and N participants**
  - Moderator
    - the moderator is the one, who's controlling the retrospective and has access to features that participants don't have
  - Participants
    - participants are the ones, who are joining the retrospective and just have the ability to create or move cards
- **Author name autofill**
  - You can now provide your name which will be saved and autofilled on each card creation
- **New voting system**
  - Vote Count button
    - is only accessible by the moderator
    - the moderator can set a maximum vote count for each user
    - the moderator can also reset all votes in order to start a re-vote
    - re-setting a maximum vote count is also considered as a re-vote
  - While voting several things happen
    - a Snackbar opens which displays how many votes are left for the user
    - on the voted Card, a thumb-down icon appears, which let's you take back your vote 
    - all Cards you voted for are highlighted with a dark background on the Avatar
    - after reaching your maximum amount of votes, you can't vote anymore, unless you take back a vote from another Card
- **Tab Name**
  - `document.title` is now set as `"Retro | <YOUR_BOARD_NAME>"`
- **QR-Code**
  - Mobile users can now scan a QR-Code which should open the link to the board in the browser 
    - _thanks to @mrpatpat_
- **Hooks and Context API**
  - we removed a lot of prop-drilling, boilerplate code and refactored all classes to functional components, utilizing React Hooks and the new Context API
  - BoardContext
    - provides the `boardId` to all child components
  - UserContext
    - provides user related data and performs changes, utilizing `useReducer` 

### Changed

- Less used column buttons like delete, edit and sort are now grouped in a menu, so that the column header looks cleaner and we have more space for the column name itself
- Replaced `uniqid` with `nanoid`
- Some API changes due to updated dependencies regarding
  - Material-UI
  - react-testing-library

### Fixed

- CSS issues
  - Really long words are now handled properly
  - Mobile UI should be a bit better now, but not optimal 
    - _thanks to @mrpatpat_
- Improved render performance when dragging cards and columns
- `LoadBoardDialog` validation should not result in a `SyntaxError` anymore
- All invalid URLs will now be redirected to a 404 page
- The `CONNECT` event client-side doesn't cause a re-render anymore

## [0.2.1] - 2019-03-29

### Fixed

- WebSockets are now in their appropriate room. Every room is defined by the board ID

## [0.2.0] - 2019-03-29

### Added

- Edit column names
- Load your board by providing a board ID
- Rudimentary solution for maximum votes

### Removed

- Removed the "New Board" button on the board component because it behaved really buggy

### Fixed

- Fixed some minor naming issues

## [0.1.0] - 2019-03-29

### Added

- Create boards
- Create columns 
- Create cards 
- Delete columns 
- Delete cards
- Edit cards
- Sort columns
- Toggle blurring on cards
- Export your board
- Drag and drop columns and cards
- Combine two cards
- Upvote cards

[Unreleased]: https://github.com/yduman/retro/compare/development
[0.2.1]: https://github.com/yduman/retro/releases/tag/0.2.1
[0.2.0]: https://github.com/yduman/retro/releases/tag/0.2.0
[0.1.0]: https://github.com/yduman/retro/releases/tag/0.1.0
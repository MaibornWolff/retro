# Changelog

## [Unreleased]

### Added

- Validation for all text fields
- Error messages for all text fields that are invalid
- ESLint for `backend`
- Roles
  - Users are now divided into two roles: 1 **moderator** and N **participants**
  - Moderator
    - the moderator is the one, who's controlling the retrospective and has access to features that participants don't have
  - Participants
    - participants are the ones, who are joining the retrospective and just have the ability to create or move cards
- Author name autofill
  - You can now provide your name which will be saved and autofilled on each card creation
- Vote system
  - Maximum vote count

### Changed

- Less used column buttons like delete, edit and sort are now grouped in a menu, so that the column header looks cleaner and we have more space for the column name itself
- Replaced `uniqid` with `nanoid`

### Fixed

- CSS issues
  - Really long words are now handled properly
  - Columns are now wrapping, if you create a lot of them
- Improved render performance when dragging cards and columns
- "Load Board" validation should not result in a `SyntaxError` anymore
- Hitting the syntactically correct URL for boards but with an invalid Board-ID will now be redirected to a 404 page

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
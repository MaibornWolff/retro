# Changelog

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

## [0.5.0] - 2021-08-07

### Added

- New dark and light theme
- The planning poker now also displays a chart for the voting results. This is handy if you have a large team.
- You can now mark cards as discussed, thanks to @tobim-dev !
- The moderator can now remove participants manually from the planning poker. This is handy if a participant accidentally closed its tab and therefore lost the session.

### Changed

- Improved UI of vote count dialog
- Improved UI of how many votes are left. No more buggy toasts!
- Blurred cards are now displayed as skeletons
- Participants can now only drag there own cards and cannot drag columns. The moderator can still drag all cards and also all columns.

### Fixed

- Deprecated `KeyboardEvent.keyCode`

### Removed

## [0.4.1] - 2020-10-25

### Added

- **Change Planning Poker Units**
  - Previously, Retro was just supporting planning poker for fibonacci numbers from 0 to 34. Now, the moderator can decide between three unit types and their maximum value. The unit types are fibonacci numbers, natural numbers and T-Shirt sizes. The allowed maximum value for the first two is 100 and T-Shirt sizes go from XS to XXL.
- **Usage of zustand**
  - Added the library [zustand](https://github.com/pmndrs/zustand), in order to explore it for the planning poker page. It handles state management really well and will probably be adopted into the board page as well.

### Changed

- Usage of React 17 and ESLint 7

### Fixed

- Multiple fixes regarding TypeScript deployment

### Removed

- `supertest` library from backend, since there was no usage

## [0.4.0] - 2020-09-19

### Added

- **Planning Poker**

  - Retro now provides a page for planning poker sessions
  - The person starting the session is the moderator, the rest joining are participants
  - Every person who joins the session will have its own card where it can provide an estimation for an user story
  - The moderator can set the current user story for estimation by providing the title and optionally an URL to the user story
  - Initially all cards are red, meaning the user did not vote. When a user votes, the card turns green.

- **Blur columns independently**

  - Moderators can now blur columns independently, by clicking the triple dot button on a column
  - Special thanks to [2mawi2](https://github.com/2mawi2) for realizing this feature! ❤️

- **Share session button**
  - The toolbar got an additional button for sharing a session
  - Previously users had to manually copy the URL for sharing the session. This button will now automatically copy the URL to the clipboard when clicked

### Changed

- **Backend refactoring**
  - Backend got refactored to TypeScript
- **Drop yarn**
  - Retro now uses `npm` as the default package manager
- **rmby**
  - Storage clean up is now handled by the `rmby` library

### Fixed

- Styling for buttons on the toolbar

### Removed

- There was a delete endpoint that was being used for tests. Since we will rethink the whole point of testing Retro, we currently don't need this endpoint anymore

## [0.3.5] - 2020-08-04

### Added

- Instead of blurring/unblurring all cards, we are now blurring/unblurring cards that are now owned by an user. Special thanks to [tobim-dev](https://github.com/tobim-dev), [ravensinth](https://github.com/ravensinth) et al. for realizing this feature ❤️
- The greeting text on the homepage now has a typewriter effect

### Removed

- Empty Gatsby Gitbook Template, since we will handle this project on a different repository

## [0.3.4] - 2020-06-24

### Fixed

- Display of multiline text for card content

## [0.3.3] - 2020-06-14

### Added

- Import/Export of board data
  - If you want to reuse a board for another retrospective, you can now export the data of the board as JSON and import it later for another session
  - Special thanks to [ClaasBusemann](https://github.com/ClaasBusemann) and [PaulaBre](https://github.com/PaulaBre) for their contribution! ❤️
- Docker development support
- Container-based deployment support
- Rate-limiting API
- Configurable CORS settings in PROD mode

### Changed

- Frontend
  - Using TypeScript now!
  - Major UI redesign!
  - Hooks all the way - no more HOCs!
  - Increased maximum card content length
- Backend
  - Storage clean up will now be handled via Node.js instead of writing your own cronjob manually

### Fixed

- The call to `getBoard()` on the backend now handles parsing errors and redirects the user to the error page

### Removed

## [0.3.2] - 2019-10-21

### Added

- Retro Formats
  - On board creation, the user can now select well known retrospective formats

### Changed

- Maximum card content length is now 10000

## [0.3.1] - 2019-09-30

### Changed

- Some dependency updates
- Dialogs don't display an error state by default (#44)

### Fixed

- Fixed draggable dialogs
  - Dialog components are now outside of a drag and drop context
- Fixed layout issues regarding the buttons on the board header
- Fixed layout issues regarding board cards (#43)
- Fixed an issue where columns where expanding its height while dragging (#45)
- Fixed vote count dialog (#42)
  - Disallowed negative vote counts
  - Cancel button should work properly now

## [0.3.0] - 2019-08-22

### Added

- **Validation** for all Dialogs
- **Error messages** for all text fields that are invalid
- **ESLint** for `backend`
- **Roles**
  - Users are now divided into roles: **1 moderator and N participants**
  - Moderator
    - the moderator is the one, who's controlling the retrospective and has access to features that participants don't have
  - Participants
    - participants are the ones, who are joining the retrospective and just have the ability to make CRUD operations on cards or open the QR-Code modal
- **Author name autofill**
  - You can now provide your name which will be saved and autofilled on each card creation
- **New voting system**
  - Vote Count button
    - is only accessible by the moderator
    - the moderator can set a maximum vote count for each user
    - the moderator can also reset all votes in order to start a re-vote
    - re-setting the maximum vote count is also considered as a re-vote
    - by default, every user has 3 votes
  - While voting several things happen
    - a Snackbar opens which displays how many votes are left for the user
    - on the voted card, a thumb-down icon appears, which let's you take back your vote
    - all cards you voted for are highlighted with a dark background on the Avatar
    - after reaching your maximum amount of votes, you can't vote anymore, unless you take back a vote from another card
- **Tab Name**
  - `document.title` is now set as `"Retro | <YOUR_BOARD_NAME>"`
- **QR-Code**
  - Mobile users can now scan a QR-Code which should open the link to the board in the browser
    - _thanks to @mrpatpat_
- **Hooks and Context API**
  - we removed a lot of prop-drilling, boilerplate code and refactored all classes to functional components, utilizing React Hooks and the new Context API
  - BoardContext
    - provides the `boardId` to all child components
    - provides the `socket` to all child components
  - UserContext
    - provides user related data and performs changes, utilizing `useReducer`
- **Preventing unwanted card merges**
  - Sometimes when I was dragging cards around I merged them by accident. To prevent this, we're now prompting the user if it really wants to merge or not.
- **Highlight the card that is currently talked about**
  - The moderator can now highlight the card that the team is currently talking about. This is handy if you are for example in a video conference. The moderator can highlight a card by hovering over a card and pressing the `F` key, which will make the border of the card red. The moderator can remove the highlighting by hovering over a card and pressing `Shift + F`.
- **E2E Tests**
  - I replaced `testing-library/react` with `cypress`. The reason was that I didn't wanted to test each of my components on its own. I rather wanted something like scenario testing and Cypress really suits well for this case.
- **husky & lint-staged**
  - These both libraries are executing formatting, linting and testing of code before commit and push
- **LocalStorage**
  - We're using the LocalStorage to store important data. In the future, this will be removed, since we'll add a database.
  - We store it the following way
    - Key: Board ID
    - Value: `{maxVoteCount: number, name: string, role: string, votedItems: Array<string>, votesLeft: number}`
  - The original idea of Retro was to use the app for a single session, that is why we're currently not using a DB for instance. Now we get feature requests that will need a DB and we could realize some of the features for now by adding the LocalStorage layer.
  - **Dealing with moderator**: If your moderator is somehow missing and you want to swap the role of someone, then please change the `role` field from `participant` to `moderator`.

### Changed

- Less used column buttons like delete, edit and sort are now grouped in a menu, so that the column header looks cleaner and we have more space for the column name itself
- Replaced `uniqid` with `nanoid`
- Some API changes due to updated dependencies
- Rewrite of socket API in `frontend`
  - Formerly, each call to `connectSocket(id)` would create a new socket. This meant that every feature which needed to send data with a socket would create an additional socket (yeah I know). The rewrite to a Singleton ensured that there is now only one socket per user. Furthermore we removed all values from the deps array of `useEffect`, since we only want the listeners to be created once. In some tests we inspected that certain events took too long, because some listners would be created over and over again.

### Fixed

- CSS issues
  - Really long words are now handled properly
  - Mobile UI should be a bit better now
    - Special thanks to [mrpatpat](https://github.com/mrpatpat) for realizing this! ❤️
- Improved render performance on several places
- `LoadBoardDialog` validation should not result in a `SyntaxError` anymore
- All invalid URLs will now be redirected to a 404 page
- The client-side `CONNECT` socket-event shouldn't cause a re-render anymore
- Persistent state now on the Board-Page

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

[unreleased]: https://github.com/yduman/retro/compare/0.5.0...master
[0.5.0]: https://github.com/yduman/retro/releases/tag/0.5.0
[0.4.1]: https://github.com/yduman/retro/releases/tag/0.4.1
[0.4.0]: https://github.com/yduman/retro/releases/tag/0.4.0
[0.3.5]: https://github.com/yduman/retro/releases/tag/0.3.5
[0.3.4]: https://github.com/yduman/retro/releases/tag/0.3.4
[0.3.3]: https://github.com/yduman/retro/releases/tag/0.3.3
[0.3.2]: https://github.com/yduman/retro/releases/tag/0.3.2
[0.3.1]: https://github.com/yduman/retro/releases/tag/0.3.1
[0.3.0]: https://github.com/yduman/retro/releases/tag/0.3.0
[0.2.1]: https://github.com/yduman/retro/releases/tag/0.2.1
[0.2.0]: https://github.com/yduman/retro/releases/tag/0.2.0
[0.1.0]: https://github.com/yduman/retro/releases/tag/0.1.0

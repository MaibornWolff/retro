# Mandatory

- add error page if user is rejected
- encryption of all communication
- test in a real environment (users joining via the internet)
- provide some config json (for properties like maxVoteCount and log level)
- update contact data in legal docs
- update license

# Improvement

- write tests (jest, react-testing-library, react-hooks-testing-library)
- accept all button on waiting list (maybe reject all?)
- option to auto allow all / auto reject
- add tooltip to icon buttons (e.g. as ToolTipIconButton)
- fix light theme and use a proper primary color?
- add commit and branch name linting
- fix join/create session button width in retro
- Move Add Column button to fitting place
- remove upper right menu on poker card

# Refactorings

- change all "export default" to "export"

# Follow-Up

- do we need to disconnect users from socket when rejected? (-> bug)

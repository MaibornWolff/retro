import React from "react";

const AppContext = React.createContext();

export class AppProvider extends React.Component {
  state = {
    votes: 0,
    isPrivate: false,
    timebox: 0,
    boardId: ""
  };

  setVotes = votes => this.setState({ votes });

  setTimebox = timebox => this.setState({ timebox });

  setBoardId = boardId => this.setState({ boardId });

  enablePrivacy = () => this.setState({ isPrivate: true });

  disablePrivacy = () => this.setState({ isPrivate: false });

  render() {
    const { children } = this.props;
    const { votes, isPrivate, timebox, boardId } = this.state;

    return (
      <AppContext.Provider
        value={{
          votes,
          isPrivate,
          timebox,
          boardId,
          setVotes: this.setVotes,
          setTimebox: this.setTimebox,
          setBoardId: this.setBoardId,
          enablePrivacy: this.enablePrivacy,
          disablePrivacy: this.disablePrivacy
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;

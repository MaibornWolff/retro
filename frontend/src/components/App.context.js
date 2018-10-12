import React from "react";

const AppContext = React.createContext();

export class AppProvider extends React.Component {
  state = {
    isPrivate: false,
    voteCount: 3,
    timeboxInMin: 5
  };

  setPrivacy = isPrivate => this.setState({ isPrivate });

  setVoteCount = voteCount => this.setState({ voteCount });

  setTimebox = timeboxInMin => this.setState({ timeboxInMin });

  render() {
    const { children } = this.props;
    const { isPrivate, voteCount, timeboxInMin } = this.state;

    return (
      <AppContext.Provider
        value={{
          isPrivate,
          voteCount,
          timeboxInMin,
          setPrivacy: this.setPrivacy,
          setVoteCount: this.setVoteCount,
          setTimebox: this.setTimebox
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;

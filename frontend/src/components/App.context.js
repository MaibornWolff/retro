import React from "react";

const AppContext = React.createContext();

export class AppProvider extends React.Component {
  state = {
    voteCount: 3,
    timeboxInMin: 5
  };

  handleSlide = event => this.setState({ voteCount: event.target.value });

  setTimebox = timeboxInMin => this.setState({ timeboxInMin });

  render() {
    const { children } = this.props;
    const { voteCount, timeboxInMin } = this.state;

    return (
      <AppContext.Provider
        value={{
          voteCount,
          timeboxInMin,
          handleSlide: this.handleSlide,
          setTimebox: this.setTimebox
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;

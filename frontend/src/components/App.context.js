import React from "react";

const AppContext = React.createContext();

export class AppProvider extends React.Component {
  state = {
    boardId: ""
  };

  setBoardId = boardId => this.setState({ boardId });

  render() {
    const { children } = this.props;
    const { boardId } = this.state;

    return (
      <AppContext.Provider
        value={{
          boardId,
          setBoardId: this.setBoardId,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppConsumer = AppContext.Consumer;

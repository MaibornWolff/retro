import React from "react";

import { Title, Input } from "../common";
import { AppConsumer } from "../App.context";

export default class SettingsForm extends React.Component {
  render() {
    return (
      <AppConsumer>
        {({ voteCount, handleSlide }) => (
          <div>
            <Title>Settings</Title>
            <Input
              label={`Everyone has ${voteCount} votes`}
              type="range"
              value={voteCount}
              name="voteCount"
              min="1"
              max="10"
              step="1"
              onInput={handleSlide}
            />
          </div>
        )}
      </AppConsumer>
    );
  }
}

import React from "react";

import { Switch, Title } from "../common";
import { AppConsumer } from "../App.context";

export default class SettingsForm extends React.Component {
  render() {
    return (
      <AppConsumer>
        {({ isPrivate, togglePrivacy }) => (
          <div>
            <Title>Settings</Title>
            <Switch
              id="privacy-switch"
              name="privacy-switch"
              className="is-rounded is-info is-rtl"
              label="Privacy Mode"
              checked={isPrivate}
              onClick={togglePrivacy}
            />
          </div>
        )}
      </AppConsumer>
    );
  }
}

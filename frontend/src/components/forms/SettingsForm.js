import React from "react";

import { Switch } from "../common";

export default class SettingsForm extends React.Component {
  render() {
    return (
      <div>
        <Switch
          id="privacy-switch"
          name="privacy-switch"
          className="is-rounded is-info"
          checked="checked"
          label="Privacy Mode"
        />
      </div>
    )
  }
}

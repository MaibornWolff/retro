interface RoomConfiguration {
  isAutoAcceptActivated: boolean;
}

export default class RoomStore {
  constructor() {
    this.roomConfigurationByRoomId = new Map();
  }

  private readonly roomConfigurationByRoomId: Map<string, RoomConfiguration>;

  getRoomConfiguration(roomId: string) {
    return this.roomConfigurationByRoomId.get(roomId);
  }

  addRoom(roomId: string, roomConfiguration: RoomConfiguration) {
    this.roomConfigurationByRoomId.set(roomId, roomConfiguration);
  }

  removeRoom(roomId: string) {
    this.roomConfigurationByRoomId.delete(roomId);
  }

  get() {
    return {
      roomConfigurationByRoomId: this.roomConfigurationByRoomId,
    };
  }
}

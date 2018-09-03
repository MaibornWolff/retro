const seed = {
  tasks: {
    "task-1": {
      id: "task-1",
      author: "Max",
      content: "Take out the garbage",
      points: 0
    },
    "task-2": {
      id: "task-2",
      author: "Emily",
      content: "Watch Mr.Robot Season 4",
      points: 0
    },
    "task-3": {
      id: "task-3",
      author: "Sarah",
      content: "Download Angry Birds",
      points: 0
    },
    "task-4": {
      id: "task-4",
      author: "Tom",
      content: "Cook salmon with rice",
      points: 0
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default seed;

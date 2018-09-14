const exampleBoard = {
  title: "PROJECT RETRO",
  items: {
    "item-1": {
      id: "item-1",
      author: "Hadley Macias",
      content: "I liked the way how our PO was handling the workload!",
      points: 0
    },
    "item-2": {
      id: "item-2",
      author: "Samad Allen",
      content: "We should focus more on performance stories",
      points: 0
    },
    "item-3": {
      id: "item-3",
      author: "Jia Rutledge",
      content: "I feel like everyone is doing a great job!",
      points: 0
    },
    "item-4": {
      id: "item-4",
      author: "Willow Villegas",
      content: "We should care more about our technical debt",
      points: 0
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Mad",
      itemIds: ["item-4"]
    },
    "column-2": {
      id: "column-2",
      title: "Sad",
      itemIds: ["item-2"]
    },
    "column-3": {
      id: "column-3",
      title: "Glad",
      itemIds: ["item-1", "item-3"]
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default exampleBoard;

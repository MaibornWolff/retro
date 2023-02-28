export interface RetroFormat {
  columnTitles: string[];
  name: string;
}

export const retroFormatConfig: Record<string, RetroFormat> = {
  EMPTY: {
    columnTitles: [],
    name: "None",
  },
  WENT_WELL_TO_IMPROVE_ACTION_ITEMS: {
    columnTitles: ["Went Well", "To Improve", "Action Items"],
    name: "Went Well, To Improve, Action Items",
  },
  START_STOP_CONTINUE: {
    columnTitles: ["Start", "Stop", "Continue"],
    name: "Start, Stop, Continue",
  },
  MAD_SAD_GLAD: {
    columnTitles: ["Mad", "Sad", "Glad"],
    name: "Mad, Sad, Glad",
  },
  TO_DISCUSS_DISCUSSING_DISCUSSED: {
    columnTitles: ["To Discuss", "Discussing", "Discussed"],
    name: "To Discuss, Discussing, Discussed",
  },
  KEEP_ADD_LESS_MORE: {
    columnTitles: ["Keep", "Add", "Less", "More"],
    name: "Keep, Add, Less, More",
  },
  DROP_ADD_KEEP_IMPROVE: {
    columnTitles: ["Drop", "Add", "Keep", "Improve"],
    name: "Drop, Add, Keep, Improve",
  },
  LIKED_LEARNED_LACKED_LONGED_FOR: {
    columnTitles: ["Liked", "Learned", "Lacked", "Longed For"],
    name: "Liked, Learned, Lacked, Longed For",
  },
  THE_FOUR_WHATS: {
    columnTitles: [
      "What went well?",
      "What didn't go so well?",
      "What have I learned?",
      "What still puzzles me?",
    ],
    name: "The Four What's",
  },
};

export const defaultFormat = "EMPTY";

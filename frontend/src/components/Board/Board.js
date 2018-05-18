import React from "react";
import {DragDropContext} from "react-beautiful-dnd";

import List from "../List";
import "./Board.css";

const getItems = (count, offset = 0) => {
  return Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`
  }));
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class Board extends React.Component {
  state = {
    items: getItems(10),
    selected: getItems(5, 10)
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  idToList = {
    list1: 'items',
    list2: 'selected'
  };

  getList = id => this.state[this.idToList[id]];

  onDragEnd = result => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = {items};

      if (source.droppableId === 'droppable2') {
        state = {selected: items};
      }

      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.list1,
        selected: result.list2
      });
    }
  };

  render() {
    return (
      <div id="board">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <List droppableId="list1" items={this.state.items} />
          <List droppableId="list2" items={this.state.selected} />
        </DragDropContext>
      </div>
    );
  }
}

export default Board;
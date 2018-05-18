import React from "react";
import {Draggable} from "react-beautiful-dnd";

const grid = 8;

export default (props) => (
  <Draggable
    key={props.key}
    draggableId={props.draggableId}
    index={props.index}
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        <div className="card text-center">
          <div className="card-header">
            Featured
          </div>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
          <div className="card-footer text-muted">
            2 days ago
          </div>
        </div>


      </div>
    )}
  </Draggable>
);

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // styles we need to apply on draggables
  ...draggableStyle
});

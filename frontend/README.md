# Retro-Frontend

This is a quick documentation about the frontend of Retro.

## Components

### BoardComponent

- the actual Board itself
- contains ListComponents
- with an ActionButton you can add more ListComponents into the BoardComponent
- a wrapper around the DraggableContext
- props
    - title: String
    - children: ListComponents

### ListComponent

- the List which will hold CardComponents
- a wrapper around Droppable
- props
    - title: String
    - children: CardComponents
    
### CardComponent

- the actual Card users can write
- a wrapper around Draggable
- props
    - text: String
    - author: String
    - points: Number
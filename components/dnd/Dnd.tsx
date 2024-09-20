"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

type Item = string;

interface ListsState {
  left: Item[];
  right: Item[];
}

const DragDropLists: React.FC = () => {
  const [lists, setLists] = useState<ListsState>({
    left: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    right: ['Item 6', 'Item 7', 'Item 8'],
  });

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) {
      return;
    }

    // If dropped in the same list
    if (source.droppableId === destination.droppableId) {
      const listKey = source.droppableId as keyof ListsState;
      const items = reorder(
        lists[listKey],
        source.index,
        destination.index
      );

      setLists(prev => ({
        ...prev,
        [listKey]: items
      }));
    } else {
      // If moved between lists
      const sourceKey = source.droppableId as keyof ListsState;
      const destKey = destination.droppableId as keyof ListsState;

      const result = move(
        lists[sourceKey],
        lists[destKey],
        source,
        destination
      );

      setLists(prev => ({
        ...prev,
        [sourceKey]: result[sourceKey],
        [destKey]: result[destKey]
      }));
    }
  };

  const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (
    source: Item[],
    destination: Item[],
    droppableSource: {
        droppableId: string; index: number 
},
    droppableDestination: { index: number }
  ): { [key in keyof ListsState]: Item[] } => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    return {
      left: droppableSource.droppableId === 'left' ? sourceClone : destClone,
      right: droppableSource.droppableId === 'left' ? destClone : sourceClone
    };
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between">
        {(['left', 'right'] as const).map((listKey) => (
          <Droppable key={listKey} droppableId={listKey}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="w-1/2 p-4 bg-gray-100">
                {lists[listKey].map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 bg-white"
                      >
                        {item}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragDropLists;
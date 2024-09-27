"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import Graph from '../comparison/Graph';

type Dd = { id: number, title: string} 
type Dds = Dd[]

const DragDropLists: React.FC = () => {
  const [spots, setSpots] = useState<Dds>([
        {
        id: 2,
        title: "sea girt",
        },
        {
            id: 3,
            title: "manasquan",
            }
    ]);

  const [graphs, setGraphs] = useState<Dds>([
        {
        id: 4,
        title: "belmar",
        },
        {
            id: 5,
            title: "deal",
            }
    ]);

    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result;
    
        // If dropped outside the list
        if (!destination) {
          return;
        }
        // If dropped in the same list
        if (source.droppableId === destination.droppableId && source.droppableId === "graphs") {
            const items = reorder(graphs, source.index, destination.index);
            setGraphs(items);
            }
        
        if (source.droppableId != destination.droppableId && destination.droppableId === "graphs"){
          const sourceKey = source.droppableId;
          const destKey = destination.droppableId;
          const result = move(
            spots,
            graphs,
            source,
            destination
          );  
          setGraphs(result.graphs);
          setSpots(result.spots);
        }
        else{
            return;
        }
      };
        

      const move = (
        source: Dds,
        destination: Dds,
        droppableSource: 
        {
        droppableId: string; 
        index: number 
        },
        droppableDestination: { index: number }
      ) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
    
        destClone.splice(droppableDestination.index, 0, removed);
        return {
          spots:  sourceClone,
          graphs:  destClone
        };
      };
  
  const reorder = (list: Dds, startIndex: number, endIndex: number): Dds => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-10 justify-between">
          <Droppable key={"spots"} droppableId={"spots"}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="w-1/5 p-4">
                {spots?.map((spot, index) => (
                  <Draggable key={spot.id} draggableId={spot.title} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 border rounded"
                      >
                        {spot.title}
                      </li>
                    )}
                  </Draggable>
                  
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <Droppable key={"graphs"} droppableId={"graphs"}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="w-4/5 p-4">
                {graphs.map((graph, index) => (
                  <Draggable key={graph.id} draggableId={graph.title } index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 border rounded"
                      >
                       <Graph id={graph.id} />
                      </li>
                    )}
                  </Draggable>
                  
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DragDropLists;
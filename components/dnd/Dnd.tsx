"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import ComparisonChart from '../charts/ComparisonChart';

type Dd = { id: number, title: string} 
type Dds = Dd[]

function DragDropLists ({graphs, setGraphs}) {

    const removeGraphById = (id: number) => {
      setGraphs((prevGraphs) => prevGraphs.filter((graph) => graph.id !== id));
    };
 

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
            graphs,
            graphs,
            source,
            destination
          );  
          setGraphs(result.graphs);

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

  if(graphs === undefined)
    return <p>nothing</p>

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full">
          <Droppable key={"graphs"} droppableId={"graphs"}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="w-full p-4">
                {graphs?.map((graph, index) => (
                  <Draggable key={graph.id} draggableId={graph.title } index={index} >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 "
                      >
                       <ComparisonChart id={graph.id} name={graph.title} remove={removeGraphById}></ComparisonChart>
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
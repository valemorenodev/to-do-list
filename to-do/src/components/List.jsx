import React from "react";
import Todo from "./Todo";

const List = ({ removeTodoListProp, list, editTodoListProp }) => {

  const renderedlist = list.map((item) =>
    <Todo
      title={item.title}
      completed={item.completed}
      removeTodoItemProp={(e) => removeTodoListProp(item._id)}
      editTodoItemProp={(updatedItem) => editTodoListProp(item._id, updatedItem)}
      key={item.title} />);

  return (

    <div className="ui grid center aligned">
      {renderedlist}
    </div>
  );
};

export default List;
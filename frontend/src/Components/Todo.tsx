const Todo = ({ text }: { text: string }) => {
  return (
    <div className="todo">
      <div>
        <h3>{text}</h3>
      </div>
    </div>
  );
};
export default Todo;

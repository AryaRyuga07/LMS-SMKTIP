const Button = (props) => {
  return (
    <div className="w-full h-10 p-3 bg-third hover:bg-second text-white hover:text-black transition duration-300 flex items-center justify-center border border-second hover:cursor-pointer">
      <button onClick={props.clicked} className={"w-full"}>
        {props.buttonName}
      </button>
    </div>
  );
};

export default Button;

const Card = (props) => {
    return (
        <div className={props.sizeClass}>
            <div className="rounded bg-stone-100 shadow-md shadow-slate-700 ml-14 mt-2 overflow-hidden">
            {props.elements}
            </div>
        </div>
    )
}

export default Card
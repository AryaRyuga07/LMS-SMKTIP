const Card = (props) => {
    return (
        <div className={props.sizeClass}>
            <div className="rounded bg-stone-100 shadow-md shadow-slate-700 m-3 ml-16">
            {props.elements}
            </div>
        </div>
    )
}

export default Card
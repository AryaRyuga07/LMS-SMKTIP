import Card from "../../../../component/Card/Card";
import Modal from "../../Modal/Modal";

const TableCard = (props) => {
  return (
    <div>
      <Card elements={props.elements} sizeClass="w-full h-max" />
      <Modal
        open={props.openDelete}
        onClose={props.onCloseDelete}
        children={props.childrenDelete}
      />
      <Modal
        open={props.openUpdate}
        onClose={props.onCloseUpdate}
        children={props.childrenUpdate}
      />
      <Modal
        open={props.openInsert}
        onClose={props.onCloseInsert}
        children={props.childrenInsert}
      />
    </div>
  );
};

export default TableCard;

import Modal from "react-modal"

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  Modal.setAppElement('#root');

export const CalendarModal = () => {
    const onCloseModal = ()=>{
        console.log("cerrando modal")
    }
  return (
    <Modal
        isOpen={true}
        onRequestClose={onCloseModal}  
        className={modal}
        style={customStyles}
    >
        <h1>hola Vegeta</h1>
        <hr />
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum optio, cupiditate quia fugit harum dolore quis, quisquam porro suscipit molestiae earum incidunt ea sed sit voluptate, aliquid praesentium. Itaque, nostrum!</p>

    </Modal>
  )
}

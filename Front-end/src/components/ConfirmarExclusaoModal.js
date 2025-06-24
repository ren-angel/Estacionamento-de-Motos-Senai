import '../styles/modal.css';

function ConfirmarExclusaoModal({ Text, onConfirm, onCancel }) {

  const fecharModalAoClicarFora = (e) => {

    if (e.target === e.currentTarget) {

      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={fecharModalAoClicarFora}>
        <div className="confirmar-modal">
          <h1 className="modal-h1">{Text}</h1>
          <div className='confirmar-modal-buttons'>
            <button className="confirm-modal-button" onClick={onConfirm}>CONFIRMAR</button>
            <br />
            <button className="cancel-modal-button" onClick={onCancel}>CANCELAR</button>
          </div>
        </div>
    </div>
  );
}

export default ConfirmarExclusaoModal;

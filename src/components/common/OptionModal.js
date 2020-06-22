import React from 'react';
import Modal from 'react-modal';
import ClientiList from '../clienti/ClientiList';
import { withTranslation } from 'react-i18next';

const OptionModal = ({
  modalContent,
  isOpen,
  contentLabel,
  onCancel,
  onConfirm,
  btnEnabled,
  t,
}) => (
  <Modal
    isOpen={!!isOpen}
    contentLabel={contentLabel}
    onRequestClose={onCancel}
    closeTimeoutMS={100}
    className='confirmation-modal'
    ariaHideApp={false}
  >
    <div>
      {modalContent instanceof Array ? (
        <ClientiList cliente={modalContent} />
      ) : (
        <div>{modalContent}</div>
      )}
      <div className='confirmation-modal__btn-wrapper'>
        {btnEnabled && (
          <button
            className='btn green'
            onClick={() => {
              onConfirm();
            }}
          >
            {t('btn_label_confirm')}
          </button>
        )}
        <button
          className='btn blue'
          onClick={() => {
            onCancel();
          }}
        >
          {t('btn_label_close')}
        </button>
      </div>
    </div>
  </Modal>
);

export default withTranslation()(OptionModal);

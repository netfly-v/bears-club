import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setBearModalSelector } from '../store/state/bears/selectors';
import { getBearsThunk, setBearModalThunk } from '../store/thunks/bearsThunk';
import styles from './MainPage.module.css';
import { ModalWindow } from '../modalWindow/ModalWindow';
import { STATUS } from '../utils/constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPortal } from 'react-dom';
import Header from '../header/Header';
import BearsPage from '../bearsPage/BearsPage';
import BearInfo from '../bearInfo/BearInfo';

const MainPage = ({ setBears, bearModal, setBearModal }) => {
  useEffect(() => {
    setBears(STATUS.NONE);
  }, []);

  const onClose = () => setBearModal(null);

  return (
    <div className={styles.mainPage}>
      <Header />
      <BearsPage />

      {createPortal(
        <ModalWindow
          visible={bearModal}
          title={null}
          footer={null}
          content={bearModal && <BearInfo />}
          onClose={onClose}
        />,
        document.getElementById('overlay')
      )}

      {createPortal(
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />,
        document.getElementById('overlay')
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  bearModal: setBearModalSelector(state),
});

const mapDispatchToProps = {
  setBears: getBearsThunk,
  setBearModal: setBearModalThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

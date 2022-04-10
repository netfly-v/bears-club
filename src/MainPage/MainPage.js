import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import styles from './MainPage.module.css';
import { ModalWindow } from './modalWindow/ModalWindow';

const STATUS = {
  NONE: 'NONE',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

export const MainPage = () => {
  const [bears, setBears] = useState([]);
  const [isReserved, setReserved] = useState(false);
  const [bearsStatus, setBearsStatus] = useState(STATUS.NONE);
  const [isModal, setModal] = useState(false);
  const [image, setImage] = useState('');
  const [bearInfo, setBearInfo] = useState({});

  useEffect(() => {
    axios.get('https://private-9d5e37a-testassignment.apiary-mock.com/get-bears').then(response => {
      const bearsWithStatus = response.data.results.data.map(bear => ({ ...bear, status: STATUS.NONE }));
      setBears(bearsWithStatus);
    });
  }, []);

  const getBears = () => {
    const reservedBears = isReserved ? bears.filter(bear => bear.in_reserve) : bears;

    if (bearsStatus === STATUS.ACCEPTED) {
      return reservedBears.filter(bear => bear.status === STATUS.ACCEPTED);
    }

    if (bearsStatus === STATUS.REJECTED) {
      return reservedBears.filter(bear => bear.status === STATUS.REJECTED);
    }

    return reservedBears;
  };

  const changeBearStatus = (status, id) => {
    const requestParam = status === STATUS.ACCEPTED ? 'resolve-bear' : 'reject-bear';

    axios.post(`https://private-9d5e37a-testassignment.apiary-mock.com/${requestParam}?id=${id}`).then(response => {
      if (response.data.success) {
        setBears(bears.map(prevBear => (prevBear.id === id ? { ...prevBear, status } : prevBear)));
      }
    });
  };

  const onClose = () => setModal(false);

  return (
    <div className={styles.mainPage}>
      {console.log(bears)}
      <div className={styles.header}></div>
      <div className={styles.content}>
        <div className={styles.upperSide}>
          <p className={styles.pageTitle}>Поступившие заявки</p>
          <div className={styles.options}>
            <input type="checkbox" onChange={({ target }) => setReserved(target.checked)} />
            <span>Только из заповедника</span>
            <select
              name="filter"
              onChange={({ target }) => {
                setBearsStatus(target.value);
              }}
            >
              <option value={STATUS.NONE}>Входящие медведи</option>
              <option value={STATUS.ACCEPTED}>Принятые медведи</option>
              <option value={STATUS.REJECTED}>Отклоненные медведи</option>
            </select>
          </div>
        </div>
        <div className={styles.mainContent}>
          {bears.length
            ? getBears().map(bear => (
                <div className={bear.in_reserve ? styles.bearInfoInReserve : styles.bearInfo} key={bear.id}>
                  <div
                    className={styles.bear}
                    onClick={() => {
                      setModal(true);
                      setImage(bear.image_url);
                      setBearInfo({ bearName: bear.name, type: bear.type, gender: bear.gender, text: bear.text });
                    }}
                  >
                    <img src={bear.image_url} alt="bear img" />
                    {bear.in_reserve ? <h2>В заповеднике</h2> : null}
                  </div>
                  <ModalWindow
                    visible={isModal}
                    content={
                      <>
                        <img src={image} alt="bear big img" />
                        <div>
                          <p className={styles.bearName}>{bearInfo.bearName}</p>
                          <p className={styles.bearType}>{bearInfo.type}</p>
                          <p className={styles.bearGender}>{bearInfo.gender}</p>
                          <p className={styles.bearText}>{bearInfo.text}</p>
                        </div>
                      </>
                    }
                    onClose={onClose}
                  />
                  <p className={styles.bearName}>{bear.name}</p>
                  <p className={styles.bearType}>{bear.type}</p>
                  <p className={styles.bearGender}>{bear.gender}</p>
                  <button className={styles.accept} onClick={() => changeBearStatus(STATUS.ACCEPTED, bear.id)}>
                    Принять
                  </button>
                  <button className={styles.decline} onClick={() => changeBearStatus(STATUS.REJECTED, bear.id)}>
                    Отклонить
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

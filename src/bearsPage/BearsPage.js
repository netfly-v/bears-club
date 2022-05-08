import { connect } from 'react-redux';
import { bearsSelector, getBearsWithStatusSelector } from '../store/state/bears/selectors';
import { changeBearStatusThunk, setBearModalThunk } from '../store/thunks/bearsThunk';
import { STATUS } from '../utils/constants';
import styles from './BearsPage.module.css';

const BearsPage = ({ bears, bearsWithStatus, changeStatus, setBearModal }) => {
  const changeBearStatus = (status, id) => {
    const requestParam = status === STATUS.ACCEPTED ? 'resolve-bear' : 'reject-bear';

    changeStatus(requestParam, id, status);
  };

  return (
    <div className={styles.mainContent}>
      {bears.length
        ? bearsWithStatus.map(bear => (
            <div className={bear.in_reserve ? styles.bearInfoInReserve : styles.bearInfo} key={bear.id}>
              <div className={styles.bear}>
                <img
                  src={bear.image_url}
                  alt="bear img"
                  className={styles.bearImg}
                  onClick={() => {
                    setBearModal({
                      bearName: bear.name,
                      type: bear.type,
                      gender: bear.gender,
                      text: bear.text,
                      image: bear.image_url,
                    });
                  }}
                />
                {bear.in_reserve ? <h2>В заповеднике</h2> : null}
              </div>
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
  );
};

const mapStateToProps = state => ({
  bears: bearsSelector(state),
  bearsWithStatus: getBearsWithStatusSelector(state),
});

const mapDispatchToProps = {
  changeStatus: changeBearStatusThunk,
  setBearModal: setBearModalThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(BearsPage);

import { connect } from 'react-redux';
import { setBearModalSelector } from '../store/state/bears/selectors';
import styles from './BearInfo.module.css';

const BearInfo = ({ bearModal }) => {
  return (
    <div className={styles.modalWrapper}>
      <img src={bearModal.image} alt="bear big img" className={styles.bearImage} />
      <div>
        <p className={styles.bearName}>{bearModal.bearName}</p>
        <p className={styles.bearType}>{bearModal.type}</p>
        <p className={styles.bearGender}>{bearModal.gender}</p>
        <p className={styles.bearText}>{bearModal.text}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  bearModal: setBearModalSelector(state),
});

export default connect(mapStateToProps)(BearInfo);

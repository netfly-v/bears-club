import { connect } from 'react-redux';
import { checkIsBearReservedThunk, setBearsStatusThunk } from '../store/thunks/bearsThunk';
import { STATUS } from '../utils/constants';
import styles from './Header.module.css';

const Header = ({ checkIsBearReserved, setBearsStatus }) => {
  return (
    <div>
      <div className={styles.header}></div>
      <div className={styles.menu}>
        <p className={styles.pageTitle}>Поступившие заявки</p>
        <div className={styles.options}>
          <input type="checkbox" onChange={({ target }) => checkIsBearReserved(target.checked)} />
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
    </div>
  );
};

const mapDispatchToProps = {
  checkIsBearReserved: checkIsBearReservedThunk,
  setBearsStatus: setBearsStatusThunk,
};

export default connect(null, mapDispatchToProps)(Header);

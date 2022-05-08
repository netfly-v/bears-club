import { toast } from 'react-toastify';
import { bearsAPI } from '../../api/bears';
import { STATUS } from '../../utils/constants';
import {
  changeBearStatusAction,
  checkIsBearReservedAction,
  getBearsAction,
  bearsStatusAction,
  setBearInfoAction,
  setBearModalAction,
} from '../state/bears/actions';

export const getBearsThunk = status => dispatch => {
  bearsAPI.getBears().then(bears => dispatch(getBearsAction(bears.results.data, status)));
};

export const changeBearStatusThunk = (requestParam, id, status) => (dispatch, getState) => {
  const {
    bearsDomain: { bears },
  } = getState();

  const bearsWithUpdatedStatus = bears.map(bear => (bear.id === id ? { ...bear, status } : bear));

  bearsAPI.changeStatus(requestParam, id).then(data => {
    if (data.success) {
      dispatch(changeBearStatusAction(bearsWithUpdatedStatus));
      toast.info(status === STATUS.ACCEPTED ? 'Медведь принят' : 'Медведь отклонен', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  });
};

export const checkIsBearReservedThunk = isReserved => dispatch => {
  dispatch(checkIsBearReservedAction(isReserved));
};

export const setBearsStatusThunk = status => dispatch => {
  dispatch(bearsStatusAction(status));
};

export const setBearModalThunk = bearModal => dispatch => {
  dispatch(setBearModalAction(bearModal));
};

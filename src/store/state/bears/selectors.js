import { createSelector } from 'reselect';
import { STATUS } from '../../../utils/constants';

export const bearsSelector = state => state.bearsDomain.bears;
export const isReservedSelector = state => state.bearsDomain.isReserved;
export const bearsStatusSelector = state => state.bearsDomain.status;
export const setBearModalSelector = state => state.bearsDomain.bearModal;

export const bearsInReserveSelector = createSelector(bearsSelector, bears => bears.filter(bear => bear.in_reserve));
export const getBearsWithStatusSelector = createSelector(
  bearsSelector,
  isReservedSelector,
  bearsInReserveSelector,
  bearsStatusSelector,
  (bears, isReserved, bearsInReserve, status) => {
    const reservedBears = isReserved ? bearsInReserve : bears;

    if (status === STATUS.ACCEPTED) {
      return reservedBears.filter(bear => bear.status === STATUS.ACCEPTED);
    }

    if (status === STATUS.REJECTED) {
      return reservedBears.filter(bear => bear.status === STATUS.REJECTED);
    }

    return reservedBears;
  }
);

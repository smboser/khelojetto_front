import { useContext } from 'react';
import TransferbalanceContext from 'app/contexts/TransferbalanceContext';

const useTransferbalance = () => useContext(TransferbalanceContext);

export default useTransferbalance;

import { useContext } from 'react';
import SetpowerContext from 'app/contexts/SetpowerContext';

const useSetpower = () => useContext(SetpowerContext);

export default useSetpower;

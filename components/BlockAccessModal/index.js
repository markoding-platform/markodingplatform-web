import dynamic from 'next/dynamic';

const DynamicBlockAccessModal = dynamic(() => import('./BlockAccessModal'));

export default DynamicBlockAccessModal;

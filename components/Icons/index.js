import React from 'react';
import { string, number } from 'prop-types';
import styles from './styles.module.scss';

const Icon = ({ src, size, ...props }) => {
	return (
  <i
    className={styles.iconWrapper}
    style={{
				backgroundImage: `url(${src})`,
				width: `${size > 0 ? size : '40'}px`,
				height: `${size > 0 ? size : '40'}px`,
			}}
    {...props}
		/>
	);
};

Icon.propTypes = {
	size: number,
	src: string.isRequired,
};

Icon.defaultProps = {
	size: 0,
};

export default Icon;

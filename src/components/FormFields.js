import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styles from '../styles/modules/button.module.scss';
import styles2 from '../styles/modules/todoItem.module.scss';

import { getClasses } from '../utils/getClasses';

function SelectField({ children, ...rest }) {
  return (
    <select
      {...rest}
      className={getClasses([styles.button, styles.button__select])}
    >
      {children}
    </select>
  );
}

/* For Checkbox */

const checkVariants = {
  initial: {
    color: '#fff',
  },
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

const boxVariants = {
  checked: {
    background: 'var(--primaryPurple)',
    transition: { duration: 0.1 },
  },
  unchecked: { background: 'var(--gray-2)', transition: { duration: 0.1 } },
};

function CheckBox({ checked, handleCheck }) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      animate={checked ? 'checked' : 'unchecked'}
      className={styles2.svgBox}
      variants={boxVariants}
      onClick={() => handleCheck()}
    >
      <motion.svg
        className={styles2.svg}
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={checkVariants}
          animate={checked ? 'checked' : 'unchecked'}
          style={{ pathLength, opacity }}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export { CheckBox };
export default SelectField;

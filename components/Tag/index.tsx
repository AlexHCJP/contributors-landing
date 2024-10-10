import React from 'react';
import styles from './styles.module.css';

interface TagProps {
    label: string;
    selected: boolean;
    onClick: (label: string) => void;
    disable: boolean;
}

export const Tag = ({ label, selected, onClick, disable}: TagProps) => {
    return (
        <div

            onClick={() => onClick(label)}
            className={`${styles.tag} ${disable ? styles.disabled : ''} ${selected ? styles.active : ''} `}
        >
            {label}
        </div>
    );
};
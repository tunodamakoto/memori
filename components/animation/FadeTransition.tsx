import { CSSTransition } from 'react-transition-group';
import styles from '@/styles/FadeTransition.module.scss';

const FadeTransition = ({ children, show }) => {
    return (
        <CSSTransition
            in={show}
            timeout={300} // アニメーションの時間（ミリ秒）
            classNames={{
                enter: styles.fadeEnter,
                enterActive: styles.fadeEnterActive,
                exit: styles.fadeExit,
                exitActive: styles.fadeExitActive,
            }}
            unmountOnExit
        >
            { children }
        </CSSTransition>
    );
};

export default FadeTransition;
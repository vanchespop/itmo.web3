import styles from '../styles/Home.module.scss'
import {AuthForm} from "../components/auth-form/auth-form";

export default function Home() {
    return (
        <div className={styles['form-wrapper']}>
            <AuthForm/>
        </div>
    )
}

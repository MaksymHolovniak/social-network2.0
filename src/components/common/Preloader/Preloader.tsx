import s from './Preloader.module.css'
import preloader from '../../../assets/images/preloader.svg'

let Preloader = () => {
    return (
    <div className={s.preloader}>
        <img src= {preloader} alt='Preloader' />
    </div>
    )
}

export default Preloader
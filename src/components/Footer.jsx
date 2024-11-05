import './scss/Footer.scss'
import './List.jsx'
import '../font.css'

const Footer = () => {
    return (
        <div className={'footer'} style={{fontFamily: "pacifico"}}>
            <span>© 2024 KnowFlow · <a href={'https://www.baidu.com'} style={{color: 'rgb(59, 98, 254)'}}>Li Dongyang</a></span>
        </div>
    )
}

export default Footer;
import { Link } from "react-router-dom";
import logoImg from '../../assets/logo (2).png'
const Logo = () => {
    return (
        <Link to="/" className="flex items-center">
            <img
                src={logoImg}
                alt="Madarsa Raza-e-Gaus"
                className="h-16 w-auto object-contain sm:h-20"
            />
        </Link>
    );
};

export default Logo;

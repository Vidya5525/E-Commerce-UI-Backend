
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Home from '../../Home/Home';
import Products from '../../Product/Products';
import Contact from '../Contact/Contact';
import About from '../About/About';
import LoginSignUp from '../../User/LoginSignUp';
import Search from '../../Product/Search';
import Cart from '../../Cart/Cart';
export default function(){
    const data=[
        {
            id:0,
            label:"Home",
            img:<HomeIcon/>,
            component:<Home/>,
            path:"/"

        },
        {
            id:1,
            label:"Products",
            img:<ProductionQuantityLimitsIcon/>,
            component:<Products/>,
            path:"/products"

        },
        {
            id:2,
            label:"Contact",
            img:<ContactPageIcon/>,
            component:<Contact/>,
            path:"/contact"

        },
        {
            id:3,
            label:"About",
            img:<InfoIcon/>,
            component:<About/>,
            path:"/about"

        },
        {
            id:4,
            label:"Login",
            img:<LoginIcon/>,
            component:<LoginSignUp/>,
            path:"/login"

        },
        {
            id:5,
            label:"Search",
            img:<SearchIcon/>,
            component:<Search/>,
            path:"/search"

        },
        {
            id:6,
            label:"Cart",
            img:<AddShoppingCartIcon/>,
            component:<Cart/>,
            path:"/cart"

        },
    ]
    return data
}

import { Link } from 'react-router-dom';
;
import Cover from '../../../components/Common/Cover';
import MenuItem from '../../../components/Common/MenuItem';
import AboutSection from '../../../components/Common/AboutSection';

const MenuCategory = ({ items, title, img, description }) => {
    return (
        <div className='pt-8'>

            {!title || <AboutSection title={title} image={img} description={description} ></AboutSection>}
            <div className="grid md:grid-cols-2 gap-10 my-16 mx-64">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link className='' to={`/order/${title}`}>
                <button className="block mx-auto btn btn-outline border-0 border-b-4 mt-4">ORDER YOUR FAVOURITE FOOD</button>
            </Link>
        </div>
    );
};

export default MenuCategory;
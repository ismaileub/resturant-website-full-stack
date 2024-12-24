import React from 'react';
import SectionTitle from '../../Components/Common/SectionTitle';
import useMenu from '../../Components/Hooks/useMenu';
import MenuItem from '../../Components/Common/MenuItem';

const Menu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section>
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer">

            </SectionTitle>


            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className='w-full'>
                <button className=" block mx-auto btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
            </div>

        </section>
    );
};

export default Menu;
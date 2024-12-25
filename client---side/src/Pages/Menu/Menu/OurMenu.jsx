
import menuImg from '../../../assets/menu/banner3.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'


import MenuCategory from '../MenuCategory/MenuCategory';
import Cover from '../../../Components/Common/Cover';
import SectionTitle from '../../../Components/Common/SectionTitle';
import useMenu from '../../../Components/Hooks/useMenu';


const OurMenu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>

            <Cover img={menuImg} title="our menu"></Cover>
            {/* main cover */}
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>

            <MenuCategory
                items={desserts}
                title="desserts"
                img={dessertImg}
                description="Indulge in our heavenly selection of desserts, crafted to satisfy your sweet cravings. From velvety cheesecakes to rich chocolate lava cakes, every bite is a delightful escape into sweetness. Perfectly paired with a warm beverage or as the grand finale to your meal."
            >

            </MenuCategory>

            <MenuCategory
                items={pizza}
                title="pizza"
                img={pizzaImg}
                description="Dive into a world of bold flavors with our gourmet pizza selections. Featuring unique toppings like truffle oil, spicy sausage, and roasted vegetables, these pizzas redefine indulgence. A must-try for adventurous foodies seeking an elevated pizza experience."
            >

            </MenuCategory>

            <MenuCategory
                items={salad}
                title="salad"
                img={saladImg}
                description="Refresh your taste buds with our vibrant and healthy salads. Packed with crisp greens, juicy fruits, and a medley of nutritious toppings, our salads are tossed in flavorful dressings for a perfect balance of health and taste. A refreshing choice for any time of the day!"
            >

            </MenuCategory>
            <MenuCategory
                items={soup}
                title="soup"
                img={soupImg}
                description="Warm your soul with our comforting selection of soups, prepared with the freshest ingredients and rich, savory flavors. From classic tomato bisque to hearty chicken noodle, each bowl is a perfect blend of taste and nourishment, making it the ultimate starter for any meal."
            ></MenuCategory>

        </div>
    );
};

export default OurMenu;
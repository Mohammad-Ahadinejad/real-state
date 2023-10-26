import { FiCircle } from "react-icons/fi"
import { FaCity } from "react-icons/fa"
import styles from "@/template/HomePage.module.css"
import CategoryCard from "@/module/CategoryCard"
import { categories, cities, services } from "@/constants/strings"

const HomePage = () => {
    return ( 
        <div>
            <div className={styles.banner}>
                <div className={styles.desc}>
                    <h1>سامانه اجاره و خرید ملک</h1>
                    <ul>
                        {
                            services.map((i)=>(
                                <li key={i}>
                                <FiCircle />
                                <span>{i}</span>
                            </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className={styles.categories}>
                {
                    Object.keys(categories).map((i,index) => (
                        <CategoryCard key={index} name={i} title={categories[i]}/>
                    ))
                }
            </div>
            <div className={styles.city}>
                <h3>شهرهای پربازدید</h3>
                <ul>
                    {
                        cities.map((city,index)=>(
                            <li key={index}>
                                <FaCity />
                                <span>{city}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    );
}
 
export default HomePage;
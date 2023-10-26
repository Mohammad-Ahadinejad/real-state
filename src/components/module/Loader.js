import { ThreeDots } from "react-loader-spinner";
const Loader = () => {
    return ( 
        <ThreeDots 
            color= "#304ffe"
            ariaLabel= "three-dots-loading"
            visible= {true}
            height={45}
            wrapperStyle={{margin: "auto"}}
        /> 
    );
}
 
export default Loader;
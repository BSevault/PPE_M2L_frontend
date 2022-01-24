import axios from "axios";

const useAxios = async (method, adress, content, setFunction) => {
    const result = await axios({
        method: method, // 'post', 'get', 'delete' ...
        url: adress,
        data: content
    });
    console.log(result.data.success);
    setFunction(result.data.success);
}
 
export default useAxios;
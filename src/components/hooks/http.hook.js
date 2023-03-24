export const useHttp = () => {
    const request = async(url,method = "GET", body = null, headers = {'Content-type':'application/json'}) => {
        try {
            const res = await fetch(url,{method,body,headers})
            if(!res.ok) {
                throw new Error('some err')
            }
            const data = await res.json();
            return data;
        } catch (e) {
            throw e
        }
    }
    return {request}
}
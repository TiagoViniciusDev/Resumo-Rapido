const baseURL = import.meta.env.VITE_BACKEND_BASE_URL

async function ApiFetch(method, route, body){

    try {
        const response = await fetch(`${baseURL}${route}`, {
            method: method,
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json;charset=UTF-8"},
            credentials: 'include'
        })
        const data = await response
        return data
    } catch(error) {
        const falha = {
            success: false,
            msg: "Não foi possível se conectar ao servidor"
        }
        
        if(error){
            console.log(error)
        }

        return falha
    }
}

export default ApiFetch
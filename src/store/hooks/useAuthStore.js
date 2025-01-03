
import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../../api"
import { cleanErrorMessage, onChecking, onLogin,onLogout } from "../auth/authSlice"
import { onLogoutCalendar } from "../calendar/calendarSlice"


export const useAuthStore = () =>{

    const{status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async({email, password})=>{
            dispatch(onChecking())
        
            try {
                const {data} = await calendarApi.post('/auth', {email, password})
                
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(onLogin({user:data.name, uid:data.uid }))

                
            } catch (error) {
                dispatch(onLogout('credenciales incorrectas'))   
                setTimeout(() => {
                    dispatch(cleanErrorMessage())
                }, 10);          
            }

    }

    const startRegister = async({email,password, name})=>{
        dispatch(onChecking())
        try {
            const {data} = await calendarApi.post('/auth/new', {name, email, password})
            localStorage.setItem('token', data. token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({user:data.name, uid:data.uid }))
            
            
        } catch (error) {
            const message =
                error.response.data?.msg ||
                Object.values(error.response.data?.errors)
                    .map((x) => x.msg)
                    .join();
            dispatch(onLogout(message))   
                setTimeout(() => {
                    dispatch(cleanErrorMessage())
                }, 10);   
                console.log(error)
            
        }
    }

    const checkAuthToken = async () =>{
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout())
         try {
            const {data} = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data. token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({user:data.name, uid:data.uid }))
                       
         } catch (error) {

            localStorage.clear();
            dispatch(onLogout())
            
         }   
    }

    const startLogout = () =>{
        localStorage.clear();
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
    }

    return{
        //propiedades
        errorMessage,
        status,
        user,

        //métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
        
    }
}
import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutBonillaShop, onLogoutCalendar } from "../store"
import { useRouter } from "next/router";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const router = useRouter();
    // const { selectedProducto } = useBonillaShopStore();


    const redirectTo = (route) => {
        router.push(`/${route}`);
        // selectedProducto(product);
    };

    const startLogin = async ({ email, password, role }) => {
        // const role = 'customer';
        dispatch(onChecking());
        console.log({ email, password, role });

        try {
            const { data } = await calendarApi.post('/app/login', { email, password, role });
            console.log({ data });
            dispatch(onLogin({ name: data.fname ?? 'No name', uid: data.time, role: role }));
            redirectTo('');

        } catch (error) {
            console.log(error);
            if (error.response.data.message === "User already logged-In!") {
                dispatch(onLogin({ name: 'No name', uid: Date.now(), role: role }));
                redirectTo('');
                return;
            }

            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);

        }

    }

    const startRegister = async ({ email, password, fname, lname }) => {
        console.log({ email, password, fname, lname });

        dispatch(onChecking());
        const role = 'customer';


        try {
            const { data } = await calendarApi.post('customers/add', { email, password, role, fname, lname });
            // console.log({ resp });

            // dispatch(onLogin({ name: data.name, uid: data.uid, rol: data.rol }));
            dispatch(onLogin({ name: data.fname ?? 'No name', uid: data.time, role: role }));
            redirectTo('');


        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);

        }


    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid, rol: data.rol }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutBonillaShop());
        dispatch(onLogout());
    }

    return {
        //*Propiedades
        errorMessage,
        status,
        user,
        //*Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}

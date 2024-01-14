import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";


export const useUiStore = () => {
    const dispatch = useDispatch();
    const {
        isDateModalOpen
    } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    const toogleDateModal = () => {
        (isDateModalOpen)
            ? dispatch(onCloseDateModal())
            : dispatch(onOpenDateModal())
    }

    return {
        //* Properties
        isDateModalOpen,
        //* Metodos
        closeDateModal,
        openDateModal,
        toogleDateModal
    }

}
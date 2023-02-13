import { AppContext } from "@/src/context/app/context"
import { useContext, useCallback, useState } from "react"
import { useSelector } from 'react-redux'
import Form from "../../Form/Form"
import Modal from "../../UI/Modal"
import WalletExpensiveConten from "./WalletExpensiveConten"

const Wallet = () => {
    const [isVisible, setIsVisible] = useState(false)
    const { balance } = useSelector((state) => state)
    const { addEth } = useContext(AppContext)

    const handlerClick = useCallback((e) => {
        e.target.dataset.action === 'close' && setIsVisible(false)
    }, []) 

    const handlerCallback = useCallback((v) => {
        addEth(v)
        setIsVisible(false)
    }, [addEth]) 

    return <>
                <WalletExpensiveConten callback={() => {setIsVisible(true)}} balance={balance}/>
                <Modal isVisible={isVisible} callback={handlerClick}> 
                    <Form isFormSafe callback={handlerCallback} /> 
                </Modal>
           </> 
}

export default Wallet
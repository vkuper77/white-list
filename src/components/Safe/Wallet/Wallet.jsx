import useContractMethods from "@/src/hooks/use-contract-methods";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Form from "../../Form/Form";
import Modal from "../../UI/Modal";
import WalletExpensiveConten from "./WalletExpensiveConten";

const Wallet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { balance, timeLeft, isLockedButton } = useSelector((state) => state);
  const { addEth, getFromSafe, pending } = useContractMethods();

  const handlerClick = useCallback(
    (e) => {
      e.target.dataset.action === "close" && setIsVisible(false);
    },
    [isLockedButton]
  );

  const handlerCallback = useCallback(
    (v) => {
      addEth(v);
      setIsVisible(false);
    },
    [addEth]
  );

  const handlerTransaction = () => {
    return !Boolean(Number(timeLeft["amount"]))
      ? setIsVisible(true)
      : !isLockedButton && getFromSafe();
  };

  return (
    <>
      <WalletExpensiveConten
        callback={handlerTransaction}
        balance={balance}
        pending={pending}
      />
      <Modal isVisible={isVisible} callback={handlerClick}>
        <Form isFormSafe callback={handlerCallback} />
      </Modal>
    </>
  );
};

export default Wallet;

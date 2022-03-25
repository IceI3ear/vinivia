import { Modal, ModalProps } from "antd";

import "./styles.scss";

interface CommonModalProps extends ModalProps {
  children: string | React.ReactNode;
}

function CommonModal({ children, ...props }: CommonModalProps) {
  return (
    <Modal centered width={400} className="common-modal-wrapper" {...props}>
      {children}
    </Modal>
  );
}

export default CommonModal;

import { Dialog, Menu, Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";


interface Props {
    isOpen?: boolean;
    onClose: () => void
}


const MenuModal = ({ isOpen, onClose }: Props) => {

    const handleDelete = () => {
        onClose()
    }

    const handleRecall = () => {
        onClose()
    }
    return (


        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform  overflow-hidden  rounded-lg  bg-gray-500  p-3 text-left  shadow-xl  transition-all sm:max-w-xl w-full "
                            >
                                <div className="bg-white p-4">
                                    <button onClick={handleDelete}>Xoá</button>
                                    <button onClick={handleRecall}>Thu hồi</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default MenuModal;
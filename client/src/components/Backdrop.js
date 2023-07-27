const Backdrop = ({ show, setShow }) => {
    return (
        <div
            onClick={() => setShow(!show)}
            className={show ? 'fixed inset-0 bg-gray-900 opacity-50 z-[1]' : undefined}
        ></div>
    );
};
export default Backdrop;

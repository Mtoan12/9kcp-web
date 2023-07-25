const Backdrop = ({ show, setShow }) => {
    return (
        <div
            onClick={() => setShow(!show)}
            className={show ? 'fixed inset-0 bg-black opacity-50' : undefined}
        ></div>
    );
};
export default Backdrop;

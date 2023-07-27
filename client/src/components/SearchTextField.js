import Backdrop from 'components/Backdrop';

const SearchTextField = ({
    show,
    setShow,
    searchText,
    onSearchTextChange,
    handleSearch,
    onEnterDown,
}) => {
    return (
        <div className="w-screen">
            <div
                className={`w-full flex justify-center items-center min-h-[50px] lg:min-h-[80px] bg-white fixed top-0 transition-all z-10 ${
                    show ? 'translate-y-[0]' : 'translate-y-[-100%]'
                }`}
            >
                <div className="flex items-center gap-5">
                    <input
                        className="search-input"
                        type="text"
                        value={searchText}
                        onChange={onSearchTextChange}
                        onKeyDown={onEnterDown}
                        placeholder="Bạn cần tìm gì hôm nay?"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 pointer-events-auto"
                        onClick={handleSearch}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 pointer-events-auto"
                        onClick={() => setShow(!show)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </div>
            <Backdrop show={show} setShow={setShow} />
        </div>
    );
};
export default SearchTextField;

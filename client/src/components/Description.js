const Description = ({ description }) => {
    return (
        <div className="flex flex-col gap-3">
            <span className="uppercase font-semibold text-xl"> Mô tả</span>
            <p>{description}</p>
        </div>
    );
};
export default Description;

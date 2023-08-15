import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { LuEdit2 } from 'react-icons/lu';

const Comments = ({
    product,
    isLoading,
    error = '',
    comments = [],
    addNewCommentClick,
    deleteClick,
}) => {
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.auth.user);
    return (
        <div className="w-full flex flex-col border px-2 py-4">
            <h2 className="text-xl font-semibold">Comments</h2>
            <div className="flex flex-col gap-1">
                {comments &&
                    comments.map((comment) => {
                        return (
                            <div
                                className="flex flex-col border-2 rounded-md gap-1 px-2 py-2"
                                key={comment._id}
                            >
                                <span className="text-md font-semibold">{comment?.user?.name}</span>
                                <p>{comment?.content}</p>
                                <div className="flex gap-2 text-sm">
                                    <span className="px-2 py-1 border cursor-pointer grid place-content-center">
                                        <LuEdit2 />
                                    </span>
                                    <span className="px-2 py-1 border cursor-pointer grid place-content-center">
                                        <FaTimes />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {user && (
                <div className="w-full mt-1">
                    <div className="flex flex-col gap-1">
                        <textarea
                            name="comment"
                            cols="30"
                            rows="3"
                            placeholder="Viết đánh giá của bạn"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                            onClick={() => addNewCommentClick(comment)}
                            className="text-white py-2 px-3 bg-blue-500 self-start rounded-sm"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Comments;

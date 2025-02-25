import { formatDistanceToNow } from 'date-fns';

const AnnouncementCard = ({ announcement }) => {
    const { _id, image, authorName, authorImage, postTitle, postDescription, createdAt, tag, upVote, downVote } = announcement;

    const formattedTime = createdAt ? formatDistanceToNow(new Date(createdAt)) + " ago" : "Time not available";
    return (
        <div>
            <div className="border p-4 rounded-lg shadow-md bg-white">
                <img src={image} alt={postTitle} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-lg font-bold mt-2">{postTitle}</h3>
                <p className="text-sm text-gray-700">{postDescription}</p>
                <p className="text-xs text-gray-500 mt-1">By {authorName}</p>
                <p>{formattedTime }</p>
            </div>
        </div>
    );
};

export default AnnouncementCard;
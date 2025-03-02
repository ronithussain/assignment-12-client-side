import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const ShareButton = ({ postId, title }) => {
    // Post এর Dynamic URL Generate
    const postUrl = `${window.location.origin}/post/${postId}`;

    return (
        <div className="flex gap-2">
            {/* Facebook Share Button */}
            <FacebookShareButton url={postUrl} quote={title}>
                <div className="flex items-center gap-2 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition">
                    <FaFacebook />
                </div>
            </FacebookShareButton>

            {/* WhatsApp Share Button */}
            <WhatsappShareButton url={postUrl} title={title} separator=":: ">
                <div className="flex items-center gap-2 p-3 rounded-full bg-green-400 text-white hover:bg-green-600 transition">
                    <FaWhatsapp />
                </div>
            </WhatsappShareButton>
        </div>
    );
};

export default ShareButton;

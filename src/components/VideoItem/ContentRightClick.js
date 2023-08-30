import images from '~/assets/images';
import MenuItem from '../Popper/Menu/MenuItem';
import Menu from '~/layouts/components/Sidebar/Menu/Menu';

const contentRightClick = [
    {
        icon: <img src={images.downRiMou} alt="Download video" />,
        title: 'Download videos',
    },
    {
        icon: <img src={images.sendToFriend} alt="Send to friend" />,
        title: 'Send to friend',
    },
    {
        icon: <img src={images.copyLinkVideo} alt="Copy link" />,
        title: 'Copy link',
    },
    {
        icon: <img src={images.detailsVideo} alt="View video details" />,
        title: 'View video details',
    },
];

function ContentRightClick() {
    return (
        <div>
            <Menu>
                {contentRightClick.map((menuItem, index) => (
                    <MenuItem key={index} data={menuItem} />
                ))}
            </Menu>
        </div>
    );
}

export default ContentRightClick;

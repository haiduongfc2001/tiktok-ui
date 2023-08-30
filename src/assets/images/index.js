const images = {
    logo: require('~/assets/images/logo.svg').default,
    languages: require('~/assets/images/languages.svg').default,
    dot: require('~/assets/images/following-dot.svg').default,

    music: require('~/assets/images/video-music.svg').default,

    // video interactions
    like: require('~/assets/images/video-like.svg').default,
    comment: require('~/assets/images/video-comment.svg').default,
    favorite: require('~/assets/images/video-favorite.svg').default,
    share: require('~/assets/images/video-share.svg').default,

    // share video
    embed: require('~/assets/images/shareVideo/embed.svg').default,
    sendFriend: require('~/assets/images/shareVideo/sendFriend.svg').default,
    shareFacebook: require('~/assets/images/shareVideo/shareFacebook.svg')
        .default,
    shareWhatsApp: require('~/assets/images/shareVideo/shareWhapsApp.svg')
        .default,
    copyLink: require('~/assets/images/shareVideo/copyLink.svg').default,
    shareTwitter: require('~/assets/images/shareVideo/shareTwitter.svg')
        .default,
    shareLinkedIn: require('~/assets/images/shareVideo/shareLinkedIn.svg')
        .default,
    shareReddit: require('~/assets/images/shareVideo/shareReddit.svg').default,
    shareTelegram: require('~/assets/images/shareVideo/shareTelegram.svg')
        .default,
    shareEmail: require('~/assets/images/shareVideo/shareEmail.svg').default,
    shareLine: require('~/assets/images/shareVideo/shareLine.svg').default,
    sharePinterest: require('~/assets/images/shareVideo/sharePinterest.svg')
        .default,
    shareMore: require('~/assets/images/shareVideo/shareMore.svg').default,

    // icon đã like và icon đã yêu thích
    liked: require('~/assets/images/video-liked.svg').default,
    favoriteAdded: require('~/assets/images/video-favorite-added.svg').default,

    // icon phát, dừng, tắt tiếng và bật tiếng của video
    play: require('~/assets/images/controlVideo/video-play.svg').default,
    pause: require('~/assets/images/controlVideo/video-pause.svg').default,
    muted: require('~/assets/images/controlVideo/video-muted.svg').default,
    fullVolume: require('~/assets/images/controlVideo/video-full-volume.svg')
        .default,

    // các icon khi click chuột phải vào video
    downRiMou: require('~/assets/images/rightClickVideo/downloadVideo.svg')
        .default,
    sendToFriend: require('~/assets/images/rightClickVideo/sendToFriend.svg')
        .default,
    copyLinkVideo: require('~/assets/images/rightClickVideo/copyLinkVideo.svg')
        .default,
    detailsVideo: require('~/assets/images/rightClickVideo/detailsVideo.svg')
        .default,

    // khi ảnh bị lỗi sẽ có 1 ảnh để thay thế
    noImage: require('~/assets/images/no-image.png'),
};

export default images;

import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async ({ page, perPage }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getFollowing = async ({ page, authToken }) => {
    try {
        const res = await httpRequest.get(`me/followings`, {
            params: {
                page,
            },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const API_ROOT = 'https://www.reddit.com';

export const getSubreddits =  async ()  => {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
};

export const getHotPosts = async (subreddit) => {
    
    const response = await fetch(`${API_ROOT}${subreddit}/hot.json`);
    const json = await response.json();
    return json.data.children.map((hotPost) => hotPost.data);
};

export const getCommentsForPost = async (permalink) => {
    console.log(`${API_ROOT}${permalink.slice(0, -1)}.json`)
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    const json = await response.json();
    // return json[1].data.children.map((comment) => comment.data);
    return json;
};



export const getAuthor = async (author) => {
    const response = await fetch(`${API_ROOT}/user/${author}/about.json`);
    const json = await response.json();
     return {
        name: json.data.name,
        avatar: json.data.icon_img,
        totalKarma: json.data.total_karma
    };
    
 };



// export const getCommentsForPost = async (subreddit) => {
//     const response = await fetch(`${API_ROOT}/r/${subreddit}/comments/${post}.json`)
//     const json = await response.json();
//     return json.data.children.filter((comment) => comment.kind === "t1").map((comment) => comment.data);
// }





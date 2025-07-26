const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogs) =>{
    if(blogs.length === 1){
        return blogs[0].likes
    } else{
        return blogs.length !== 0 ? blogs.reduce((total, blog) => total + blog.likes, 0) : 0
    }
}

const favoriteBlogs = (blogs) =>{
    return blogs.reduce((max, current) => current.likes > max.likes ? current : max)
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlogs,
}


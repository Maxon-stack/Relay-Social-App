export const getUser = (id) =>{
  const query = `*[_type == "user" && _id == '${id}']`;
  return query;
}

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "post" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image{
      asset ->{
      url
      }
    }, 
      _id,
      home_url,
      postedBy ->{
        _id,
        userName,
        image
    },
      like[] {
        _key,
        postedBy -> {
          _id,
          userName,
          image
      },
    },
  }`;
  return query;
};

export const feedQuery = `*[_type == 'post'] | order(_createAt desc){
  image{
    asset ->{
      url
    }
  }, 
  _id,
  home_url,
  postedBy ->{
    _id,
    userName,
    image
  },
  like[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;




export const categories = [
  {
    name: 'Arts and Crafts',
    image: 'https://obxartstudio.com/wp-content/uploads/2016/10/Art.jpg',
  },   
  {
    name: 'Books',
    image: 'https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg',
  },  
  {
    name: 'cars',
    image: 'https://i.insider.com/5eac3e4248d92c0bf849a878?width=1200&format=jpeg',
  },  
  {
    name: 'Collecting',
    image: 'https://www.chicagotribune.com/resizer/1GDnBg5b5tJGCkEiFNFFcVauGIk=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/WZ7ZXQHPFNB53PMGAY7JFAU7OI.jpg',
  },  
  {
    name: 'Cooking',
    image: 'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-usa.com/news/markets/survey-cooking-at-home-will-become-the-new-normal-post-pandemic/10914660-1-eng-GB/Survey-Cooking-at-home-will-become-the-new-normal-post-pandemic_wrbm_large.jpg',
  },
  {
    name: 'fitness',
    image: 'https://i.pinimg.com/236x/25/14/29/251429345940a47490cc3d47dfe0a8eb.jpg',
  },  
  {
    name: 'Gardening',
    image: 'https://www.gannett-cdn.com/media/2020/03/12/USATODAY/usatsports/gettyimages-1137926593.jpg?width=660&height=429&fit=crop&format=pjpg&auto=webp',
  },
  {
    name: 'Music',
    image: 'https://sandersonsandscript.com/wp-content/uploads/2021/03/Music.jpg',
  },
  {
    name: 'nature',
    image: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg',
  },  
  {
    name: 'Programing',
    image: 'https://i0.wp.com/garonpower.com/wp-content/uploads/2019/01/computer-programming.jpeg?fit=1500%2C1000&ssl=1',
  },  
  {
    name: 'Sports',
    image: 'https://static01.nyt.com/images/2020/07/21/autossell/sports-reboot-promo-still/sports-reboot-promo-still-videoLarge.jpg',
  },
  {
    name: 'travel',
    image: 'https://i.pinimg.com/236x/fa/95/98/fa95986f2c408098531ca7cc78aee3a4.jpg',
  }, 
   {
    name: 'VideoGames',
    image: 'https://media.wired.com/photos/6189e5b0748096a2f3317edd/4:3/w_1600%2Cc_limit/Gear-Xbox-vs-PS5-1230432282.jpg',
  },
  {
    name: 'Other',
    image: 'https://www.nativespeakeronline.com/wp-content/uploads/2014/09/another-other-e1453647615510.jpg',
  },
];



export const postDetailQuery = (postId) => {
  const query = `*[_type == "post" && _id == '${postId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    home_url,
    postedBy->{
      _id,
      userName,
      image
    },
   like[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const postDetailMorePostQuery = (post) => {
  const query = `*[_type == "post" && category == '${post.category}' && _id != '${post._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    like[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};



export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    like[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};


export const userLikedPostsQuery = (userId) => {
  const query = `*[_type == 'post' && '${userId}' in like[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    like[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};


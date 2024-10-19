import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Plus, PlaySquare, Search } from 'lucide-react';
import { videoDetails, videos } from './data.jsx';

const VideoPlayerPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likes, setLikes] = useState(3050);
  const [dislikes, setDislikes] = useState(20);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div className='flex min-h-[calc(100vh-66px)] bg-[#121212] text-white sm:min-h-[calc(100vh-82px)]'>
      <section className='w-full pb-[70px] sm:ml-[70px] sm:pb-0'>
        <div className='flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap'>
          <div className='w-full'>
            <div className='relative mb-4 w-full pt-[56%]'>
              <div className='absolute inset-0'>
                <video className='h-full w-full' controls autoPlay muted>
                  <source
                    src='https://res.cloudinary.com/dfw5nnic5/video/upload/v1695117968/Sample_1280x720_mp4_b4db0s.mp4'
                    type='video/mp4'
                  />
                </video>
              </div>
            </div>
            <div
              className='group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5'
              role='button'
              tabIndex='0'
            >
              <div className='flex flex-wrap gap-y-2'>
                <div className='w-full md:w-1/2 lg:w-full xl:w-1/2'>
                  <h1 className='text-lg font-bold'>Advanced React Patterns</h1>
                  <p className='flex text-sm text-gray-200'>
                    30,164 Views · 18 hours ago
                  </p>
                </div>
                <div className='w-full md:w-1/2 lg:w-full xl:w-1/2'>
                  <div className='flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end'>
                    <div className='flex overflow-hidden rounded-lg border'>
                      <button
                        onClick={handleLike}
                        className='flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 hover:bg-white/10'
                      >
                        <ThumbsUp className='h-5 w-5' />
                        <span>{likes}</span>
                      </button>
                      <button
                        onClick={handleDislike}
                        className='flex items-center gap-x-2 px-4 py-1.5 hover:bg-white/10'
                      >
                        <ThumbsDown className='h-5 w-5' />
                        <span>{dislikes}</span>
                      </button>
                    </div>
                    <div className='relative block'>
                      <button className='flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black'>
                        <Plus className='h-5 w-5' />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-4 flex items-center justify-between'>
                <div className='flex items-center gap-x-4'>
                  <div className='h-12 w-12 shrink-0'>
                    <img
                      src='https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      alt='React Patterns'
                      className='h-full w-full rounded-full object-cover'
                    />
                  </div>
                  <div>
                    <p className='text-gray-200'>React Patterns</p>
                    <p className='text-sm text-gray-400'>757K Subscribers</p>
                  </div>
                </div>
                <div>
                  <button
                    className={`flex items-center gap-x-2 px-3 py-2 font-bold ${
                      isSubscribed
                        ? 'bg-gray-600 text-white'
                        : 'bg-[#ae7aff] text-black'
                    }`}
                    onClick={handleSubscribe}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>
              </div>
              <hr className='my-4 border-white' />
              <div className='h-5 overflow-hidden group-focus:h-auto'>
                <p className='text-sm'>
                  🚀 Dive into the world of React with our latest tutorial
                  series: "Advanced React Patterns"! 🛠️ Whether you're a
                  seasoned developer or just starting out, this series is
                  designed to elevate your React skills to the next level.
                </p>
              </div>
            </div>
            <CommentsSection />
          </div>
          <RecommendedVideos />
        </div>
      </section>
    </div>
  );
};

const CommentsSection = () => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Handle comment submission logic here
    setCommentText('');
  };

  return (
    <div className='mt-4'>
      <h6 className='mb-4 font-semibold'>573 Comments</h6>
      <form onSubmit={handleCommentSubmit} className='mb-6'>
        <input
          type='text'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className='w-full rounded-lg border bg-transparent px-3 py-2 placeholder-white'
          placeholder='Add a comment...'
        />
      </form>
      {videoDetails.comments.map((comment) => (
        <div key={comment.id} className='mb-4'>
          <div className='flex gap-x-4'>
            <div className='h-11 w-11 shrink-0'>
              <img
                src={comment.owner.avatar}
                alt={comment.owner.avatar}
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <div>
              <p className='flex items-center text-gray-200'>
                {comment.owner.fullName} ·{' '}
                <span className='ml-1 text-sm'>{comment.createdAt}</span>
              </p>
              <p className='text-sm text-gray-200'>
                {`@${comment.owner.username}`}
              </p>
              <p className='mt-2 text-sm'>{comment.content}</p>
            </div>
          </div>
          <hr className='my-4 border-white' />
        </div>
      ))}
    </div>
  );
};

const RecommendedVideos = () => {
  return (
    <div className='w-full lg:w-[350px] xl:w-[400px]'>
      {videos.map((video) => (
        <div key={video.id} className='mb-4 flex w-full gap-x-2 border pr-2'>
          <div className='relative mb-2 w-full md:mb-0 md:w-5/12'>
            <div className='w-full pt-[56%]'>
              <div className='absolute inset-0'>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className='h-full w-full object-cover'
                />
              </div>
              <span className='absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm'>
                {video.duration}
              </span>
            </div>
          </div>
          <div className='flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5'>
            <div className='w-full pt-1 md:pt-0'>
              <h6 className='mb-1 text-sm font-semibold'>{video.title}</h6>
              <p className='mb-0.5 mt-2 text-sm text-gray-200'>
                {video.owner.username}
              </p>
              <p className='flex text-sm text-gray-200'>
                {video.views} Views · {video.time}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoPlayerPage;

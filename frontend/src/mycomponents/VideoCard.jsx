import React from 'react';
const VideoCard = ({
  thumbnail,
  duration,
  title,
  views,
  uploadTime,
  channelName,
  channelAvatar,
}) => {
  return (
    <div className='w-full'>
      <div className='relative mb-2 w-full pt-[56%]'>
        <div className='absolute inset-0'>
          <img
            src={thumbnail}
            alt={title}
            className='h-full w-full object-cover'
          />
        </div>
        <span className='absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm'>
          {duration}
        </span>
      </div>
      <div className='flex gap-x-2'>
        <div className='h-10 w-10 shrink-0'>
          <img
            src={channelAvatar}
            alt={channelName}
            className='h-full w-full rounded-full object-cover'
          />
        </div>
        <div className='w-full'>
          <h6 className='mb-1 font-semibold'>{title}</h6>
          <p className='flex text-sm text-gray-200'>
            {views} Views · {uploadTime}
          </p>
          <p className='text-sm text-gray-200'>{channelName}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

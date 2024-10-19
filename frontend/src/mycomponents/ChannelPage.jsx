import React, { useState, useEffect } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Play,
  ArrowLeft,
  Search,
  Bell,
} from 'lucide-react';
import { playlistList, tweets, videos } from './data';
import VideoCard from './VideoCard';

const ChannelPage = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating an API call
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulated delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load channel data');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    // Here you would typically make an API call to update the subscription status
  };

  const renderActiveTab = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    switch (activeTab) {
      case 'videos':
        return <VideosTab />;
      case 'playlist':
        return selectedPlaylist ? (
          <PlaylistDetails
            playlist={selectedPlaylist}
            onBack={() => setSelectedPlaylist(null)}
          />
        ) : (
          <PlaylistTab onPlaylistClick={setSelectedPlaylist} />
        );
      case 'tweets':
        return <TweetsTab />;
      case 'subscribed':
        return <SubscribedTab />;
      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <div className='min-h-screen bg-[#121212] text-white'>
      <header className='sticky top-0 z-50 border-b border-white bg-[#121212] px-4 py-4'>
        <div className='flex flex-wrap items-center gap-4'>
          <span className='relative inline-block h-24 w-24 overflow-hidden rounded-full border-2 sm:h-28 sm:w-28'>
            <img
              src='https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='Channel'
              className='h-full w-full object-cover'
            />
          </span>
          <div className='flex-grow'>
            <h1 className='text-xl font-bold sm:text-2xl'>React Patterns</h1>
            <p className='text-sm text-gray-400'>@reactpatterns</p>
            <p className='text-sm text-gray-400'>
              600k Subscribers · 220 Subscribed
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleSubscribe}
              className={`rounded px-4 py-2 font-bold transition-colors ${
                isSubscribed
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-[#ae7aff] text-black hover:bg-[#9d69ff]'
              }`}
              aria-label={
                isSubscribed
                  ? 'Unsubscribe from channel'
                  : 'Subscribe to channel'
              }
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            <button
              className='rounded-full p-2 hover:bg-white/10'
              aria-label='Toggle notifications'
            >
              <Bell className='h-6 w-6' />
            </button>
          </div>
        </div>
      </header>

      <nav className='sticky top-[98px] z-10 flex overflow-x-auto border-b-2 border-gray-400 bg-[#121212] sm:top-[114px]'>
        {['Videos', 'Playlist', 'Tweets', 'Subscribed'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab.toLowerCase());
              setSelectedPlaylist(null);
            }}
            className={`flex-none px-4 py-2 text-center transition-colors ${
              activeTab === tab.toLowerCase()
                ? 'border-b-2 border-[#ae7aff] text-[#ae7aff]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className='p-4'>{renderActiveTab()}</main>
    </div>
  );
};

const VideosTab = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='mb-4'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search videos...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full rounded-full bg-white/10 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ae7aff]'
          />
          <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
        </div>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredVideos.map((video) => {
          return (
            <VideoCard
              key={video.id}
              thumbnail={video.thumbnail}
              duration={video.duration}
              title={video.title}
              owner={video.owner.fullName}
              channelAvatar={video.owner.avatar}
              views={video.views}
              uploadTime={video.time}
            />
          );
        })}
      </div>
    </>
  );
};

const PlaylistTab = ({ onPlaylistClick }) => {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {playlistList.map((playlist) => (
        <div
          key={playlist.id}
          className='overflow-hidden rounded-lg border border-gray-700 cursor-pointer transition-transform hover:scale-105'
          onClick={() => onPlaylistClick(playlist)}
        >
          <div className='relative'>
            <img
              src={playlist.videos[0].thumbnail}
              alt={playlist.name}
              className='w-full object-cover'
              style={{ aspectRatio: '16/9' }}
            />
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <Play className='h-12 w-12 text-white opacity-75' />
            </div>
          </div>
          <div className='p-3'>
            <h3 className='mb-1 font-semibold'>{playlist.name}</h3>
            <p className='text-sm text-gray-400'>
              {playlist.videos.length} videos
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const PlaylistDetails = ({ playlist, onBack }) => {
  return (
    <div>
      <button
        onClick={onBack}
        className='mb-4 flex items-center text-[#ae7aff] transition-colors hover:text-[#9d69ff]'
      >
        <ArrowLeft className='mr-2 h-5 w-5' />
        Back to Playlists
      </button>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold mb-2'>{playlist.name}</h2>
        <p>{playlist.description}</p>
        <p className='text-gray-400 mb-2'>{playlist.videos.length} videos</p>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {playlist.videos.map((video) => (
          <VideoCard
            key={video.id}
            thumbnail={video.thumbnail}
            duration={video.duration}
            title={video.title}
            views={video.views}
            uploadTime={video.time}
            channelName={video.owner.fullName}
            channelAvatar={video.owner.avatar}
          />
        ))}
      </div>
    </div>
  );
};

const TweetsTab = () => {
  return (
    <div className='space-y-4'>
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

const TweetCard = ({ tweet }) => {
  const [likes, setLikes] = useState(tweet.likeCount);
  const [dislikes, setDislikes] = useState(tweet.dislikeCount);

  const handleLike = () => {
    setLikes(likes + 1);
    // Here you would typically make an API call to update the like count
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
    // Here you would typically make an API call to update the dislike count
  };

  return (
    <div className='flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent'>
      <div className='h-14 w-14 shrink-0'>
        <img
          src='https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          alt='React Patterns'
          className='h-full w-full rounded-full object-cover'
        />
      </div>
      <div className='flex-grow'>
        <h4 className='mb-1 flex items-center gap-x-2'>
          <span className='font-semibold'>{tweet.owner.fullName}</span>
          <span className='text-sm text-gray-400'>{tweet.createdAt}</span>
        </h4>
        <p className='mb-2'>{tweet.content}</p>
        <div className='flex gap-4'>
          <button
            onClick={handleLike}
            className='group inline-flex items-center gap-x-1 transition-colors hover:text-[#ae7aff]'
          >
            <ThumbsUp className='h-5 w-5' />
            <span>{likes}</span>
          </button>
          <button
            onClick={handleDislike}
            className='group inline-flex items-center gap-x-1 transition-colors hover:text-[#ae7aff]'
          >
            <ThumbsDown className='h-5 w-5' />
            <span>{dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SubscribedTab = () => {
  const subscribedChannels = [
    {
      id: 1,
      name: 'JavaScript Mastery',
      subscribers: '1.2M subscribers',
      avatar:
        'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'CSS Wizardry',
      subscribers: '800K subscribers',
      avatar:
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 3,
      name: 'Python Pros',
      subscribers: '2.5M subscribers',
      avatar:
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div className='space-y-4'>
      {subscribedChannels.map((channel) => (
        <div
          key={channel.id}
          className='flex items-center gap-4 border-b border-gray-700 pb-4 last:border-b-transparent'
        >
          <img
            src={channel.avatar}
            alt={channel.name}
            className='h-16 w-16 rounded-full object-cover'
          />
          <div className='flex-grow'>
            <h3 className='font-semibold'>{channel.name}</h3>
            <p className='text-sm text-gray-400'>{channel.subscribers}</p>
          </div>
          <button className='rounded bg-[#ae7aff] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#9d69ff]'>
            Subscribed
          </button>
        </div>
      ))}
    </div>
  );
};

const LoadingSpinner = () => (
  <div className='flex items-center justify-center py-10'>
    <div className='h-10 w-10 animate-spin rounded-full border-4 border-[#ae7aff] border-t-transparent'></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className='rounded-md bg-red-50 p-4'>
    <div className='flex'>
      <div className='flex-shrink-0'>
        <svg
          className='h-5 w-5 text-red-400'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z'
            clipRule='evenodd'
          />
        </svg>
      </div>
      <div className='ml-3'>
        <h3 className='text-sm font-medium text-red-800'>Error</h3>
        <div className='mt-2 text-sm text-red-700'>
          <p>{message}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ChannelPage;

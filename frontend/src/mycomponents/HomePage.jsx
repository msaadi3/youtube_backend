import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import VideoCard from './VideoCard.jsx';
import { videos } from './data.jsx';
import { PlaySquare } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <section className='w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0'>
        {videos.length > 0 ? (
          <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4'>
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                thumbnail={video.thumbnail}
                duration={video.duration}
                channelAvatar={video.owner.avatar}
                channelName={video.owner.fullName}
                title={video.title}
                views={video.views}
                uploadTime={video.uploadTime}
              />
            ))}
          </div>
        ) : (
          <div className='flex h-full items-center justify-center'>
            <div className='w-full max-w-sm text-center'>
              <p className='mb-3 w-full'>
                <span className='inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]'>
                  <PlaySquare className='h-6 w-6' />
                </span>
              </p>
              <h5 className='mb-2 font-semibold'>No videos available</h5>
              <p>
                There are no videos here available. Please try to search for
                something else.
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <li>
      <Button
        variant='ghost'
        className='w-full justify-start px-2 py-2 text-left hover:bg-white/10'
      >
        <span className='mr-3 inline-block'>{icon}</span>
        <span>{label}</span>
      </Button>
    </li>
  );
}

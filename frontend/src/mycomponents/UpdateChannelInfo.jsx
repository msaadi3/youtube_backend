import React, { useState } from 'react';

const UpdateChannelInfo = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='min-h-screen bg-[#121212] text-white'>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <div className='relative min-h-[150px] w-full pt-[16.28%]'>
          <div className='absolute inset-0 overflow-hidden'>
            <img
              src='https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress'
              alt='cover-photo'
              className='h-full w-full object-cover'
            />
          </div>
        </div>
        <div className='pb-4'>
          <div className='flex flex-wrap gap-4 pb-4 pt-6'>
            <div className='relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-white'>
              <img
                src='https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                alt='Channel'
                className='h-full w-full object-cover'
              />
            </div>
            <div className='mr-auto inline-block'>
              <h1 className='text-xl font-bold'>React Patterns</h1>
              <p className='text-sm text-gray-400'>@reactpatterns</p>
            </div>
            <div className='inline-block'>
              <button className='group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto'>
                View channel
              </button>
            </div>
          </div>
          <ul className='no-scrollbar flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 py-2'>
            <TabItem
              label='Personal Information'
              isActive={activeTab === 'personal'}
              onClick={() => handleTabChange('personal')}
            />
            <TabItem
              label='Channel Information'
              isActive={activeTab === 'channel'}
              onClick={() => handleTabChange('channel')}
            />
            <TabItem
              label='Change Password'
              isActive={activeTab === 'password'}
              onClick={() => handleTabChange('password')}
            />
          </ul>
          <div className='py-4'>
            {activeTab === 'personal' && <PersonalInformation />}
            {activeTab === 'channel' && <ChannelInformation />}
            {activeTab === 'password' && <ChangePassword />}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabItem = ({ label, isActive, onClick }) => (
  <li className='w-full'>
    <button
      className={`w-full border-b-2 px-3 py-1.5 ${
        isActive
          ? 'border-[#ae7aff] text-[#ae7aff]'
          : 'border-transparent text-gray-400'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  </li>
);

const PersonalInformation = () => {
  return (
    <div className='flex flex-wrap justify-center gap-y-4'>
      <div className='w-full sm:w-1/2 lg:w-1/3'>
        <h5 className='font-semibold'>Personal Info</h5>
        <p className='text-gray-300'>Update your photo and personal details.</p>
      </div>
      <div className='w-full sm:w-1/2 lg:w-2/3'>
        <div className='rounded-lg border'>
          <div className='flex flex-wrap gap-y-4 p-4'>
            <div className='w-full lg:w-1/2 lg:pr-2'>
              <label htmlFor='firstname' className='mb-1 inline-block'>
                First name
              </label>
              <input
                type='text'
                className='w-full rounded-lg border bg-transparent px-2 py-1.5'
                id='firstname'
                placeholder='Enter first name'
                defaultValue='React'
              />
            </div>
            <div className='w-full lg:w-1/2 lg:pl-2'>
              <label htmlFor='lastname' className='mb-1 inline-block'>
                Last name
              </label>
              <input
                type='text'
                className='w-full rounded-lg border bg-transparent px-2 py-1.5'
                id='lastname'
                placeholder='Enter last name'
                defaultValue='Patterns'
              />
            </div>
            <div className='w-full'>
              <label htmlFor='email' className='mb-1 inline-block'>
                Email address
              </label>
              <div className='relative'>
                <input
                  type='email'
                  className='w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2'
                  id='email'
                  placeholder='Enter email address'
                  defaultValue='patternsreact@gmail.com'
                />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                  />
                </svg>
              </div>
            </div>
          </div>
          <hr className='border border-gray-300' />
          <div className='flex items-center justify-end gap-4 p-4'>
            <button className='inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10'>
              Cancel
            </button>
            <button className='inline-block bg-[#ae7aff] px-3 py-1.5 text-black'>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelInformation = () => {
  return (
    <div className='flex flex-wrap justify-center gap-y-4'>
      <div className='w-full sm:w-1/2 lg:w-1/3'>
        <h5 className='font-semibold'>Channel Info</h5>
        <p className='text-gray-300'>Update your Channel details here.</p>
      </div>
      <div className='w-full sm:w-1/2 lg:w-2/3'>
        <div className='rounded-lg border'>
          <div className='flex flex-wrap gap-y-4 p-4'>
            <div className='w-full'>
              <label className='mb-1 inline-block' htmlFor='username'>
                Username
              </label>
              <div className='flex rounded-lg border'>
                <p className='flex shrink-0 items-center border-r border-white px-3 align-middle'>
                  vidplay.com/
                </p>
                <input
                  type='text'
                  className='w-full bg-transparent px-2 py-1.5'
                  id='username'
                  placeholder='@username'
                  defaultValue='reactpatterns'
                />
              </div>
            </div>
            <div className='w-full'>
              <label className='mb-1 inline-block' htmlFor='desc'>
                Description
              </label>
              <textarea
                className='w-full rounded-lg border bg-transparent px-2 py-1.5'
                rows='4'
                id='desc'
                placeholder='Channel Description'
                defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development."
              ></textarea>
              <p className='mt-0.5 text-sm text-gray-300'>
                275 characters left
              </p>
            </div>
            <div className='w-full'>
              <label className='mb-1 inline-block' htmlFor='timezone'>
                Timezone
              </label>
              <div className='relative w-full rounded-lg border'>
                <select
                  id='timezone'
                  className='w-full border-r-8 border-transparent bg-transparent py-1.5 pl-8'
                >
                  <option value='UTC+05:30' selected>
                    (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi
                  </option>
                  {/* Add other timezone options here */}
                </select>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
            </div>
          </div>
          <hr className='border border-gray-300' />
          <div className='flex items-center justify-end gap-4 p-4'>
            <button className='inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10'>
              Cancel
            </button>
            <button className='inline-block bg-[#ae7aff] px-3 py-1.5 text-black'>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  return (
    <div className='flex flex-wrap justify-center gap-y-4'>
      <div className='w-full sm:w-1/2 lg:w-1/3'>
        <h5 className='font-semibold'>Password</h5>
        <p className='text-gray-300'>
          Please enter your current password to change your password.
        </p>
      </div>
      <div className='w-full sm:w-1/2 lg:w-2/3'>
        <div className='rounded-lg border'>
          <div className='flex flex-wrap gap-y-4 p-4'>
            <div className='w-full'>
              <label className='mb-1 inline-block' htmlFor='old-pwd'>
                Current password
              </label>
              <input
                type='password'
                className='w-full rounded-lg border bg-transparent px-2 py-1.5'
                id='old-pwd'
                placeholder='Current password'
              />
            </div>
            <div className='w-full'>
              <label className='mb-1 inline-block' htmlFor='new-pwd'>
                New password
              </label>
              <input
                type='password'
                className='w-full rounded-lg border bg-transparent px-2 py-1.5'
                id='new-pwd'
                placeholder='New password'
              />
              <p className='mt-0.5 text-sm text-gray-300'>
                Your new password must be more than 8 characters.
              </p>
            </div>
            <div className='w-full'>
              <label className='mb-1 inline-block' htmlFor='cnfrm-pwd'>
                Confirm password
              </label>
              <input
                type='password'
                className='w-full rounded-lg border bg-transparent px-2 py-1.5'
                id='cnfrm-pwd'
                placeholder='Confirm password'
              />
            </div>
          </div>
          <hr className='border border-gray-300' />
          <div className='flex items-center justify-end gap-4 p-4'>
            <button className='inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10'>
              Cancel
            </button>
            <button className='inline-block bg-[#ae7aff] px-3 py-1.5 text-black'>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateChannelInfo;

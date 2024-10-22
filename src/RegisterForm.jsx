import React from 'react';
import mainImg from './assets/image.png';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  // const [number, setNumber] = usestate(100)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: 'guest',
      secondname: 'guest',
      email: 'forExample@gmail.com',
      number: '123 456 789',
      message: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const messageValue = watch('message', '');

  return (
    <>
      <div className='min-h-screen bg-gradient-to-b from-black via-purple-900 to-gray-900 text-white flex items-center justify-center p-4 flex-col'>
        <div>
          <h2 className='font-bold text-4xl  text-white mb-4 text-center'>
            Get in <span className='text-purple-400'>touch</span>
          </h2>
          <p className='text-gray-400 mb-8'>
            Reach out, and let's create a universe of possibilities together!
          </p>
        </div>
        <div className='max-w-[1240px] w-full bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0'>
          <div className='w-full lg:w-1/2'>
            <h2 className='uppercase text-[30px] font-bold'>
              Let’s connect constellations
            </h2>
            <p className='mb-5'>
              Let's align our constellations! Reach out and let the magic of
              collaboration illuminate our skies.
            </p>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
              <div className='flex space-x-4'>
                <div className='w-1/2'>
                  <input
                    type='text'
                    placeholder='Last Name'
                    className='w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    {...register('secondname', {
                      disabled: watch('username') === '',
                      minLength: {
                        value: 3,
                        message: 'Must be at least 3 characters',
                      },
                      maxLength: {
                        value: 20,
                        message: 'Must be less than 20 characters',
                      },
                    })}
                  />
                  {errors.secondname && (
                    <p className='text-red-500 text-xs italic'>
                      {errors.secondname.message}
                    </p>
                  )}
                </div>

                <div className='w-1/2'>
                  <input
                    type='text'
                    placeholder='First Name'
                    className='w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                    {...register('username', {
                      required: 'First Name is required',
                    })}
                  />
                  {errors.username && (
                    <p className='text-red-500 text-xs italic'>
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>

              <input
                type='email'
                placeholder='Email'
                className='w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                {...register('email', {
                  validate: {
                    notAdmin: (value) =>
                      value !== 'admin@example.com' || 'Reserved Email',
                    blackList: (value) => {
                      const blackList = ['mail.ru', 'yandex.ru'];
                      const domain = value.split('@')[1];
                      return blackList.includes(domain)
                        ? 'Blacklisted Mail'
                        : true;
                    },
                  },
                })}
              />
              {errors.email && (
                <p className='text-red-500 text-xs italic'>
                  {errors.email.message}
                </p>
              )}

              <input
                type='tel'
                placeholder='Phone Number'
                className='w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500'
                {...register('number', {
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: 'Invalid phone number',
                  },
                })}
              />
              {errors.number && (
                <p className='text-red-500 text-xs italic'>
                  {errors.number.message}
                </p>
              )}

              <textarea
                placeholder='Message (max 100 characters)'
                className='w-full p-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32'
                {...register('message', {
                  maxLength: {
                    value: 100,
                    message: 'Message must be less than 100 characters',
                  },
                })}
                disabled={messageValue.length >= 100}
              />
              {errors.message && (
                <p className='text-red-500 text-xs italic'>
                  {errors.message.message}
                </p>
              )}

              <span className='text-gray-400 text-sm'>
                {100 - messageValue.length} characters left
              </span>

              <button
                type='submit'
                className='w-full py-3 bg-purple-500 rounded-lg text-white font-bold hover:bg-purple-600 transition duration-300'
              >
                Send it to the moon 🚀
              </button>
            </form>
          </div>

          <div className='w-full lg:w-1/2 flex flex-col items-center relative h-[576px]'>
            <img
              src={mainImg}
              alt='Astronaut'
              className='w-[400px] h-full object-cover rounded-lg absolute z-0'
            />
            <div className='absolute z-10 bottom-5 left-28 w-[380px]'>
              <p className='mt-4 text-gray-400 italic '>
                “Two lunar months revealed Earth's fragile beauty against vast
                silence, transforming my view of our place in the universe.”
                <span className='block'>— Irinel Traista</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;

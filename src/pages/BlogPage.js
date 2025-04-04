import React from 'react';
import { Footer, NavbarLanding } from '../component';
import { bill, card, people03 } from '../Assets';

const BlogPage = () => {
  return (
    <section>
    < NavbarLanding />
    <div className="max-w-screen-lg mx-auto p-4 mb-24">
      <h1 className="text-3xl font-bold text-center mb-8 mt-24">Blogs</h1>

      <div className="space-y-8">
        {/* Post 1 */}
        <div className="border border-gray-300 rounded-lg p-6 shadow-lg mt-24">
          <div className="flex space-x-4">
            <div className="w-1/3 bg-gray-200 h-48 rounded-lg">
              <img 
                src= {bill}
                alt="Blog Post 1"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-2/3">
              <h2 className="text-2xl font-semibold">First Blog Post</h2>
              <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia ante nec purus auctor, nec auctor risus varius.</p>
              <button className="mt-4 text-blue-500 hover:underline">Read more...</button>
            </div>
          </div>
        </div>

        {/* Post 2 */}
        <div className="border border-gray-300 rounded-lg p-6 shadow-lg mt-36">
          <div className="flex space-x-4">
            <div className="w-1/3 bg-gray-200 h-48 rounded-lg">
              <img 
                src= {card}
                alt="Blog Post 2"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-2/3">
              <h2 className="text-2xl font-semibold">Second Blog Post</h2>
              <p className="text-gray-700 mt-2">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec hendrerit augue nec augue sollicitudin, a elementum ligula consequat.</p>
              <button className="mt-4 text-blue-500 hover:underline">Read more...</button>
            </div>
          </div>
        </div>

        {/* Post 3 */}
        <div className="border border-gray-300 rounded-lg p-6 shadow-lg mt-36">
          <div className="flex space-x-4">
            <div className="w-1/3 bg-gray-200 h-48 rounded-lg">
              <img 
                src={people03}
                alt="Blog Post 3"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="w-2/3">
              <h2 className="text-2xl font-semibold">Third Blog Post</h2>
              <p className="text-gray-700 mt-2">Curabitur vehicula sapien non tortor bibendum, a malesuada odio dictum. Nam non purus euismod, auctor dui eget, finibus eros.</p>
              <button className="mt-4 text-blue-500 hover:underline">Read more...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    < Footer />
    </section>
  );
};

export default BlogPage;

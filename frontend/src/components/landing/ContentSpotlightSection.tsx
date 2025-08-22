import React from 'react'

const ContentSpotlightSection: React.FC = () => {
  return (
    <section 
      id="content-spotlight-block" 
      className="content-spotlight-block py-16 lg:py-24"
      style={{ backgroundColor: '#FFD391' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="media-wrapper relative">
          <picture>
            <source 
              media="(max-width: 768px)" 
              srcSet="https://www.easygenerator.com/wp-content/uploads/2025/05/EGL-mobile.png" 
            />
            <img 
              decoding="async" 
              className="w-full h-auto object-cover rounded-lg shadow-lg" 
              src="https://i0.wp.com/www.easygenerator.com/wp-content/uploads/2025/05/Images.png?ssl=1" 
              alt="Nobody knows your business better than your people" 
              width="1278" 
              height="681"
            />
          </picture>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white drop-shadow-lg">
                Nobody knows your business better than your people
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentSpotlightSection 
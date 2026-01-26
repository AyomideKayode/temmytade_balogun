'use client';

import React, { useEffect, useState } from 'react';
import { initScript } from '@/lib/legacy/script';
import GalleryModal from './GalleryModal';

interface HomeClientProps {
  galleryData: Record<string, string[]>;
}

export default function HomeClient({ galleryData }: HomeClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  useEffect(() => {
    // Return the cleanup function from initScript
    return initScript();
  }, []);

  const openModal = (e: React.MouseEvent, collectionKey: string) => {
    e.preventDefault();
    const images = galleryData[collectionKey] || [];
    if (images.length > 0) {
      setCurrentImages(images);
      setIsModalOpen(true);
    } else {
      console.warn(`No images found for collection: ${collectionKey}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImages([]);
  };

  return (
    <>
      <GalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={currentImages}
      />

      {/* Preloading */}
      <div className='loading' data-loading>
        <img
          src='/images/svgs/loading_t.svg'
          width={55}
          height={55}
          alt='loading'
          className='img'
        />
        <img
          src='/images/svgs/loading-circle.svg'
          width={70}
          height={70}
          alt=''
          className='circle'
        />
      </div>

      <main>
        <article>
          {/* Hero */}
          <section className='section hero' id='home' aria-label='home'>
            <div className='container'>
              <img
                src='/images/about/hero_t_banner.png'
                width={322}
                height={322}
                alt=''
                className='hero_banner'
              />

              <div className='hero_content'>
                <h1 className='h1 hero_title'>Tadz Media Concepts</h1>

                <div className='wrapper h2'>
                  {[
                    'Photographer',
                    'Shutterbug',
                    'Cameraman',
                    'Radiant Portraits',
                  ].map((text) => (
                    <strong key={text} className='strong' data-letter-effect>
                      {text}
                    </strong>
                  ))}
                </div>

                <p className='hero_text'>Refined. Relatable. Remarkable.</p>
              </div>
            </div>

            <img
              src='/images/svgs/hero-shape.svg'
              width={211}
              height={189}
              alt=''
              className='shape'
            />
          </section>

          {/* Gallery */}
          <section className='section gallery' id='gallery'>
            <ul className='gallery_list'>
              <li className='gallery_item' data-reveal>
                <div className='gallery_card'>
                  <figure
                    className='card_banner img_holder has_before'
                    style={
                      { '--width': 450, '--height': 625 } as React.CSSProperties
                    }
                  >
                    <img
                      src='/images/product/grublane/grublane1.jpg'
                      width={450}
                      height={625}
                      loading='lazy'
                      alt='The Drunken'
                      className='img_cover'
                    />
                  </figure>
                  <div className='card_content'>
                    <h3 className='h6'>
                      <a
                        href='#'
                        className='card_title'
                        onClick={(e) => openModal(e, 'Grublane')}
                      >
                        Grublane
                      </a>
                    </h3>
                    <span className='card_tag'>Food, Event</span>
                  </div>
                  <a href='/product-marketing' className='btn_icon'>
                    <img
                      src='/images/svgs/arrow-forward.svg'
                      width={43}
                      height={20}
                      loading='lazy'
                      alt='arrow-forward icon'
                    />
                  </a>
                </div>
                <div className='gallery_card'>
                  <figure
                    className='card_banner img_holder has_before'
                    style={
                      { '--width': 450, '--height': 625 } as React.CSSProperties
                    }
                  >
                    <img
                      src='/images/gallery/gallery-2.jpg'
                      width={450}
                      height={625}
                      loading='lazy'
                      alt='Lettuce Entertain'
                      className='img_cover'
                    />
                  </figure>
                  <div className='card_content'>
                    <h3 className='h6'>
                      <a
                        href='#'
                        className='card_title'
                        onClick={(e) => openModal(e, 'Lettuce Entertain')}
                      >
                        Lettuce Entertain
                      </a>
                    </h3>
                    <span className='card_tag'>Landscape</span>
                  </div>
                  <a href='#' className='btn_icon'>
                    <img
                      src='/images/svgs/arrow-forward.svg'
                      width={43}
                      height={20}
                      loading='lazy'
                      alt='arrow-forward icon'
                    />
                  </a>
                </div>
              </li>
              <li className='gallery_item' data-reveal>
                <div className='gallery_card'>
                  <figure
                    className='card_banner img_holder has_before'
                    style={
                      { '--width': 450, '--height': 625 } as React.CSSProperties
                    }
                  >
                    <img
                      src='/images/portraits/the-art-of-style/portrait_6.png'
                      width={450}
                      height={625}
                      loading='lazy'
                      alt='The Art of Style'
                      className='img_cover'
                    />
                  </figure>
                  <div className='card_content'>
                    <h3 className='h6'>
                      <a
                        href='#'
                        className='card_title'
                        onClick={(e) => openModal(e, 'The Art of Style')}
                      >
                        The Art of Style
                      </a>
                    </h3>
                    <span className='card_tag'>Model, Fashion</span>
                  </div>
                  <a href='#' className='btn_icon'>
                    <img
                      src='/images/svgs/arrow-forward.svg'
                      width={43}
                      height={20}
                      loading='lazy'
                      alt='arrow-forward icon'
                    />
                  </a>
                </div>
                <div className='gallery_card'>
                  <figure
                    className='card_banner img_holder has_before'
                    style={
                      { '--width': 450, '--height': 625 } as React.CSSProperties
                    }
                  >
                    <img
                      src='/images/gallery/gallery-4.jpg'
                      width={450}
                      height={625}
                      loading='lazy'
                      alt='Juan More Taco'
                      className='img_cover'
                    />
                  </figure>
                  <div className='card_content'>
                    <h3 className='h6'>
                      <a
                        href='#'
                        className='card_title'
                        onClick={(e) => openModal(e, 'Juan More Taco')}
                      >
                        Juan More Taco
                      </a>
                    </h3>
                    <span className='card_tag'>Architecture, Event</span>
                  </div>
                  <a href='#' className='btn_icon'>
                    <img
                      src='/images/svgs/arrow-forward.svg'
                      width={43}
                      height={20}
                      loading='lazy'
                      alt='arrow-forward icon'
                    />
                  </a>
                </div>
              </li>
              <li className='gallery_item' data-reveal>
                <div className='gallery_card'>
                  <figure
                    className='card_banner img_holder has_before'
                    style={
                      { '--width': 450, '--height': 625 } as React.CSSProperties
                    }
                  >
                    <img
                      src='/images/portraits/moments-in-motion/portrait_12.jpg'
                      width={450}
                      height={625}
                      loading='lazy'
                      alt='Moments in Motion'
                      className='img_cover'
                    />
                  </figure>
                  <div className='card_content'>
                    <h3 className='h6'>
                      <a
                        href='#'
                        className='card_title'
                        onClick={(e) => openModal(e, 'Moments in Motion')}
                      >
                        Moments in Motion
                      </a>
                    </h3>
                    <span className='card_tag'>People, Film</span>
                  </div>
                  <a href='#' className='btn_icon'>
                    <img
                      src='/images/svgs/arrow-forward.svg'
                      width={43}
                      height={20}
                      loading='lazy'
                      alt='arrow-forward icon'
                    />
                  </a>
                </div>
                <div className='gallery_card'>
                  <figure
                    className='card_banner img_holder has_before'
                    style={
                      { '--width': 450, '--height': 625 } as React.CSSProperties
                    }
                  >
                    <img
                      src='/images/gallery/gallery-6.jpg'
                      width={450}
                      height={625}
                      loading='lazy'
                      alt='Cookie Monstah'
                      className='img_cover'
                    />
                  </figure>
                  <div className='card_content'>
                    <h3 className='h6'>
                      <a
                        href='#'
                        className='card_title'
                        onClick={(e) => openModal(e, 'Cookie Monstah')}
                      >
                        Cookie Monstah
                      </a>
                    </h3>
                    <span className='card_tag'>Wedding, Event</span>
                  </div>
                  <a href='#' className='btn_icon'>
                    <img
                      src='/images/svgs/arrow-forward.svg'
                      width={43}
                      height={20}
                      loading='lazy'
                      alt='arrow-forward icon'
                    />
                  </a>
                </div>
              </li>
              <li className='gallery_item' data-reveal>
                <div className='gallery_card'>
                  <figure
                    className='card_banner img_holder has_before'
                    style={
                      { '--width': 450, '--height': 625 } as React.CSSProperties
                    }
                  >
                    <img
                      src='/images/wedding-photography/happily-ever-after-in-frames/wedding_1.jpg'
                      width={450}
                      height={625}
                      loading='lazy'
                      alt='Happily Ever After in Frames'
                      className='img_cover'
                    />
                  </figure>
                  <div className='card_content'>
                    <h3 className='h6'>
                      <a
                        href='#'
                        className='card_title'
                        onClick={(e) =>
                          openModal(e, 'Happily Ever After in Frames')
                        }
                      >
                        Happily Ever After in Frames
                      </a>
                    </h3>
                    <span className='card_tag'>Wedding, Event</span>
                  </div>
                  <a href='/wedding-photography' className='btn_icon'>
                    <img
                      src='/images/svgs/arrow-forward.svg'
                      width={43}
                      height={20}
                      loading='lazy'
                      alt='arrow-forward icon'
                    />
                  </a>
                </div>
                <div className='gallery_card'>
                  <figure
                    className='card_banner img_holder has_before'
                    style={
                      { '--width': 450, '--height': 625 } as React.CSSProperties
                    }
                  >
                    <img
                      src='/images/gallery/gallery-8.jpg'
                      width={450}
                      height={625}
                      loading='lazy'
                      alt='The Lockhart Bar'
                      className='img_cover'
                    />
                  </figure>
                  <div className='card_content'>
                    <h3 className='h6'>
                      <a
                        href='#'
                        className='card_title'
                        onClick={(e) => openModal(e, 'The Lockhart Bar')}
                      >
                        The Lockhart Bar
                      </a>
                    </h3>
                    <span className='card_tag'>Health & Wellness</span>
                  </div>
                  <a href='#' className='btn_icon'>
                    <img
                      src='/images/svgs/arrow-forward.svg'
                      width={43}
                      height={20}
                      loading='lazy'
                      alt='arrow-forward icon'
                    />
                  </a>
                </div>
              </li>
            </ul>

            <a href='#service' className='scroll_down'>
              <img
                src='/images/svgs/scroll-down.svg'
                width={40}
                height={66}
                loading='lazy'
                alt='mouse scroll'
              />
            </a>

            <img
              src='/images/svgs/gallery-shape.svg'
              width={220}
              height={78}
              loading='lazy'
              alt=''
              className='shape'
            />
          </section>

          {/* Category */}
          <section
            className='section category'
            aria-label='photography category'
          >
            <div className='container'>
              <ul className='category_list'>
                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Landscape,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/categories/category-1.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Landscape'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Model,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/categories/category-2.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Model'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Street,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/categories/category-3.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Street'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Product,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/categories/category-4.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Product'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Fashion,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/portraits/moments-in-motion/potrait_5.png'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Fashion'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Film,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/categories/category-5.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Film'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Architecture,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/categories/category-6.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Architecture'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Wedding,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/categories/category-8.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Wedding'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Event,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/product/12-baskets/12baskets_8.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Event'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>People,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/portraits/moments-in-motion/potrait_3.png'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='People'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Food,</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/product/12-baskets/12baskets_1.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Food'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>

                <li className='category_item' data-reveal>
                  <a href='#' className='category_card'>
                    <h3 className='h4 card_title'>Health & Wellness.</h3>

                    <figure
                      className='card_banner img_holder'
                      style={
                        {
                          '--width': 600,
                          '--height': 690,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/product/grublane/grublane_3.jpg'
                        width={600}
                        height={690}
                        loading='lazy'
                        alt='Health & Wellnes'
                        className='img_cover'
                      />
                    </figure>
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* About */}
          <section className='section about' id='about' aria-label='about me'>
            <p className='section_subtitle container' id='about-me'>
              Vision. Story. Detail.
            </p>
            <div className='container'>
              <div className='about_content'>
                <h4 className='h4 section_title' data-reveal='right'>
                  Here at Tadz Media Concepts
                </h4>

                <div className='wrapper has_before' data-reveal='right'>
                  <p className='section_text'>
                    We transform fleeting moments into lasting impressions. With
                    over <em className='em'>6 years</em> of industry expertise,
                    our lens is tuned to the art of storytelling — capturing
                    people, products, and places with elegance and intent.
                    Whether it’s a wedding, a brand launch, or a personal
                    milestone, our mission remains the same: to craft compelling
                    visuals that resonate and endure.
                  </p>

                  <img
                    src='/images/about/signature.png'
                    width={151}
                    height={92}
                    loading='lazy'
                    alt='signature'
                    className='img'
                  />
                </div>
              </div>

              <figure className='about_banner' data-reveal='left'>
                <div
                  className='img_holder has_before'
                  style={
                    { '--width': 512, '--height': 684 } as React.CSSProperties
                  }
                >
                  <img
                    src='/images/about/self.png'
                    width={512}
                    height={684}
                    loading='lazy'
                    alt='Temmytade Balogun'
                    className='img_cover'
                  />
                </div>

                <img
                  src='/images/about/about_banner3.png'
                  width={178}
                  height={178}
                  loading='lazy'
                  alt=''
                  className='shape shape-1'
                  data-reveal='left'
                />

                <img
                  src='/images/svgs/about-shape-2.svg'
                  width={659}
                  height={653}
                  loading='lazy'
                  alt=''
                  className='shape shape-2'
                />
              </figure>

              <img
                src='/images/svgs/about-shape-3.svg'
                width={239}
                height={232}
                loading='lazy'
                alt=''
                className='shape shape-3'
              />
            </div>
          </section>

          {/* Services */}
          <section
            className='section service'
            id='services'
            aria-labelledby='service-label'
          >
            <p className='section_subtitle container' id='service-label'>
              What We Do
            </p>

            <ul className='service_list'>
              <li data-reveal>
                <div className='service_card container'>
                  <img
                    src='/images/service-images/service-1.jpg'
                    width={340}
                    height={380}
                    loading='lazy'
                    alt='Wedding Photography'
                    className='img'
                  />

                  <div>
                    <h3 className='h3 card_title'>Wedding Photography</h3>

                    <p className='card_subtitle'>
                      Capturing the magic and romance of your special day with
                      timeless elegance.
                    </p>
                  </div>

                  <a
                    href='#'
                    className='btn_icon'
                    aria-label='See more'
                    data-category='wedding-photography'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='43'
                      height='20'
                      viewBox='0 0 43 20'
                      fill='none'
                    >
                      <path d='M0 10H41' stroke='white' strokeWidth='2' />
                      <path
                        d='M33 1L41.9 10.2727L33 19'
                        stroke='white'
                        strokeWidth='2'
                      />
                    </svg>
                  </a>
                </div>
              </li>

              <li data-reveal>
                <div className='service_card container'>
                  <img
                    src='/images/service-images/service-3.jpg'
                    width={340}
                    height={380}
                    loading='lazy'
                    alt='Product Marketing'
                    className='img'
                  />

                  <div>
                    <h3 className='h3 card_title'>Product Marketing</h3>

                    <p className='card_subtitle'>
                      Showcasing your products with stunning visuals that
                      captivate and engage.
                    </p>
                  </div>

                  <a
                    href='#'
                    className='btn_icon'
                    aria-label='See more'
                    data-category='product-marketing'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='43'
                      height='20'
                      viewBox='0 0 43 20'
                      fill='none'
                    >
                      <path d='M0 10H41' stroke='white' strokeWidth='2' />
                      <path
                        d='M33 1L41.9 10.2727L33 19'
                        stroke='white'
                        strokeWidth='2'
                      />
                    </svg>
                  </a>
                </div>
              </li>

              <li data-reveal>
                <div className='service_card container'>
                  <img
                    src='/images/product/12-baskets/12baskets_9-resize.jpg'
                    width={340}
                    height={380}
                    loading='lazy'
                    alt='Event Photography'
                    className='img'
                  />

                  <div>
                    <h3 className='h3 card_title'>Event Photography</h3>

                    <p className='card_subtitle'>
                      Capturing the vibrant energy and unforgettable moments of
                      your events.
                    </p>
                  </div>

                  <a
                    href='#'
                    className='btn_icon'
                    aria-label='See more'
                    data-category='event-photography'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='43'
                      height='20'
                      viewBox='0 0 43 20'
                      fill='none'
                    >
                      <path d='M0 10H41' stroke='white' strokeWidth='2' />
                      <path
                        d='M33 1L41.9 10.2727L33 19'
                        stroke='white'
                        strokeWidth='2'
                      />
                    </svg>
                  </a>
                </div>
              </li>

              <li data-reveal>
                <div className='service_card container'>
                  <img
                    src='/images/service-images/service-2.jpg'
                    width={340}
                    height={380}
                    loading='lazy'
                    alt='Motion Graphics'
                    className='img'
                  />

                  <div>
                    <h3 className='h3 card_title'>Motion Graphics</h3>

                    <p className='card_subtitle'>
                      Bringing your ideas to life with dynamic and engaging
                      motion graphics.
                    </p>
                  </div>

                  <a
                    href='#'
                    className='btn_icon'
                    aria-label='See more'
                    data-category='motion-design'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='43'
                      height='20'
                      viewBox='0 0 43 20'
                      fill='none'
                    >
                      <path d='M0 10H41' stroke='white' strokeWidth='2' />
                      <path
                        d='M33 1L41.9 10.2727L33 19'
                        stroke='white'
                        strokeWidth='2'
                      />
                    </svg>
                  </a>
                </div>
              </li>

              <li data-reveal>
                <div className='service_card container'>
                  <img
                    src='/images/service-images/service-2.jpg'
                    width={340}
                    height={380}
                    loading='lazy'
                    alt='Videography'
                    className='img'
                  />

                  <div>
                    <h3 className='h3 card_title'>Videography</h3>

                    <p className='card_subtitle'>
                      Crafting compelling stories through high-quality video
                      production.
                    </p>
                  </div>

                  <a
                    href='#'
                    className='btn_icon'
                    aria-label='See more'
                    data-category='videography'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='43'
                      height='20'
                      viewBox='0 0 43 20'
                      fill='none'
                    >
                      <path d='M0 10H41' stroke='white' strokeWidth='2' />
                      <path
                        d='M33 1L41.9 10.2727L33 19'
                        stroke='white'
                        strokeWidth='2'
                      />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </section>

          {/* Portfolio */}
          <section
            className='section portfolio'
            id='portfolio'
            aria-labelledby='portfolio-label'
          >
            <div className='container'>
              <div className='portfolio_list'>
                <div className='wrapper'>
                  <h2
                    className='h2 section_title'
                    id='portfolio_label'
                    data-reveal
                  >
                    My Recent Work.
                  </h2>
                  <div className='portfolio_card' data-reveal>
                    <figure
                      className='card_banner img_holder has_before'
                      style={
                        {
                          '--width': 700,
                          '--height': 605,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/portfolio/portfolio-1.jpg'
                        width={700}
                        height={605}
                        loading='lazy'
                        alt='Shoe Promo'
                        className='img_cover'
                      />
                    </figure>

                    <div className='card_content'>
                      <h3 className='h4'>
                        <a
                          href='#'
                          className='card_title'
                          onClick={(e) => openModal(e, 'Shoe Promo')}
                        >
                          Shoe Promo
                        </a>
                      </h3>

                      <p className='card_tag'>Product</p>
                    </div>

                    <a href='#' className='btn_icon' aria-label='See more'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='43'
                        height='20'
                        viewBox='0 0 43 20'
                        fill='none'
                      >
                        <path d='M0 10H41' stroke='black' strokeWidth='2' />
                        <path
                          d='M33 1L41.9 10.2727L33 19'
                          stroke='black'
                          strokeWidth='2'
                        />
                      </svg>
                    </a>
                  </div>

                  <div className='portfolio_card' data-reveal>
                    <figure
                      className='card_banner img_holder has_before'
                      style={
                        {
                          '--width': 700,
                          '--height': 1091,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/portfolio/portfolio-2.jpg'
                        width={700}
                        height={1091}
                        loading='lazy'
                        alt='Wedding Shot'
                        className='img_cover'
                      />
                    </figure>

                    <div className='card_content'>
                      <h3 className='h4'>
                        <a
                          href='#'
                          className='card_title'
                          onClick={(e) => openModal(e, 'Wedding Shot')}
                        >
                          Wedding Shot
                        </a>
                      </h3>

                      <p className='card_tag'>Wedding</p>
                    </div>

                    <a href='#' className='btn_icon' aria-label='See more'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='43'
                        height='20'
                        viewBox='0 0 43 20'
                        fill='none'
                      >
                        <path d='M0 10H41' stroke='black' strokeWidth='2' />
                        <path
                          d='M33 1L41.9 10.2727L33 19'
                          stroke='black'
                          strokeWidth='2'
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className='wrapper'>
                  <div className='portfolio_card' data-reveal>
                    <figure
                      className='card_banner img_holder has_before'
                      style={
                        {
                          '--width': 700,
                          '--height': 1000,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/portraits/the-art-of-style/portrait_5.png'
                        width={700}
                        height={1000}
                        loading='lazy'
                        alt='Fashion Show'
                        className='img_cover'
                      />
                    </figure>

                    <div className='card_content'>
                      <h3 className='h4'>
                        <a
                          href='#'
                          className='card_title'
                          onClick={(e) => openModal(e, 'Fashion Show')}
                        >
                          Fashion Show
                        </a>
                      </h3>

                      <p className='card_tag'>Fashion, Model</p>
                    </div>

                    <a href='#' className='btn_icon' aria-label='See more'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='43'
                        height='20'
                        viewBox='0 0 43 20'
                        fill='none'
                      >
                        <path d='M0 10H41' stroke='black' strokeWidth='2' />
                        <path
                          d='M33 1L41.9 10.2727L33 19'
                          stroke='black'
                          strokeWidth='2'
                        />
                      </svg>
                    </a>
                  </div>

                  <div className='portfolio_card' data-reveal>
                    <figure
                      className='card_banner img_holder has_before'
                      style={
                        {
                          '--width': 700,
                          '--height': 850,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        src='/images/product/12-baskets/12baskets_11.jpg'
                        width={700}
                        height={850}
                        loading='lazy'
                        alt='12 Baskets'
                        className='img_cover'
                      />
                    </figure>

                    <div className='card_content'>
                      <h3 className='h4'>
                        <a
                          href='#'
                          className='card_title'
                          onClick={(e) =>
                            openModal(e, '12 Baskets ~ Small Chops')
                          }
                        >
                          12 Baskets ~ Small Chops
                        </a>
                      </h3>

                      <p className='card_tag'>Food</p>
                    </div>

                    <a href='#' className='btn_icon' aria-label='See more'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='43'
                        height='20'
                        viewBox='0 0 43 20'
                        fill='none'
                      >
                        <path d='M0 10H41' stroke='black' strokeWidth='2' />
                        <path
                          d='M33 1L41.9 10.2727L33 19'
                          stroke='black'
                          strokeWidth='2'
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <img
                src='/images/svgs/portfolio-shape.svg'
                width={286}
                height={232}
                loading='lazy'
                alt=''
                className='shape'
              />
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

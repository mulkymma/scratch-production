'use client'
import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Mail,
  Menu,
  Phone,
  Send,
  X,
} from 'lucide-react'

const workImages = [
  {
    src: '/work/work%20image%208.jpeg',
    title: 'Portraits in Motion',
    type: 'Photography',
  },
  {
    src: '/work/work%20image%202.jpeg',
    title: 'Made for the Feed',
    type: 'Content Creation',
  },
  {
    src: '/work/Work%20image%203.jpeg',
    title: 'Stories Worth Sharing',
    type: 'Social Media',
  },
  {
    src: '/work/work%20image%204.jpeg',
    title: 'Moments Captured',
    type: 'Photography',
  },
  {
    src: '/work/work%20image%205.jpeg',
    title: 'Behind the Lens',
    type: 'Lifestyle',
  },
  {
    src: '/work/work%20image%209.jpeg',
    title: 'The Everyday Edit',
    type: 'Brand Story',
  },
  {
    src: '/work/Work%20image%207.jpeg',
    title: 'Frames That Feel Real',
    type: 'Creative Direction',
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sending, setSending] = useState(false)

  // Automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) =>
        current === workImages.length - 1 ? 0 : current + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Contact form
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setSending(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSent(true)
      form.reset()
    } catch (error) {
      console.error(error)
      alert(
        'Something went wrong while sending your enquiry. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="site-shell">

      {/* NAVIGATION */}
      <nav className="nav-wrap" aria-label="Main navigation">
        <a
          href="#top"
          className="wordmark"
          aria-label="Scratch Production home"
        >
          <img
            src="/scratch_logo-removebg-preview.png"
            alt="Scratch Production"
            className="nav-logo"
          />
        </a>

        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <div
          className={`nav-links ${
            menuOpen ? 'is-open' : ''
          }`}
        >
          <a
            href="#work"
            onClick={() => setMenuOpen(false)}
          >
            Work
          </a>

          <a
            href="#services"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </nav>


      {/* HERO – smooth cross-fade */}
      <section className="hero section-pad" id="top">
        {/* Background layers */}
        {workImages.map((image, index) => (
          <div
            key={image.src}
            className={`hero-bg ${index === currentSlide ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${image.src})` }}
          />
        ))}

        <div className="hero-copy">
          <p className="eyebrow">
            Creating · Capturing · Connecting
          </p>

          <h1>
            Ideas into <em>images</em> people remember.
          </h1>

          <p className="hero-text">
            Scratch Production is a creative media studio for
            thoughtful photography, content creation, and social
            storytelling.
          </p>

          <div className="hero-actions">
            <a className="button button-dark" href="#work">
              See the work
              <ArrowUpRight />
            </a>

            <a className="text-link" href="#contact">
              Start a project
              <span>→</span>
            </a>
          </div>
        </div>
      </section>


      {/* INTRO */}
      <section className="intro section-pad">
        <p className="eyebrow">
          A small studio with a big point of view
        </p>

        <h2>
          Good work starts with paying attention.
        </h2>

        <p>
          From portraits and lifestyle photography to
          branded content and social media management,
          we make work that feels human, clear, and full
          of character.
        </p>
      </section>


      {/* WORK */}
      <section
        className="work section-pad"
        id="work"
      >
        <div className="section-heading">
          <p className="eyebrow">
            Selected work
          </p>

          <h2>
            Work that speaks for itself.
          </h2>
        </div>

        <div className="work-grid">
          {workImages.map((image) => (
            <article
              className="work-card"
              key={image.src}
            >
              <div className="work-image">
                <img
                  src={image.src}
                  alt={image.title}
                />
              </div>

              <p>{image.type}</p>

              <h3>{image.title}</h3>
            </article>
          ))}
        </div>
      </section>


      {/* SERVICES */}
      <section
        className="services section-pad"
        id="services"
      >
        <div className="section-heading">
          <p className="eyebrow">
            What we do
          </p>

          <h2>
            Built around your story.
          </h2>
        </div>

        <div className="service-grid">
          <article>
            <span>01</span>
            <h3>Content creation</h3>
            <p>
              Photography, video, and branded
              content made to move with your
              audience.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Photography</h3>
            <p>
              Portraits, lifestyle, and event
              photography with a natural,
              considered feel.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Social media</h3>
            <p>
              Strategy, content, and audience
              growth that keeps your brand
              present.
            </p>
          </article>
        </div>
      </section>


      {/* CONTACT */}
      <section
        className="contact section-pad"
        id="contact"
      >
        <div className="contact-copy">
          <p className="eyebrow">
            Let&apos;s make something
          </p>

          <h2>
            Have an idea?
            <br />
            <em>Let&apos;s talk.</em>
          </h2>

          <p>
            Tell us a little about what you&apos;re
            working on and we&apos;ll get back to you
            soon.
          </p>

          <div className="contact-details">
            <a href="tel:+254787875823">
              <Phone />
              <span>+254 787875823</span>
            </a>

            <a
              href="https://wa.me/254787875823"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6a11.9 11.9 0 0 0 5.7 1.4h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.3 6.6 6.7 2.2 12.1 2.2c2.6 0 5.1 1 6.9 2.8 1.8 1.8 2.8 4.3 2.8 6.9-.1 5.5-4.5 9.9-9.7 9.9Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.3Z"
                  fill="currentColor"
                />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="https://instagram.com/scratch._.production_"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                />
              </svg>
              <span>@scratch._.production_</span>
            </a>

            <a href="mailto:scratch.production0@gmail.com">
              <Mail />
              <span>scratch.production0@gmail.com</span>
            </a>
          </div>
        </div>

        {/* CONTACT FORM */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <label>
            Name
            <input
              required
              name="name"
              placeholder="Your name"
            />
          </label>

          <label>
            Email
            <input
              required
              type="email"
              name="email"
              placeholder="you@example.com"
            />
          </label>

          <label>
            Project details
            <textarea
              required
              name="message"
              placeholder="What are you working on?"
              rows={4}
            />
          </label>

          <button
            className="button button-light"
            type="submit"
            disabled={sending}
          >
            {sending
              ? 'Sending...'
              : sent
              ? 'Message sent ✓'
              : 'Send enquiry'}
            <Send />
          </button>
        </form>
      </section>


      {/* FOOTER */}
      <footer className="footer section-pad">
        <a href="#top" className="wordmark">
          <img
            src="/scratch_logo-removebg-preview.png"
            alt="Scratch Production"
            className="footer-logo"
          />
        </a>

        <p className="copyright">
          © Scratch Production 2026. All rights reserved.
        </p>
      </footer>

    </main>
  )
}
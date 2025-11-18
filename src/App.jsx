import React, { useState, useEffect } from 'react';

/*
YEH AAPKA FINAL, PROFESSIONAL PORTFOLIO CODE HAI.
Isko `src/App.jsx` file mein save karna hai.

Ismein 2 main "Interview Talking Points" hain:
1. ProjectSection: API call ko simulate karna (useState/useEffect).
2. Hero Section: Typewriter effect (useState/useEffect + cleanup function).
*/

// --- MOCK DATA ---
// Yeh aapka "Mock API" data hai. Interviewer ko batana ki yeh data server se aata hai.
const mockProjects = [
  {
    id: 1,
    title: 'Sadhna Tracker (React & Firebase)',
    desc: 'A full-stack habit tracking app using Firebase auth and Firestore database for real-time data.',
    img: 'https://placehold.co/600x400/1e3a8a/ffffff?text=Sadhna+Tracker',
    link: '#' // TODO: Yahan apne project ka GitHub link daalna
  },
  {
    id: 2,
    title: 'Task Management App (Vanilla JS)',
    desc: 'A simple To-Do app built with core JavaScript (DOM manipulation) and localStorage persistence.',
    img: 'https://placehold.co/600x400/1e3a8a/ffffff?text=Task+App',
    link: '#' // TODO: Yahan apne project ka GitHub link daalna
  },
  {
    id: 3,
    title: 'Interactive UI Dashboard (Power BI)',
    desc: 'A user-friendly UI dashboard built to visualize complex R&D data (my "pivot" project).',
    img: 'https://placehold.co/600x400/1e3a8a/ffffff?text=Dashboard+UI',
    link: '#'
  }
];

// --- SVG Icons (Skills ke liye) ---
const ReactIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.29 1.71a1 1 0 00-1.41 0l-7 7a1 1 0 000 1.41l7 7a1 1 0 001.41-1.41L6.41 11H17a1 1 0 100-2H6.41l4.88-4.88a1 1 0 000-1.41zM10 4.41L8.71 3.12a1 1 0 00-1.42 0l-7 7a1 1 0 000 1.41l7 7a1 1 0 001.42 0L10 15.59V4.41z" clipRule="evenodd"></path><path d="M10.18 17.12a1 1 0 001.41 0l7-7a1 1 0 000-1.41l-7-7a1 1 0 00-1.41 1.41L15.07 9H4a1 1 0 100 2h11.07l-4.88 4.88a1 1 0 000 1.41z"></path></svg>
);
const JSIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 2a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V6a1 1 0 00-1-1H5zM5 14a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2zm5-9a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V6a1 1 0 00-1-1h-2zm0 7a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2z" clipRule="evenodd"></path></svg>
);
const HTMLIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.316 4.735a1 1 0 011.265-.633l12 4a1 1 0 11-.632 1.898l-12-4a1 1 0 01-.633-1.265z" clipRule="evenodd"></path></svg>
);
const CSSIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);
const GitIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.72c0 .27.18.58.69.48A10 10 0 0010 0z"></path></svg>
);
const LinkedInIcon = () => (
   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
);


// --- Components (Chhote code ke tukde) ---

// 1. Header/Navigation
function Header() {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm w-full fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Yahan aapka naam hai */}
          <span className="text-2xl font-bold text-gray-900">Anmol Varshney</span>
          <div className="flex items-center space-x-6">
            <a href="#about" className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium">About</a>
            <a href="#projects" className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium">Projects</a>
            <a href="#contact" className="hidden sm:block text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            <span className="w-px h-6 bg-gray-300 hidden sm:block"></span>
            {/* Yahan aapka LinkedIn link daalna */}
            <a href="https://www.linkedin.com/in/anmol-v-4b9719118" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
              <LinkedInIcon />
            </a>
            {/* Yahan aapka GitHub link daalna (Anmol272001) */}
            <a href="https://github.com/Anmol272001" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
              <GitIcon />
            </a>
            {/* Yahan aapka email hai */}
            <a 
              href="mailto:anmol.varshney27@gmail.com" 
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// 2. Hero Section (Typewriter Effect ke saath)
function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Yeh text type hoga
  const rolesToRotate = ["Frontend Developer", "React Developer", "Problem Solver"];

  // --- INTERVIEW TALKING POINT #2: Typewriter Effect ---
  useEffect(() => {
    // Yeh function type/delete karega
    const handleType = () => {
      const i = loopNum % rolesToRotate.length;
      const fullText = rolesToRotate[i];

      // Type kar rahe hain ya delete?
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      // Speed set karna
      setTypingSpeed(isDeleting ? 75 : 150);

      // Jab poora shabd type ho jaaye
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // 2 sec ruko, phir delete
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1); // Agla shabd
      }
    };

    // Timer jo type karega
    const timer = setTimeout(handleType, typingSpeed);

    // YEH SABSE IMPORTANT HAI: CLEANUP FUNCTION
    // Yeh memory leak rokta hai. Interviewer ko yeh zaroor batana.
    return () => clearTimeout(timer);

  }, [text, isDeleting, typingSpeed, loopNum, rolesToRotate]); 
  // --- END TALKING POINT #2 ---


  return (
    <section className="bg-gray-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Yahan aapka naam hai */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Hi, I'm Anmol Varshney
        </h1>
        <p className="mt-6 text-2xl md:text-3xl font-medium text-blue-700 h-10">
          <span className="border-r-2 border-blue-700 pr-1">{text}</span>&nbsp;
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          I'm an IIT grad with a passion for building clean, responsive, and user-friendly web applications.
        </p>
      </div>
    </section>
  );
}

// 3. About Section (Aapki "Pivot Story")
function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900">About Me</h2>
        <div className="mt-10 flex flex-col md:flex-row items-center bg-gray-50 p-8 rounded-xl shadow-lg">
          <img 
            src="https://placehold.co/150x150/e0e7ff/3730a3?text=AV" 
            alt="Anmol Varshney" 
            className="w-36 h-36 rounded-full border-4 border-white shadow-md flex-shrink-0"
          />
          <div className="md:ml-8 mt-6 md:mt-0">
            <h3 className="text-2xl font-semibold text-gray-900">My Pivot to Frontend</h3>
            <p className="mt-2 text-gray-700 text-lg">
              My journey began in data visualization, where I loved turning complex data into user-friendly dashboards (UI/UX). This sparked my passion for frontend development.
              <br/><br/>
              I'm a quick learner (IIT background) and thrive on solving problems, whether it's with Python and SQL or JavaScript and React. I'm now looking for a full-time remote role to build beautiful, functional web experiences.
            </p>
          </div>
        </div>
        
        {/* Yahan aapki skills hain */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-gray-900">Core Technologies</h3>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <ReactIcon />
              <span className="mt-2 font-medium text-gray-700">React</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <JSIcon />
              <span className="mt-2 font-medium text-gray-700">JavaScript (ES6+)</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <HTMLIcon />
              <span className="mt-2 font-medium text-gray-700">HTML5</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <CSSIcon />
              <span className="mt-2 font-medium text-gray-700">CSS3 (Tailwind)</span>
            </div>
             <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm col-span-2 md:col-span-1">
              <GitIcon />
              <span className="mt-2 font-medium text-gray-700">Git & GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Project Card (Ek single project kaisa dikhega)
function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <img 
        src={project.img} 
        alt={project.title} 
        className="w-full h-48 object-cover" 
        onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Image+Error'; }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
        <p className="mt-3 text-gray-600 h-24">{project.desc}</p>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block mt-4 bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition duration-300"
        >
          View Code
        </a>
      </div>
    </div>
  );
}

// 5. Projects Section (Yeh hai aapka Interview Talking Point #1)
function ProjectSection() {
  
  // --- INTERVIEW TALKING POINT #1: API Simulation ---

  // 1. useState: Hum projects ki list ko 'state' mein rakhenge.
  // Shuru mein, yeh ek empty array (khaali list) hai.
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // 2. useEffect: Yeh function component ke load hote hi *ek baar* chalega.
  // Yeh "API call" karne ke liye perfect hai.
  useEffect(() => {
    // Hum `setTimeout` ka use karke ek 1-second ka 'fake network delay' daal rahe hain
    // Yeh interview mein dikhane ke liye perfect hai ki API call kaise kaam karti hai.
    const fetchProjects = () => {
      console.log("Fetching projects...");
      setTimeout(() => {
        // 1 second baad, hum 'mockProjects' (hamara fake data) ko state mein set karte hain.
        setProjects(mockProjects);
        setIsLoading(false); // Loading khatam
        console.log("Projects loaded!");
      }, 1000); // 1000ms = 1 second
    };

    fetchProjects();
    
    // `[]` (empty dependency array) ka matlab hai yeh effect sirf ek baar chalao.
    // YEH ZAROOR BATANA.
  }, []); 

  // --- INTERVIEW TALKING POINT ENDS HERE ---

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900">My Projects</h2>
        <p className="text-lg text-gray-600 text-center mt-4 mb-12">
          Projects I've built to showcase my skills in React, JavaScript, and data handling.
        </p>

        {/* Yahan hum 'isLoading' state check kar rahe hain */}
        {isLoading ? (
          <div className="text-center text-xl text-gray-600 font-medium">Loading Projects...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Jab loading false hai, tab hum 'projects' state par .map() chalaate hain */}
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// 6. Contact Section
function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-center">
       <div className="max-w-3xl mx-auto">
         <h2 className="text-4xl font-bold text-gray-900">Get In Touch</h2>
         <p className="mt-4 text-lg text-gray-600">
           I'm currently open to new opportunities for frontend roles.
           Feel free to send me an email!
         </p>
         <a 
            href="mailto:anmol.varshney27@gmail.com" 
            className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Email Me: anmol.varshney27@gmail.com
          </a>
      </div>
    </section>
  );
}


// --- Main App Component ---
// Yeh sab components ko ek saath jodta hai
export default function App() {
  return (
    <div className="font-sans text-gray-800 antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <ProjectSection />
        <Contact />
      </main>
      <footer className="bg-gray-800 py-10 text-center">
        <p className="text-gray-400">
          Built with React & Tailwind CSS by Anmol Varshney.
        </p>
      </footer>
    </div>
  );
}
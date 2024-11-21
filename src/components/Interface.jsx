import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Canvas, useLoader } from '@react-three/fiber';
import { useState, useRef } from 'react';
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { currentProjectAtom, projects } from "./Projects";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com";


const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
        h-screen w-screen p-8 max-w-screen-2xl mx-auto
        flex flex-col items-start
        ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
      `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;

  const handleDownloadResume = () => {
    window.open('vedant/Gohel_Vedantsinh_CV.pdf', '_blank');
  };

  const handleDownloadCoverLetter = () => {
    window.open('vedant/Gohel_Vedant_-_Cover_Letter (2).pdf', '_blank');
  };

  return (
    <Section mobileTop>
      <div className="flex fixed top-4 left-4">
        <a href="https://github.com/Vedant-2116" target="_blank" rel="noopener noreferrer" className="github-icon">
          <FontAwesomeIcon icon={faGithub} className="text-gray-600 w-8 h-8 mr-2 md:mr-4" />
        </a>
        <a href="https://www.linkedin.com/in/gohelvedant/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
          <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 w-8 h-8 mr-2 md:mr-4" />
        </a>
      </div>

      <div className="flex items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
          Hello, I'm
          <br />
          <span className="bg-transparent px-1 italic">Vedantsinh Gohel</span>
        </h1>
      </div>

      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I Am A Student From Computer Science
        <br />
        Working To Make World Easy to Access
      </motion.p>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <motion.button
          onClick={handleDownloadResume}
          className={`bg-indigo-600 text-white py-3 px-6 
          rounded-lg font-bold text-base md:text-lg mt-4 md:mt-4 md:mr-2`}
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 2,
          }}
        >
          <span className="hidden md:inline-block ml-2"> Resume</span>
        </motion.button>
      </div>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-3 px-6 
      rounded-lg font-bold text-base mt-4 md:mt-8`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        <span className="hidden md:inline-block ml-2">Contact me</span>
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    name: "HTML 5",
    image: "tech/html.png",
  },
  {
    name: "CSS 3",
    image: "tech/css.png",
  },
  {
    name: "JavaScript",
    image: "tech/javascript.png",
  },
  {
    name: "TypeScript",
    image: "tech/typescript.png",
  },
  {
    name: "React JS",
    image: "tech/reactjs.png",
  },
  {
    name: "Tailwind CSS",
    image: "tech/tailwind.png",
  },
  {
    name: "Node JS",
    image: "tech/nodejs.png",
  },
  {
    name: "MongoDB",
    image: "tech/mongodb.png",
  },
  {
    name: "Three JS",
    image: "tech/threejs.svg",
  },
  {
    name: "Figma",
    image: "tech/figma.png",
  },
  {
    name: "Docker",
    image: "tech/docker.png",
  },
  {
    name: "Redux",
    image: "tech/redux.png",
  },
  {
    name: "Git",
    image: "tech/git.png",
  },
];


const SkillBall = ({ position, image }) => {
  const texture = useLoader(TextureLoader, image);
  const meshRef = useRef();

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial attach="material" color={'#CCCCCC'} />
      </mesh>
      <mesh position={[0, 0, 1.5]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial attach="material" map={texture} transparent />
      </mesh>
    </group>
  );
};

const SkillsSection = () => {
  const groupRef = useRef();

  const numLogos = skills.length;
  const circleRadius = 10;
  const angleIncrement = (2 * Math.PI) / numLogos;

  return (
    <Section>
      <div className="w-full flex justify-center items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
        <div style={{ height: '500px', width: '100%' }}>
          <Canvas camera={{ position: [0, 0, 15], fov: 75 }} resize={{ mode: "stretch" }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <group ref={groupRef}>
              {skills.map((skill, index) => (
                <SkillBall
                  key={index}
                  position={[
                    circleRadius * Math.cos(index * angleIncrement),
                    circleRadius * Math.sin(index * angleIncrement),
                    -1
                  ]}
                  image={skill.image}
                />
              ))}
            </group>
          </Canvas>
        </div>
      </div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

const ContactSection = () => {
  const [state, setState] = useState({ succeeded: false, errors: [], submitting: false });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [phoneNumber] = useState("+19056171621");
  const address = "10 Cardwell Av. #28, Scarborough, ON M1S 4Z2";
  
  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleLocationClick = () => {
    window.open("https://www.google.com/maps/place/10+Cardwell+Ave+%2328,+Scarborough,+ON+M1S+4Z2/@43.7932696,-79.2737025,17z");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState((prev) => ({ ...prev, submitting: true }));
  
    // Use emailjs to send the form data
    emailjs
      .sendForm(
        "service_cmooh52", // Your service ID
        "template_gy2349l", // Your template ID
        event.target, // The form element
        "5nRPGq6M1i5YxUtlm" // Your user ID (private key)
      )
      .then(
        (result) => {
          setState({ succeeded: true, errors: [], submitting: false });
  
          // Display the thank you message and then clear the form after 10 seconds
          setTimeout(() => {
            // Reset the form state
            setFormData({ name: "", email: "", message: "" }); // Reset formData
            
            // Reset the state and hide the success message
            setState({ succeeded: false, errors: [], submitting: false }); // Reset success state
          }, 1000); 
        },
        (error) => {
          setState({ succeeded: false, errors: [error.text], submitting: false });
        }
      );
  };

  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="mt-8 p-4 rounded-md w-48 md:w-64 max-w-full mr-4">
            <div className="flex items-center">
              <FaPhoneAlt
                onClick={handlePhoneClick}
                className="text-indigo-600 cursor-pointer"
                size={24}
              />
              <p className="ml-2 md:ml-4 text-gray-800 text-lg">{phoneNumber}</p>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-md w-48 md:w-64 max-w-full">
            <div className="flex items-center">
              <FaMapMarkerAlt
                onClick={handleLocationClick}
                className="text-indigo-600 cursor-pointer"
                size={24}
              />
              <p className="ml-2 md:ml-4 text-gray-800 text-lg">{address}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-md bg-white bg-opacity-50 w-96 md:w-full">
          {state.succeeded ? (
            <p className="text-gray-900 text-center">Thanks for your message!</p>
          ) : (
            <>
              {state.errors.length > 0 && (
                <div className="text-red-500 text-center mb-4">
                  {state.errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-2 md:p-3"
              />
              <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-8">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-2 md:p-3"
              />
              <label htmlFor="message" className="font-medium text-gray-900 block mb-1 mt-8">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="h-24 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-2 md:p-3"
              />
              <button
                disabled={state.submitting}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-bold text-lg mt-8"
              >
                {state.submitting ? "Submitting..." : "Submit"}
              </button>
            </>
          )}
        </div>
      </form>
    </Section>
  );
};

export default Interface;

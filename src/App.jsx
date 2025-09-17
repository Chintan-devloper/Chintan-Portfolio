import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { projects, skills, experience } from "./constants";
import ContactForm from "./contactForm";

// Main App component
const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const canvasRef = useRef(null);

  // Custom hook for the typewriter effect
  const useTypingEffect = (text, speed = 50) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text.charAt(index));
          setIndex(index + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, [text, speed, index]);

    return displayText;
  };

  const typedTitle = useTypingEffect("Frontend React.js Developer", 200);

  // THREE.js Particle Network Background
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: canvasRef.current,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0a0a0a, 1);

    const particles = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color(0x22d3ee);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      color.toArray(colors, i);
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    });
    const particleMesh = new THREE.Points(particles, particleMaterial);
    scene.add(particleMesh);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.2,
    });

    const lines = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dist = Math.sqrt(
          (positions[i * 3] - positions[j * 3]) ** 2 +
            (positions[i * 3 + 1] - positions[j * 3 + 1]) ** 2 +
            (positions[i * 3 + 2] - positions[j * 3 + 2]) ** 2
        );
        if (dist < 1.5) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(
              positions[i * 3],
              positions[i * 3 + 1],
              positions[i * 3 + 2]
            ),
            new THREE.Vector3(
              positions[j * 3],
              positions[j * 3 + 1],
              positions[j * 3 + 2]
            ),
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
          lines.push(line);
        }
      }
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particleMesh.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    let mouseX = 0,
      mouseY = 0;
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const updateCameraPosition = () => {
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      requestAnimationFrame(updateCameraPosition);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();
    updateCameraPosition();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="container mx-auto p-8 relative z-10">
            <section className="text-center py-20 bg-gray-800 rounded-lg shadow-lg mb-12 bg-opacity-90 text-white border border-gray-700">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-700">
                <img
                  className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-700"
                  src="/chintan-image.JPG"
                  alt=""
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                Chintan Patel
              </h1>
              <p className="text-xl text-cyan-500 font-medium mb-6 min-h-[1.5em]">
                {typedTitle}
              </p>
              <p className="max-w-xl mx-auto text-gray-300">
                I am a dedicated software engineer with over a year of
                experience in front-end programming, specializing in Next.js,
                React.js, and JavaScript. I excel at developing high-performance
                web applications and have a proven track record of delivering
                quality solutions aligned with organizational goals. With strong
                attention to detail and a collaborative spirit, I am committed
                to optimizing user experiences and driving project success.
              </p>
              <p className="max-w-xl mx-auto text-gray-300"></p>
              <p>
                ● I’ve 1.10 years of experience with front-end programming, and
                my areas of expertise are Next.js, React.js, and JavaScript. ●
                I've developed user-facing features, scalable and
                performance-enhancing software, and reusable component creation.
                ● Recognized for my careful, attention to detail methodology, I
                regularly produce code of the highest quality and increase
                development productivity. ● I have the ability to work well on
                my own, take initiative, and collaborate with others in a
                variety of team settings.
              </p>
            </section>
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-[1.02] border border-gray-700"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-700 text-cyan-400 text-xs font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={project.demoUrl}
                          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition duration-300"
                        >
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition duration-300"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case "projects":
        return (
          <div className="container mx-auto p-8 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              My Projects
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-800 rounded-lg shadow-md p-8 bg-opacity-90 text-white border border-gray-700"
                >
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-700 text-cyan-400 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <p className="text-gray-200 mb-4 font-semibold">
                    Project Synopsis :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                    {Array.isArray(project.projectSynopsis) ? (
                      project.projectSynopsis.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))
                    ) : (
                      <li>{project.projectSynopsis}</li>
                    )}
                  </ul>

                  <p className="text-gray-200 mb-4 font-semibold">
                    Responsibilities :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                    {Array.isArray(project.responsibilities) ? (
                      project.responsibilities.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))
                    ) : (
                      <li>{project.responsibilities}</li>
                    )}
                  </ul>
                  <p className="text-gray-200 mb-4 font-semibold">
                    Main Challenges :
                  </p>
                  <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
                    {Array.isArray(project.mainChallenges) ? (
                      project.mainChallenges.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))
                    ) : (
                      <li>{project.mainChallenges}</li>
                    )}
                  </ul>
                  <div className="flex gap-4">
                    <a
                      href={project.demoUrl}
                      className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition duration-300"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "skills":
        return (
          <div className="container mx-auto p-8 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Skills & Expertise
            </h2>
            <div className="bg-gray-800 rounded-lg shadow-md p-8 mb-8 bg-opacity-90 text-white border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Technology Radar
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center font-bold text-cyan-400 text-sm">
                      {skill.proficiency}%
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300 font-semibold mb-1">
                        {skill.name}
                      </p>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="container mx-auto p-8 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Professional Experience
            </h2>
            <div className="space-y-8 relative">
              <div className="absolute left-1/2 -ml-0.5 w-1 h-full bg-gray-700 hidden md:block"></div>
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-start md:space-x-8"
                >
                  <div className="w-full md:w-1/2 p-4 md:p-8 rounded-lg bg-gray-800 shadow-md order-2 md:order-1 bg-opacity-90 text-white border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-cyan-500 font-medium mb-1">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">{exp.duration}</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:w-1/2 hidden md:block order-1"></div>
                </div>
              ))}
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="container mx-auto p-8 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Contact Me
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <ContactForm />
              </div>
              <div className="md:w-1/2 p-6 bg-gray-800 rounded-lg shadow-md space-y-4 bg-opacity-90 text-white border border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Connect with Me
                </h3>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-cyan-500 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.288 3.395c-0.817 0.364-1.745 0.608-2.693 0.732 0.94-0.564 1.662-1.458 2.001-2.52-0.88 0.521-1.854 0.9-2.873 1.107-0.83-0.887-2.012-1.442-3.322-1.442-2.516 0-4.561 2.053-4.561 4.577 0 0.358 0.04 0.706 0.118 1.042-3.792-0.191-7.144-2.01-9.39-4.773-0.392 0.672-0.617 1.452-0.617 2.279 0 1.583 0.806 2.981 2.031 3.805-0.749-0.024-1.453-0.228-2.064-0.564v0.057c0 2.222 1.582 4.079 3.682 4.499-0.385 0.105-0.79 0.161-1.209 0.161-0.296 0-0.582-0.03-0.865-0.082 0.585 1.821 2.28 3.149 4.29 3.187-1.571 1.236-3.55 1.975-5.706 1.975-0.371 0-0.734-0.022-1.092-0.063 2.03 1.304 4.444 2.068 7.025 2.068 8.423 0 13.02-6.992 13.02-13.072 0-0.199-0.004-0.398-0.013-0.597 0.916-0.662 1.708-1.494 2.339-2.443z" />
                  </svg>
                  <span>Twitter</span>
                </a>
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-cyan-500 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387 0.602 0.11 0.82-0.26 0.82-0.574 0-0.283-0.01-1.041-0.016-2.043-3.328 0.725-4.024-1.603-4.024-1.603-0.542-1.373-1.322-1.742-1.322-1.742-1.082-0.741 0.082-0.726 0.082-0.726 1.196 0.085 1.826 1.232 1.826 1.232 1.06 1.826 2.783 1.299 3.454 0.994 0.108-0.774 0.418-1.299 0.763-1.599-2.648-0.301-5.432-1.325-5.432-5.932 0-1.314 0.471-2.388 1.242-3.228-0.124-0.302-0.539-1.523 0.117-3.18 0 0 1.01-0.324 3.303 1.238 0.957-0.266 1.984-0.399 3.012-0.404 1.028 0.005 2.055 0.138 3.012 0.404 2.292-1.562 3.302-1.238 3.302-1.238 0.656 1.657 0.242 2.878 0.118 3.18 0.77 0.84 1.24 1.914 1.24 3.228 0 4.619-2.788 5.626-5.445 5.925 0.43 0.371 0.812 1.102 0.812 2.222 0 1.604-0.016 2.893-0.016 3.284 0 0.318 0.218 0.69 0.828 0.572 4.778-1.589 8.204-6.085 8.204-11.385 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/chintan-patel-b80b5b218/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-cyan-500 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.766s.784-1.766 1.75-1.766 1.75.79 1.75 1.766-.783 1.766-1.75 1.766zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-cyan-500 transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  <a href="ChintanPatelResume.pdf">Download Resume (PDF)</a>
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen font-sans text-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      ></canvas>

      <header className="bg-gray-800 shadow-lg sticky top-0 z-50 border-b border-gray-700">
        <nav className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center text-xl font-extrabold text-cyan-500 mb-4 md:mb-0">
            <img className="w-10 h-10" src="/Cletter.png" alt="" />
          </div>
          <ul className="flex flex-wrap justify-center md:flex-nowrap md:space-x-8 text-gray-300 font-medium">
            <li>
              <button
                onClick={() => setActiveTab("home")}
                className={`py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ${
                  activeTab === "home"
                    ? "text-cyan-500 font-bold bg-gray-700"
                    : ""
                }`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("projects")}
                className={`py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ${
                  activeTab === "projects"
                    ? "text-cyan-500 font-bold bg-gray-700"
                    : ""
                }`}
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("skills")}
                className={`py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ${
                  activeTab === "skills"
                    ? "text-cyan-500 font-bold bg-gray-700"
                    : ""
                }`}
              >
                Skills
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("experience")}
                className={`py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ${
                  activeTab === "experience"
                    ? "text-cyan-500 font-bold bg-gray-700"
                    : ""
                }`}
              >
                Experience
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("contact")}
                className={`py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 ${
                  activeTab === "contact"
                    ? "text-cyan-500 font-bold bg-gray-700"
                    : ""
                }`}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>{renderContent()}</main>

      <footer className="bg-gray-800 shadow-lg mt-12 py-8 text-center text-gray-400 text-sm relative z-10 border-t border-gray-700">
        &copy; 2025 Chintan Patel. All rights reserved.
      </footer>
    </div>
  );
};

export default App;

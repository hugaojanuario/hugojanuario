document.addEventListener('DOMContentLoaded', () => {
    let lenis = null;
    // 1. Boot Screen Sequence
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    
    if (!sessionStorage.getItem('booted_v2')) {
        document.body.classList.add('booting');
        const bootLines = [
            "Initializing kernel...",
            "Loading drivers... [OK]",
            "Mounting file systems... [OK]",
            "Starting system logger... [OK]",
            "Starting network manager... [OK]",
            "Connecting to database... [CONNECTED]",
            "Starting server on port 8080... [OK]",
            "Welcome to Hugo Januário's Server."
        ];
        
        let lineIdx = 0;
        const typeBootLine = () => {
            if (lineIdx < bootLines.length) {
                const line = document.createElement('div');
                line.className = 'boot-line';
                line.textContent = bootLines[lineIdx];
                bootText.appendChild(line);
                lineIdx++;
                setTimeout(typeBootLine, Math.random() * 100 + 100);
            } else {
                setTimeout(() => {
                    bootScreen.classList.add('hidden');
                    document.body.classList.remove('booting');
                    sessionStorage.setItem('booted_v2', 'true');
                }, 800);
            }
        };
        setTimeout(typeBootLine, 300);
    } else {
        if (bootScreen) {
            bootScreen.classList.add('hidden');
        }
    }

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // Toggle body scroll
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('section');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < triggerBottom) {
                el.classList.add('reveal');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Hero Name Typing Animation
    const heroNameEl = document.getElementById('hero-name');
    if (heroNameEl) {
        const nameText = heroNameEl.innerText;
        heroNameEl.innerText = '';
        
        let typeIndex = 0;
        function typeHeroName() {
            if (typeIndex < nameText.length) {
                heroNameEl.innerHTML += nameText.charAt(typeIndex);
                typeIndex++;
                // Randomize slightly for a realistic human typing feel
                const typingSpeed = Math.random() * 50 + 150; 
                setTimeout(typeHeroName, typingSpeed);
            }
        }
        setTimeout(typeHeroName, 800);
    }

    // Interactive Terminal Logic
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    
    if (terminalInput && terminalHistory) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const fullInput = terminalInput.value.trim();
                if (!fullInput) return;

                const args = fullInput.split(' ');
                const cmd = args[0].toLowerCase();
                const fullCmd = fullInput.toLowerCase();

                const historyLine = document.createElement('p');
                historyLine.innerHTML = `<span class="prompt">guest@hugo-systems:~$</span> <span class="cmd-text">${fullInput}</span>`;
                terminalHistory.appendChild(historyLine);

                const responseLine = document.createElement('p');
                responseLine.className = 'terminal-output';
                
                if (cmd === 'help') {
                    responseLine.innerHTML = `<p>Comandos: <span class="highlight">about, skills, clear, contact, sudo, neofetch, matrix, ls, get resume, curl -O resume.pdf</span></p>`;
                } else if (cmd === 'about') {
                    responseLine.innerHTML = `<p>Desenvolvedor Backend com expertise em Java e Go, focado em alta performance.</p>`;
                } else if (cmd === 'skills') {
                    responseLine.innerHTML = `<p>Java, Go, Spring Boot, Docker, Kubernetes, AWS, SQL/NoSQL.</p>`;
                } else if (cmd === 'clear') {
                    terminalHistory.innerHTML = '';
                    terminalInput.value = '';
                    return;
                } else if (cmd === 'contact') {
                    responseLine.innerHTML = `<p>hugojanuarioneto@gmail.com | (66) 99632-4753</p>`;
                } else if (cmd === 'ls') {
                    responseLine.innerHTML = `<p>Files/ <span class="highlight">Curriculo-Hugo-Januario.pdf</span>  projects/  README.md</p>`;
                } else if (cmd === 'sudo') {
                    responseLine.innerHTML = `<p class="red">Permission denied. You are not root ou sudoer.</p>`;
                } else if (cmd === 'get' || cmd === 'curl') {
                    const target = args[1] ? args[1].toLowerCase() : '';
                    const isResume = target === 'resume' || target === 'resume.pdf' || fullCmd.includes('resume');
                    
                    if (isResume && (cmd === 'get' || fullCmd.includes('-o') || fullCmd.includes('-O'))) {
                        responseLine.innerHTML = `<p class="highlight">Iniciando download do currículo... [OK]</p>`;
                        setTimeout(() => {
                            window.open('Files/Curriculo-Hugo-Januario.pdf', '_blank');
                        }, 500);
                    } else if (!target) {
                        responseLine.innerHTML = `<p>Usage: ${cmd} [file]. Try <span class="highlight">${cmd} resume</span> or <span class="highlight">curl -O resume.pdf</span></p>`;
                    } else {
                        responseLine.innerHTML = `<p>bash: ${cmd}: ${args[1]}: No such file or directory</p>`;
                    }
                } else if (cmd === 'neofetch') {
                    responseLine.innerHTML = `
                        <div class="neofetch">
                            <span class="highlight">hugo@systems</span><br>
                            ----------------<br>
                            <span class="highlight">OS:</span> Linux / Go Kernel<br>
                            <span class="highlight">Host:</span> hugo-januario-portfolio<br>
                            <span class="highlight">Kernel:</span> 5.15.0-backend<br>
                            <span class="highlight">Uptime:</span> 365 days<br>
                            <span class="highlight">Shell:</span> portfolio-sh<br>
                            <span class="highlight">CPU:</span> Go Routines (8) @ 3.5GHz<br>
                            <span class="highlight">Memory:</span> 16GB / 32GB<br>
                        </div>`;
                } else if (cmd === 'matrix') {
                    responseLine.innerHTML = `<p class="green">Wake up, Hugo... The Matrix has you...</p>`;
                    document.body.classList.add('matrix-mode');
                    setTimeout(() => document.body.classList.remove('matrix-mode'), 5000);
                } else {
                    responseLine.innerHTML = `<p>bash: ${cmd}: command not found</p>`;
                }
                
                terminalHistory.appendChild(responseLine);
                
                const interactiveTerminal = document.getElementById('interactive-terminal');
                interactiveTerminal.scrollTop = interactiveTerminal.scrollHeight;
                terminalInput.value = '';
            }
        });
        
        const terminalBody = document.getElementById('interactive-terminal');
        if (terminalBody) {
            terminalBody.addEventListener('click', () => terminalInput.focus());
        }
    }

    // Staggered Skills Delay
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--delay', `${index * 0.1}s`);
    });

    // Gopher Eye Tracking
    const pupils = document.querySelectorAll('.pupil');
    document.addEventListener('mousemove', (e) => {
        pupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const eyePosX = rect.left + rect.width / 2;
            const eyePosY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(e.clientY - eyePosY, e.clientX - eyePosX);
            const distance = Math.min(6, Math.hypot(e.clientX - eyePosX, e.clientY - eyePosY) / 30);
            
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    const gopher = document.querySelector('.gopher');
    const gopherWrapper = document.querySelector('.gopher-wrapper');
    if (gopher && gopherWrapper) {
        gopherWrapper.addEventListener('click', () => {
            gopher.classList.add('bounce', 'wink');
            setTimeout(() => {
                gopher.classList.remove('bounce', 'wink');
            }, 1000);
        });
    }

    // Infrastructure Status Simulation
    const uptimeEl = document.getElementById('uptime-value');
    if (uptimeEl) {
        let uptime = 99.985;
        setInterval(() => {
            uptime += (Math.random() - 0.5) * 0.001;
            uptimeEl.innerText = uptime.toFixed(3) + '%';
        }, 3000);
    }

    // Language Switcher Logic
    const translations = {
        pt: {
            nav_about: "Sobre",
            nav_experience: "Experiência",
            nav_projects: "Projetos",
            nav_skills: "Habilidades",
            nav_resume: "Currículo",
            nav_contact: "Contato",
            hero_badge: "Disponível para novos desafios",
            hero_role: "Desenvolvedor Backend <span class=\"highlight\">&</span> Entusiasta de Infraestrutura",
            hero_desc: "Especialista em Go e Java, conectando código de alta performance com arquiteturas de produção resilientes.",
            hero_btn_projects: "Ver Projetos",
            hero_btn_contact: "Contato",
            about_title: "Sobre Mim",
            about_p1: "Olá! Meu nome é Hugo e sou apaixonado por construir sistemas eficientes que rodam de forma estável \"de ponta a ponta\". Minha jornada na tecnologia começou na infraestrutura de TI, onde aprendi a fundo sobre redes, servidores Linux e o modelo OSI.",
            about_p2: "Hoje, estou cursando Sistemas de Informação e focando minha carreira no <strong>Desenvolvimento Backend</strong>. Acredito que meu diferencial é entender não apenas como o código funciona, mas como ele se comporta dentro de um container, em uma rede complexa ou sob carga em produção.",
            about_p3: "Atualmente trabalho na <strong>Siplan</strong> como Técnico de Implantação de Software, onde aplico meus conhecimentos em automação e suporte a ambientes de produção.",
            exp_title: "Experiência Profissional",
            exp_role1: "Técnico de Implantação de Software",
            exp_date1: "Siplan | Ago 2025 - Presente",
            exp_desc1_1: "Implantação de sistemas em ambientes de produção.",
            exp_desc1_2: "Suporte técnico especializado e automação de processos.",
            exp_role2: "Técnico de Helpdesk Júnior",
            exp_date2: "ISP | Ago 2024 - Jul 2025",
            exp_desc2_1: "Gestão de infraestrutura de TI e administração de servidores Linux.",
            exp_desc2_2: "Troubleshooting avançado de redes (TCP/IP, DNS, DHCP).",
            exp_role3: "Estagiário de Helpdesk TI",
            exp_date3: "TI Helpdesk | Abr 2023 - Ago 2024",
            exp_desc3_1: "Suporte técnico de nível 1 e 2 para usuários internos.",
            exp_desc3_2: "Manutenção preventiva e corretiva de hardware e software.",
            proj_title: "Projetos em Destaque",
            proj_desc1: "\"Guardião dos seus containers\". Uma ferramenta robusta para monitoramento e gerenciamento de containers Docker escrita em Go.",
            proj_desc2: "API REST para gerenciamento de tarefas desenvolvida em Go, focada em performance e organização de código.",
            proj_desc3: "Sistema para gerenciar implantações de software, originalmente em Java e reescrito em Go para maior eficiência.",
            skills_title: "Habilidades Técnicas",
            skills_cat1: "Backend",
            skills_api: "REST APIs",
            skills_cat2: "Infra & DevOps",
            skills_net: "Redes (TCP/IP)",
            skills_cat3: "Banco de Dados",
            contact_title: "Me mande um \"Hello World\"",
            contact_desc: "Estou sempre aberto a novas oportunidades ou simplesmente para conversar sobre tecnologia e sistemas.",
            contact_btn_email: "Enviar Email",
            contact_form_name: "Nome",
            contact_form_email: "Email",
            contact_form_msg: "Mensagem",
            contact_form_btn: "Enviar Mensagem",
            contact_form_success: "Mensagem enviada com sucesso! Falamos em breve.",
            contact_form_error: "Erro ao enviar. Tente novamente ou use o email direto."
        },
        en: {
            nav_about: "About",
            nav_experience: "Experience",
            nav_projects: "Projects",
            nav_skills: "Skills",
            nav_resume: "Resume",
            nav_contact: "Contact",
            hero_badge: "Available for new challenges",
            hero_role: "Backend Developer <span class=\"highlight\">&</span> Infrastructure Enthusiast",
            hero_desc: "Expert in Go and Java, connecting high-performance code with resilient production architectures.",
            hero_btn_projects: "View Projects",
            hero_btn_contact: "Contact",
            about_title: "About Me",
            about_p1: "Hello! My name is Hugo and I am passionate about building efficient systems that run stably \"end-to-end\". My journey in technology began in IT infrastructure, where I deeply learned about networks, Linux servers, and the OSI model.",
            about_p2: "Today, I am studying Information Systems and focusing my career on <strong>Backend Development</strong>. I believe my differentiator is understanding not only how the code works, but how it behaves inside a container, in a complex network, or under load in production.",
            about_p3: "Currently I work at <strong>Siplan</strong> as a Software Deployment Technician, where I apply my knowledge in automation and support for production environments.",
            exp_title: "Professional Experience",
            exp_role1: "Software Deployment Technician",
            exp_date1: "Siplan | Aug 2025 - Present",
            exp_desc1_1: "Deployment of systems in production environments.",
            exp_desc1_2: "Specialized technical support and process automation.",
            exp_role2: "Junior Helpdesk Technician",
            exp_date2: "ISP | Aug 2024 - Jul 2025",
            exp_desc2_1: "IT infrastructure management and Linux server administration.",
            exp_desc2_2: "Advanced network troubleshooting (TCP/IP, DNS, DHCP).",
            exp_role3: "IT Helpdesk Intern",
            exp_date3: "TI Helpdesk | Apr 2023 - Aug 2024",
            exp_desc3_1: "Level 1 and 2 technical support for internal users.",
            exp_desc3_2: "Preventive and corrective hardware and software maintenance.",
            proj_title: "Featured Projects",
            proj_desc1: "\"Guardian of your containers\". A robust tool for monitoring and managing Docker containers written in Go.",
            proj_desc2: "REST API for task management developed in Go, focused on performance and code organization.",
            proj_desc3: "System to manage software deployments, originally in Java and rewritten in Go for greater efficiency.",
            skills_title: "Technical Skills",
            skills_cat1: "Backend",
            skills_api: "REST APIs",
            skills_cat2: "Infra & DevOps",
            skills_net: "Networks (TCP/IP)",
            skills_cat3: "Database",
            contact_title: "Send me a \"Hello World\"",
            contact_desc: "I am always open to new opportunities or simply to talk about technology and systems.",
            contact_btn_email: "Send Email",
            contact_form_name: "Name",
            contact_form_email: "Email",
            contact_form_msg: "Message",
            contact_form_btn: "Send Message",
            contact_form_success: "Message sent successfully! Talk soon.",
            contact_form_error: "Error sending. Try again or use direct email."
        }
    };

    const langBtns = document.querySelectorAll('.lang-btn');
    const updateLanguage = (lang, animate = true) => {
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        
        langBtns.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`lang-${lang}`);
        if(activeBtn) activeBtn.classList.add('active');
        localStorage.setItem('lang', lang);

        const applyTranslations = () => {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });
        };

        if (animate) {
            document.body.classList.add('lang-transitioning');
            setTimeout(() => {
                applyTranslations();
                document.body.classList.remove('lang-transitioning');
            }, 300);
        } else {
            applyTranslations();
        }
    };

    const savedLang = localStorage.getItem('lang') || 'pt';
    updateLanguage(savedLang, false);

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.id.split('-')[1];
            updateLanguage(lang, true);
        });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
    `;
    const moonIcon = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;

    const updateTheme = (theme) => {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-theme', isLight);
        document.body.classList.toggle('dark-theme', !isLight);
        
        const themeIconContainer = document.getElementById('theme-icon-container');
        if (themeIconContainer) {
            themeIconContainer.innerHTML = isLight ? moonIcon : sunIcon;
        }
        localStorage.setItem('theme', theme);
    };

    const currentTheme = localStorage.getItem('theme') || 'dark';
    updateTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-theme');
            updateTheme(isDark ? 'light' : 'dark');
        });
    }

    // Custom Cursor Logic
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursorDot) {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }
    });

    const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        
        if (cursorRing) {
            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        }
        requestAnimationFrame(renderCursor);
    };
    renderCursor();

    const interactables = document.querySelectorAll('a, button, .skill-tag, .project-card, .gopher, .gopher-wrapper');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursorRing) cursorRing.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            if(cursorRing) cursorRing.classList.remove('hovering');
        });
    });

    // GitHub API Integration - Favorite Projects
    const githubReposContainer = document.getElementById('github-repos');
    if (githubReposContainer) {
        // Fallback HTML with 6 projects (as requested)
        const fallbackHTML = `
            <div class="project-card">
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/sentinel" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Sentinel</h3>
                    <p class="project-description">"Guardião dos seus containers". Monitoramento robusto de containers Docker escrito em Go.</p>
                    <ul class="project-tech-list"><li>Go</li><li>Docker API</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/sentinel', 'Sentinel')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/task.manager" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Task Manager</h3>
                    <p class="project-description">API REST para gerenciamento de tarefas focada em performance e organização de código.</p>
                    <ul class="project-tech-list"><li>Go</li><li>PostgreSQL</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/task.manager', 'Task Manager')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/deploy-manager" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Deploy Manager</h3>
                    <p class="project-description">Uma API para gerenciar implantações de software em clientes.</p>
                    <ul class="project-tech-list"><li>Java</li><li>Spring Boot</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/deploy-manager', 'Deploy Manager')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/deploy_manager_go" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Deploy Manager Go</h3>
                    <p class="project-description">Sistema para gerenciar implantações de software, reescrito em Go.</p>
                    <ul class="project-tech-list"><li>Go</li><li>Infrastructure</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/deploy_manager_go', 'Deploy Manager Go')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/ambientes-linux" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Ambientes Linux</h3>
                    <p class="project-description">Scripts e automações para configuração de servidores Linux.</p>
                    <ul class="project-tech-list"><li>Shell</li><li>Linux</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/ambientes-linux', 'Ambientes Linux')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
            <div class="project-card">
                <div class="project-content">
                    <div class="project-top"><div class="project-folder">📁</div><div class="project-links"><a href="https://github.com/hugaojanuario/network-tools" target="_blank">↗</a></div></div>
                    <h3 class="project-title">Network Tools</h3>
                    <p class="project-description">Utilitários para troubleshooting e análise de redes TCP/IP.</p>
                    <ul class="project-tech-list"><li>Go</li><li>TCP/IP</li></ul>
                    <button class="btn-details" onclick="openProjectModal('hugaojanuario/network-tools', 'Network Tools')">
                        <i class="fas fa-info-circle"></i> Mais detalhes
                    </button>
                </div>
            </div>
        `;

        fetch('https://api.github.com/users/hugaojanuario/repos?sort=updated&per_page=30')
        .then(res => res.json())
        .then(allRepos => {
            if (!Array.isArray(allRepos)) throw new Error('Invalid response');
            
            // Filter original repos (not forks) and take 6
            const repos = allRepos.filter(repo => !repo.fork).slice(0, 6);
            
            let loadedCount = 0;
            let tempHTML = '';
            
            repos.forEach(repo => {
                if (repo.name) {
                    loadedCount++;
                    const techTag = repo.language ? `<li>${repo.language}</li>` : '';
                    
                    let desc = repo.description;
                    if (!desc) {
                        if (repo.name === 'sentinel') desc = '"Guardião dos seus containers". Ferramenta robusta para monitoramento Dockerd em Go.';
                        else if (repo.name === 'task.manager') desc = 'API REST para gerenciamento de tarefas focada em performance e organização de código.';
                        else if (repo.name === 'deploy-manager') desc = 'Uma API para gerenciar implantações de software em clientes.';
                        else if (repo.name === 'deploy_manager_go') desc = 'Sistema para gerenciar implantações de software, reescrito em Go para maior eficiência.';
                    }

                    tempHTML += `
                        <div class="project-card">
                            <div class="project-content">
                                <div class="project-top">
                                    <div class="project-folder">📁</div>
                                    <div class="project-links">
                                        <a href="${repo.html_url}" target="_blank">↗</a>
                                    </div>
                                </div>
                                <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
                                <p class="project-description">${desc}</p>
                                <ul class="project-tech-list">
                                    ${techTag}
                                    <li>★ ${repo.stargazers_count || 0}</li>
                                    <li>Forks: ${repo.forks_count || 0}</li>
                                </ul>
                                <button class="btn-details" onclick="openProjectModal('${repo.full_name}', '${repo.name}')">
                                    <i class="fas fa-info-circle"></i> Mais detalhes
                                </button>
                            </div>
                        </div>
                    `;
                }
            });

            if (loadedCount > 0) {
                githubReposContainer.innerHTML = tempHTML;
            } else {
                githubReposContainer.innerHTML = fallbackHTML;
            }
            // Initialize carousel after content is injected
            initProjectCarousel();
        })
        .catch(err => {
            githubReposContainer.innerHTML = fallbackHTML;
            initProjectCarousel();
        });

        function initProjectCarousel() {
            const track = document.getElementById('github-repos');
            const prevBtn = document.getElementById('prev-project');
            const nextBtn = document.getElementById('next-project');
            const dotsContainer = document.getElementById('carousel-dots');
            
            if (!track || !prevBtn || !nextBtn) return;

            const cards = track.querySelectorAll('.project-card');
            if (cards.length === 0) return;

            let currentIndex = 0;
            
            // Create dots
            dotsContainer.innerHTML = '';
            cards.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.dot');

            function getVisibleItems() {
                if (window.innerWidth <= 768) return 1;
                if (window.innerWidth <= 1024) return 2;
                return 3;
            }

            function updateCarousel() {
                const visibleItems = getVisibleItems();
                const maxIndex = Math.max(0, cards.length - visibleItems);
                
                // Cap currentIndex if window resized
                if (currentIndex > maxIndex) currentIndex = maxIndex;

                const cardWidth = track.querySelector('.project-card').offsetWidth;
                const gap = 32; // matching CSS gap (2rem)
                
                const scrollAmount = currentIndex * (cardWidth + gap);
                track.style.transform = `translateX(-${scrollAmount}px)`;
                
                dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
                // Hide dots that would scroll past the end
                dot.style.display = i > maxIndex ? 'none' : 'block';
                });
                
                prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
                prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
                
                nextBtn.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
                nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
            }

            function goToSlide(index) {
                const maxIndex = Math.max(0, cards.length - getVisibleItems());
                currentIndex = Math.max(0, Math.min(index, maxIndex));
                updateCarousel();
            }

            prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
            nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

            // Small delay to ensure layout is ready
            setTimeout(updateCarousel, 100);
            
            window.addEventListener('resize', updateCarousel);
        }
    }

    // --- Project Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const readmeContent = document.getElementById('readme-content');
    const filesContent = document.getElementById('files-content');
    const githubLink = document.getElementById('modal-github-link');
    const downloadLink = document.getElementById('modal-download-link');
    const closeBtn = document.getElementById('close-modal');
    const overlay = document.getElementById('modal-overlay');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    window.openProjectModal = async (repoFullname, repoName) => {
        if (lenis) lenis.stop();
        modalTitle.textContent = repoName.replace(/-/g, ' ');
        githubLink.href = `https://github.com/${repoFullname}`;
        downloadLink.href = `https://github.com/${repoFullname}/archive/refs/heads/main.zip`;
        // Fallback for older repos that use master
        downloadLink.onerror = () => {
            downloadLink.href = `https://github.com/${repoFullname}/archive/refs/heads/master.zip`;
        };
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll

        // Reset tabs and path
        switchTab('readme');
        let currentRepo = repoFullname;

        // Initial Loaders
        readmeContent.innerHTML = '<div class="loader-container"><div class="loader"></div><p>Buscando README...</p></div>';
        filesContent.innerHTML = '<div class="loader-container"><div class="loader"></div><p>Mapeando arquivos...</p></div>';

        // Load Files (Root)
        window.loadFolder(repoFullname, '');
        try {
            const readmeRes = await fetch(`https://api.github.com/repos/${repoFullname}/readme`);
            if (readmeRes.ok) {
                const readmeData = await readmeRes.json();
                
                // Robust Base64 to UTF-8 decoding
                const binaryString = window.atob(readmeData.content.replace(/\s/g, ''));
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const decodedContent = new TextDecoder('utf-8').decode(bytes);
                
                // Clear loader and render
                const html = typeof marked.parse === 'function' 
                    ? marked.parse(decodedContent) 
                    : (typeof marked === 'function' ? marked(decodedContent) : decodedContent);
                
                readmeContent.innerHTML = html;

                // If project is one of the favorites, inject architecture diagram
                if (repoName.toLowerCase() === 'sentinel' || repoName.toLowerCase() === 'task.manager') {
                    const diagDiv = document.createElement('div');
                    diagDiv.className = 'mermaid-architecture';
                    diagDiv.style.marginTop = '2rem';
                    diagDiv.style.padding = '1.5rem';
                    diagDiv.style.background = 'rgba(255, 255, 255, 0.03)';
                    diagDiv.style.borderRadius = '8px';
                    diagDiv.style.border = '1px solid rgba(88, 166, 255, 0.2)';

                    const diagTitle = document.createElement('h3');
                    diagTitle.style.marginBottom = '1rem';
                    diagTitle.style.fontSize = '1.1rem';
                    diagTitle.innerText = "System Architecture Design";
                    diagDiv.appendChild(diagTitle);

                    const mermaidPre = document.createElement('pre');
                    mermaidPre.className = 'mermaid';
                    
                    if (repoName.toLowerCase() === 'sentinel') {
                        mermaidPre.textContent = `
graph TD
    A[Docker Engine] -->|Stats API| B(Sentinel Service)
    B --> C{Rules Engine}
    C -->|Alert| D[Terminal UI]
    C -->|Log| E[(Database)]
    B -->|Health Check| F[Status Widget]
                        `;
                    } else {
                        mermaidPre.textContent = `
graph LR
    A[Client] -->|REST| B(API Gateway)
    B --> C[Auth Middleware]
    C --> D[Task Service]
    D --> E[(PostgreSQL)]
    D --> F[(Redis Cache)]
                        `;
                    }
                    diagDiv.appendChild(mermaidPre);
                    readmeContent.appendChild(diagDiv);
                    
                    if (window.mermaid) {
                        window.mermaid.init(undefined, '.mermaid');
                    }
                }
            } else {
                readmeContent.innerHTML = '<p style="text-align:center; padding: 2rem;">Este projeto não possui um README.md público ou o limite de requisições do GitHub foi atingido.</p>';
            }
        } catch (err) {
            console.error('README Error:', err);
            readmeContent.innerHTML = `<p>Erro ao carregar README: ${err.message}</p>`;
        }
    };

    window.loadFolder = async (repoFullname, path = '') => {
        filesContent.innerHTML = '<div class="loader-container"><div class="loader"></div><p>Lendo pasta...</p></div>';
        
        try {
            const url = `https://api.github.com/repos/${repoFullname}/contents/${path}`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                renderFileList(data, repoFullname, path);
            } else {
                filesContent.innerHTML = '<p>Erro ao acessar esta pasta.</p>';
            }
        } catch (err) {
            filesContent.innerHTML = `<p>Erro de conexão: ${err.message}</p>`;
        }
    };

    function renderFileList(files, repoFullname, currentPath) {
        // Sort: folders first
        files.sort((a, b) => (b.type === 'dir' ? 1 : -1) - (a.type === 'dir' ? 1 : -1));
        
        let html = '';

        // Add "Back" button if not at root
        if (currentPath !== '') {
            const parentPath = currentPath.split('/').slice(0, -1).join('/');
            html += `
                <div class="file-item clickable back-btn" onclick="loadFolder('${repoFullname}', '${parentPath}')">
                    <i class="fas fa-level-up-alt"></i>
                    <span>.. (Voltar)</span>
                </div>
            `;
        }

        files.forEach(file => {
            const isDir = file.type === 'dir';
            const icon = isDir ? 'fa-folder' : 'fa-file';
            const clickAction = isDir ? `onclick="loadFolder('${repoFullname}', '${file.path}')"` : '';
            const clickableClass = isDir ? 'clickable' : '';
            
            html += `
                <div class="file-item ${clickableClass}" ${clickAction}>
                    <i class="fas ${icon}"></i>
                    <span>${file.name}</span>
                </div>
            `;
        });
        filesContent.innerHTML = html;
    }

    function switchTab(tabId) {
        tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
        tabContents.forEach(content => content.classList.toggle('active', content.id === `${tabId}-tab`));
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });


    // VCard Generation
    const vcardBtn = document.getElementById('download-vcard');
    if (vcardBtn) {
        vcardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Hugo Januário
TITLE:Desenvolvedor Backend & Infraestrutura
EMAIL:hugojanuarioneto@gmail.com
TEL:+5566996324753
URL:https://github.com/hugaojanuario
URL:https://www.linkedin.com/in/hugo-januário/
END:VCARD`;
            const blob = new Blob([vcard], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Hugo_Januario.vcf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    // Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Interactive Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    // Configuração do Web3Forms (Peça sua chave em https://web3forms.com/)
    const WEB3FORMS_ACCESS_KEY = "1418d683-9d3a-4476-ab3e-e11378cc2a11"; 

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const btnText = btn.querySelector('span');
            const originalText = btnText.innerText;
            
            btn.disabled = true;
            btnText.innerText = 'Enviando...';

            const lang = localStorage.getItem('lang') || 'pt';
            const formData = new FormData(contactForm);
            
            // Adicionar a chave de acesso e o assunto
            formData.append("access_key", WEB3FORMS_ACCESS_KEY);
            formData.append("subject", `Novo contato de ${formData.get('name')} | Portfólio`);
            formData.append("from_name", "Portfólio Hugo Januário");

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            })
            .then(async (response) => {
                const json = await response.json();
                if (response.status === 200) {
                    formStatus.innerText = translations[lang].contact_form_success;
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    console.log(response);
                    formStatus.innerText = json.message || translations[lang].contact_form_error;
                    formStatus.className = 'form-status error';
                }
            })
            .catch(error => {
                console.log(error);
                formStatus.innerText = translations[lang].contact_form_error;
                formStatus.className = 'form-status error';
            })
            .finally(() => {
                btn.disabled = false;
                btnText.innerText = originalText;
                setTimeout(() => {
                    formStatus.innerText = '';
                    formStatus.className = 'form-status';
                }, 5000);
            });
        });
    }

    // Reading Progress Bar Logic
    const progressBar = document.getElementById('reading-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

});

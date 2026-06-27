/* ==========================================================================
   Sai Vijay DevOps Portfolio - Core Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Initialize Lucide Icons ---
    lucide.createIcons();

    // --- 2. Mobile Navigation Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');
    
    if (navToggle && navbar) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }

    // --- 3. Premium Mouse Follow Glow Effect ---
    const mouseGlow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', (e) => {
        if (mouseGlow) {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        }
    });

    // --- 4. Interactive Hero Canvas Background (Cloud Infrastructure Particles) ---
    const canvas = document.getElementById('cloud-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        // Handle window resizing
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
        
        // Particles and labels
        const nodesList = ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'GitHub Actions', 'DevSecOps', 'Prometheus', 'Linux', 'Ansible', 'Maven', 'EC2', 'S3', 'EKS', 'VPC', 'RDS'];
        const particles = [];
        const maxParticles = 40;
        
        const codeSnippets = [
            'docker build -t app:v1 .',
            'terraform apply --auto-approve',
            'kubectl apply -f deployment.yaml',
            'git commit -m "deploy infra"',
            'pipeline { agent any }',
            'helm upgrade --install',
            'aws eks update-kubeconfig',
            'mvn clean install'
        ];
        
        const floatingSnippets = [];
        
        // Mouse coordinates for interaction
        let mouse = { x: null, y: null, radius: 180 };
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });
        
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.size = Math.random() * 3 + 2;
                
                // Assign a label to a few nodes (1 in 3)
                this.hasLabel = Math.random() < 0.35;
                this.label = this.hasLabel ? nodesList[Math.floor(Math.random() * nodesList.length)] : '';
                
                // Highlighted glowing state
                this.glowing = Math.random() < 0.2;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Boundaries bounce
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                
                // Mouse pull effect
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.hypot(dx, dy);
                    
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= dx * force * 0.03;
                        this.y -= dy * force * 0.03;
                    }
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                
                if (this.glowing) {
                    ctx.fillStyle = '#06B6D4'; // cyan
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#06B6D4';
                } else {
                    ctx.fillStyle = 'rgba(56, 189, 248, 0.4)'; // sky blue translucent
                    ctx.shadowBlur = 0;
                }
                ctx.fill();
                ctx.shadowBlur = 0; // reset shadow
                
                // Draw label if node is labeled
                if (this.hasLabel) {
                    ctx.font = '10px "JetBrains Mono", monospace';
                    ctx.fillStyle = 'rgba(148, 163, 184, 0.65)';
                    ctx.fillText(this.label, this.x + 8, this.y + 4);
                }
            }
        }
        
        class Snippet {
            constructor() {
                this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.2 + 0.05;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < -200) this.x = width + 50;
                if (this.x > width + 200) this.x = -150;
                if (this.y < -50) this.y = height + 50;
                if (this.y > height + 50) this.y = -20;
            }
            
            draw() {
                ctx.font = '11px "JetBrains Mono", monospace';
                ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
                ctx.fillText(this.text, this.x, this.y);
            }
        }
        
        // Populate system
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
        for (let i = 0; i < 8; i++) {
            floatingSnippets.push(new Snippet());
        }
        
        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw background lines (network web connections)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);
                    
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        
                        // Calculate opacity based on distance
                        const opacity = (150 - dist) / 150 * 0.08;
                        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
                
                // Draw line to mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    
                    if (dist < mouse.radius) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        
                        const opacity = (mouse.radius - dist) / mouse.radius * 0.15;
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    }
                }
            }
            
            // Update & Draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            // Update & Draw snippets
            floatingSnippets.forEach(s => {
                s.update();
                s.draw();
            });
            
            requestAnimationFrame(animateCanvas);
        }
        
        animateCanvas();
    }

    // --- 5. Typing Text Effect (Hero) ---
    const typingSpan = document.getElementById('typing-text');
    if (typingSpan) {
        const phrases = [
            'AWS DevOps Engineer',
            'Cloud Infrastructure Architect',
            'Kubernetes Administrator',
            'CI/CD Automation Engineer',
            'DevSecOps Specialist'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingSpan.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // delete faster
            } else {
                typingSpan.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 120; // normal typing
            }
            
            // Handle phrase completion
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // hold full text
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // wait briefly before typing next
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000); // initial delay
    }

    // --- 6. Scroll Reveal Effects & Stats Counter ---
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    const statNums = document.querySelectorAll('.stat-num');
    let statsAnimated = false;
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                
                // If it's a stat card trigger, start counter
                if (entry.target.closest('.hero-stats') && !statsAnimated) {
                    animateStats();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Auto-observe stats specifically
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        revealObserver.observe(statsContainer);
    }
    
    function animateStats() {
        statsAnimated = true;
        statNums.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10);
            const duration = 1500; // milliseconds
            const startTime = performance.now();
            
            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentVal = Math.floor(progress * target);
                
                // Add suffix + or % depending on tool vs automation
                if (target === 2) {
                    num.textContent = currentVal + '+';
                } else if (target === 20) {
                    num.textContent = currentVal + '+';
                } else if (target === 100) {
                    num.textContent = currentVal + '%';
                } else if (target === 99) {
                    num.textContent = currentVal + '%';
                } else {
                    num.textContent = currentVal;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                }
            }
            requestAnimationFrame(updateCount);
        });
    }

    // --- 7. Project 1: DevSecOps Pipeline Cycle & Click Hover System ---
    const pipelineStages = [
        {
            title: "Developer Workstation",
            desc: "Developer writes feature code, verifies locally, and executes a Git push to trigger the pipeline."
        },
        {
            title: "GitHub Repository",
            desc: "The central repository hosts the code. Branches are protected, enforcing pull request reviews before merges."
        },
        {
            title: "GitHub Actions Runner",
            desc: "CI/CD server triggers automatically on commit. Starts containerized runners to execute tasks sequentially."
        },
        {
            title: "Maven Build Package",
            desc: "Compiles Java code, downloads dependencies, and builds package files (jar/war) using Maven plugins."
        },
        {
            title: "JUnit Unit Testing",
            desc: "Runs unit test suites automatically. Halts the build immediately if assertion failures occur."
        },
        {
            title: "SonarQube Inspection",
            desc: "Executes static code analysis, checking code smell metrics, duplication levels, and test coverage thresholds."
        },
        {
            title: "Snyk Security Review",
            desc: "Scans project libraries, package dependencies, and configurations to spot CVE vulnerabilities."
        },
        {
            title: "Docker Image Build",
            desc: "Executes multi-stage Docker builds. Minimizes final base layers to reduce attack surface and file size."
        },
        {
            title: "Trivy Container Scan",
            desc: "Scans the generated Docker image layers for vulnerabilities. Blocks promotion if high/critical issues exist."
        },
        {
            title: "JFrog Artifactory",
            desc: "Pushes the validated Docker images to a secure private artifact repository, cataloging build versions."
        },
        {
            title: "Terraform Provisioning",
            desc: "Verifies state config file. Automates updating network resources, security rules, and cluster configurations."
        },
        {
            title: "Amazon EKS Cluster",
            desc: "AWS managed Kubernetes service hosts the core runtime environment, operating across multiple zones."
        },
        {
            title: "Kubernetes Deployment",
            desc: "Applies new container updates via rolling updates, maintaining high availability for end users."
        },
        {
            title: "Prometheus Monitoring",
            desc: "Collects system performance statistics and API metrics from EKS worker pods automatically."
        },
        {
            title: "Grafana Dashboards",
            desc: "Visualizes infrastructure metrics, rendering CPU utilization logs and routing alert updates instantly."
        },
        {
            title: "Production Runtime",
            desc: "Live application handles customer transactions securely, supported by active monitoring and self-healing."
        }
    ];

    const nodes = document.querySelectorAll('.pipeline-node');
    const arrows = document.querySelectorAll('.pipeline-arrow');
    const stageInfoTitle = document.querySelector('#pipeline-stage-info .stage-title');
    const stageInfoDesc = document.querySelector('#pipeline-stage-info .stage-details');
    
    let currentStageIndex = 0;
    let autoPipelineTimer = null;
    let isHoveringNode = false;
    
    function setPipelineStage(index) {
        // Clear all active classes
        nodes.forEach(n => n.classList.remove('active'));
        arrows.forEach(a => a.classList.remove('active'));
        
        // Highlight active node
        nodes[index].classList.add('active');
        
        // Highlight corresponding arrow (if it exists)
        if (index > 0 && index - 1 < arrows.length) {
            arrows[index - 1].classList.add('active');
        }
        
        // Update descriptions panel
        const stage = pipelineStages[index];
        if (stageInfoTitle && stageInfoDesc) {
            stageInfoTitle.innerHTML = `<span class="text-gradient">[Stage ${index + 1}/16]</span> ${stage.title}`;
            stageInfoDesc.textContent = stage.desc;
        }
        
        // Scroll node into visual field inside scrollable container
        const wrap = document.querySelector('.pipeline-scroll-wrap');
        if (wrap) {
            const nodeOffset = nodes[index].offsetLeft;
            const wrapWidth = wrap.clientWidth;
            wrap.scrollTo({
                left: nodeOffset - wrapWidth / 2 + 37, // centers the active node (node width/2 is ~37px)
                behavior: 'smooth'
            });
        }
    }
    
    function cyclePipeline() {
        if (isHoveringNode) return;
        currentStageIndex = (currentStageIndex + 1) % pipelineStages.length;
        setPipelineStage(currentStageIndex);
    }
    
    // Start automated cycle
    if (nodes.length > 0) {
        setPipelineStage(0);
        autoPipelineTimer = setInterval(cyclePipeline, 2200);
        
        // Event listeners for hover/click interaction
        nodes.forEach((node, index) => {
            node.addEventListener('mouseenter', () => {
                isHoveringNode = true;
                clearInterval(autoPipelineTimer);
                setPipelineStage(index);
                currentStageIndex = index;
            });
            
            node.addEventListener('mouseleave', () => {
                isHoveringNode = false;
                autoPipelineTimer = setInterval(cyclePipeline, 2200);
            });
            
            node.addEventListener('click', () => {
                setPipelineStage(index);
                currentStageIndex = index;
            });
        });
    }

    // --- 8. Project 2: AWS Three-Tier Architecture SVG Interactive Highlight ---
    const archGroups = document.querySelectorAll('.arch-group');
    const archNodes = document.querySelectorAll('.arch-node');
    const archTitle = document.querySelector('#architecture-info-panel .arch-panel-title');
    const archDesc = document.querySelector('#architecture-info-panel .arch-panel-desc');
    
    function hookupArchHover(elements) {
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const title = el.getAttribute('data-title');
                const desc = el.getAttribute('data-desc');
                if (archTitle && archDesc) {
                    archTitle.innerHTML = `<i data-lucide="info" class="title-icon"></i> ${title}`;
                    archDesc.textContent = desc;
                    lucide.createIcons(); // refresh icon markup
                }
            });
            
            el.addEventListener('mouseleave', () => {
                if (archTitle && archDesc) {
                    archTitle.innerHTML = 'AWS Infrastructure Components';
                    archDesc.textContent = 'Hover over any boundary or node in the diagram to inspect its cloud architecture configuration, security settings, and networking roles.';
                }
            });
        });
    }
    
    hookupArchHover(archGroups);
    hookupArchHover(archNodes);

    // --- 9. Project 3: Terraform Editor Code Tab Switcher ---
    const tabs = document.querySelectorAll('.editor-tab');
    const codeBlocks = document.querySelectorAll('.code-block');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            codeBlocks.forEach(c => c.classList.remove('active'));
            
            // Add active class
            tab.classList.add('active');
            const file = tab.getAttribute('data-file');
            const targetBlock = document.getElementById(`code-${file}`);
            if (targetBlock) {
                targetBlock.classList.add('active');
            }
        });
    });

    // --- 10. Contact Section Tab Controller (Message Form vs Map view) ---
    const formTabBtns = document.querySelectorAll('.form-tab-btn');
    const contactPanels = document.querySelectorAll('.contact-panel');
    let mapInitialized = false;
    let leafletMap = null;
    
    formTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            formTabBtns.forEach(b => b.classList.remove('active'));
            contactPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const tab = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(`panel-${tab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // If user clicked Map, initialize Leaflet Map once
            if (tab === 'map' && !mapInitialized) {
                initLeafletMap();
            }
        });
    });
    
    function initLeafletMap() {
        mapInitialized = true;
        
        // Coordinates for Rajampet/Kadapa area in Andhra Pradesh, India
        const locationCoords = [14.1950, 79.1550];
        
        // Timeout ensures Leaflet target container is rendered fully first
        setTimeout(() => {
            leafletMap = L.map('map-target', {
                center: locationCoords,
                zoom: 8,
                zoomControl: true,
                attributionControl: false
            });
            
            // Dark Mode Tile Layer (CartoDB Dark Matter)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19
            }).addTo(leafletMap);
            
            // Custom CSS pulsing marker element
            const pulsingIcon = L.divIcon({
                className: 'custom-pulsing-icon',
                html: '<div class="map-pulse-circle"></div><div class="map-pulse-core"></div>',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            
            L.marker(locationCoords, { icon: pulsingIcon }).addTo(leafletMap);
            
            // Inject marker CSS dynamically
            const style = document.createElement('style');
            style.innerHTML = `
                .custom-pulsing-icon {
                    position: relative;
                }
                .map-pulse-circle {
                    width: 24px;
                    height: 24px;
                    border: 2px solid #38BDF8;
                    border-radius: 50%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    animation: mapPulse 2s infinite;
                }
                .map-pulse-core {
                    width: 8px;
                    height: 8px;
                    background-color: #06B6D4;
                    border-radius: 50%;
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    box-shadow: 0 0 10px #06B6D4;
                }
                @keyframes mapPulse {
                    0% { transform: scale(0.5); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
        }, 100);
    }

    // --- 11. Contact Form Client-side Submission & Toast ---
    const contactForm = document.getElementById('contact-form');
    const toastContainer = document.getElementById('toast-container');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Capture field inputs
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Trigger toast alert
                showSuccessToast("Message sent successfully! Sai Vijay will contact you shortly.");
                contactForm.reset();
            }
        });
    }
    
    function showSuccessToast(msg) {
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i data-lucide="check-circle" style="color: #FFF; width: 18px; height: 18px;"></i> <span>${msg}</span>`;
        
        toastContainer.appendChild(toast);
        lucide.createIcons(); // render toast check icon
        
        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.add('removing');
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        }, 4000);
    }

    // --- 12. Back-to-Top Button & Sticky Header Scroll listener ---
    const backToTopBtn = document.getElementById('back-to-top');
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Show/hide back to top button
        if (scrollPos > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
        
        // Dynamic header compression/shadow on scroll
        if (scrollPos > 50) {
            header.style.padding = '12px 0';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.padding = '18px 0';
            header.style.boxShadow = 'none';
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

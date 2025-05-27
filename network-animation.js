document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('neuralNetworkCanvas');
    const ctx = canvas.getContext('2d');

    let headerElement = document.querySelector('header');
    canvas.width = headerElement.offsetWidth;
    canvas.height = headerElement.offsetHeight;

    let particlesArray;

    // Mouse position
    const mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 100) * (canvas.width / 100) // Radius of mouse influence
    };

    window.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });
    
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });


    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseX = this.x; // Store original position for mouse interaction
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1; // How much particle reacts to mouse
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Mouse interaction
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance; // Closer = stronger force
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                // Return to base position if mouse is away
                if (this.x !== this.baseX) {
                    let dxToBase = this.x - this.baseX;
                    this.x -= dxToBase / 10; // Smooth return
                }
                if (this.y !== this.baseY) {
                    let dyToBase = this.y - this.baseY;
                    this.y -= dyToBase / 10; // Smooth return
                }
            }
            
            // Original simple movement (can be combined or replaced)
            // this.x += this.directionX;
            // this.y += this.directionY;

            // Bounce off edges (optional if mouse interaction is primary)
            // if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            //     this.directionX = -this.directionX;
            // }
            // if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            //     this.directionY = -this.directionY;
            // }

            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000; // Adjust density
        if (numberOfParticles > 150) numberOfParticles = 150; // Max particles
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1; // Particle size
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2; // Slow movement
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(0, 191, 255, 0.5)'; // Deep sky blue, semi-transparent

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Connect particles with lines
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                // Adjust connection distance based on canvas size
                let connectionDistance = (canvas.width / 10) * (canvas.height / 10) / 4; 
                if (connectionDistance > 10000) connectionDistance = 10000; // Cap connection distance

                if (distance < connectionDistance) {
                    opacityValue = 1 - (distance / connectionDistance); // Closer lines are more opaque
                    ctx.strokeStyle = `rgba(0, 191, 255, ${opacityValue * 0.3})`; // Lighter, more transparent lines
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Resize event
    window.addEventListener('resize', () => {
        canvas.width = headerElement.offsetWidth;
        canvas.height = headerElement.offsetHeight;
        mouse.radius = (canvas.height / 100) * (canvas.width / 100);
        init(); // Re-initialize particles for new size
    });

    init();
    animate();
});
document.addEventListener('alpine:init', () => {
    Alpine.data('neuralPortfolio', () => ({
        activeNodeData: null,
        epoch: 0,
        tetherActive: false, 
        
        init() {
            setInterval(() => this.epoch++, 3000);
            this.renderGraph();
        },

        renderGraph() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // All nodes
            const nodes = [
                // --- LAYER 0: ROOT ---
                { id: 'root', name: 'Sayemuzzaman Siam', layer: 0, type: 'Root', color: '#00f2ff', description: 'Deep Learning Engineer & AI Developer specializing in Computer Vision and NLP.', visible: true, x: width / 10, y: height / 2 },

                // --- LAYER 1: CATEGORIES ---
                { id: 'projects', name: 'Projects', layer: 1, type: 'Category', color: '#00f2ff', description: 'Core technical implementations.', visible: true, x: width / 3.5, y: height / 2 - 60 },
                { id: 'research', name: 'Research', layer: 1, type: 'Category', color: '#bc00ff', description: 'Academic papers and studies.', visible: true, x: width / 3.5, y: height / 2 - 180 },
                { id: 'exp', name: 'Work', layer: 1, type: 'Category', color: '#ffffff', description: 'Professional experience.', visible: true, x: width / 3.5, y: height / 2 + 60 },
                { id: 'skills', name: 'Skills', layer: 1, type: 'Category', color: '#ff6b00', description: 'Technical skills, frameworks, and tools.', visible: true, x: width / 3.5, y: height / 2 + 180 },
                { id: 'other', name: 'Other Projects', layer: 1, type: 'Category', color: '#10b981', description: 'Web, systems, and game development.', visible: true, x: width / 3.5, y: height / 2 + 300 },
                { id: 'education', name: 'Education', layer: 1, type: 'Category', color: '#f59e0b', description: 'Academic background and achievements.', visible: true, x: width / 3.5, y: height / 2 - 300 },
                { id: 'resume', name: 'Resume', layer: 1, type: 'Category', color: '#ef4444', description: 'Open my complete CV.', visible: true, x: width / 3.5, y: height / 2 + 420 },

                // --- LAYER 2: HIDDEN ---
                { id: 'dl', name: 'Deep Learning', layer: 2, type: 'Field', color: '#00f2ff', description: 'Expertise in CNN, LSTM, and PyTorch.', tech: 'Python,TensorFlow,Keras', visible: false, x: width / 1.8, y: height / 2 },
                { id: 'nlp', name: 'NLP', layer: 2, type: 'Field', color: '#00f2ff', description: 'Bangla NLP & Transformers.', tech: 'BERT,NLTK,HuggingFace', visible: false, x: width / 1.8, y: height / 2 - 80 },
                { id: 'genai', name: 'GenAI/RAG', layer: 2, type: 'Field', color: '#00f2ff', description: 'Generative AI & Vector DBs.', tech: 'LangChain,FAISS,LLMs', visible: false, x: width / 1.8, y: height / 2 + 80 },
                { id: 'betopia', name: 'Betopia Group', layer: 2, type: 'Experience', color: '#ffffff', description: 'AI Developer (June 2025 - December 2025)', visible: false, x: width / 1.8, y: height / 2 + 100 },
                { id: 'webdev', name: 'Web Development', layer: 2, type: 'Field', color: '#10b981', description: 'Full-stack web applications.', tech: 'PHP,HTML,CSS,JavaScript', visible: false, x: width / 1.8, y: height / 2 + 200 },
                { id: 'systems', name: 'Systems & Security', layer: 2, type: 'Field', color: '#10b981', description: 'Network design and security.', tech: 'Networking,Security', visible: false, x: width / 1.8, y: height / 2 + 280 },
                { id: 'ewu', name: 'East West University', layer: 2, type: 'Education', color: '#f59e0b', description: 'B.Sc. in Computer Science and Engineering (2019-2024) | CGPA: 3.04/4.00 | Thesis: Emotion Detection from Bangla Text', visible: false, x: width / 1.8, y: height / 2 - 240 },
                { id: 'cv', name: 'Open CV', layer: 2, type: 'Document', color: '#ef4444', description: 'Complete curriculum vitae with all professional details, experience, and achievements.', link: 'https://github.com/sayemuzzamansiam/sayemuzzamansiam.github.io/blob/main/Resume/Sayem%20Master%20CV%20v1.pdf', visible: false, x: width / 1.8, y: height / 2 + 360 },
                
                // --- LAYER 3: OUTPUT ---
                // Projects - Deep Learning
                { id: 'p1', name: 'Image Caption Generator', layer: 3, type: 'Project', color: '#00f2ff', description: 'CNN-LSTM based multi-model captioning using VGG16, ResNet50, EfficientNet.', link: 'https://github.com/sayemuzzamansiam/ImageCaptionGenerators', tech: 'VGG16,ResNet50,EfficientNet', visible: false, x: 3 * width / 4, y: height / 2 - 200 },
                { id: 'p2', name: 'Computer Vision with XAI', layer: 3, type: 'Project', color: '#00f2ff', description: 'Pneumonia detection with Explainable AI (Grad-CAM, LIME, Integrated Gradients).', link: 'https://github.com/sayemuzzamansiam/Computer-Vision-with-XAI', tech: 'EfficientNet,Grad-CAM,LIME', visible: false, x: 3 * width / 4, y: height / 2 - 140 },
                { id: 'p3', name: 'Image Classifications', layer: 3, type: 'Project', color: '#00f2ff', description: 'Various CNN architectures for image classification tasks.', link: 'https://github.com/sayemuzzamansiam/Image-Classifications', tech: 'CNNs,Computer Vision', visible: false, x: 3 * width / 4, y: height / 2 - 80 },
                { id: 'p4', name: 'Neural Net (Scratch)', layer: 3, type: 'Project', color: '#00f2ff', description: 'Fully connected feed-forward NN using only NumPy.', link: 'https://github.com/sayemuzzamansiam/Neural-Network-From-Scratch', tech: 'Python,NumPy', visible: false, x: 3 * width / 4, y: height / 2 - 20 },
                { id: 'p5', name: 'ML/DL with Manim', layer: 3, type: 'Project', color: '#00f2ff', description: 'Visualizing ML/DL concepts using Manim animations.', link: 'https://github.com/sayemuzzamansiam/ML-and-DL-with-Manim', tech: 'Manim,Visualization', visible: false, x: 3 * width / 4, y: height / 2 + 40 },
                
                // Projects - NLP
                { id: 'p6', name: 'Bangla Text Classification', layer: 3, type: 'Project', color: '#00f2ff', description: 'Multi-class Bangla news classification with BERT (97% accuracy).', link: 'https://github.com/sayemuzzamansiam/Bangla-Text-Classification', tech: 'BERT,LIME,Transformers', visible: false, x: 3 * width / 4, y: height / 2 - 160 },
                { id: 'p7', name: 'Emotion Detection', layer: 3, type: 'Project', color: '#00f2ff', description: 'Emotion detection from English text using NLP.', link: 'https://github.com/sayemuzzamansiam/Emotion-Detection', tech: 'NLP,Sentiment Analysis', visible: false, x: 3 * width / 4, y: height / 2 - 100 },
                { id: 'p8', name: 'Sentiment Analysis', layer: 3, type: 'Project', color: '#00f2ff', description: 'English sentiment analysis and emotion detection.', link: 'https://github.com/sayemuzzamansiam/Sentiment-Analysis', tech: 'NLP,Text Analysis', visible: false, x: 3 * width / 4, y: height / 2 - 40 },
                
                // Projects - GenAI/RAG  
                { id: 'p9', name: 'GenAI with RAG', layer: 3, type: 'Project', color: '#00f2ff', description: 'Book recommender and chatbot using RAG with vector search.', link: 'https://github.com/sayemuzzamansiam/Gen-AI-with-RAG', tech: 'LangChain,FAISS,HuggingFace', visible: false, x: 3 * width / 4, y: height / 2 - 120 },
                { id: 'p10', name: 'LangChain Projects', layer: 3, type: 'Project', color: '#00f2ff', description: 'Collection of LangChain-based GenAI applications.', link: 'https://github.com/sayemuzzamansiam/LangChain', tech: 'LangChain,LLMs', visible: false, x: 3 * width / 4, y: height / 2 - 60 },
                { id: 'p11', name: 'Pydantic', layer: 3, type: 'Project', color: '#00f2ff', description: 'Data validation and settings management using Pydantic.', link: 'https://github.com/sayemuzzamansiam/Pydantic', tech: 'Pydantic,Python', visible: false, x: 3 * width / 4, y: height / 2 },
                { id: 'p12', name: 'MultiLingual TTS Translator', layer: 3, type: 'Project', color: '#00f2ff', description: 'Text-to-speech translation across multiple languages.', link: 'https://github.com/sayemuzzamansiam/MultiLingual-Text-To-Speech-Translator', tech: 'TTS,Translation,Python', visible: false, x: 3 * width / 4, y: height / 2 + 60 },
                { id: 'p13', name: 'Background Removal', layer: 3, type: 'Project', color: '#00f2ff', description: 'Image and video background removal tool.', link: 'https://github.com/sayemuzzamansiam/Image-and-Video-Background-Removal', tech: 'Computer Vision,Python', visible: false, x: 3 * width / 4, y: height / 2 + 120 },
                
                // Additional Projects - ML Tools & Systems
                { id: 'p14', name: 'Recommender System', layer: 3, type: 'Project', color: '#00f2ff', description: 'Collaborative filtering recommender systems.', link: 'https://github.com/sayemuzzamansiam/Recommender-System', tech: 'Collaborative Filtering', visible: false, x: 3 * width / 4, y: height / 2 + 20 },
                { id: 'p15', name: 'Dataset Sampling Tool', layer: 3, type: 'Project', color: '#00f2ff', description: 'Create manageable samples from large datasets (Flickr30k demo).', link: 'https://github.com/sayemuzzamansiam/Dataset-Sampling-for-DL-Projects', tech: 'Data Processing', visible: false, x: 3 * width / 4, y: height / 2 + 80 },
                { id: 'p16', name: 'Sale Prediction', layer: 3, type: 'Project', color: '#00f2ff', description: 'Machine learning model for sales forecasting.', link: 'https://github.com/sayemuzzamansiam/Sale-Prediction', tech: 'ML,Regression', visible: false, x: 3 * width / 4, y: height / 2 + 140 },
                { id: 'p17', name: 'Grade Prediction ML', layer: 3, type: 'Project', color: '#00f2ff', description: 'Synthetic data generation and student grade prediction.', link: 'https://github.com/sayemuzzamansiam/Synthetic-Data-Generation-and-Grade-Prediction-ML', tech: 'Java,Python,ML', visible: false, x: 3 * width / 4, y: height / 2 + 200 },
                
                // Educational & Fun Projects
                { id: 'p18', name: 'NN Learning Game', layer: 3, type: 'Project', color: '#00f2ff', description: 'Interactive gameplay to understand neural networks.', link: 'https://github.com/sayemuzzamansiam/Play-and-Learn-Neural-Networks-with-Python', tech: 'Educational,Interactive', visible: false, x: 3 * width / 4, y: height / 2 - 180 },
                { id: 'p19', name: 'Learn with Memes', layer: 3, type: 'Project', color: '#00f2ff', description: 'ML/DL concepts explained through memes.', link: 'https://github.com/sayemuzzamansiam/Learn-ML-DL-concepts-with-Memes', tech: 'Educational,Fun', visible: false, x: 3 * width / 4, y: height / 2 - 220 },
                
                // Web Development Projects
                { id: 'p20', name: 'Bike PreOrder Hub', layer: 3, type: 'Project', color: '#10b981', description: 'Dynamic website for bike pre-ordering with user-friendly interface.', link: 'https://github.com/sayemuzzamansiam/Bike-PreOrder-Hub', tech: 'PHP,HTML,CSS,JavaScript', visible: false, x: 3 * width / 4, y: height / 2 + 160 },
                { id: 'p21', name: 'Tic-Tac-Toe', layer: 3, type: 'Project', color: '#10b981', description: 'Interactive Tic Tac Toe game - Come, Learn and Play!', link: 'https://github.com/sayemuzzamansiam/Tic-Tac-Toe', tech: 'HTML,CSS,JavaScript', visible: false, x: 3 * width / 4, y: height / 2 + 220 },
                
                // Systems & Security Projects
                { id: 'p22', name: 'University Network Design', layer: 3, type: 'Project', color: '#10b981', description: 'Comprehensive university network infrastructure design.', link: 'https://github.com/sayemuzzamansiam/University-Network-Design', tech: 'Network Design,Infrastructure', visible: false, x: 3 * width / 4, y: height / 2 + 280 },
                { id: 'p23', name: 'Hands-on Security Setup', layer: 3, type: 'Project', color: '#10b981', description: 'Practical security configuration and implementation.', link: 'https://github.com/sayemuzzamansiam/Hands-on-Security-Setup', tech: 'Security,Networking', visible: false, x: 3 * width / 4, y: height / 2 + 340 },
                
                // Research - connected directly to Research node (Layer 2)
                { id: 'r1', name: 'Robust Fault Diagnosis in PV Systems', layer: 2, type: 'Research', color: '#bc00ff', description: 'Multi-Signal Deep Learning Approach with Res-CNNs and GRUs for Enhanced Reliability in Photovoltaic Systems.', link: 'https://www.researchgate.net/profile/Sayemuzzaman-Siam', tech: 'IEEE ICCIT 2025', visible: false, x: width / 1.8, y: height / 2 - 220 },
                { id: 'r2', name: 'ML for Future-Proof Smart Grids', layer: 2, type: 'Research', color: '#bc00ff', description: 'A Framework for Predicting Stability and Efficiency in Smart Grid Systems.', link: 'https://www.researchgate.net/profile/Sayemuzzaman-Siam', tech: 'IEEE ICCIT 2025', visible: false, x: width / 1.8, y: height / 2 - 160 },
                { id: 'r3', name: 'XAI for Pneumonia Detection', layer: 2, type: 'Research', color: '#bc00ff', description: 'Explainable Artificial Intelligence for Deep Learning-Based Detection of Pneumonia in Chest X-ray Images.', link: 'https://www.researchgate.net/profile/Sayemuzzaman-Siam', tech: 'Springer Nature 2025', visible: false, x: width / 1.8, y: height / 2 - 100 }
            ];

            const allLinks = [
                // Root Connections
                { source: 'root', target: 'projects' },
                { source: 'root', target: 'research' },
                { source: 'root', target: 'exp' },
                { source: 'root', target: 'skills' },
                { source: 'root', target: 'other' },
                { source: 'root', target: 'education' },
                { source: 'root', target: 'resume' },
                
                // Layer 1 -> Layer 2
                { source: 'projects', target: 'dl' }, 
                { source: 'projects', target: 'nlp' }, 
                { source: 'projects', target: 'genai' },
                { source: 'exp', target: 'betopia' },
                { source: 'other', target: 'webdev' },
                { source: 'other', target: 'systems' },
                { source: 'education', target: 'ewu' },
                { source: 'resume', target: 'cv' },
                
                // Layer 2 -> Layer 3
                { source: 'dl', target: 'p1' },
                { source: 'dl', target: 'p2' },
                { source: 'dl', target: 'p3' },
                { source: 'dl', target: 'p4' },
                { source: 'dl', target: 'p5' },
                { source: 'nlp', target: 'p6' }, 
                { source: 'nlp', target: 'p7' },
                { source: 'nlp', target: 'p8' },
                { source: 'genai', target: 'p9' },
                { source: 'genai', target: 'p10' },
                { source: 'genai', target: 'p11' },
                { source: 'genai', target: 'p12' },
                { source: 'genai', target: 'p13' },
                { source: 'dl', target: 'p14' },
                { source: 'dl', target: 'p15' },
                { source: 'dl', target: 'p16' },
                { source: 'dl', target: 'p17' },
                { source: 'dl', target: 'p18' },
                { source: 'dl', target: 'p19' },
                { source: 'webdev', target: 'p20' },
                { source: 'webdev', target: 'p21' },
                { source: 'systems', target: 'p22' },
                { source: 'systems', target: 'p23' },
                
                // Research papers connected directly to Research (Layer 1)
                { source: 'research', target: 'r1' }, 
                { source: 'research', target: 'r2' }, 
                { source: 'research', target: 'r3' }
            ];

            const svg = d3.select("#network-container").append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .style("cursor", "move");

            const g = svg.append("g");
            const uiLayer = svg.append("g").attr("class", "ui-layer");
            
            const connectionPath = uiLayer.append("path")
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .style("filter", "drop-shadow(0 0 5px rgba(0, 242, 255, 0.5))")
                .style("opacity", 0)
                .style("pointer-events", "none");

            const zoom = d3.zoom()
                .extent([[0, 0], [width, height]])
                .scaleExtent([0.5, 3])
                .on("zoom", (event) => {
                    g.attr("transform", event.transform);
                    updateInterfaceLine(); 
                });
            
            svg.call(zoom);

            const simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(d => d.id).distance(200))
                .force("charge", d3.forceManyBody().strength(-800))
                .force("x", d3.forceX(d => {
                    if(d.layer === 0) return width * 0.1;
                    if(d.layer === 1) return width * 0.3;
                    if(d.layer === 2) return width * 0.6;
                    return width * 0.85;
                }).strength(0.8))
                .force("y", d3.forceY(height / 2).strength(0.1))
                .on("tick", ticked);

            const linkGroup = g.append("g");
            const nodeGroup = g.append("g");

            let linkElements = linkGroup.selectAll("line");
            let nodeElements = nodeGroup.selectAll("g");

            const updateInterfaceLine = () => {
                // VISUALS: Only draw tether if Data exists AND tether is active
                if (!this.activeNodeData || !this.tetherActive) {
                    connectionPath.style("opacity", 0);
                    return;
                }

                // Allow tether for: skills (layer 1), betopia (layer 2), research papers (layer 2), education (layer 2), cv (layer 2), and layer 3 nodes
                const allowedNodes = ['skills', 'betopia', 'r1', 'r2', 'r3', 'ewu', 'cv'];
                const isAllowedLayer1or2 = (this.activeNodeData.layer === 1 || this.activeNodeData.layer === 2) && 
                                           allowedNodes.includes(this.activeNodeData.id);
                const isLayer3 = this.activeNodeData.layer === 3;

                if (!isAllowedLayer1or2 && !isLayer3) {
                    connectionPath.style("opacity", 0);
                    return;
                }

                const node = nodes.find(n => n.id === this.activeNodeData.id);
                if (!node || !node.visible) {
                    connectionPath.style("opacity", 0);
                    return;
                }

                const transform = d3.zoomTransform(svg.node());
                const sx = transform.applyX(node.x);
                const sy = transform.applyY(node.y);

                const aside = document.querySelector('aside');
                const box = aside.getBoundingClientRect();
                
                const tx = box.left;
                const ty = box.top + 70; 

                const pathData = `M ${sx} ${sy} 
                                  L ${tx - 40} ${sy} 
                                  L ${tx - 20} ${ty} 
                                  L ${tx} ${ty}`;

                connectionPath
                    .attr("d", pathData)
                    .attr("stroke", node.color)
                    .attr("stroke-width", 5)
                    .attr("stroke-dasharray", "5,5")
                    .style("opacity", 0.6)
                    .classed("data-flow", true);
            };

            const updateVisualization = () => {
                const visibleNodes = nodes.filter(n => n.visible);
                const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
                
                const visibleLinks = allLinks.filter(l => {
                    const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
                    const targetId = typeof l.target === 'object' ? l.target.id : l.target;
                    return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
                });

                linkElements = linkElements.data(visibleLinks, d => {
                    const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
                    const targetId = typeof d.target === 'object' ? d.target.id : d.target;
                    return `${sourceId}-${targetId}`;
                });
                
                linkElements.exit().remove();
                
                const linkEnter = linkElements.enter()
                    .append("line")
                    .attr("class", "connection-line")
                    .attr("stroke", "#3b82f6")
                    .attr("stroke-width", 2)
                    .attr("stroke-dasharray", "5,5")
                    .attr("stroke-opacity", 0);

                linkElements = linkEnter.merge(linkElements);
                
                linkElements.transition().duration(500).attr("stroke-opacity", 0.5);

                nodeElements = nodeElements.data(visibleNodes, d => d.id);
                
                nodeElements.exit().remove();

                const nodeEnter = nodeElements.enter()
                    .append("g")
                    .attr("class", "node")
                    .attr("opacity", 0)
                    .call(d3.drag()
                        .on("start", dragStarted)
                        .on("drag", dragged)
                        .on("end", dragEnded))
                    .on("click", (event, d) => handleNodeClick(d));

                nodeEnter.append("circle")
                    .attr("r", d => {
                        if (d.layer === 0) return 20;
                        if (d.layer === 1) return 15;
                        return 10;
                    })
                    .attr("fill", "#05080a")
                    .attr("stroke", d => d.color)
                    .attr("stroke-width", 2.5);

                nodeEnter.append("text")
                    .attr("dx", 22)
                    .attr("dy", 5)
                    .attr("fill", "#94a3b8")
                    .style("font-size", "12px")
                    .style("font-weight", "bold")
                    .style("pointer-events", "none")
                    .text(d => d.name);

                nodeElements = nodeEnter.merge(nodeElements);
                
                nodeElements.transition().duration(500).attr("opacity", 1);

                simulation.nodes(visibleNodes);
                simulation.force("link").links(visibleLinks);
                simulation.alpha(1).restart();
            };

            const hideDescendants = (nodeId) => {
                const childrenLinks = allLinks.filter(l => {
                    const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
                    return sourceId === nodeId;
                });

                childrenLinks.forEach(link => {
                    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                    const childNode = nodes.find(n => n.id === targetId);
                    
                    if (childNode && childNode.visible) {
                        childNode.visible = false;
                        hideDescendants(targetId);
                    }
                });
            };

            const handleNodeClick = (clickedNode) => {
                // --- TOGGLE LOGIC FOR ALL TERMINAL NODES (The Box Connection) ---
                // This includes: layer 3 nodes AND special layer 2 nodes (skills, betopia, ewu, cv, research papers)
                const isTerminalNode = clickedNode.layer === 3 || 
                                      clickedNode.id === 'skills' || 
                                      clickedNode.id === 'betopia' || 
                                      clickedNode.id === 'ewu' ||
                                      clickedNode.id === 'cv' ||
                                      clickedNode.id === 'r1' || 
                                      clickedNode.id === 'r2' || 
                                      clickedNode.id === 'r3';
                
                if (this.activeNodeData && this.activeNodeData.id === clickedNode.id && isTerminalNode) {
                    // Toggle: if same node clicked again, hide the box
                    this.activeNodeData = null;
                    this.tetherActive = false;
                    updateInterfaceLine();
                    return; 
                }

                // CLICK 1: New Selection
                this.activeNodeData = clickedNode;
                this.tetherActive = true; 

                // --- SPECIAL CASE: Skills, Betopia, Education, CV, and Research paper nodes (no expansion, just show in box) ---
                if (clickedNode.id === 'skills' || 
                    clickedNode.id === 'betopia' || 
                    clickedNode.id === 'ewu' ||
                    clickedNode.id === 'cv' ||
                    clickedNode.id === 'r1' || 
                    clickedNode.id === 'r2' || 
                    clickedNode.id === 'r3') {
                    updateInterfaceLine();
                    setTimeout(() => highlightPath(clickedNode), 100);
                    return;
                }

                // --- EXPAND / COLLAPSE LOGIC FOR LAYERS 0, 1, 2 ---
                const childrenLinks = allLinks.filter(link => {
                    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                    return sourceId === clickedNode.id;
                });

                const isExpanded = childrenLinks.some(link => {
                    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                    const node = nodes.find(n => n.id === targetId);
                    return node && node.visible;
                });

                if (isExpanded) {
                    hideDescendants(clickedNode.id);
                } else {
                    childrenLinks.forEach(link => {
                        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                        const childNode = nodes.find(n => n.id === targetId);
                        if (childNode) {
                            childNode.visible = true;
                        }
                    });
                }
                
                updateVisualization();
                setTimeout(() => highlightPath(clickedNode), 100);
                updateInterfaceLine();
            };

            const highlightPath = (selectedNode) => {
                const pathNodeIds = new Set([selectedNode.id]);
                const pathLinkPairs = [];
                
                let currentNode = selectedNode;
                
                while (currentNode && currentNode.layer > 0) {
                    const parentLink = allLinks.find(l => {
                        const targetId = typeof l.target === 'object' ? l.target.id : l.target;
                        return targetId === currentNode.id;
                    });
                    
                    if (parentLink) {
                        const sourceId = typeof parentLink.source === 'object' ? parentLink.source.id : parentLink.source;
                        const targetId = typeof parentLink.target === 'object' ? parentLink.target.id : parentLink.target;
                        
                        pathLinkPairs.push({ source: sourceId, target: targetId });
                        pathNodeIds.add(sourceId);
                        
                        currentNode = nodes.find(n => n.id === sourceId);
                    } else {
                        break;
                    }
                }
                
                linkElements
                    .attr("stroke", "#3b82f6")
                    .attr("stroke-width", 2)
                    .attr("stroke-opacity", 0.4)
                    .classed("data-flow", false);
                
                linkElements.filter(l => {
                    const lSource = typeof l.source === 'object' ? l.source.id : l.source;
                    const lTarget = typeof l.target === 'object' ? l.target.id : l.target;
                    return pathLinkPairs.some(p => p.source === lSource && p.target === lTarget);
                })
                .attr("stroke", selectedNode.color)
                .attr("stroke-width", d => {
                    const targetNode = d.target;
                    if (targetNode.layer === 2) return 3; 
                    if (targetNode.layer === 3) return 5; 
                    return 2; 
                })
                .attr("stroke-opacity", 1)
                .classed("data-flow", true);
                
                nodeElements.selectAll("circle")
                    .attr("stroke-width", n => pathNodeIds.has(n.id) ? 3.5 : 2.5)
                    .attr("r", n => {
                        if (n.layer === 0) return 22;
                        if (n.id === selectedNode.id) return n.layer === 1 ? 18 : 13;
                        return n.layer === 1 ? 15 : 10;
                    });
            };

            function dragStarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragEnded(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            function ticked() {
                linkElements
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
                    
                nodeElements
                    .attr("transform", d => `translate(${d.x},${d.y})`);
                
                updateInterfaceLine();
            }

            updateVisualization();
        }
    }));
});

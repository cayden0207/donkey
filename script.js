// Donkey - Fairy Tale Education Platform
// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });
    
    // 处理视频加载
    handleVideoLoading();
    
    // 处理缺失图像的回退方案
    handleMissingImages();
    
    // 初始化互动故事书
    initStoryBook();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Copy contract address button
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const address = document.querySelector('.address').textContent;
            navigator.clipboard.writeText(address).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
                showNotification('Contract address copied!', 'success');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy address', 'error');
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                // Here you would typically send this to your backend
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Web3 Integration
    const connectWalletBtn = document.querySelector('.connect-wallet');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    }
    
    // Check if Web3 is available
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }
    
    // Create floating stars randomly
    createStars();
    
    // Animation on scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Call once to check initial state
});

// 处理视频加载
function handleVideoLoading() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', function() {
            // 视频已加载，将loaded类添加到视频元素
            heroVideo.classList.add('loaded');
            console.log('Video loaded successfully');
        });
        
        // 如果视频加载失败，隐藏加载动画
        heroVideo.addEventListener('error', function() {
            const videoLoading = document.querySelector('.video-loading');
            if (videoLoading) {
                videoLoading.style.display = 'none';
            }
            console.error('Video loading error');
            // 显示错误通知
            showNotification('视频加载失败，请检查您的网络连接', 'error');
        });
        
        // 5秒后无论如何都隐藏加载动画（防止永久加载）
        setTimeout(function() {
            const videoLoading = document.querySelector('.video-loading');
            if (videoLoading) {
                videoLoading.style.opacity = '0';
                videoLoading.style.pointerEvents = 'none';
            }
        }, 5000);
    }
}

// 处理缺失的图像
function handleMissingImages() {
    // 为所有图像添加错误处理
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // 检查图像是否已经应用了回退
            if (!this.dataset.fallbackApplied) {
                this.dataset.fallbackApplied = true;
                
                // 根据图像类型应用不同的回退
                if (this.src.includes('cloud')) {
                    this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60"><ellipse cx="50" cy="30" rx="40" ry="20" fill="%23f3f3f3" stroke="%23ccc" /></svg>';
                } else if (this.src.includes('icon')) {
                    // 为社交图标提供简单的圆形占位符
                    const iconName = this.src.split('/').pop().split('-')[0];
                    this.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="%23F3BA2F" /><text x="25" y="30" font-family="Arial" font-size="12" text-anchor="middle" fill="white">${iconName.charAt(0).toUpperCase()}</text></svg>`;
                } else if (this.src.includes('butterfly') || this.src.includes('leaf') || this.src.includes('balloon')) {
                    // 为装饰元素提供简单的装饰占位符
                    this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path d="M20,5 L30,20 L20,35 L10,20 Z" fill="%23F3BA2F" stroke="%23E09F00" stroke-width="1" /></svg>';
                } else if (this.src.includes('fairy-pattern') || this.src.includes('wave-divider')) {
                    // 为图案和分隔线提供简单的占位符
                    this.style.display = 'none'; // 简单地隐藏它们
                }
            }
        });
    });
}

// Create random stars animation
function createStars() {
    const maxStars = 20;
    const starsContainer = document.querySelector('.magic-stars');
    
    if (!starsContainer) return;
    
    // Clear existing stars
    while (starsContainer.firstChild) {
        starsContainer.removeChild(starsContainer.firstChild);
    }
    
    // Create new stars
    for (let i = 0; i < maxStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        // Random size
        const size = Math.random() * 4 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        starsContainer.appendChild(star);
    }
}

// Connect to Wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            // Display connected account
            const connectBtn = document.querySelector('.connect-wallet');
            connectBtn.textContent = shortenAddress(account);
            
            // Check if connected to BSC
            checkNetwork();
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', function (accounts) {
                if (accounts.length === 0) {
                    // User disconnected
                    connectBtn.textContent = 'Connect Wallet';
                    showNotification('Wallet disconnected', 'info');
                } else {
                    connectBtn.textContent = shortenAddress(accounts[0]);
                    showNotification('Account changed', 'info');
                }
            });
            
            showNotification('Wallet connected successfully!', 'success');
        } catch (error) {
            console.error(error);
            showNotification('Failed to connect wallet', 'error');
        }
    } else {
        showNotification('Please install MetaMask!', 'warning');
    }
}

// Check if connected to BSC network
async function checkNetwork() {
    if (typeof window.ethereum !== 'undefined') {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        // BNB Smart Chain Mainnet: 0x38 (56 in decimal)
        if (chainId !== '0x38') {
            showNotification('Please switch to BNB Smart Chain', 'warning');
            
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x38',
                                chainName: 'BNB Smart Chain',
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'BNB',
                                    decimals: 18
                                },
                                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                blockExplorerUrls: ['https://bscscan.com/']
                            }],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                }
            }
        }
    }
}

// Shorten address for display
function shortenAddress(address) {
    return address.slice(0, 6) + '...' + address.slice(-4);
}

// Validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to container
    const container = document.querySelector('.notification-container');
    if (container) {
        container.appendChild(notification);
        
        // Animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after timeout
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    container.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Parallax effect on scroll
function parallaxEffect() {
    const scrollTop = window.pageYOffset;
    
    // Apply parallax to fairy dust and decorations
    document.querySelectorAll('.fairy-dust, .castle-decoration, .book-decoration, .treasure-decoration').forEach(element => {
        const speed = 0.1;
        const offset = scrollTop * speed;
        element.style.transform = `translateY(${offset}px)`;
    });
    
    // Clouds move in opposite direction
    document.querySelectorAll('.cloud').forEach(cloud => {
        const speed = -0.05;
        const offset = scrollTop * speed;
        cloud.style.transform = `translateX(${offset}px)`;
    });
}

// Reveal elements on scroll
function revealOnScroll() {
    // Parallax effect
    parallaxEffect();
    
    // Legacy reveal for browsers that don't support AOS
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

// Token Contract Interaction (Basic example)
const donkeyTokenAddress = '0xA49fA5E8106E2d6d6a69E78df9B6A20AaB9c4444';
const donkeyTokenABI = [
    // ERC20 Standard Functions
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

async function checkTokenBalance() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // A Web3Provider wraps a standard Web3 provider, which is
            // what MetaMask injects as window.ethereum into each page
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            // Get the signer (connected wallet)
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            
            // Create a contract instance
            const donkeyToken = new ethers.Contract(donkeyTokenAddress, donkeyTokenABI, provider);
            
            // Get token balance
            const balance = await donkeyToken.balanceOf(address);
            
            // Format the balance (assuming 18 decimals)
            const formattedBalance = ethers.utils.formatUnits(balance, 18);
            
            showNotification(`Your DONKEY balance: ${formattedBalance}`, 'info');
        } catch (error) {
            console.error('Error getting token balance:', error);
            showNotification('Error getting token balance', 'error');
        }
    } else {
        showNotification('Please install MetaMask!', 'warning');
    }
}

// 处理互动故事书
function initStoryBook() {
    const storyBook = document.querySelector('.story-book');
    const bookCover = document.querySelector('.book-cover');
    const bookPages = document.querySelectorAll('.book-page');
    const turnPageBtns = document.querySelectorAll('.turn-page-btn');
    const closeBookBtn = document.querySelector('.close-book-btn');
    
    if (!storyBook || !bookCover) return;
    
    // 初始化第一页为活动页
    bookPages[0].classList.add('active');
    
    // 打开书本
    bookCover.addEventListener('click', function() {
        storyBook.classList.add('open');
    });
    
    // 翻页功能
    turnPageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextPageId = this.dataset.next;
            const nextPage = document.getElementById(nextPageId);
            
            // 隐藏所有页面
            bookPages.forEach(page => {
                page.classList.remove('active');
            });
            
            // 显示目标页面
            if (nextPage) {
                nextPage.classList.add('active');
            }
        });
    });
    
    // 关闭书本
    if (closeBookBtn) {
        closeBookBtn.addEventListener('click', function() {
            storyBook.classList.remove('open');
            
            // 延迟重置到第一页
            setTimeout(() => {
                bookPages.forEach(page => {
                    page.classList.remove('active');
                });
                bookPages[0].classList.add('active');
            }, 1000);
        });
    }
} 
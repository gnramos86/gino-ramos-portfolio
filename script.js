const cards = document.querySelectorAll('.info-card, .skill-card, .project-card, .timeline-item');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.12
  }
);

cards.forEach(card => {
  card.classList.add('hidden');
  observer.observe(card);
});

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');
const suggestionButtons = document.querySelectorAll('.chatbot-suggestions button');

const portfolioAnswers = {
  aws: "Gino has hands-on AWS experience with ECS Fargate, S3, CloudFront, Route 53, RDS, IAM, Secrets Manager, CloudWatch, AWS Backup, Lightsail, and production deployment workflows.",
  cicd: "Gino has built CI/CD workflows using GitHub Actions, AWS IAM OIDC roles, branch-based deployments, S3 sync, CloudFront invalidation, Docker image deployment, and production release processes.",
  projects: "Highlighted projects include AWS frontend CI/CD deployment, API deployment on ECS Fargate, HRIM hosting on Lightsail, MyRepsoft WordPress on Lightsail, PostgreSQL migration preparation, backup and disaster recovery, and hybrid on-prem plus AWS infrastructure.",
  nz: "Gino’s New Zealand experience was a three-month visit sponsored by MyRepsoft. During this milestone, he contributed to on-prem infrastructure and cloud infrastructure work while gaining valuable international exposure.",
  contact: "You can contact Gino through the Contact section of this portfolio, GitHub, or LinkedIn. He is open to cloud, DevOps, infrastructure, and hybrid systems opportunities.",
  backup: "Gino has configured AWS Backup plans for RDS with daily, weekly, and monthly retention rules, restore readiness documentation, and ISO 27001 evidence preparation.",
  docker: "Gino has experience with Docker containers, private registry workflows, image tagging, container lifecycle operations, and deployment support for production workloads.",
  network: "Gino has worked with hybrid infrastructure involving pfSense, NGINX reverse proxy, public DNS, TLS/HTTPS, VPN/RDP access, Docker servers, and AWS-hosted workloads.",
  msp: "Gino has experience with MSP and operations tools including ConnectWise PSA/RMM, Kaseya, BrightGauge, VulScan, SentinelOne, Arctic Wolf Security Awareness Training, and Augmentt integration with Microsoft 365.",
  microsoft: "Gino has Microsoft infrastructure experience including Microsoft Servers, Active Directory, Domain Controllers, Exchange, Lync, Skype for Business, and Microsoft 365-related integrations.",
  ai: "Gino has experience supporting LLM and AI application deployment using Dockerized services, GPU-capable infrastructure, API hosting, and production troubleshooting.",
  virtualization: "Gino has virtualization experience and exposure involving VMware and Hyper-V for server hosting, virtual machine support, and infrastructure operations.",
  default: "I can answer questions about Gino’s AWS, DevOps, infrastructure, CI/CD, Docker, backup, New Zealand experience, and project work. Try asking: What AWS projects has Gino deployed?"
};

function addChatMessage(message, type) {
  const div = document.createElement('div');
  div.className = type === 'user' ? 'user-message' : 'bot-message';
  div.textContent = message;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getPortfolioAnswer(input) {
  const q = input.toLowerCase();

  if (q.includes('aws') || q.includes('cloud')) return portfolioAnswers.aws;
  if (q.includes('ci') || q.includes('cd') || q.includes('pipeline') || q.includes('github actions')) return portfolioAnswers.cicd;
  if (q.includes('project') || q.includes('deployed') || q.includes('deployment')) return portfolioAnswers.projects;
  if (q.includes('new zealand') || q.includes('nz') || q.includes('myrepsoft sponsored')) return portfolioAnswers.nz;
  if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('github')) return portfolioAnswers.contact;
  if (q.includes('backup') || q.includes('disaster') || q.includes('restore') || q.includes('iso')) return portfolioAnswers.backup;
  if (q.includes('docker') || q.includes('container') || q.includes('registry')) return portfolioAnswers.docker;
  if (q.includes('network') || q.includes('pfsense') || q.includes('nginx') || q.includes('on-prem')) return portfolioAnswers.network;
  if (q.includes('connectwise') || q.includes('rmm') || q.includes('psa') || q.includes('kaseya') || q.includes('brightgauge') || q.includes('vulscan') || q.includes('sentinelone') || q.includes('arctic wolf') || q.includes('augmentt')) return portfolioAnswers.msp;
  if (q.includes('active directory') || q.includes('domain controller') || q.includes('dc') || q.includes('exchange') || q.includes('lync') || q.includes('skype') || q.includes('microsoft server') || q.includes('microsoft 365')) return portfolioAnswers.microsoft;
  if (q.includes('llm') || q.includes('ai') || q.includes('gpu') || q.includes('machine learning')) return portfolioAnswers.ai;
  if (q.includes('vmware') || q.includes('hyper-v') || q.includes('hyperv') || q.includes('virtualization') || q.includes('virtual machine')) return portfolioAnswers.virtualization;

  return portfolioAnswers.default;
}

if (chatbotToggle && chatbotPanel) {
  chatbotToggle.addEventListener('click', () => {
    chatbotPanel.classList.toggle('open');
  });
}

if (chatbotClose && chatbotPanel) {
  chatbotClose.addEventListener('click', () => {
    chatbotPanel.classList.remove('open');
  });
}

if (chatbotForm) {
  chatbotForm.addEventListener('submit', event => {
    event.preventDefault();

    const question = chatbotInput.value.trim();
    if (!question) return;

    addChatMessage(question, 'user');
    addChatMessage(getPortfolioAnswer(question), 'bot');

    chatbotInput.value = '';
  });
}

suggestionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.question;
    const label = button.textContent;

    addChatMessage(label, 'user');
    addChatMessage(portfolioAnswers[key] || portfolioAnswers.default, 'bot');
  });
});

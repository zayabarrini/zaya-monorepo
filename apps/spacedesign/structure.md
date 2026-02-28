# Shared Library, npm module or git submodule

├── lib Yes
│   ├── components
│   ├── data
│   ├── stores
│   └── utils
├── posts Database + Static (Images db)
│   ├── Chatgpt
│   └── source
├── routes - No
│   ├── api
│   ├── blog
│   ├── cinema
│   ├── courses
│   ├── favorite-movies
│   ├── list
│   ├── melancholic-machines
│   └── posts
└── types Yes
└── Config files - Copy, paste

# Lib, Components

├── CopyCodeButton
├── CopyCodeInjector
├── DarkmodeButton
├── HomeHeader
├── homepage
│   ├── CarouselBootstrap
│   ├── Carousel
│   ├── CircularParallax
│   ├── FooterForm
│   ├── Footer
│   ├── Main
│   ├── Page
│   ├── Paralax
│   ├── ParallaxAux
│   ├── Phototable
│   ├── PostContainer
│   ├── Section
│   ├── Showcase
│   └── Testimonial
├── IconLink
├── LoadingIndicator
├── MainHeader
├── NotFound
├── PostHeader
├── PostListing
├── SearchButton
├── SocialMedia
├── svg
│   ├── CheckIcon
│   ├── CopyIcon
│   ├── GithubIcon
│   ├── Logo
│   ├── MoonIcon
│   ├── SunIcon
│   ├── YoutubeIcon
│   └── ZayaIcon
├── ThemeInitializer
└── TOC

CopyCodeButton, CopyCodeInjector, DarkmodeButton, HomeHeader, homepage
CarouselBootstrap, Carousel, CircularParallax, FooterForm, Footer, Main, Page, Paralax, ParallaxAux, Phototable, PostContainer, Section, Showcase, Testimonial
IconLink, LoadingIndicator, MainHeader, NotFound, PostHeader, PostListing, SearchButton, SocialMedia
svg, CheckIcon, CopyIcon, GithubIcon, Logo, MoonIcon, SunIcon, YoutubeIcon, ZayaIcon
ThemeInitializer, TOC

# Lib, Data

Images, titles, content
--  CarouselData.ts
--  parallaxData.ts
--  photoTableContent.ts
--  postsData.ts
--  showcaseData.ts
--  TOC.ts

# Posts, Data

# Sell

Data necessary: Posts, Images, Lib/Data
Github login
Vercel Deployment
Continuous Development, Updates: New Posts, new features

# Proposta

**Proposta de Troca de Produto por Serviços**

Prezada [Nome da Veterinária],

Gostaria de propor uma parceria de troca de serviços, onde eu desenvolvo um website/blog personalizado para sua clínica veterinária em troca dos serviços veterinários detalhados abaixo.

### **Proposta do Website**

Criação de um site/blog altamente funcional e visualmente atraente, com as seguintes características:

- **Blog dinâmico**: Publicação e renderização de arquivos Markdown (MD)
- **Design responsivo e moderno**: Com componentes Parallax, layout otimizado para mobile e desktop
- **PWA (Progressive Web App)**: Instalação como aplicativo
- **Modo escuro (Dark Mode)**
- **Tabela de fotos** para exibição de casos clínicos, pets tratados, etc.
- **Barra de pesquisa e navegação por seções**
- **TOC (Table of Contents) automática para posts longos**
- **Opção de compartilhamento direto para redes sociais**
- **Integração com GitHub para atualizações contínuas**

**Requisitos do Cliente:**

- Fornecimento de textos e imagens para os posts
- Acesso a um repositório GitHub para gerenciar o conteúdo

**Desenvolvimento contínuo:**
A negociação pode incluir atualizações futuras, novos posts e implementação de novas funcionalidades conforme necessidade.

### **Serviços Veterinários Solicitados**

1. **Castração de duas gatas**

   - Catarina e Samira
   - Estimativa de valor: R$ 500,00 cada (total: R$ 1.000,00)

2. **Visita familiar para avaliação de 10 cachorros**

   - Diagnóstico de problemas de pele e tratamento
   - Estimativa de valor: R$ 800,00

3. **Acompanhamento para viagem internacional de dois gatos**

   - Documentação, vacinas, autorização de embarque e suporte no processo de viagem
   - Estimativa de valor: R$ 1.500,00

4. **Consulta e medição de Haji**
   - Valor já pago: R$ 140,00

### **Valor Estimado Total dos Serviços Veterinários:** R$ 3.440,00

O valor do website, considerando o design personalizado e as funcionalidades listadas, seria avaliado entre **R$ 3.500,00 e R$ 4.500,00**, tornando a troca de serviços justa para ambas as partes.

Fico à disposição para ajustar detalhes e garantir que seja um acordo vantajoso para ambas.

Atenciosamente,  
**Zaya Barrini**

# Floating Buttons x Bottom Navigation Bar

Adding a floating button that opens a modal with an AI Assistant to your Svelte PWA could be a great idea, depending on your app's purpose and user experience (UX) goals. However, having **four floating buttons** might clutter the interface and overwhelm users. Here are some considerations and suggestions to help you decide:

---

### **Pros of Adding the AI Assistant Button**

1. **Enhanced Functionality**: An AI Assistant can provide valuable features like answering user queries, offering suggestions, or automating tasks, which could improve user engagement.
2. **Competitive Edge**: Integrating AI can make your app feel more modern and innovative.
3. **User Convenience**: If the AI Assistant is context-aware (e.g., helps with translations, reads content aloud, or provides social media suggestions), it could streamline user interactions.

---

### **Cons of Adding the AI Assistant Button**

1. **UI Clutter**: Four floating buttons might make the interface feel crowded, especially on smaller screens.
2. **User Overload**: Too many options can confuse users or make it harder for them to find the feature they need.
3. **Performance Impact**: Depending on how the AI Assistant is implemented, it could add latency or increase the app's bundle size.

---

### **Suggestions to Improve UX**

1. **Combine Related Features**:

   - Consider merging some of the floating buttons into a single "Assist" or "Tools" button that opens a menu with options like Translate, Aloud, and AI Assistant.
   - For example, the AI Assistant could handle translation and text-to-speech functionality, reducing the need for separate buttons.

2. **Context-Aware Buttons**:

   - Show/hide buttons based on user context or preferences. For example, the AI Assistant button could only appear when relevant (e.g., when the user selects text or navigates to a specific page).

3. **Floating Action Menu**:

   - Use a single floating button that expands into a menu with all four options. This keeps the UI clean while providing access to all features.

4. **Bottom Navigation Bar**:

   - If your app has a bottom navigation bar, consider moving some of these features there instead of using floating buttons.

5. **User Preferences**:
   - Allow users to customize which floating buttons they want to see in the settings.

---

### **Implementation Tips**

- **Accessibility**: Ensure the floating buttons and modal are accessible (e.g., keyboard navigation, screen reader support).
- **Performance**: Lazy-load the AI Assistant modal to avoid slowing down the initial load time.
- **Design Consistency**: Use consistent styling for all floating buttons to maintain a cohesive look.
- **Testing**: Test the UI on different screen sizes to ensure the buttons don’t interfere with other content.

---

### **Alternative Approach**

Instead of adding a fourth button, you could integrate the AI Assistant into existing features:

- For example, the AI Assistant could automatically suggest translations or social media sharing options based on user behavior, reducing the need for separate buttons.

---

### **Conclusion**

Adding an AI Assistant could be a valuable feature, but **four floating buttons might be too much**. Consider consolidating or reorganizing the buttons to improve usability. If you proceed, prioritize a clean and intuitive design to ensure a positive user experience.

# Features

Rendered MD files as a Blog
Blog Posts, SSR, Beautiful Parallax Components, Phototable, Footer, MainHeader, Responsive, PWA: install as an app, TOC, Beautiful Design, ThemeInitializer: Dark Mode option, Sidebar, Search Posts, Posts Sections, Share to Social Media

# To do:

- Push Notifications
- Social Media Login
- Native App
- Read Aloud
- IA API

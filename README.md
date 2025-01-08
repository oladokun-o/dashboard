### Megaexe Screening Test Web Application Frontend

This repository contains the frontend code for the Megaexe Screening Test Web Application. It was developed using **SvelteKit** to implement the provided UI design and consume APIs from the Payload CMS backend.

---

### Features
1. **UI Implementation**  
   - Replicated the Figma design, ensuring pixel-perfect layouts using the provided assets, fonts, and colors.  
   - Implemented responsiveness for mobile, tablet, and desktop views.

2. **API Consumption**  
   - Integrated with the Payload CMS backend to dynamically fetch and render content.

3. **Navigation**  
   - Single-page and multi-page capabilities, as required by the project.

4. **Resposive**
    - The web app is responsive and works well on mobile, tablet, and desktop.    

5. **Performance**  
   - Optimized for fast loading and smooth transitions.

---

### Challenges
1. **API Integration**  
   - **Problem** Understanding the API response structure and integrating it into the frontend.  
   - **Solution** Studied the API documentation and experimented with different data structures to render the content correctly.

2. **Responsiveness**
    - **Problem** No mobile design was provided in the Figma file.
    - **Solution** Implemented a responsive design based on the desktop design and tested on different devices to ensure compatibility.

3. **Media Files Failing in Production**
    - **Problem** Images were not loading via the URL in production.
    - **Solution** Reverted to using the local images in the assets folder (temporary solution).

---


### Setup Instructions
1. Clone the repository:  
   ```bash
   git clone https://github.com/oladokun-o/dashboard.git
   cd dashboard
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Start the development server:  
   ```bash
   npm run dev
   ```

5. Build for production:  
   ```bash
   npm run build
   ```

6. Preview production build:  
   ```bash
   npm run preview
   ```

---

### Deployment
The frontend is deployed on [Deployment Platform] and accessible at:  
[**Production Frontend URL**](https://payload-cms-megexe-production.up.railway.app/)

---

### Tools and Technologies
- **SvelteKit**: For building the application.
- **Vite**: For development and production builds.
- **CSS**: For styling.
- **Deployment Platform**: Netliify.

---


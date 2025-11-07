Of course. As Pokee, I will generate the code for the 'Viberante Visuals' component library for your React application. The code is structured, follows modern React practices, and is well-commented for clarity.

Here are the requested files:

### `src/styles.css`

```css
/* General Body Styles & Viberante Theme Variables */
body {
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f2f5;
  color: #333;
  margin: 0;
  padding: 2rem;
}

:root {
  --vibrant-primary: #6a11cb;
  --vibrant-primary-hover: #5a0fb1;
  --vibrant-secondary: #2575fc;
  --vibrant-secondary-hover: #1e63d8;
  --vibrant-danger: #f85032;
  --vibrant-danger-hover: #d94126;
  --vibrant-light: #ffffff;
  --vibrant-dark: #333333;
  --vibrant-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  --vibrant-border-radius: 8px;
}

/* App Container */
.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--vibrant-light);
  border-radius: var(--vibrant-border-radius);
  box-shadow: var(--vibrant-shadow);
}

.component-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.component-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.component-section h2 {
  color: var(--vibrant-primary);
  margin-bottom: 1.5rem;
}

.showcase {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

/* --- VibrantButton Styles --- */
.vibrant-btn {
  border: none;
  border-radius: var(--vibrant-border-radius);
  color: var(--vibrant-light);
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.vibrant-btn:hover {
  transform: translateY(-2px);
}

/* Color Schemes */
.vibrant-btn-primary {
  background: linear-gradient(45deg, var(--vibrant-primary), var(--vibrant-secondary));
}
.vibrant-btn-primary:hover {
  background: linear-gradient(45deg, var(--vibrant-primary-hover), var(--vibrant-secondary-hover));
}

.vibrant-btn-secondary {
  background: var(--vibrant-secondary);
}
.vibrant-btn-secondary:hover {
  background: var(--vibrant-secondary-hover);
}

.vibrant-btn-danger {
  background: var(--vibrant-danger);
}
.vibrant-btn-danger:hover {
  background: var(--vibrant-danger-hover);
}

/* Sizes */
.vibrant-btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.vibrant-btn-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.vibrant-btn-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* --- InfoCard Styles --- */
.info-card {
  background-color: var(--vibrant-light);
  border-radius: var(--vibrant-border-radius);
  box-shadow: var(--vibrant-shadow);
  overflow: hidden;
  max-width: 320px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.info-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.info-card-content {
  padding: 1.5rem;
}

.info-card-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--vibrant-dark);
}

.info-card-description {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

/* --- ModalDialog Styles --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: var(--vibrant-light);
  padding: 2rem;
  border-radius: var(--vibrant-border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: slideIn 0.4s ease-out;
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;
}

.modal-close-btn:hover {
  color: var(--vibrant-dark);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* --- LoadingSpinner Styles --- */
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--vibrant-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### `src/components/VibrantButton.js`

```javascript
import React from 'react';

/**
 * A customizable button component with different color schemes and sizes.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {() => void} props.onClick - The function to call when the button is clicked.
 * @param {'primary' | 'secondary' | 'danger'} [props.color='primary'] - The color scheme of the button.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
const VibrantButton = ({ children, onClick, color = 'primary', size = 'md', className = '', ...props }) => {
  // Determine the CSS classes based on props
  const colorClass = `vibrant-btn-${color}`;
  const sizeClass = `vibrant-btn-${size}`;

  return (
    <button
      onClick={onClick}
      className={`vibrant-btn ${colorClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default VibrantButton;
```

### `src/components/InfoCard.js`

```javascript
import React from 'react';

/**
 * A card component to display information with an image, title, and description.
 * @param {object} props - The component props.
 * @param {string} props.imageUrl - The URL for the card's image.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The descriptive text for the card.
 */
const InfoCard = ({ imageUrl, title, description }) => {
  return (
    <div className="info-card">
      <img src={imageUrl} alt={title} className="info-card-image" />
      <div className="info-card-content">
        <h3 className="info-card-title">{title}</h3>
        <p className="info-card-description">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
```

### `src/components/ModalDialog.js`

```javascript
import React from 'react';

/**
 * A responsive modal component that displays content in a layer above the page.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls whether the modal is visible.
 * @param {() => void} props.onClose - Function to call to close the modal.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 */
const ModalDialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  // Handle clicks on the overlay to close the modal
  const handleOverlayClick = (e) => {
    // Close only if the overlay itself is clicked, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalDialog;
```

### `src/components/LoadingSpinner.js`

```javascript
import React from 'react';

/**
 * A simple, visually appealing spinner to indicate a loading state.
 */
const LoadingSpinner = () => {
  return <div className="loading-spinner"></div>;
};

export default LoadingSpinner;
```

### `src/App.js`

```javascript
import React, { useState } from 'react';
import VibrantButton from './components/VibrantButton';
import InfoCard from './components/InfoCard';
import ModalDialog from './components/ModalDialog';
import LoadingSpinner from './components/LoadingSpinner';
import './styles.css';

function App() {
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <h1>Viberante Visuals Component Library</h1>

      {/* --- VibrantButton Showcase --- */}
      <section className="component-section">
        <h2>VibrantButton</h2>
        <div className="showcase">
          <VibrantButton onClick={() => alert('Primary Small Clicked!')} color="primary" size="sm">
            Primary Small
          </VibrantButton>
          <VibrantButton onClick={() => alert('Secondary Medium Clicked!')} color="secondary" size="md">
            Secondary Medium
          </VibrantButton>
          <VibrantButton onClick={() => alert('Danger Large Clicked!')} color="danger" size="lg">
            Danger Large
          </VibrantButton>
        </div>
      </section>

      {/* --- InfoCard Showcase --- */}
      <section className="component-section">
        <h2>InfoCard</h2>
        <div className="showcase">
          <InfoCard
            imageUrl="https://images.unsplash.com/photo-1554189097-949741241d24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640"
            title="Enchanted Forest"
            description="Discover the serene beauty of a sunlit forest path, a perfect escape into nature's embrace."
          />
          <InfoCard
            imageUrl="https://images.unsplash.com/photo-1507525428034-b723a996f329?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640"
            title="Oceanic Vista"
            description="Experience the calming waves and endless horizons of a pristine tropical beach."
          />
        </div>
      </section>

      {/* --- ModalDialog Showcase --- */}
      <section className="component-section">
        <h2>ModalDialog</h2>
        <div className="showcase">
          <VibrantButton onClick={() => setIsModalOpen(true)}>Open Modal</VibrantButton>
        </div>
        <ModalDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Modal Title</h2>
          <p>This is the content inside the modal. You can put any React components or elements here.</p>
          <VibrantButton onClick={() => setIsModalOpen(false)} color="secondary">
            Close
          </VibrantButton>
        </ModalDialog>
      </section>

      {/* --- LoadingSpinner Showcase --- */}
      <section className="component-section">
        <h2>LoadingSpinner</h2>
        <div className="showcase">
          <LoadingSpinner />
        </div>
      </section>
    </div>
  );
}

export default App;
```